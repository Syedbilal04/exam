import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { bankFile, repoRoot } from "./lib/bank.mjs";

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

function isNewChemId(id) {
  const match = /^(che-(?:as|cb|eq|ob))-(\d+)$/.exec(id);
  return Boolean(match && Number(match[2]) >= 101);
}

const questions = JSON.parse(readFileSync(bankFile, "utf8")).filter((q) =>
  isNewChemId(q.id),
);

const dir = path.join(repoRoot, "supabase", ".chem-upload");
mkdirSync(dir, { recursive: true });

const size = 25;
let files = 0;
for (let i = 0; i < questions.length; i += size) {
  const batch = questions.slice(i, i + size);
  const lines = ["begin;"];
  for (const q of batch) {
    lines.push(
      "insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source) values (" +
        [
          quote(q.id),
          quote(q.chapterId),
          quote(q.subjectId),
          quote(q.stem),
          json(q.options),
          q.answerIndex,
          quote(q.explanation ?? ""),
          json(q.images ?? []),
          json(q.source),
        ].join(", ") +
        ") on conflict (id) do update set stem = excluded.stem, options = excluded.options," +
        " answer_index = excluded.answer_index, explanation = excluded.explanation," +
        " images = excluded.images, source = excluded.source;",
    );
    lines.push(
      "insert into question_pyq_meta (question_id, appear_count, years, exams, verified) values (" +
        [
          quote(q.id),
          q.pyq.appearCount,
          intArray(q.pyq.years),
          textArray(q.pyq.exams),
          q.pyq.verified ? "true" : "false",
        ].join(", ") +
        ") on conflict (question_id) do update set appear_count = excluded.appear_count," +
        " years = excluded.years, exams = excluded.exams, verified = excluded.verified;",
    );
  }
  lines.push("commit;");
  files += 1;
  writeFileSync(
    path.join(dir, `${String(files).padStart(2, "0")}.sql`),
    `${lines.join("\n")}\n`,
  );
}

console.log(`wrote ${files} files for ${questions.length} questions`);
