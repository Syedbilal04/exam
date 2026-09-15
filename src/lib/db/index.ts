import "server-only";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { localStore } from "./local-store";
import { supabaseStore } from "./supabase-store";
import type { Store } from "./types";

export function getStore(): Store {
  return isSupabaseConfigured ? supabaseStore : localStore;
}

export type { Store, NewAttempt } from "./types";
