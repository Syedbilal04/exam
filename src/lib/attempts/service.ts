import "server-only";
import { getChapter, getExam, getStream, getSubject, quotasFor } from "@/content/catalog";
import { getStore } from "@/lib/db";
import { ownerMatchesAttempt } from "@/lib/db/types";
import { selectPaper } from "@/lib/paper/generate";
import { scoreAttempt } from "@/lib/paper/score";
import type {
  Attempt,
  ClientQuestion,
  Exam,
  Owner,
  Question,
  StreamId,
} from "@/lib/types";

export type StartAttemptInput = {
  examId: string;
  streamId: string;
  chapterIds: string[];
  owner: Owner;
};

export class AttemptError extends Error {}

function resolveSelection(input: StartAttemptInput) {
  const exam = getExam(input.examId);
  if (!exam) throw new AttemptError("Choose an exam to continue.");

  const stream = getStream(input.streamId);
  if (!stream || !exam.quotas[stream.id]) {
    throw new AttemptError(`${exam.name} does not accept this stream.`);
  }

  const chapters = input.chapterIds
    .map((id) => getChapter(id))
    .filter((c) => c !== undefined);

  const quotas = quotasFor(exam, stream.id);
  const missing = quotas
    .filter((quota) => !chapters.some((c) => c.subjectId === quota.subjectId))
    .map((quota) => quota.subject.name);

  if (missing.length > 0) {
    throw new AttemptError(
      `Pick at least one chapter from ${missing.join(", ")}.`,
    );
  }

  return { exam, streamId: stream.id as StreamId, chapters, quotas };
}

/**
 * Builds a paper and freezes its question ids on the attempt, so a refresh or
 * a reopened tab shows exactly the same paper.
 */
export async function startAttempt(input: StartAttemptInput): Promise<Attempt> {
  const { exam, streamId, chapters, quotas } = resolveSelection(input);
  const store = getStore();
  const chapterIds = chapters.map((c) => c.id);

  const [pool, seenIds] = await Promise.all([
    store.poolForChapters(chapterIds),
    store.seenQuestionIds(input.owner),
  ]);

  const { questionIds } = selectPaper({
    quotas: quotas.map((q) => ({ subjectId: q.subjectId, count: q.count })),
    pool,
    seenIds,
  });

  if (questionIds.length === 0) {
    throw new AttemptError(
      "No questions are available for the selected chapters yet.",
    );
  }

  const attempt = await store.createAttempt({
    examId: exam.id,
    streamId,
    chapterIds,
    questionIds,
    durationMinutes: exam.durationMinutes,
    owner: input.owner,
  });

  await store.markSeen(input.owner, questionIds);
  return attempt;
}

function toClientQuestion(question: Question): ClientQuestion {
  return {
    id: question.id,
    subjectId: question.subjectId,
    subjectName: getSubject(question.subjectId).name,
    chapterId: question.chapterId,
    chapterName: getChapter(question.chapterId)?.name ?? "",
    stem: question.stem,
    options: question.options,
    pyq: question.pyq,
  };
}

export type LoadedAttempt = {
  attempt: Attempt;
  exam: Exam;
  questions: ClientQuestion[];
  /** Seconds left on the clock; zero once the window has closed. */
  remainingSeconds: number;
};

export async function loadAttempt(
  attemptId: string,
  owner: Owner,
): Promise<LoadedAttempt | null> {
  const store = getStore();
  const attempt = await store.getAttempt(attemptId);
  if (!attempt || !ownerMatchesAttempt(attempt, owner)) return null;

  const exam = getExam(attempt.examId);
  if (!exam) return null;

  const questions = await store.questionsByIds(attempt.questionIds);
  const elapsed = (Date.now() - new Date(attempt.createdAt).getTime()) / 1000;

  return {
    attempt,
    exam,
    questions: questions.map(toClientQuestion),
    remainingSeconds: Math.max(0, attempt.durationMinutes * 60 - elapsed),
  };
}

export type ReviewQuestion = ClientQuestion & {
  answerIndex: number;
  explanation?: string;
  sourceName: string;
  pyqVerified: boolean;
  chosenIndex?: number;
};

export async function loadReview(
  attemptId: string,
  owner: Owner,
): Promise<{ attempt: Attempt; exam: Exam; questions: ReviewQuestion[] } | null> {
  const store = getStore();
  const attempt = await store.getAttempt(attemptId);
  if (!attempt || !ownerMatchesAttempt(attempt, owner)) return null;

  const exam = getExam(attempt.examId);
  if (!exam) return null;

  const questions = await store.questionsByIds(attempt.questionIds);
  return {
    attempt,
    exam,
    questions: questions.map((question) => ({
      ...toClientQuestion(question),
      answerIndex: question.answerIndex,
      explanation: question.explanation,
      sourceName: question.source.name,
      pyqVerified: question.pyq.verified,
      chosenIndex: attempt.answers[question.id],
    })),
  };
}

export async function submitAttempt(
  attemptId: string,
  owner: Owner,
  answers: Record<string, number>,
): Promise<Attempt> {
  const store = getStore();
  const attempt = await store.getAttempt(attemptId);
  if (!attempt || !ownerMatchesAttempt(attempt, owner)) {
    throw new AttemptError("Attempt not found.");
  }
  if (attempt.status === "submitted") return attempt;

  const exam = getExam(attempt.examId);
  if (!exam) throw new AttemptError("Attempt refers to an unknown exam.");

  const questions = await store.questionsByIds(attempt.questionIds);
  const allowed = new Set(attempt.questionIds);
  const cleaned = Object.fromEntries(
    Object.entries(answers).filter(
      ([questionId, choice]) =>
        allowed.has(questionId) && Number.isInteger(choice) && choice >= 0,
    ),
  );

  const score = scoreAttempt({
    questions,
    answers: cleaned,
    marking: exam.marking,
  });

  return store.submitAttempt(attemptId, cleaned, score);
}

export async function saveProgress(
  attemptId: string,
  owner: Owner,
  answers: Record<string, number>,
): Promise<void> {
  const store = getStore();
  const attempt = await store.getAttempt(attemptId);
  if (!attempt || !ownerMatchesAttempt(attempt, owner)) return;
  await store.saveAnswers(attemptId, answers);
}
