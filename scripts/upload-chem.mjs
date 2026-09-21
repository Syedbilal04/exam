import { readFile } from "node:fs/promises";
import path from "node:path";
import { repoRoot, seedDir } from "./lib/bank.mjs";

const FILES = [
  "chemistry__atomic-structure.json",
  "chemistry__chemical-bonding.json",
  "chemistry__chemical-equilibrium.json",
  "chemistry__organic-basics.json",
];

function loadEnvLocal() {
  const envPath = path.join(repoRoot, ".env.local");
  return readFile(envPath, "utf8").then((text) => {
    const env = {};
    for (const line of text.split(/\r?\n/)) {
      if (!line || line.startsWith("#")) continue;
      const cut = line.indexOf("=");
      if (cut <= 0) continue;
      env[line.slice(0, cut).trim()] = line.slice(cut + 1).trim();
    }
    return env;
  });
}

async function rest(env, pathname, { method, body, prefer }) {
  const url = `${env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${pathname}`;
  const response = await fetch(url, {
    method,
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: prefer,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${method} ${pathname} ${response.status}: ${text.slice(0, 400)}`);
  }
}

const env = await loadEnvLocal();
if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
}

const questions = [];
for (const file of FILES) {
  const raw = JSON.parse(await readFile(path.join(seedDir, file), "utf8"));
  for (const question of raw.questions ?? []) {
    questions.push({
      ...question,
      subjectId: "chemistry",
      source: question.source ?? raw.source,
    });
  }
}

const BANK_SIZE = 40;
for (let i = 0; i < questions.length; i += BANK_SIZE) {
  const slice = questions.slice(i, i + BANK_SIZE);
  await rest(env, "question_bank", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=minimal",
    body: slice.map((q) => ({
      id: q.id,
      chapter_id: q.chapterId,
      subject_id: q.subjectId,
      stem: q.stem,
      options: q.options,
      answer_index: q.answerIndex,
      explanation: q.explanation ?? "",
      images: q.images ?? [],
      source: q.source,
      difficulty: q.difficulty ?? null,
      concept_id: q.conceptId ?? null,
    })),
  });
  await rest(env, "question_pyq_meta", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=minimal",
    body: slice.map((q) => ({
      question_id: q.id,
      appear_count: q.pyq?.appearCount ?? 0,
      years: q.pyq?.years ?? [],
      exams: q.pyq?.exams ?? [],
      verified: q.pyq?.verified ?? false,
    })),
  });
  console.log(`uploaded ${Math.min(i + BANK_SIZE, questions.length)} / ${questions.length}`);
}

console.log(`done: ${questions.length} chemistry items`);
