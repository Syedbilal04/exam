import { readFileSync } from "node:fs";
import path from "node:path";
import { bankFile, repoRoot } from "./lib/bank.mjs";

function loadEnvLocal() {
  const file = path.join(repoRoot, ".env.local");
  let text = "";
  try {
    text = readFileSync(file, "utf8");
  } catch {
    throw new Error("missing .env.local");
  }
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

function isNewChemId(id) {
  const match = /^(che-(?:as|cb|eq|ob))-(\d+)$/.exec(id);
  if (!match) return false;
  return Number(match[2]) >= 101;
}

loadEnvLocal();
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  throw new Error("Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
}

const questions = JSON.parse(readFileSync(bankFile, "utf8")).filter((q) =>
  isNewChemId(q.id),
);

async function rest(pathname, { method, body }) {
  const response = await fetch(`${url}${pathname}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${method} ${pathname} ${response.status}: ${text.slice(0, 400)}`);
  }
}

const batchSize = 40;
let uploaded = 0;
for (let i = 0; i < questions.length; i += batchSize) {
  const batch = questions.slice(i, i + batchSize);
  await rest("/rest/v1/question_bank?on_conflict=id", {
    method: "POST",
    body: batch.map((q) => ({
      id: q.id,
      chapter_id: q.chapterId,
      subject_id: q.subjectId,
      stem: q.stem,
      options: q.options,
      answer_index: q.answerIndex,
      explanation: q.explanation ?? "",
      images: q.images ?? [],
      source: q.source,
    })),
  });
  await rest("/rest/v1/question_pyq_meta?on_conflict=question_id", {
    method: "POST",
    body: batch.map((q) => ({
      question_id: q.id,
      appear_count: q.pyq?.appearCount ?? 0,
      years: q.pyq?.years ?? [],
      exams: q.pyq?.exams ?? [],
      verified: q.pyq?.verified ?? false,
    })),
  });
  uploaded += batch.length;
  console.log(`uploaded ${uploaded}/${questions.length}`);
}

console.log(`done: ${questions.length} chemistry questions upserted`);
