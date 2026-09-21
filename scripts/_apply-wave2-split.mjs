import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const srcDir = "C:/Users/DELL/Desktop/exam/supabase/.chem-wave2-json";
const outDir = "C:/Users/DELL/Desktop/exam/supabase/.chem-wave2-json-parts";
const CHUNK = 10;

const bankSql = (json) => `insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$${json}$json$::jsonb) as x(
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
  )
on conflict (id) do update set
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  images = excluded.images,
  source = excluded.source,
  difficulty = excluded.difficulty,
  concept_id = excluded.concept_id;`;

const metaSql = (json) => `insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$${json}$json$::jsonb) as x(
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
  )
on conflict (question_id) do update set
  appear_count = excluded.appear_count,
  years = excluded.years,
  exams = excluded.exams,
  verified = excluded.verified;`;

await mkdir(outDir, { recursive: true });
const files = (await readdir(srcDir)).filter((f) => f.endsWith(".sql")).sort();
const manifest = [];

for (const file of files) {
  const text = await readFile(path.join(srcDir, file), "utf8");
  const start = text.indexOf("$json$") + 6;
  const end = text.indexOf("$json$", start);
  const arr = JSON.parse(text.slice(start, end));
  const base = file.replace(/\.sql$/, "");
  let part = 0;
  for (let i = 0; i < arr.length; i += CHUNK) {
    part += 1;
    const slice = arr.slice(i, i + CHUNK);
    const json = JSON.stringify(slice);
    const bankName = `${base}-p${String(part).padStart(2, "0")}-bank.sql`;
    const metaName = `${base}-p${String(part).padStart(2, "0")}-meta.sql`;
    await writeFile(path.join(outDir, bankName), bankSql(json));
    await writeFile(path.join(outDir, metaName), metaSql(json));
    manifest.push({
      file: bankName,
      bytes: bankSql(json).length,
      ids: `${slice[0].id}..${slice[slice.length - 1].id}`,
      n: slice.length,
    });
    manifest.push({
      file: metaName,
      bytes: metaSql(json).length,
      ids: `${slice[0].id}..${slice[slice.length - 1].id}`,
      n: slice.length,
    });
  }
  console.log(`${file}\t${arr.length}\t${arr[0].id}..${arr[arr.length - 1].id}\tparts=${part}`);
}

await writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`wrote ${manifest.length} parts`);
