"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { submitAttemptAction } from "@/app/actions/attempt";
import { MathText } from "@/components/math-text";
import { QuestionFigures } from "@/components/question-figures";
import type { ClientQuestion } from "@/lib/types";

type Props = {
  attemptId: string;
  examName: string;
  questions: ClientQuestion[];
  initialAnswers: Record<string, number>;
  remainingSeconds: number;
};

function formatClock(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function MockCockpit({
  attemptId,
  examName,
  questions,
  initialAnswers,
  remainingSeconds,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers);
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(remainingSeconds);
  const [isSubmitting, startSubmit] = useTransition();

  const deadline = useRef(0);
  const answersRef = useRef(answers);

  useEffect(() => {
    // The interval and the submit handler read the sheet without re-subscribing.
    answersRef.current = answers;
  }, [answers]);

  const question = questions[index];
  const answered = Object.keys(answers).length;

  const submit = useCallback(() => {
    startSubmit(async () => {
      await submitAttemptAction(attemptId, answersRef.current);
    });
  }, [attemptId]);

  useEffect(() => {
    deadline.current = Date.now() + remainingSeconds * 1000;

    const tick = setInterval(() => {
      const left = (deadline.current - Date.now()) / 1000;
      setSecondsLeft(left);
      if (left <= 0) {
        clearInterval(tick);
        submit();
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [remainingSeconds, submit]);

  useEffect(() => {
    // Periodic autosave so a closed tab does not lose the answer sheet.
    const save = setInterval(() => {
      void fetch(`/api/attempts/${attemptId}/progress`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers: answersRef.current }),
        keepalive: true,
      }).catch(() => undefined);
    }, 20_000);
    return () => clearInterval(save);
  }, [attemptId]);

  const subjectSections = useMemo(() => {
    const sections: { name: string; start: number; count: number }[] = [];
    questions.forEach((q, position) => {
      const last = sections.at(-1);
      if (last && last.name === q.subjectName) last.count += 1;
      else sections.push({ name: q.subjectName, start: position, count: 1 });
    });
    return sections;
  }, [questions]);

  function choose(optionIndex: number) {
    setAnswers((current) => ({ ...current, [question.id]: optionIndex }));
  }

  function clearChoice() {
    setAnswers((current) => {
      const next = { ...current };
      delete next[question.id];
      return next;
    });
  }

  function toggleMark() {
    setMarked((current) => {
      const next = new Set(current);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  }

  const urgent = secondsLeft <= 300;

  return (
    <div className="surface-day min-h-full">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_20rem] sm:px-8">
        <section className="glass rounded-3xl p-6 sm:p-8">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-mist-200 pb-5">
            <div>
              <p className="font-display text-xs tracking-[0.3em] text-aurora-600">
                {examName.toUpperCase()}
              </p>
              <h1 className="mt-1 font-display text-2xl font-semibold text-ink-800">
                Question {index + 1}
                <span className="text-mist-400"> / {questions.length}</span>
              </h1>
            </div>

            <div
              className={`pulse-ring rounded-2xl border px-5 py-2.5 text-center font-display tabular-nums ${
                urgent
                  ? "border-ember-500 bg-ember-400/15 text-ink-800"
                  : "border-aurora-500/50 bg-aurora-500/10 text-ink-800"
              }`}
            >
              <span className="block text-[0.65rem] tracking-[0.25em] text-mist-600">
                TIME LEFT
              </span>
              <span className="text-2xl font-semibold">
                {formatClock(secondsLeft)}
              </span>
            </div>
          </header>

          {question && (
            <article className="pt-6">
              <p className="text-xs tracking-wide text-mist-400">
                {question.subjectName} · {question.chapterName}
              </p>

              <h2 className="mt-3 text-xl leading-relaxed text-ink-800">
                <MathText>{question.stem}</MathText>
              </h2>

              <QuestionFigures images={question.images} />

              <div className="mt-6 space-y-3">
                {question.options.map((option, optionIndex) => {
                  const active = answers[question.id] === optionIndex;
                  return (
                    <button
                      key={optionIndex}
                      type="button"
                      onClick={() => choose(optionIndex)}
                      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                        active
                          ? "border-aurora-500 bg-aurora-500/12"
                          : "border-mist-200 bg-white/80 hover:border-mist-400"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                          active
                            ? "border-aurora-600 bg-aurora-500 text-ink-900"
                            : "border-mist-400 text-mist-600"
                        }`}
                      >
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="text-ink-800">
                        <MathText>{option}</MathText>
                      </span>
                    </button>
                  );
                })}
              </div>

              {question.pyq.appearCount > 0 && (
                <p className="mt-5 text-sm text-mist-600">
                  Appeared {question.pyq.appearCount} time
                  {question.pyq.appearCount === 1 ? "" : "s"} in previous papers
                  {question.pyq.years.length > 0 && (
                    <> · {question.pyq.years.join(", ")}</>
                  )}
                  {question.pyq.exams.length > 0 && (
                    <> · {question.pyq.exams.join(", ")}</>
                  )}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-mist-200 pt-6">
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                  className="rounded-lg border border-mist-200 px-5 py-2.5 text-sm text-mist-600 transition hover:border-mist-400 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setIndex((i) => Math.min(questions.length - 1, i + 1))
                  }
                  disabled={index === questions.length - 1}
                  className="rounded-lg bg-ink-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-700 disabled:opacity-40"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={toggleMark}
                  className="rounded-lg border border-ember-500/50 px-5 py-2.5 text-sm text-ink-800 transition hover:bg-ember-400/15"
                >
                  {marked.has(question.id) ? "Unmark" : "Mark for review"}
                </button>
                <button
                  type="button"
                  onClick={clearChoice}
                  className="text-sm text-mist-600 underline-offset-4 transition hover:text-ink-800 hover:underline"
                >
                  Clear response
                </button>
              </div>
            </article>
          )}
        </section>

        <aside className="glass h-fit rounded-3xl p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-ink-800">
              Answer sheet
            </h2>
            <span className="text-sm text-mist-600">
              {answered}/{questions.length}
            </span>
          </div>

          <div className="mt-5 space-y-5">
            {subjectSections.map((section) => (
              <div key={`${section.name}-${section.start}`}>
                <p className="text-xs tracking-[0.2em] text-mist-400">
                  {section.name.toUpperCase()}
                </p>
                <div className="mt-2 grid grid-cols-6 gap-1.5">
                  {Array.from({ length: section.count }, (_, offset) => {
                    const position = section.start + offset;
                    const item = questions[position];
                    const isAnswered = answers[item.id] !== undefined;
                    const isMarked = marked.has(item.id);
                    const isCurrent = position === index;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIndex(position)}
                        className={`aspect-square rounded-md text-xs font-medium tabular-nums transition ${
                          isCurrent
                            ? "bg-ink-800 text-white"
                            : isMarked
                              ? "bg-ember-400/40 text-ink-800"
                              : isAnswered
                                ? "bg-aurora-500/25 text-ink-800"
                                : "bg-white text-mist-600 hover:bg-mist-100"
                        }`}
                      >
                        {position + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={isSubmitting}
            className="mt-7 w-full rounded-lg bg-aurora-500 px-5 py-3 font-display font-semibold text-ink-900 transition hover:bg-aurora-400 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Submit paper"}
          </button>
        </aside>
      </div>
    </div>
  );
}
