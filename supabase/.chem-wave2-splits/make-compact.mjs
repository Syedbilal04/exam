import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const seedDir = "C:/Users/DELL/Desktop/exam/content/seed";
const outDir = "C:/Users/DELL/Desktop/exam/supabase/.chem-wave2-splits/compact";
const files = [
  "chemistry__stoichiometry.json",
  "chemistry__electrochemistry-kinetics.json",
  "chemistry__periodicity.json",
  "chemistry__solutions.json",
];

function compactSql(slice) {
  const bank = slice.map((q) => ({
    id: q.id,
    chapter_id: q.chapterId,
    subject_id: "chemistry",
    stem: q.stem,
    options: q.options,
    answer_index: q.answerIndex,
    explanation: q.explanation ?? "",
    images: q.images ?? [],
    source: q.source,
    difficulty: q.difficulty ?? null,
    concept_id: q.conceptId ?? null,
  }));
  const meta = slice.map((q) => ({
    question_id: q.id,
    appear_count: q.pyq?.appearCount ?? 0,
    years: q.pyq?.years ?? [],
    exams: q.pyq?.exams ?? [],
    verified: q.pyq?.verified ?? false,
  }));
  return (
    "insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id) " +
    "select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id " +
    "from jsonb_to_recordset($bank$" +
    JSON.stringify(bank) +
    "$bank$::jsonb) as t(id text, chapter_id text, subject_id text, stem text, options jsonb, answer_index int, explanation text, images jsonb, source jsonb, difficulty text, concept_id text) " +
    "on conflict (id) do update set stem = excluded.stem, options = excluded.options, answer_index = excluded.answer_index, explanation = excluded.explanation, images = excluded.images, source = excluded.source, difficulty = excluded.difficulty, concept_id = excluded.concept_id;\n" +
    "insert into question_pyq_meta (question_id, appear_count, years, exams, verified) " +
    "select question_id, appear_count, years, exams, verified " +
    "from jsonb_to_recordset($meta$" +
    JSON.stringify(meta) +
    "$meta$::jsonb) as t(question_id text, appear_count int, years int[], exams text[], verified boolean) " +
    "on conflict (question_id) do update set appear_count = excluded.appear_count, years = excluded.years, exams = excluded.exams, verified = excluded.verified;\n"
  );
}

const questions = [];
for (const file of files) {
  const raw = JSON.parse(await readFile(path.join(seedDir, file), "utf8"));
  for (const question of raw.questions ?? []) {
    questions.push({ ...question, source: question.source ?? raw.source });
  }
}

await mkdir(outDir, { recursive: true });
const SIZE = 20;
let n = 0;
for (let i = 0; i < questions.length; i += SIZE) {
  n += 1;
  const slice = questions.slice(i, i + SIZE);
  const sql = compactSql(slice);
  const name = `c${String(n).padStart(2, "0")}.sql`;
  await writeFile(path.join(outDir, name), sql, "utf8");
  console.log(
    `${name} n=${slice.length} bytes=${Buffer.byteLength(sql)} first=${slice[0].id} last=${slice[slice.length - 1].id}`,
  );
}
console.log(`total questions=${questions.length} chunks=${n}`);
