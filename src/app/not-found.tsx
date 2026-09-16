import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function NotFound() {
  return (
    <AppShell>
      <div className="mx-auto max-w-xl px-6 py-28 text-center sm:px-10">
        <p className="font-display text-xs tracking-[0.3em] text-aurora-600">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink-800">
          This page is not here.
        </h1>
        <p className="mt-4 text-mist-600">
          The paper you were looking for may have been submitted already, or the
          link belongs to a different device.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/setup"
            className="rounded-lg bg-aurora-500 px-6 py-3 font-display font-semibold text-ink-900 transition hover:bg-aurora-400"
          >
            Start a mock
          </Link>
          <Link
            href="/history"
            className="rounded-lg border border-mist-200 px-6 py-3 text-mist-600 transition hover:border-mist-400 hover:text-ink-800"
          >
            See your papers
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
