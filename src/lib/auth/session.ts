import "server-only";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Owner } from "@/lib/types";
import { findLocalUser, readSessionToken } from "./local-auth";

export const GUEST_COOKIE = "astra_guest";
export const SESSION_COOKIE = "astra_session";

export type SessionUser = { id: string; email: string };

export async function getSessionUser(): Promise<SessionUser | null> {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    return data.user
      ? { id: data.user.id, email: data.user.email ?? "" }
      : null;
  }

  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const userId = await readSessionToken(token);
  return userId ? findLocalUser(userId) : null;
}

export async function getGuestId(): Promise<string> {
  // Middleware issues this cookie; the fallback keeps request handling safe if
  // a route ever runs before the cookie is set.
  return (await cookies()).get(GUEST_COOKIE)?.value ?? randomUUID();
}

/** Who the current request acts as: a signed-in student or a guest session. */
export async function getOwner(): Promise<Owner> {
  const user = await getSessionUser();
  if (user) return { kind: "user", id: user.id, email: user.email };
  return { kind: "guest", id: await getGuestId() };
}
