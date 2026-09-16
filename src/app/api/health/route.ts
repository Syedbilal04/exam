import { NextResponse } from "next/server";
import { questionBank } from "@/content/questions";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

/** Health check for the host's monitor, and a quick look at what is deployed. */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    store: isSupabaseConfigured ? "supabase" : "local-file",
    bundledQuestions: questionBank.length,
  });
}
