import { getSubject } from "@/content/catalog";
import type { AttemptScore, Marking, Question, SubjectId } from "@/lib/types";

type ScoreInput = {
  questions: Question[];
  answers: Record<string, number>;
  marking: Marking;
};

export function scoreAttempt({
  questions,
  answers,
  marking,
}: ScoreInput): AttemptScore {
  const buckets = new Map<
    SubjectId,
    { total: number; correct: number; wrong: number; unattempted: number }
  >();

  for (const question of questions) {
    const bucket = buckets.get(question.subjectId) ?? {
      total: 0,
      correct: 0,
      wrong: 0,
      unattempted: 0,
    };
    bucket.total += 1;

    const chosen = answers[question.id];
    if (chosen === undefined || chosen === null) bucket.unattempted += 1;
    else if (chosen === question.answerIndex) bucket.correct += 1;
    else bucket.wrong += 1;

    buckets.set(question.subjectId, bucket);
  }

  const bySubject = [...buckets.entries()].map(([subjectId, bucket]) => ({
    subjectId,
    subjectName: getSubject(subjectId).name,
    ...bucket,
    marks:
      bucket.correct * marking.correct +
      bucket.wrong * marking.wrong +
      bucket.unattempted * marking.unattempted,
    maxMarks: bucket.total * marking.correct,
  }));

  return {
    marks: bySubject.reduce((sum, s) => sum + s.marks, 0),
    maxMarks: bySubject.reduce((sum, s) => sum + s.maxMarks, 0),
    correct: bySubject.reduce((sum, s) => sum + s.correct, 0),
    wrong: bySubject.reduce((sum, s) => sum + s.wrong, 0),
    unattempted: bySubject.reduce((sum, s) => sum + s.unattempted, 0),
    bySubject,
  };
}
