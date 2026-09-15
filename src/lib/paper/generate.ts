import { shuffle } from "./shuffle.ts";
import type { SubjectId } from "@/lib/types";

export type PoolQuestion = {
  id: string;
  subjectId: SubjectId;
};

export type PaperRequest = {
  quotas: { subjectId: SubjectId; count: number }[];
  /** Eligible questions, already filtered to the chapters the student picked. */
  pool: PoolQuestion[];
  /** Questions this student has already been served in earlier attempts. */
  seenIds: Set<string>;
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

/**
 * Builds one paper from the selected chapters.
 *
 * Fresh questions are always used first; once they run out the same-chapter
 * questions the student has seen before are mixed back in silently. A paper is
 * never blocked and never carries a "you have seen these" notice - it simply
 * delivers as many distinct questions as the selected chapters can support.
 */
export function selectPaper({
  quotas,
  pool,
  seenIds,
}: PaperRequest): PaperSelection {
  const bySubject = new Map<SubjectId, PoolQuestion[]>();
  for (const question of pool) {
    const list = bySubject.get(question.subjectId);
    if (list) list.push(question);
    else bySubject.set(question.subjectId, [question]);
  }

  const questionIds: string[] = [];
  const breakdown: PaperSelection["breakdown"] = [];

  for (const quota of quotas) {
    const subjectPool = bySubject.get(quota.subjectId) ?? [];
    const fresh = shuffle(subjectPool.filter((q) => !seenIds.has(q.id)));
    const recycled = shuffle(subjectPool.filter((q) => seenIds.has(q.id)));
    const picked = [...fresh, ...recycled].slice(0, quota.count);

    questionIds.push(...picked.map((q) => q.id));
    breakdown.push({
      subjectId: quota.subjectId,
      requested: quota.count,
      delivered: picked.length,
      fresh: Math.min(picked.length, fresh.length),
      recycled: Math.max(0, picked.length - fresh.length),
    });
  }

  return { questionIds, breakdown };
}
