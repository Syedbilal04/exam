"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getStore } from "@/lib/db";
import {
  createSessionToken,
  localSignIn,
  localSignUp,
} from "@/lib/auth/local-auth";
import { GUEST_COOKIE, SESSION_COOKIE } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthState = { error?: string };

const credentials = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const ONE_YEAR = 60 * 60 * 24 * 365;

async function setLocalSession(userId: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR,
  });
}

/** Attaches everything done as a guest to the account that just signed in. */
async function claimGuestHistory(userId: string) {
  const guestId = (await cookies()).get(GUEST_COOKIE)?.value;
  if (!guestId) return;
  await getStore().claimGuestAttempts(guestId, userId);
}

export async function signUpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = credentials.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details." };
  }
  const { email, password } = parsed.data;

  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    if (!data.session) {
      return { error: "Check your inbox to confirm the email, then sign in." };
    }
    if (data.user) await claimGuestHistory(data.user.id);
  } else {
    const result = await localSignUp(email, password);
    if (!result.ok) return { error: result.error };
    await setLocalSession(result.user.id);
    await claimGuestHistory(result.user.id);
  }

  revalidatePath("/", "layout");
  redirect("/history");
}

export async function signInAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = credentials.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details." };
  }
  const { email, password } = parsed.data;

  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: error.message };
    if (data.user) await claimGuestHistory(data.user.id);
  } else {
    const result = await localSignIn(email, password);
    if (!result.ok) return { error: result.error };
    await setLocalSession(result.user.id);
    await claimGuestHistory(result.user.id);
  }

  revalidatePath("/", "layout");
  redirect("/history");
}

export async function signOutAction(): Promise<void> {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } else {
    (await cookies()).delete(SESSION_COOKIE);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
