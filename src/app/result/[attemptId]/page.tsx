import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ResultView } from "@/components/result/result-view";
import { loadReview } from "@/lib/attempts/service";
import { getOwner, getSessionUser } from "@/lib/auth/session";
import { formatDate, formatDuration } from "@/lib/format";

export const metadata = { title: "Result" };

export default async function ResultPage({
  params,
}: PageProps<"/result/[attemptId]">) {
  const { attemptId } = await params;
  const owner = await getOwner();
  const [loaded, user] = await Promise.all([
    loadReview(attemptId, owner),
    getSessionUser(),
  ]);

  if (!loaded) notFound();
  if (loaded.attempt.status !== "submitted") redirect(`/mock/${attemptId}`);

  const { attempt, exam, questions } = loaded;
  const score = attempt.score;
  if (!score) notFound();

  return (
    <AppShell>
      <ResultView
        examName={exam.name}
        dateLabel={formatDate(attempt.createdAt)}
        durationLabel={
          attempt.submittedAt
            ? formatDuration(attempt.createdAt, attempt.submittedAt)
            : undefined
        }
        score={score}
        signedIn={Boolean(user)}
        questions={questions.map((question) => ({
          id: question.id,
          subjectName: question.subjectName,
          chapterName: question.chapterName,
          stem: question.stem,
          options: question.options,
          images: question.images,
          answerIndex: question.answerIndex,
          explanation: question.explanation,
          sourceName: question.sourceName,
          pyqVerified: question.pyqVerified,
          appearCount: question.pyq.appearCount,
          years: question.pyq.years,
          chosenIndex: question.chosenIndex,
        }))}
      />
    </AppShell>
  );
}
