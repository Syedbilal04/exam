import { AppShell } from "@/components/app-shell";
import {
  SetupWizard,
  type WizardChapter,
  type WizardExam,
} from "@/components/setup/setup-wizard";
import { chapters, exams, quotasFor, streamsForExam } from "@/content/catalog";
import { getStore } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Build a mock" };

export default async function SetupPage() {
  const counts = await getStore().chapterQuestionCounts();

  const wizardExams: WizardExam[] = exams.map((exam) => ({
    id: exam.id,
    name: exam.name,
    authority: exam.authority,
    durationMinutes: exam.durationMinutes,
    marking: { correct: exam.marking.correct, wrong: exam.marking.wrong },
    streams: streamsForExam(exam).map((stream) => ({
      id: stream.id,
      name: stream.name,
      quotas: quotasFor(exam, stream.id).map((quota) => ({
        subjectId: quota.subjectId,
        subjectName: quota.subject.name,
        count: quota.count,
      })),
    })),
  }));

  const wizardChapters: WizardChapter[] = chapters.map((chapter) => ({
    id: chapter.id,
    name: chapter.name,
    subjectId: chapter.subjectId,
    year: chapter.year,
    questionCount: counts[chapter.id] ?? 0,
  }));

  return (
    <AppShell>
      <SetupWizard exams={wizardExams} chapters={wizardChapters} />
    </AppShell>
  );
}
