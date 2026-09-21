import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { repoRoot, seedDir } from "./lib/bank.mjs";

const WAVE1 = [
  "chemistry__atomic-structure.json",
  "chemistry__chemical-bonding.json",
  "chemistry__chemical-equilibrium.json",
  "chemistry__organic-basics.json",
];
const WAVE2 = [
  "chemistry__stoichiometry.json",
  "chemistry__electrochemistry-kinetics.json",
  "chemistry__periodicity.json",
  "chemistry__solutions.json",
];
const FILES = process.argv.includes("--wave2")
  ? WAVE2
  : process.argv.includes("--wave1")
    ? WAVE1
    : [...WAVE1, ...WAVE2];

function quote(value) {
  if (value === null || value === undefined) return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function json(value) {
  return `${quote(JSON.stringify(value))}::jsonb`;
}

function intArray(values) {
  return `'{${values.join(",")}}'::int[]`;
}

function textArray(values) {
  return `'{${values.map((v) => `"${String(v).replace(/"/g, '\\"')}"`).join(",")}}'::text[]`;
}

const questions = [];
for (const file of FILES) {
  const raw = JSON.parse(await readFile(path.join(seedDir, file), "utf8"));
  for (const question of raw.questions ?? []) {
    questions.push({ ...question, source: question.source ?? raw.source });
  }
}

function statement(question) {
  const bank =
    "insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id) values (" +
    [
      quote(question.id),
      quote(question.chapterId),
      quote("chemistry"),
      quote(question.stem),
      json(question.options),
      question.answerIndex,
      quote(question.explanation ?? ""),
      json(question.images ?? []),
      json(question.source),
      question.difficulty ? quote(question.difficulty) : "null",
      question.conceptId ? quote(question.conceptId) : "null",
    ].join(", ") +
    ") on conflict (id) do update set stem = excluded.stem, options = excluded.options," +
    " answer_index = excluded.answer_index, explanation = excluded.explanation," +
    " images = excluded.images, source = excluded.source," +
    " difficulty = excluded.difficulty, concept_id = excluded.concept_id;";

  const pyq = question.pyq ?? {};
  const meta =
    "insert into question_pyq_meta (question_id, appear_count, years, exams, verified) values (" +
    [
      quote(question.id),
      pyq.appearCount ?? 0,
      intArray(pyq.years ?? []),
      textArray(pyq.exams ?? []),
      pyq.verified ? "true" : "false",
    ].join(", ") +
    ") on conflict (question_id) do update set appear_count = excluded.appear_count," +
    " years = excluded.years, exams = excluded.exams, verified = excluded.verified;";

  return `${bank}\n${meta}`;
}

const outDir = path.join(
  repoRoot,
  "supabase",
  process.argv.includes("--wave2") ? ".chem-wave2-batches" : ".chem-batches",
);
await mkdir(outDir, { recursive: true });
const SIZE = 40;
const files = [];
for (let i = 0; i < questions.length; i += SIZE) {
  const slice = questions.slice(i, i + SIZE);
  const name = `batch-${String(Math.floor(i / SIZE) + 1).padStart(2, "0")}.sql`;
  const body = slice.map(statement).join("\n") + "\n";
  await writeFile(path.join(outDir, name), body, "utf8");
  files.push(name);
}

console.log(`wrote ${files.length} batches, ${questions.length} questions`);
