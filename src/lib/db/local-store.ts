import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  getQuestion,
  questionCountsByChapter,
  questionsForChapters,
} from "@/content/questions";
import type { Attempt, AttemptScore, Owner, Question } from "@/lib/types";
import type { NewAttempt, Store } from "./types";

/**
 * File backed store used when Supabase env vars are absent. It keeps local
 * development and demos fully working; production runs on the Supabase store
 * because this directory does not survive a redeploy.
 */
export type LocalUser = {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
};

type LocalData = {
  users: LocalUser[];
  attempts: Attempt[];
  seen: Record<string, string[]>;
};

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "store.json");
const empty: LocalData = { users: [], attempts: [], seen: {} };

/** Serialises read-modify-write cycles within this process. */
let queue: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function read(): Promise<LocalData> {
  try {
    const raw = await readFile(dataFile, "utf8");
    return { ...empty, ...(JSON.parse(raw) as Partial<LocalData>) } as LocalData;
  } catch {
    return structuredClone(empty);
  }
}

async function write(data: LocalData): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(data, null, 2), "utf8");
}

function ownerKey(owner: Owner): string {
  return `${owner.kind}:${owner.id}`;
}

export async function readLocalUsers(): Promise<LocalUser[]> {
  return (await read()).users;
}

export async function addLocalUser(user: LocalUser): Promise<void> {
  await withLock(async () => {
    const data = await read();
    data.users.push(user);
    await write(data);
  });
}

export const localStore: Store = {
  async poolForChapters(chapterIds) {
    return questionsForChapters(chapterIds).map((q) => ({
      id: q.id,
      subjectId: q.subjectId,
    }));
  },

  async questionsByIds(ids) {
    return ids
      .map((id) => getQuestion(id))
      .filter((q): q is Question => Boolean(q));
  },

  async chapterQuestionCounts() {
    return questionCountsByChapter();
  },

  async seenQuestionIds(owner) {
    const data = await read();
    return new Set(data.seen[ownerKey(owner)] ?? []);
  },

  async markSeen(owner, questionIds) {
    await withLock(async () => {
      const data = await read();
      const key = ownerKey(owner);
      data.seen[key] = [...new Set([...(data.seen[key] ?? []), ...questionIds])];
      await write(data);
    });
  },

  async createAttempt(input: NewAttempt) {
    const attempt: Attempt = {
      id: randomUUID(),
      examId: input.examId,
      streamId: input.streamId,
      chapterIds: input.chapterIds,
      questionIds: input.questionIds,
      durationMinutes: input.durationMinutes,
      status: "in_progress",
      createdAt: new Date().toISOString(),
      answers: {},
      ...(input.owner.kind === "user"
        ? { userId: input.owner.id }
        : { guestSessionId: input.owner.id }),
    };

    await withLock(async () => {
      const data = await read();
      data.attempts.push(attempt);
      await write(data);
    });

    return attempt;
  },

  async getAttempt(id) {
    const data = await read();
    return data.attempts.find((a) => a.id === id) ?? null;
  },

  async saveAnswers(id, answers) {
    await withLock(async () => {
      const data = await read();
      const attempt = data.attempts.find((a) => a.id === id);
      if (!attempt || attempt.status === "submitted") return;
      attempt.answers = answers;
      await write(data);
    });
  },

  async submitAttempt(id, answers, score: AttemptScore) {
    return withLock(async () => {
      const data = await read();
      const attempt = data.attempts.find((a) => a.id === id);
      if (!attempt) throw new Error(`Attempt not found: ${id}`);
      attempt.answers = answers;
      attempt.score = score;
      attempt.status = "submitted";
      attempt.submittedAt = new Date().toISOString();
      await write(data);
      return attempt;
    });
  },

  async listAttempts(owner) {
    const data = await read();
    return data.attempts
      .filter((a) =>
        owner.kind === "user"
          ? a.userId === owner.id
          : a.guestSessionId === owner.id && !a.userId,
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async claimGuestAttempts(guestSessionId, userId) {
    return withLock(async () => {
      const data = await read();
      const claimed = data.attempts.filter(
        (a) => a.guestSessionId === guestSessionId && !a.userId,
      );
      for (const attempt of claimed) attempt.userId = userId;

      const guestSeen = data.seen[`guest:${guestSessionId}`] ?? [];
      const userKey = `user:${userId}`;
      data.seen[userKey] = [
        ...new Set([...(data.seen[userKey] ?? []), ...guestSeen]),
      ];

      await write(data);
      return claimed.length;
    });
  },
};
