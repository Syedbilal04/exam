import { NextResponse } from "next/server";
import { getOwner } from "@/lib/auth/session";
import { saveProgress } from "@/lib/attempts/service";

/** Autosave endpoint: the cockpit posts the answer sheet while the clock runs. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> },
) {
  const { attemptId } = await params;
  const body = (await request.json()) as { answers?: Record<string, number> };
  const owner = await getOwner();

  await saveProgress(attemptId, owner, body.answers ?? {});
  return NextResponse.json({ ok: true });
}
