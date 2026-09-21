import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { repoRoot, seedDir } from "./lib/bank.mjs";

const FILES = [
  "chemistry__electrochemistry-kinetics.json",
  "chemistry__periodicity.json",
  "chemistry__solutions.json",
];

const outDir = path.join(repoRoot, "supabase", ".chem-wave2-json");
await mkdir(outDir, { recursive: true });

for (const file of FILES) {
  const raw = JSON.parse(await readFile(path.join(seedDir, file), "utf8"));
  const rows = (raw.questions ?? []).map((q) => ({
    id: q.id,
    chapter_id: q.chapterId,
    subject_id: "chemistry",
    stem: q.stem,
    options: q.options,
    answer_index: q.answerIndex,
    explanation: q.explanation ?? "",
    images: q.images ?? [],
    source: q.source ?? raw.source,
    difficulty: q.difficulty ?? null,
    concept_id: q.conceptId ?? null,
    appear_count: q.pyq?.appearCount ?? 0,
    years: q.pyq?.years ?? [],
    exams: q.pyq?.exams ?? [],
    verified: q.pyq?.verified ?? false,
  }));

  const base = file.replace("chemistry__", "").replace(".json", "");
  const SIZE = 12;
  for (let i = 0; i < rows.length; i += SIZE) {
    const slice = rows.slice(i, i + SIZE);
    const json = JSON.stringify(slice);
    if (json.includes("$json$")) {
      throw new Error(`${file}: payload contains $json$ delimiter`);
    }

    const recordset = `jsonb_to_recordset($json$${json}$json$::jsonb) as x(
    id text,
    chapter_id text,
    subject_id text,
    stem text,
    options jsonb,
    answer_index int,
    explanation text,
    images jsonb,
    source jsonb,
    difficulty text,
    concept_id text,
    appear_count int,
    years jsonb,
    exams jsonb,
    verified boolean
  )`;

    const sql = `insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from ${recordset}
on conflict (id) do update set
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  images = excluded.images,
  source = excluded.source,
  difficulty = excluded.difficulty,
  concept_id = excluded.concept_id;
`;

    const name = `${base}-${String(Math.floor(i / SIZE) + 1).padStart(2, "0")}.sql`;
    await writeFile(path.join(outDir, name), sql);
    console.log(name, slice.length, sql.length);
  }
}
