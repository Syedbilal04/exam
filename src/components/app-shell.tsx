import Link from "next/link";
import { brand } from "@/content/brand";
import { signOutAction } from "@/app/actions/auth";
import { getSessionUser } from "@/lib/auth/session";

export async function AppShell({
  children,
  bare = false,
}: {
  children: React.ReactNode;
  /** Cockpit mode: no navigation, so nothing competes with the paper. */
  bare?: boolean;
}) {
  const user = bare ? null : await getSessionUser();

  return (
    <div className="surface-day flex min-h-full flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-mist-200/80 px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="font-display text-sm tracking-[0.42em] text-ink-800"
        >
          {brand.wordmark}
        </Link>

        {!bare && (
          <nav className="flex items-center gap-6 text-sm text-mist-600">
            <Link className="transition hover:text-ink-800" href="/setup">
              New mock
            </Link>
            <Link className="transition hover:text-ink-800" href="/history">
              History
            </Link>
            {user ? (
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="transition hover:text-ink-800"
                  title={user.email}
                >
                  Sign out
                </button>
              </form>
            ) : (
              <Link className="transition hover:text-ink-800" href="/login">
                Sign in
              </Link>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
