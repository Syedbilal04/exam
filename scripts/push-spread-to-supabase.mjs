import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

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

const files = [
  "content/seed/physics-spread-extra.json",
  "content/seed/maths-spread-extra.json",
];

const questions = [];
for (const file of files) {
  const raw = JSON.parse(readFileSync(file, "utf8"));
  const source = raw.source;
  for (const question of raw.questions) {
    questions.push({
      ...question,
      subjectId: raw.subjectId,
      source: question.source ?? source,
    });
  }
}

const BATCH = 20;
const outDir = "supabase/.push-batches";
mkdirSync(outDir, { recursive: true });

const batchFiles = [];
for (let i = 0; i < questions.length; i += BATCH) {
  const slice = questions.slice(i, i + BATCH);
  const lines = ["begin;"];
  for (const q of slice) {
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
    const pyq = q.pyq ?? {
      appearCount: 0,
      years: [],
      exams: [],
      verified: false,
    };
    lines.push(
      "insert into question_pyq_meta (question_id, appear_count, years, exams, verified) values (" +
        [
          quote(q.id),
          pyq.appearCount ?? 0,
          intArray(pyq.years ?? []),
          textArray(pyq.exams ?? []),
          pyq.verified ? "true" : "false",
        ].join(", ") +
        ") on conflict (question_id) do update set appear_count = excluded.appear_count," +
        " years = excluded.years, exams = excluded.exams, verified = excluded.verified;",
    );
  }
  lines.push("commit;");
  const name = path.join(
    outDir,
    `${String(Math.floor(i / BATCH)).padStart(2, "0")}.sql`,
  );
  writeFileSync(name, `${lines.join("\n")}\n`);
  batchFiles.push(name);
}

writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify(
    { total: questions.length, batches: batchFiles.length, files },
    null,
    2,
  ),
);

console.log(
  JSON.stringify({ total: questions.length, batches: batchFiles.length }),
);
