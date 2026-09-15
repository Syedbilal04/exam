export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * The app runs on Supabase when all three keys are present. Without them it
 * falls back to the local file store so development needs no cloud setup.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseServiceRoleKey,
);

export function requireServiceRoleKey(): string {
  if (!supabaseServiceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return supabaseServiceRoleKey;
}
