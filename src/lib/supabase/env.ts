function cleanEnv(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  // Render UI placeholders and empty strings must not count as configured.
  if (!trimmed || trimmed.toLowerCase() === "value") return "";
  return trimmed;
}

export const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
export const supabaseAnonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const supabaseServiceRoleKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const keys = {
  NEXT_PUBLIC_SUPABASE_URL: isHttpUrl(supabaseUrl) ? supabaseUrl : "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey,
  SUPABASE_SERVICE_ROLE_KEY: supabaseServiceRoleKey,
};

const present = Object.entries(keys).filter(([, value]) => value !== "");
const missing = Object.entries(keys).filter(([, value]) => value === "");

/**
 * The app runs on Supabase when all three keys are present. Without them it
 * falls back to the local file store so development needs no cloud setup.
 */
export const isSupabaseConfigured = missing.length === 0;

export function requireServiceRoleKey(): string {
  if (!supabaseServiceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return supabaseServiceRoleKey;
}

/**
 * Called once at server startup. A half-configured deployment and a production
 * deployment on the local file store both lose student history, so both stop
 * the boot instead of failing quietly hours later.
 */
export function assertDeploymentConfig(): void {
  if (present.length > 0 && missing.length > 0) {
    throw new Error(
      "Supabase is half configured. Set all of " +
        `${Object.keys(keys).join(", ")}, or none of them to run on the local store. ` +
        `Missing: ${missing.map(([name]) => name).join(", ")}.`,
    );
  }

  if (process.env.NODE_ENV !== "production" || isSupabaseConfigured) return;

  if (process.env.ALLOW_LOCAL_STORE_IN_PRODUCTION !== "true") {
    throw new Error(
      "Refusing to start in production without Supabase. The local store writes " +
        "to ./.data, which most hosts wipe on every deploy or restart, so every " +
        "account and attempt would be lost. Set the three Supabase keys, or set " +
        "ALLOW_LOCAL_STORE_IN_PRODUCTION=true if losing that data is acceptable.",
    );
  }

  if (!process.env.AUTH_SECRET) {
    throw new Error(
      "AUTH_SECRET is required when running the local store in production; " +
        "without it session cookies stop validating after a restart.",
    );
  }
}
