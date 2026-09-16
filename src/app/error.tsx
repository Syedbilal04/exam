"use client";

import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="surface-day flex min-h-full flex-1 items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs tracking-[0.3em] text-ember-500">
          SOMETHING BROKE
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink-800">
          That did not load.
        </h1>
        <p className="mt-4 text-mist-600">
          Your answers are saved as you go, so an attempt in progress can be
          reopened from your history.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-aurora-500 px-6 py-3 font-display font-semibold text-ink-900 transition hover:bg-aurora-400"
          >
            Try again
          </button>
          <Link
            href="/history"
            className="rounded-lg border border-mist-200 px-6 py-3 text-mist-600 transition hover:border-mist-400 hover:text-ink-800"
          >
            Go to history
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-mist-400">Reference: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
