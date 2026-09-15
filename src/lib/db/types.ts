import type { PoolQuestion } from "@/lib/paper/generate";
import type {
  Attempt,
  AttemptScore,
  ExamId,
  Owner,
  Question,
  StreamId,
} from "@/lib/types";

export type NewAttempt = {
  examId: ExamId;
  streamId: StreamId;
  chapterIds: string[];
  questionIds: string[];
  durationMinutes: number;
  owner: Owner;
};

export type Store = {
  /** Eligible questions for the chapters a student picked. */
  poolForChapters(chapterIds: string[]): Promise<PoolQuestion[]>;
  questionsByIds(ids: string[]): Promise<Question[]>;
  /** Bank depth per chapter, used by the chapter picker. */
  chapterQuestionCounts(): Promise<Record<string, number>>;
  /** Question ids this owner has already been served. */
  seenQuestionIds(owner: Owner): Promise<Set<string>>;
  markSeen(owner: Owner, questionIds: string[]): Promise<void>;
  createAttempt(input: NewAttempt): Promise<Attempt>;
  getAttempt(id: string): Promise<Attempt | null>;
  saveAnswers(id: string, answers: Record<string, number>): Promise<void>;
  submitAttempt(
    id: string,
    answers: Record<string, number>,
    score: AttemptScore,
  ): Promise<Attempt>;
  listAttempts(owner: Owner): Promise<Attempt[]>;
  /** Moves guest attempts onto a user account after login. */
  claimGuestAttempts(guestSessionId: string, userId: string): Promise<number>;
};

export function ownerMatchesAttempt(attempt: Attempt, owner: Owner): boolean {
  return owner.kind === "user"
    ? attempt.userId === owner.id
    : attempt.guestSessionId === owner.id && !attempt.userId;
}
