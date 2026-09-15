import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Attempt, AttemptScore, Owner, Question } from "@/lib/types";
import type { NewAttempt, Store } from "./types";

type AttemptRow = {
  id: string;
  exam_id: string;
  stream_id: string;
  chapter_ids: string[];
  question_ids: string[];
  duration_minutes: number;
  status: string;
  created_at: string;
  submitted_at: string | null;
  user_id: string | null;
  guest_session_id: string | null;
  answers: Record<string, number> | null;
  score: AttemptScore | null;
};

type QuestionRow = {
  id: string;
  chapter_id: string;
  subject_id: string;
  stem: string;
  options: string[];
  answer_index: number;
  explanation: string | null;
  pyq: Question["pyq"];
  source: Question["source"];
};

function toAttempt(row: AttemptRow): Attempt {
  return {
    id: row.id,
    examId: row.exam_id as Attempt["examId"],
    streamId: row.stream_id as Attempt["streamId"],
    chapterIds: row.chapter_ids,
    questionIds: row.question_ids,
    durationMinutes: row.duration_minutes,
    status: row.status as Attempt["status"],
    createdAt: row.created_at,
    submittedAt: row.submitted_at ?? undefined,
    userId: row.user_id ?? undefined,
    guestSessionId: row.guest_session_id ?? undefined,
    answers: row.answers ?? {},
    score: row.score ?? undefined,
  };
}

function toQuestion(row: QuestionRow): Question {
  return {
    id: row.id,
    chapterId: row.chapter_id,
    subjectId: row.subject_id as Question["subjectId"],
    stem: row.stem,
    options: row.options,
    answerIndex: row.answer_index,
    explanation: row.explanation ?? undefined,
    pyq: row.pyq,
    source: row.source,
  };
}

function unwrap(result: {
  data: unknown;
  error: { message: string } | null;
}): unknown {
  if (result.error) throw new Error(result.error.message);
  if (result.data === null) throw new Error("Supabase returned no data");
  return result.data;
}

export const supabaseStore: Store = {
  async poolForChapters(chapterIds) {
    const rows = unwrap(
      await supabaseAdmin()
        .from("questions")
        .select("id, subject_id")
        .in("chapter_id", chapterIds),
    );
    return (rows as { id: string; subject_id: string }[]).map((row) => ({
      id: row.id,
      subjectId: row.subject_id as Question["subjectId"],
    }));
  },

  async questionsByIds(ids) {
    if (ids.length === 0) return [];
    const rows = unwrap(
      await supabaseAdmin().from("questions").select("*").in("id", ids),
    );
    const byId = new Map(
      (rows as QuestionRow[]).map((row) => [row.id, toQuestion(row)]),
    );
    // Preserve the frozen order stored on the attempt.
    return ids
      .map((id) => byId.get(id))
      .filter((q): q is Question => Boolean(q));
  },

  async chapterQuestionCounts() {
    const rows = unwrap(
      await supabaseAdmin().from("chapter_question_counts").select("*"),
    );
    const counts: Record<string, number> = {};
    for (const row of rows as { chapter_id: string; question_count: number }[]) {
      counts[row.chapter_id] = Number(row.question_count);
    }
    return counts;
  },

  async seenQuestionIds(owner) {
    const rows = unwrap(
      await supabaseAdmin()
        .from("seen_questions")
        .select("question_id")
        .eq("owner_kind", owner.kind)
        .eq("owner_id", owner.id),
    );
    return new Set((rows as { question_id: string }[]).map((r) => r.question_id));
  },

  async markSeen(owner: Owner, questionIds) {
    if (questionIds.length === 0) return;
    const now = new Date().toISOString();
    const { error } = await supabaseAdmin()
      .from("seen_questions")
      .upsert(
        questionIds.map((questionId) => ({
          owner_kind: owner.kind,
          owner_id: owner.id,
          question_id: questionId,
          last_seen_at: now,
        })),
        { onConflict: "owner_kind,owner_id,question_id" },
      );
    if (error) throw new Error(error.message);
  },

  async createAttempt(input: NewAttempt) {
    const row = unwrap(
      await supabaseAdmin()
        .from("attempts")
        .insert({
          exam_id: input.examId,
          stream_id: input.streamId,
          chapter_ids: input.chapterIds,
          question_ids: input.questionIds,
          duration_minutes: input.durationMinutes,
          status: "in_progress",
          answers: {},
          user_id: input.owner.kind === "user" ? input.owner.id : null,
          guest_session_id: input.owner.kind === "guest" ? input.owner.id : null,
        })
        .select("*")
        .single(),
    );
    return toAttempt(row as AttemptRow);
  },

  async getAttempt(id) {
    const { data, error } = await supabaseAdmin()
      .from("attempts")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? toAttempt(data as AttemptRow) : null;
  },

  async saveAnswers(id, answers) {
    const { error } = await supabaseAdmin()
      .from("attempts")
      .update({ answers })
      .eq("id", id)
      .eq("status", "in_progress");
    if (error) throw new Error(error.message);
  },

  async submitAttempt(id, answers, score) {
    const row = unwrap(
      await supabaseAdmin()
        .from("attempts")
        .update({
          answers,
          score,
          status: "submitted",
          submitted_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select("*")
        .single(),
    );
    return toAttempt(row as AttemptRow);
  },

  async listAttempts(owner) {
    const query = supabaseAdmin()
      .from("attempts")
      .select("*")
      .order("created_at", { ascending: false });

    const rows = unwrap(
      await (owner.kind === "user"
        ? query.eq("user_id", owner.id)
        : query.eq("guest_session_id", owner.id).is("user_id", null)),
    );
    return (rows as AttemptRow[]).map(toAttempt);
  },

  async claimGuestAttempts(guestSessionId, userId) {
    const rows = unwrap(
      await supabaseAdmin()
        .from("attempts")
        .update({ user_id: userId })
        .eq("guest_session_id", guestSessionId)
        .is("user_id", null)
        .select("id"),
    );

    const seen = unwrap(
      await supabaseAdmin()
        .from("seen_questions")
        .select("question_id")
        .eq("owner_kind", "guest")
        .eq("owner_id", guestSessionId),
    );

    const questionIds = (seen as { question_id: string }[]).map(
      (r) => r.question_id,
    );
    if (questionIds.length > 0) {
      await supabaseStore.markSeen({ kind: "user", id: userId, email: "" }, questionIds);
    }

    return (rows as { id: string }[]).length;
  },
};
