import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getExam } from "@/content/catalog";
import { getOwner, getSessionUser } from "@/lib/auth/session";
import { getStore } from "@/lib/db";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "History" };

export default async function HistoryPage() {
  const [owner, user] = await Promise.all([getOwner(), getSessionUser()]);
  const attempts = await getStore().listAttempts(owner);

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-800">
          Your papers
        </h1>
        <p className="mt-3 text-mist-600">
          {user
            ? `Signed in as ${user.email}.`
            : "You are taking papers as a guest on this device."}
        </p>

        {!user && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-aurora-500/40 bg-aurora-500/10 px-5 py-4">
            <p className="text-sm text-ink-800">
              Sign in and these attempts move to your account, on any device.
            </p>
            <Link
              href="/login"
              className="rounded-lg bg-ink-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-700"
            >
              Sign in
            </Link>
          </div>
        )}

        {attempts.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-mist-200 px-6 py-14 text-center">
            <p className="text-mist-600">No papers yet.</p>
            <Link
              href="/setup"
              className="mt-5 inline-block rounded-lg bg-aurora-500 px-6 py-3 font-display font-semibold text-ink-900 transition hover:bg-aurora-400"
            >
              Start your first mock
            </Link>
          </div>
        ) : (
          <ul className="mt-10 space-y-3">
            {attempts.map((attempt) => {
              const exam = getExam(attempt.examId);
              const inProgress = attempt.status !== "submitted";

              return (
                <li key={attempt.id}>
                  <Link
                    href={
                      inProgress
                        ? `/mock/${attempt.id}`
                        : `/result/${attempt.id}`
                    }
                    className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4 transition hover:border-aurora-500"
                  >
                    <div>
                      <p className="font-display font-semibold text-ink-800">
                        {exam?.name ?? attempt.examId} ·{" "}
                        {attempt.streamId.toUpperCase()}
                      </p>
                      <p className="mt-1 text-sm text-mist-600">
                        {formatDateTime(attempt.createdAt)} ·{" "}
                        {attempt.chapterIds.length} chapters ·{" "}
                        {attempt.questionIds.length} questions
                      </p>
                    </div>

                    <span className="font-display tabular-nums text-ink-800">
                      {inProgress
                        ? "Resume"
                        : `${attempt.score?.marks ?? 0}/${attempt.score?.maxMarks ?? 0}${
                            attempt.score && attempt.score.maxMarks > 0
                              ? ` · ${Math.round((attempt.score.marks / attempt.score.maxMarks) * 100)}%`
                              : ""
                          }`}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
