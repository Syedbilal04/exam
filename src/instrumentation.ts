/** Runs once when the server boots, before it accepts any request. */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { assertDeploymentConfig } = await import("@/lib/supabase/env");
  assertDeploymentConfig();
}
