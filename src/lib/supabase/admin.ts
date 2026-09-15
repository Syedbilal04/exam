import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireServiceRoleKey, supabaseUrl } from "./env";

let client: SupabaseClient | null = null;

/**
 * Service-role client for server-only work such as guest attempts, which have
 * no Supabase session to authorise them under RLS.
 */
export function supabaseAdmin(): SupabaseClient {
  if (!client) {
    client = createClient(supabaseUrl, requireServiceRoleKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
