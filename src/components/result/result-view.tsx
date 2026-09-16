"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MathText } from "@/components/math-text";
import { QuestionFigures } from "@/components/question-figures";
import type { AttemptScore, QuestionImage, SubjectScore } from "@/lib/types";

export type ReviewItem = {
  id: string;
  subjectName: string;
  chapterName: string;
  stem: string;
  options: string[];
  images: QuestionImage[];
  answerIndex: number;
  explanation?: string;
  sourceName: string;
  pyqVerified: boolean;
  appearCount: number;
  years: number[];
  chosenIndex?: number;
};

type Filter = "all" | "wrong" | "skipped" | "correct";

type Props = {
  examName: string;
  dateLabel: string;
  durationLabel?: string;
  score: AttemptScore;
  questions: ReviewItem[];
  signedIn: boolean;
};

export function ResultView({
  examName,
  dateLabel,
  durationLabel,
  score,
  questions,
  signedIn,
}: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const percent =
    score.maxMarks > 0 ? Math.round((score.marks / score.maxMarks) * 100) : 0;

  const filtered = useMemo(() => {
    return questions.filter((question) => {
      const skipped = question.chosenIndex === undefined;
      const correct = question.chosenIndex === question.answerIndex;
      if (filter === "wrong") return !skipped && !correct;
      if (filter === "skipped") return skipped;
      if (filter === "correct") return correct;
      return true;
    });
  }, [filter, questions]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
      <p className="font-display text-xs tracking-[0.3em] text-aurora-600">
        {examName.toUpperCase()} · {dateLabel}
      </p>

      <div className="mt-6 grid items-center gap-8 sm:grid-cols-[auto_minmax(0,1fr)]">
        <ScoreRing percent={percent} marks={score.marks} max={score.maxMarks} />

        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-800 sm:text-5xl">
            {score.marks}
            <span className="text-mist-400"> / {score.maxMarks}</span>
          </h1>
          <p className="mt-3 text-mist-600">
            {score.correct} correct · {score.wrong} wrong · {score.unattempted} left
            {durationLabel ? ` · ${durationLabel}` : ""}
          </p>
        </div>
      </div>

      {!signedIn && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-aurora-500/40 bg-aurora-500/10 px-5 py-4">
          <p className="text-sm text-ink-800">
            Sign in to keep this attempt in your history.
          </p>
          <Link
            href="/login"
            className="rounded-lg bg-ink-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-700"
          >
            Sign in
          </Link>
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold text-ink-800">
          Subject breakdown
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {score.bySubject.map((subject) => (
            <SubjectCard key={subject.subjectId} subject={subject} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-ink-800">
            Review
          </h2>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", `All (${questions.length})`],
                ["wrong", `Wrong (${score.wrong})`],
                ["skipped", `Left (${score.unattempted})`],
                ["correct", `Correct (${score.correct})`],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                  filter === value
                    ? "bg-ink-800 text-white"
                    : "bg-white text-mist-600 hover:bg-mist-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <ol className="mt-5 space-y-4">
          {filtered.map((question) => {
            const position = questions.findIndex((q) => q.id === question.id);
            const isCorrect = question.chosenIndex === question.answerIndex;
            const skipped = question.chosenIndex === undefined;

            return (
              <li key={question.id} className="glass rounded-2xl px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="min-w-0 text-xs tracking-wide text-mist-400">
                    {position + 1} · {question.subjectName} · {question.chapterName}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      skipped
                        ? "bg-mist-100 text-mist-600"
                        : isCorrect
                          ? "bg-aurora-500/20 text-ink-800"
                          : "bg-ember-400/25 text-ink-800"
                    }`}
                  >
                    {skipped ? "Not attempted" : isCorrect ? "Correct" : "Wrong"}
                  </span>
                </div>

                <p className="mt-3 text-ink-800">
                  <MathText>{question.stem}</MathText>
                </p>
                <QuestionFigures images={question.images} />

                <ul className="mt-4 space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isAnswer = optionIndex === question.answerIndex;
                    const isChosen = optionIndex === question.chosenIndex;
                    return (
                      <li
                        key={optionIndex}
                        className={`rounded-lg border px-3.5 py-2.5 text-sm ${
                          isAnswer
                            ? "border-aurora-500 bg-aurora-500/10 text-ink-800"
                            : isChosen
                              ? "border-ember-500 bg-ember-400/15 text-ink-800"
                              : "border-mist-200 text-mist-600"
                        }`}
                      >
                        <span className="mr-2 font-semibold">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        <MathText>{option}</MathText>
                      </li>
                    );
                  })}
                </ul>

                {question.explanation && (
                  <p className="mt-4 text-sm text-mist-600">
                    <MathText>{question.explanation}</MathText>
                  </p>
                )}

                <p className="mt-3 text-xs text-mist-400">
                  {question.appearCount > 0 && (
                    <>
                      Appeared {question.appearCount}{" "}
                      {question.appearCount === 1 ? "time" : "times"}
                      {question.years.length > 0 && (
                        <> in {question.years.join(", ")}</>
                      )}{" "}
                      ·{" "}
                    </>
                  )}
                  Source: {question.sourceName}
                  {question.appearCount > 0 && !question.pyqVerified && (
                    <> · sample paper history</>
                  )}
                </p>
              </li>
            );
          })}
        </ol>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-2xl border border-dashed border-mist-200 px-5 py-10 text-center text-mist-600">
            Nothing in this filter.
          </p>
        )}
      </section>

      <div className="mt-12 border-t border-mist-200 pt-8">
        <Link
          href="/setup"
          className="inline-block rounded-lg bg-aurora-500 px-7 py-3.5 font-display font-semibold text-ink-900 transition hover:bg-aurora-400"
        >
          Take another paper
        </Link>
      </div>
    </div>
  );
}

function ScoreRing({
  percent,
  marks,
  max,
}: {
  percent: number;
  marks: number;
  max: number;
}) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const dash = (clamped / 100) * circumference;

  return (
    <div className="relative size-36 shrink-0">
      <svg viewBox="0 0 120 120" className="-rotate-90 size-full" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-mist-200"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-aurora-500"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-semibold tabular-nums text-ink-800">
          {clamped}%
        </span>
        <span className="text-[0.65rem] tracking-[0.18em] text-mist-400">
          {marks}/{max}
        </span>
      </div>
    </div>
  );
}

function SubjectCard({ subject }: { subject: SubjectScore }) {
  const ratio = subject.maxMarks > 0 ? subject.marks / subject.maxMarks : 0;
  const width = `${Math.max(0, Math.min(100, ratio * 100))}%`;

  return (
    <div className="glass rounded-2xl px-5 py-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display font-semibold text-ink-800">
          {subject.subjectName}
        </span>
        <span className="font-display tabular-nums text-ink-800">
          {subject.marks}/{subject.maxMarks}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist-200">
        <div className="h-full rounded-full bg-aurora-500" style={{ width }} />
      </div>
      <p className="mt-2 text-sm text-mist-600">
        {subject.correct} correct · {subject.wrong} wrong · {subject.unattempted} left
      </p>
    </div>
  );
}
