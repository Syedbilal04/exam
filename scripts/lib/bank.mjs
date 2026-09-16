import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

export const repoRoot = path.resolve(import.meta.dirname, "..", "..");
export const seedDir = path.join(repoRoot, "content", "seed");
export const generatedDir = path.join(repoRoot, "content", "generated");
export const importedDir = path.join(repoRoot, "content", "imported");
export const bankFile = path.join(
  repoRoot,
  "src",
  "content",
  "question-bank.json",
);

const SUBJECT_IDS = ["physics", "chemistry", "maths", "botany", "zoology"];

/**
 * Turns one authored file into fully formed question records. Authored files
 * carry a shared `subjectId` and `source`, so individual questions stay short.
 */
function normalizeFile(file, raw) {
  const { source, questions } = raw;
  // Imported files span several subjects, so each question may carry its own.
  const fileSubjectId = raw.subjectId;
  if (fileSubjectId && !SUBJECT_IDS.includes(fileSubjectId)) {
    throw new Error(`${file}: unknown subjectId "${fileSubjectId}"`);
  }
  if (!source?.name || !source?.license) {
    throw new Error(`${file}: source needs a name and a license`);
  }

  return questions.map((question, index) => {
    const where = `${file}#${question.id ?? index}`;
    const subjectId = question.subjectId ?? fileSubjectId;
    if (!SUBJECT_IDS.includes(subjectId)) {
      throw new Error(`${where}: unknown subjectId "${subjectId}"`);
    }
    if (!question.id) throw new Error(`${where}: missing id`);
    if (!question.chapterId?.startsWith(`${subjectId}-`)) {
      throw new Error(`${where}: chapterId must start with "${subjectId}-"`);
    }
    if (!Array.isArray(question.options) || question.options.length < 2) {
      throw new Error(`${where}: needs at least two options`);
    }
    if (
      typeof question.answerIndex !== "number" ||
      question.answerIndex < 0 ||
      question.answerIndex >= question.options.length
    ) {
      throw new Error(`${where}: answerIndex out of range`);
    }

    const pyq = question.pyq ?? {};
    return {
      id: question.id,
      chapterId: question.chapterId,
      subjectId,
      stem: question.stem,
      options: question.options,
      answerIndex: question.answerIndex,
      explanation: question.explanation ?? "",
      images: (question.images ?? []).map((image) => {
        if (!image.url || !image.width || !image.height) {
          throw new Error(`${where}: image needs url, width and height`);
        }
        return {
          url: image.url,
          alt: image.alt ?? "Question diagram",
          width: image.width,
          height: image.height,
        };
      }),
      pyq: {
        appearCount: pyq.appearCount ?? 0,
        years: [...(pyq.years ?? [])].sort((a, b) => a - b),
        exams: pyq.exams ?? [],
        verified: pyq.verified ?? false,
      },
      source: question.source ?? source,
    };
  });
}

async function readJsonDir(dir) {
  if (!existsSync(dir)) return [];
  const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
  const out = [];
  for (const file of files.sort()) {
    const raw = JSON.parse(await readFile(path.join(dir, file), "utf8"));
    out.push(...normalizeFile(path.join(path.basename(dir), file), raw));
  }
  return out;
}

/**
 * Merges authored seed questions, generated items, and imported sources.
 * Later sources win on id conflicts, so a verified import still overrides a
 * generated item with the same id.
 */
export async function buildBank() {
  const seeded = await readJsonDir(seedDir);
  const generated = await readJsonDir(generatedDir);
  const imported = await readJsonDir(importedDir);

  const byId = new Map();
  for (const question of [...seeded, ...generated, ...imported]) {
    byId.set(question.id, question);
  }

  const questions = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  await mkdir(path.dirname(bankFile), { recursive: true });
  await writeFile(bankFile, `${JSON.stringify(questions, null, 2)}\n`, "utf8");

  return {
    total: questions.length,
    seeded: seeded.length,
    generated: generated.length,
    imported: imported.length,
    chapters: new Set(questions.map((q) => q.chapterId)).size,
  };
}
