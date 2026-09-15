import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const GUEST_COOKIE = "astra_guest";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (!request.cookies.get(GUEST_COOKIE)) {
    // Every visitor gets a stable id so anti-repeat works before signing up.
    response.cookies.set(GUEST_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ONE_YEAR,
    });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && anonKey) {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    });
    // Refreshes an expiring session cookie before server components read it.
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
