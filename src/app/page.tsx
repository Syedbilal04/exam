import Link from "next/link";
import { HeroCanvas } from "@/components/landing/hero-canvas";
import { brand } from "@/content/brand";
import { exams } from "@/content/catalog";
import { getSessionUser } from "@/lib/auth/session";

export default async function LandingPage() {
  const user = await getSessionUser();

  return (
    <main className="flex-1">
      <section className="surface-night relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white">
        <HeroCanvas />

        <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
          <span className="font-display text-sm tracking-[0.42em] text-aurora-400">
            {brand.wordmark}
          </span>
          <nav className="flex items-center gap-6 text-sm text-white/70">
            <Link className="transition hover:text-white" href="/history">
              History
            </Link>
            <Link
              className="transition hover:text-white"
              href={user ? "/setup" : "/login"}
            >
              {user ? "Start mock" : "Sign in"}
            </Link>
          </nav>
        </header>

        <div className="relative z-10 flex flex-1 items-center px-6 pb-24 sm:px-10">
          <div className="max-w-3xl">
            <h1 className="rise font-display text-[clamp(4.5rem,17vw,13rem)] leading-[0.82] font-bold tracking-[-0.04em]">
              {brand.wordmark}
            </h1>
            <p
              className="rise mt-8 max-w-xl font-display text-2xl leading-snug text-white/90 sm:text-3xl"
              style={{ animationDelay: "120ms" }}
            >
              Full-pattern mocks for EAMCET, JEE and NEET, built from your own
              Intermediate chapters.
            </p>
            <p
              className="rise mt-4 max-w-lg text-white/60"
              style={{ animationDelay: "220ms" }}
            >
              Choose the exam, choose the chapters you are revising, and sit a
              paper that follows the real question count, clock and marking.
            </p>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "320ms" }}
            >
              <Link
                href="/setup"
                className="bg-aurora-500 shadow-glow hover:bg-aurora-400 rounded-lg px-7 py-3.5 font-display text-base font-semibold text-ink-900 transition"
              >
                Start a mock
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-white/25 px-7 py-3.5 text-base text-white/80 transition hover:border-white/60 hover:text-white"
              >
                Save my history
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-day hairline-grid px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink-800 sm:text-5xl">
            Three choices, then the paper starts.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mist-600">
            Nothing else stands between a student and a timed paper.
          </p>

          <ol className="mt-14 grid gap-10 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Pick the exam",
                body: "TS EAMCET, JEE Main or NEET. The pattern, clock and marking come from that exam.",
              },
              {
                step: "02",
                title: "Pick the chapters",
                body: "TSBIE Intermediate chapter names, at least one from each subject the exam needs.",
              },
              {
                step: "03",
                title: "Sit the paper",
                body: "Questions are drawn fresh each time, so revising a chapter never means the same paper twice.",
              },
            ].map((item) => (
              <li key={item.step}>
                <span className="font-display text-sm tracking-[0.3em] text-aurora-600">
                  {item.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-mist-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink-800 sm:text-5xl">
            Every question carries its paper history.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mist-600">
            Under each question you can see how many times the question has
            appeared in previous papers and in which years, so revision time
            goes where the marks are.
          </p>

          <dl className="mt-14 grid gap-8 border-t border-mist-200 pt-10 sm:grid-cols-3">
            {exams.map((exam) => (
              <div key={exam.id}>
                <dt className="font-display text-lg font-semibold text-ink-800">
                  {exam.name}
                </dt>
                <dd className="mt-1 text-mist-600">
                  {exam.durationMinutes} minutes · {exam.marking.correct} mark
                  {exam.marking.correct === 1 ? "" : "s"} per correct answer
                  {exam.marking.wrong !== 0
                    ? ` · ${exam.marking.wrong} for a wrong one`
                    : " · no negative marking"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="surface-night px-6 py-20 text-white sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-8">
          <div>
            <p className="font-display text-3xl font-semibold">
              Ready when you are.
            </p>
            <p className="mt-2 text-white/60">{brand.tagline}</p>
          </div>
          <Link
            href="/setup"
            className="bg-aurora-500 hover:bg-aurora-400 rounded-lg px-7 py-3.5 font-display font-semibold text-ink-900 transition"
          >
            Start a mock
          </Link>
        </div>
      </footer>
    </main>
  );
}
