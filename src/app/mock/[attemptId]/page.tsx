import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { MockCockpit } from "@/components/mock/mock-cockpit";
import { loadAttempt } from "@/lib/attempts/service";
import { getOwner } from "@/lib/auth/session";

export const metadata = { title: "Mock in progress" };

export default async function MockPage({ params }: PageProps<"/mock/[attemptId]">) {
  const { attemptId } = await params;
  const owner = await getOwner();
  const loaded = await loadAttempt(attemptId, owner);

  if (!loaded) notFound();
  if (loaded.attempt.status === "submitted") redirect(`/result/${attemptId}`);

  return (
    <AppShell bare>
      <MockCockpit
        attemptId={loaded.attempt.id}
        examName={loaded.exam.name}
        questions={loaded.questions}
        initialAnswers={loaded.attempt.answers}
        remainingSeconds={loaded.remainingSeconds}
      />
    </AppShell>
  );
}
