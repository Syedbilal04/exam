import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { MathText } from "@/components/math-text";
import { QuestionFigures } from "@/components/question-figures";
import { loadReview } from "@/lib/attempts/service";
import { getOwner, getSessionUser } from "@/lib/auth/session";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Result" };

export default async function ResultPage({
  params,
}: PageProps<"/result/[attemptId]">) {
  const { attemptId } = await params;
  const owner = await getOwner();
  const [loaded, user] = await Promise.all([
    loadReview(attemptId, owner),
    getSessionUser(),
  ]);

  if (!loaded) notFound();
  if (loaded.attempt.status !== "submitted") redirect(`/mock/${attemptId}`);

  const { attempt, exam, questions } = loaded;
  const score = attempt.score;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
        <p className="font-display text-xs tracking-[0.3em] text-aurora-600">
          {exam.name.toUpperCase()} · {formatDate(attempt.createdAt)}
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-ink-800">
          {score?.marks ?? 0}
          <span className="text-mist-400"> / {score?.maxMarks ?? 0}</span>
        </h1>
        <p className="mt-3 text-mist-600">
          {score?.correct ?? 0} correct · {score?.wrong ?? 0} wrong ·{" "}
          {score?.unattempted ?? 0} left
        </p>

        {!user && (
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
            {score?.bySubject.map((subject) => (
              <div
                key={subject.subjectId}
                className="glass rounded-2xl px-5 py-4"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-semibold text-ink-800">
                    {subject.subjectName}
                  </span>
                  <span className="font-display tabular-nums text-ink-800">
                    {subject.marks}/{subject.maxMarks}
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist-200">
                  <div
                    className="h-full rounded-full bg-aurora-500"
                    style={{
                      width: `${subject.maxMarks > 0 ? Math.max(0, (subject.marks / subject.maxMarks) * 100) : 0}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-mist-600">
                  {subject.correct} correct · {subject.wrong} wrong ·{" "}
                  {subject.unattempted} left
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-xl font-semibold text-ink-800">
            Review
          </h2>

          <ol className="mt-5 space-y-4">
            {questions.map((question, position) => {
              const isCorrect = question.chosenIndex === question.answerIndex;
              const skipped = question.chosenIndex === undefined;

              return (
                <li
                  key={question.id}
                  className="glass rounded-2xl px-5 py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs tracking-wide text-mist-400">
                      {position + 1} · {question.subjectName} ·{" "}
                      {question.chapterName}
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
                    {question.pyq.appearCount > 0 && (
                      <>
                        Appeared {question.pyq.appearCount} time
                        {question.pyq.appearCount === 1 ? "" : "s"}
                        {question.pyq.years.length > 0 && (
                          <> in {question.pyq.years.join(", ")}</>
                        )}{" "}
                        ·{" "}
                      </>
                    )}
                    Source: {question.sourceName}
                    {question.pyq.appearCount > 0 && !question.pyqVerified && (
                      <> · sample paper history</>
                    )}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="mt-12 border-t border-mist-200 pt-8">
          <Link
            href="/setup"
            className="rounded-lg bg-aurora-500 px-7 py-3.5 font-display font-semibold text-ink-900 transition hover:bg-aurora-400"
          >
            Take another paper
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
