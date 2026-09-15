"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { signInAction, signUpAction, type AuthState } from "@/app/actions/auth";

type Mode = "sign-in" | "sign-up";

export function AuthForm() {
  const [mode, setMode] = useState<Mode>("sign-in");
  const [signInState, signIn] = useActionState<AuthState, FormData>(
    signInAction,
    {},
  );
  const [signUpState, signUp] = useActionState<AuthState, FormData>(
    signUpAction,
    {},
  );

  const isSignIn = mode === "sign-in";
  const state = isSignIn ? signInState : signUpState;

  return (
    <div className="glass mx-auto mt-16 w-full max-w-md rounded-3xl px-7 py-8">
      <div className="flex gap-1 rounded-xl bg-mist-100 p-1">
        {(
          [
            ["sign-in", "Sign in"],
            ["sign-up", "Create account"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === value
                ? "bg-white text-ink-800 shadow-lift"
                : "text-mist-600 hover:text-ink-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form action={isSignIn ? signIn : signUp} className="mt-7 space-y-4">
        <label className="block">
          <span className="text-sm text-mist-600">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-ink-800 outline-none transition focus:border-aurora-500"
          />
        </label>

        <label className="block">
          <span className="text-sm text-mist-600">Password</span>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete={isSignIn ? "current-password" : "new-password"}
            className="mt-1.5 w-full rounded-lg border border-mist-200 bg-white px-4 py-3 text-ink-800 outline-none transition focus:border-aurora-500"
          />
        </label>

        {state.error && (
          <p className="rounded-lg border border-ember-500/40 bg-ember-400/10 px-4 py-3 text-sm text-ink-800">
            {state.error}
          </p>
        )}

        <SubmitButton label={isSignIn ? "Sign in" : "Create account"} />
      </form>

      <p className="mt-5 text-sm text-mist-600">
        Papers you have already taken on this device move to your account when
        you sign in.
      </p>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-aurora-500 px-5 py-3 font-display font-semibold text-ink-900 transition hover:bg-aurora-400 disabled:opacity-60"
    >
      {pending ? "Please wait…" : label}
    </button>
  );
}
