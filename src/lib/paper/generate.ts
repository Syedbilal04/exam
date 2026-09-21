import { shuffle } from "./shuffle.ts";
import type { ExamId, SubjectId } from "@/lib/types";

export const EXAM_LABEL: Record<ExamId, string> = {
  "ts-eamcet": "TS EAMCET",
  "jee-main": "JEE Main",
  neet: "NEET",
};

export type PoolQuestion = {
  id: string;
  subjectId: SubjectId;
  /** `pyq.exams` labels, e.g. "TS EAMCET" or "NEET". Empty = legacy. */
  exams?: string[];
};

export type PaperRequest = {
  quotas: { subjectId: SubjectId; count: number }[];
  /** Eligible questions, already filtered to the chapters the student picked. */
  pool: PoolQuestion[];
  /** Questions this student has already been served in earlier attempts. */
  seenIds: Set<string>;
  /** When set, matching-exam items are taken before dual-tag, then the other exam. */
  examId?: ExamId;
};

export type PaperSelection = {
  questionIds: string[];
  /** Per-subject counts, useful for logging and tests. */
  breakdown: {
    subjectId: SubjectId;
    requested: number;
    delivered: number;
    fresh: number;
    recycled: number;
  }[];
};

function sittingLabel(examId?: ExamId): string | undefined {
  return examId ? EXAM_LABEL[examId] : undefined;
}

/** 0 = sitting exam only, 1 = legacy/empty/dual, 2 = other exam only. */
function examBucket(question: PoolQuestion, label: string): 0 | 1 | 2 {
  const exams = question.exams ?? [];
  if (exams.length === 1 && exams[0] === label) return 0;
  if (exams.length === 0) return 1;
  if (exams.includes(label)) return 1;
  return 2;
}

function pickFromPool(
  subjectPool: PoolQuestion[],
  count: number,
  seenIds: Set<string>,
  label: string | undefined,
): PoolQuestion[] {
  if (!label) {
    const fresh = shuffle(subjectPool.filter((q) => !seenIds.has(q.id)));
    const recycled = shuffle(subjectPool.filter((q) => seenIds.has(q.id)));
    return [...fresh, ...recycled].slice(0, count);
  }

  const buckets: PoolQuestion[][] = [[], [], []];
  for (const question of subjectPool) {
    buckets[examBucket(question, label)].push(question);
  }

  const picked: PoolQuestion[] = [];
  const used = new Set<string>();
  for (const bucket of buckets) {
    const fresh = shuffle(
      bucket.filter((q) => !seenIds.has(q.id) && !used.has(q.id)),
    );
    const recycled = shuffle(
      bucket.filter((q) => seenIds.has(q.id) && !used.has(q.id)),
    );
    for (const question of [...fresh, ...recycled]) {
      if (picked.length >= count) break;
      picked.push(question);
      used.add(question.id);
    }
    if (picked.length >= count) break;
  }
  return picked;
}

/**
 * Builds one paper from the selected chapters.
 *
 * Fresh questions are always used first; once they run out the same-chapter
 * questions the student has seen before are mixed back in silently. A paper is
 * never blocked and never carries a "you have seen these" notice - it simply
 * delivers as many distinct questions as the selected chapters can support.
 *
 * When `examId` is set, items tagged only for that exam come first, then
 * legacy dual-tagged / untagged seeds, then the other exam.
 */
export function selectPaper({
  quotas,
  pool,
  seenIds,
  examId,
}: PaperRequest): PaperSelection {
  const bySubject = new Map<SubjectId, PoolQuestion[]>();
  for (const question of pool) {
    const list = bySubject.get(question.subjectId);
    if (list) list.push(question);
    else bySubject.set(question.subjectId, [question]);
  }

  const label = sittingLabel(examId);
  const questionIds: string[] = [];
  const breakdown: PaperSelection["breakdown"] = [];

  for (const quota of quotas) {
    const subjectPool = bySubject.get(quota.subjectId) ?? [];
    const picked = pickFromPool(subjectPool, quota.count, seenIds, label);

    questionIds.push(...picked.map((q) => q.id));
    const freshCount = picked.filter((q) => !seenIds.has(q.id)).length;
    breakdown.push({
      subjectId: quota.subjectId,
      requested: quota.count,
      delivered: picked.length,
      fresh: freshCount,
      recycled: picked.length - freshCount,
    });
  }

  return { questionIds, breakdown };
}
