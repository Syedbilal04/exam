"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { startMockAction, type StartMockState } from "@/app/actions/attempt";

export type WizardExam = {
  id: string;
  name: string;
  authority: string;
  durationMinutes: number;
  marking: { correct: number; wrong: number };
  streams: {
    id: string;
    name: string;
    quotas: { subjectId: string; subjectName: string; count: number }[];
  }[];
};

export type WizardChapter = {
  id: string;
  name: string;
  subjectId: string;
  year: 1 | 2;
  questionCount: number;
};

type Props = {
  exams: WizardExam[];
  chapters: WizardChapter[];
};

export function SetupWizard({ exams, chapters }: Props) {
  const [state, formAction] = useActionState<StartMockState, FormData>(
    startMockAction,
    {},
  );
  const [examId, setExamId] = useState(exams[0]?.id ?? "");
  const [streamId, setStreamId] = useState(exams[0]?.streams[0]?.id ?? "");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const exam = exams.find((e) => e.id === examId) ?? exams[0];
  const stream =
    exam?.streams.find((s) => s.id === streamId) ?? exam?.streams[0];

  const chaptersBySubject = useMemo(() => {
    const map = new Map<string, WizardChapter[]>();
    for (const chapter of chapters) {
      const list = map.get(chapter.subjectId);
      if (list) list.push(chapter);
      else map.set(chapter.subjectId, [chapter]);
    }
    return map;
  }, [chapters]);

  function chooseExam(nextExamId: string) {
    setExamId(nextExamId);
    const nextExam = exams.find((e) => e.id === nextExamId);
    setStreamId(nextExam?.streams[0]?.id ?? "");
    setSelected(new Set());
  }

  function chooseStream(nextStreamId: string) {
    setStreamId(nextStreamId);
    setSelected(new Set());
  }

  function toggleChapter(chapterId: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  }

  const subjectsNeeded = stream?.quotas ?? [];
  const missingSubjects = subjectsNeeded.filter(
    (quota) =>
      !(chaptersBySubject.get(quota.subjectId) ?? []).some((chapter) =>
        selected.has(chapter.id),
      ),
  );
  const ready = missingSubjects.length === 0;

  return (
    <form action={formAction} className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
      <input type="hidden" name="examId" value={examId} />
      <input type="hidden" name="streamId" value={streamId} />
      {[...selected].map((chapterId) => (
        <input key={chapterId} type="hidden" name="chapterIds" value={chapterId} />
      ))}

      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-800">
        Build today&rsquo;s paper
      </h1>
      <p className="mt-3 max-w-xl text-mist-600">
        The exam decides the pattern. The chapters decide what you are tested
        on.
      </p>

      <section className="mt-12">
        <StepLabel index="01" title="Exam" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {exams.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => chooseExam(option.id)}
              aria-pressed={option.id === examId}
              className={`rounded-xl border p-5 text-left transition ${
                option.id === examId
                  ? "border-aurora-500 bg-white shadow-lift"
                  : "border-mist-200 bg-white/60 hover:border-mist-400"
              }`}
            >
              <span className="font-display text-lg font-semibold text-ink-800">
                {option.name}
              </span>
              <span className="mt-1 block text-sm text-mist-600">
                {option.durationMinutes} min ·{" "}
                {option.marking.wrong === 0
                  ? "no negative marking"
                  : `${option.marking.wrong} for wrong`}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <StepLabel index="02" title="Stream" />
        <div className="mt-4 flex flex-wrap gap-3">
          {exam?.streams.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => chooseStream(option.id)}
              aria-pressed={option.id === streamId}
              className={`rounded-lg border px-5 py-2.5 text-sm font-medium transition ${
                option.id === streamId
                  ? "border-aurora-500 bg-aurora-500/10 text-ink-800"
                  : "border-mist-200 bg-white/60 text-mist-600 hover:border-mist-400"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <StepLabel index="03" title="Chapters" />
        <p className="mt-2 text-sm text-mist-600">
          At least one chapter from each subject below.
        </p>

        <div className="mt-6 space-y-6">
          {subjectsNeeded.map((quota) => {
            const subjectChapters = chaptersBySubject.get(quota.subjectId) ?? [];
            const chosen = subjectChapters.filter((c) => selected.has(c.id));

            return (
              <details
                key={quota.subjectId}
                open={chosen.length === 0}
                className="glass rounded-2xl px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-display text-lg font-semibold text-ink-800">
                    {quota.subjectName}
                  </span>
                  <span className="text-sm text-mist-600">
                    {chosen.length > 0
                      ? `${chosen.length} selected`
                      : "none selected"}{" "}
                    · {quota.count} questions in paper
                  </span>
                </summary>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {subjectChapters.map((chapter) => (
                    <label
                      key={chapter.id}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition ${
                        selected.has(chapter.id)
                          ? "border-aurora-500 bg-aurora-500/10"
                          : "border-mist-200 bg-white/70 hover:border-mist-400"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          className="accent-aurora-600 size-4"
                          checked={selected.has(chapter.id)}
                          onChange={() => toggleChapter(chapter.id)}
                        />
                        <span className="text-ink-800">{chapter.name}</span>
                      </span>
                      <span className="shrink-0 text-xs text-mist-400">
                        Year {chapter.year} · {chapter.questionCount} Q
                      </span>
                    </label>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {state.error && (
        <p className="mt-8 rounded-lg border border-ember-500/40 bg-ember-400/10 px-4 py-3 text-sm text-ink-800">
          {state.error}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-mist-200 pt-8">
        <StartButton disabled={!ready} />
        <p className="text-sm text-mist-600">
          {ready
            ? `${stream?.quotas.reduce((sum, q) => sum + q.count, 0)} questions · ${exam?.durationMinutes} minutes`
            : `Still needed: ${missingSubjects.map((q) => q.subjectName).join(", ")}`}
        </p>
      </div>
    </form>
  );
}

function StepLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-display text-xs tracking-[0.3em] text-aurora-600">
        {index}
      </span>
      <h2 className="font-display text-xl font-semibold text-ink-800">
        {title}
      </h2>
    </div>
  );
}

function StartButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="bg-aurora-500 hover:bg-aurora-400 rounded-lg px-7 py-3.5 font-display font-semibold text-ink-900 transition disabled:cursor-not-allowed disabled:bg-mist-200 disabled:text-mist-400"
    >
      {pending ? "Building paper…" : "Start paper"}
    </button>
  );
}
