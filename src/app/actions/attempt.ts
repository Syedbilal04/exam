"use server";

import { redirect } from "next/navigation";
import { getOwner } from "@/lib/auth/session";
import {
  AttemptError,
  startAttempt,
  submitAttempt,
} from "@/lib/attempts/service";

export type StartMockState = { error?: string };

export async function startMockAction(
  _prev: StartMockState,
  formData: FormData,
): Promise<StartMockState> {
  const examId = String(formData.get("examId") ?? "");
  const streamId = String(formData.get("streamId") ?? "");
  const chapterIds = formData.getAll("chapterIds").map(String);

  let attemptId: string;
  try {
    const owner = await getOwner();
    const attempt = await startAttempt({ examId, streamId, chapterIds, owner });
    attemptId = attempt.id;
  } catch (error) {
    if (error instanceof AttemptError) return { error: error.message };
    throw error;
  }

  redirect(`/mock/${attemptId}`);
}

export async function submitAttemptAction(
  attemptId: string,
  answers: Record<string, number>,
): Promise<void> {
  const owner = await getOwner();
  await submitAttempt(attemptId, owner, answers);
  redirect(`/result/${attemptId}`);
}
