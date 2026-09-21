import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { chapters } from "../src/content/catalog.ts";
import { chemFileErrors } from "./lib/authored.mjs";
import { generatedDir, importedDir, repoRoot, seedDir } from "./lib/bank.mjs";

const conceptsDir = path.join(repoRoot, "content", "concepts");

function isChemChapterFile(name) {
  return /^chemistry__.+\.json$/.test(name);
}

async function existingQuestions(skipFile) {
  const skip = skipFile ? path.normalize(skipFile) : "";
  const fromDir = async (dir) => {
    let files = [];
    try {
      files = (await readdir(dir)).filter((file) => file.endsWith(".json"));
    } catch {
      return [];
    }
    const questions = [];
    for (const file of files) {
      const full = path.normalize(path.join(dir, file));
      if (skip && full === skip) continue;
      const raw = JSON.parse(await readFile(full, "utf8"));
      questions.push(...(raw.questions ?? []));
    }
    return questions;
  };
  return [
    ...(await fromDir(seedDir)),
    ...(await fromDir(generatedDir)),
    ...(await fromDir(importedDir)),
  ];
}

async function remoteStems() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const stems = [];
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const response = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/question_bank?select=id,stem&offset=${from}&limit=${pageSize}`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "count=exact",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Supabase stem fetch failed: ${response.status}`);
    }
    const rows = await response.json();
    stems.push(...rows.map((row) => ({ id: row.id, stem: row.stem })));
    if (rows.length < pageSize) break;
  }
  return stems;
}

async function checkFile(filePath, existing) {
  const raw = JSON.parse(await readFile(filePath, "utf8"));
  const first = raw.questions?.[0];
  const chapterId = first?.chapterId;
  const chapter = chapters.find((c) => c.id === chapterId);
  if (!chapter) {
    return [`${filePath}: first question has unknown chapterId ${chapterId}`];
  }

  const mapPath = path.join(conceptsDir, chapter.subjectId, `${chapter.id}.json`);
  let map;
  try {
    map = JSON.parse(await readFile(mapPath, "utf8"));
  } catch {
    return [`${filePath}: missing concept map ${mapPath}`];
  }
  if (map.chapterId !== chapter.id) {
    return [`${filePath}: concept map chapterId mismatch`];
  }

  return chemFileErrors(raw, {
    chapterId: chapter.id,
    concepts: map.concepts ?? [],
    existing,
  });
}

const args = process.argv.slice(2);
const upload = args.includes("--upload");
const fileFlag = args.indexOf("--file");
const onlyFile = fileFlag >= 0 ? path.resolve(args[fileFlag + 1]) : null;

const seedFiles = (await readdir(seedDir))
  .filter(isChemChapterFile)
  .map((file) => path.join(seedDir, file));
const targets = onlyFile ? [onlyFile] : seedFiles;

if (targets.length === 0) {
  console.log("Authored Chemistry files: 0 (nothing to check)");
  process.exit(0);
}

let remote = [];
if (upload) {
  const fetched = await remoteStems();
  if (!fetched) {
    console.error(
      "check-authored-chem --upload needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
    );
    process.exit(1);
  }
  remote = fetched;
}

let failed = 0;
for (const file of targets) {
  const existing = [...(await existingQuestions(file)), ...remote];
  const errors = await checkFile(file, existing);
  if (errors.length === 0) {
    console.log(`ok  ${path.relative(repoRoot, file)}`);
    continue;
  }
  failed += 1;
  console.error(`FAIL ${path.relative(repoRoot, file)}`);
  for (const error of errors) console.error(`  - ${error}`);
}

if (failed > 0) {
  console.error(`\n${failed} authored file(s) failed`);
  process.exit(1);
}

console.log(`Authored Chemistry files passed (${targets.length})`);
