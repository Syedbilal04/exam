import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { buildBank, importedDir, repoRoot } from "./lib/bank.mjs";
import { classify } from "./lib/classify.mjs";
import { normalizeField } from "./lib/tex.mjs";
import { saveImage } from "./lib/image.mjs";

/**
 * Pulls question sets from the allowlisted sources in content/sources.json,
 * maps them onto TSBIE chapters, and rebuilds src/content/question-bank.json.
 *
 * Only sources whose licence permits reuse belong in the allowlist; the script
 * refuses anything that does not declare one.
 */

const sourcesFile = path.join(repoRoot, "content", "sources.json");
const ROWS_API = "https://datasets-server.huggingface.co/rows";
const PAGE_SIZE = 100;

/** Questions that lean on a figure, a passage or a table cannot stand alone. */
const UNUSABLE = [
  "figure", "diagram", "graph below", "graph above", "shown above", "shown below",
  "table below", "table above", "passage", "following excerpt", "image above",
];

/**
 * Topics the source datasets cover that the TSBIE Intermediate syllabus does
 * not. Without this the keyword map happily files a laser question under Atoms
 * or a t-distribution question under Measures of Dispersion.
 */
const OFF_SYLLABUS = [
  "t-distribution", "t distribution", "confidence interval", "null hypothesis",
  "p-value", "chi-square", "chi square", "regression line", "least squares",
  "sampling distribution", "standard error", "z-score", "margin of error",
  "abelian", "subgroup", "isomorphism", "vector space", "eigenvalue",
  "eigenvector", "ring homomorphism", "group theory",
  "laser", "special relativity", "lorentz transformation", "schrodinger",
  "quantum computing", "hamiltonian", "hilbert space",
];

function usable(stem, options, hasFigure) {
  if (stem.length < 20 || stem.length > 420) return false;
  if (options.length !== 4) return false;
  if (options.some((option) => !option || option.length > 220)) return false;

  const text = `${stem} ${options.join(" ")}`;
  const lower = text.toLowerCase();
  if (OFF_SYLLABUS.some((topic) => lower.includes(topic))) return false;

  // A question may refer to a figure as long as the source ships that figure.
  if (hasFigure) return true;
  return !UNUSABLE.some((marker) => stem.toLowerCase().includes(marker));
}

function fingerprint(stem) {
  return createHash("sha1")
    .update(stem.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim())
    .digest("hex")
    .slice(0, 12);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** The dataset viewer API rate limits bursts, so back off instead of giving up. */
async function fetchWithRetry(url, attempts = 6) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (response.ok) return response;
    if (response.status === 404) return null;

    if (response.status === 429 || response.status >= 500) {
      const retryAfter = Number(response.headers.get("retry-after"));
      const wait = Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : Math.min(30_000, 2 ** attempt * 1000);
      console.log(`    rate limited, waiting ${Math.round(wait / 1000)}s`);
      await sleep(wait);
      continue;
    }

    throw new Error(`${url} responded ${response.status}`);
  }

  throw new Error(`gave up after ${attempts} attempts: ${url}`);
}

async function* hfRows({ dataset, configs, splits }) {
  for (const config of configs) {
    for (const split of splits) {
      let offset = 0;
      for (;;) {
        const url =
          `${ROWS_API}?dataset=${encodeURIComponent(dataset)}` +
          `&config=${encodeURIComponent(config)}&split=${encodeURIComponent(split)}` +
          `&offset=${offset}&length=${PAGE_SIZE}`;

        const response = await fetchWithRetry(url);
        if (!response) break; // split missing for this config

        const payload = await response.json();
        const rows = payload.rows ?? [];
        for (const entry of rows) yield { config, row: entry.row };

        offset += PAGE_SIZE;
        if (rows.length < PAGE_SIZE || offset >= (payload.num_rows_total ?? 0)) break;
        await sleep(250);
      }
    }
  }
}

const adapters = {
  /** cais/mmlu: { question, choices: string[4], answer: 0-3 }. */
  "mmlu-v1": ({ row }) => ({
    stem: String(row.question ?? "").trim(),
    options: (row.choices ?? []).map((choice) => String(choice).trim()),
    answerIndex: typeof row.answer === "number" ? row.answer : -1,
  }),

  /** allenai/sciq: one correct answer plus three distractors. */
  "sciq-v1": ({ row }) => {
    const options = [
      row.correct_answer,
      row.distractor1,
      row.distractor2,
      row.distractor3,
    ]
      .filter(Boolean)
      .map((option) => String(option).trim());

    return {
      stem: String(row.question ?? "").trim(),
      options,
      answerIndex: 0,
      explanation: String(row.support ?? "").trim(),
    };
  },
};

async function importSource(source) {
  const adapter = adapters[source.adapter];
  if (!adapter) throw new Error(`unknown adapter "${source.adapter}"`);
  if (!source.attribution?.license) throw new Error("no licence declared");

  const questions = [];
  const seen = new Set();
  const stats = { fetched: 0, unusable: 0, unmapped: 0, duplicate: 0 };

  for await (const entry of hfRows(source.hf)) {
    stats.fetched += 1;

    const parsed = adapter(entry);
    const imageUrls = source.downloadImages ? (parsed.imageUrls ?? []) : [];

    // Wrap bare TeX and reject anything KaTeX cannot draw, field by field.
    const fields = [parsed.stem, ...parsed.options, parsed.explanation ?? ""].map(
      normalizeField,
    );
    if (fields.some((field) => !field.ok)) {
      stats.unusable += 1;
      continue;
    }
    parsed.stem = fields[0].text;
    parsed.options = fields.slice(1, 1 + parsed.options.length).map((f) => f.text);
    parsed.explanation = fields.at(-1).text;

    if (
      !usable(parsed.stem, parsed.options, imageUrls.length > 0) ||
      parsed.answerIndex < 0 ||
      parsed.answerIndex >= parsed.options.length
    ) {
      stats.unusable += 1;
      continue;
    }

    const key = fingerprint(parsed.stem);
    if (seen.has(key)) {
      stats.duplicate += 1;
      continue;
    }

    const match = await classify(
      `${parsed.stem} ${parsed.options.join(" ")}`,
      source.subjects,
    );
    if (!match) {
      stats.unmapped += 1;
      continue;
    }

    const images = [];
    for (const imageUrl of imageUrls) {
      const saved = await saveImage(source.id, imageUrl, parsed.stem.slice(0, 80));
      if (saved) images.push(saved);
    }
    if (imageUrls.length > 0 && images.length === 0) {
      stats.unusable += 1;
      continue;
    }

    seen.add(key);
    questions.push({
      id: `${source.id}-${key}`,
      chapterId: match.chapterId,
      subjectId: match.subjectId,
      stem: parsed.stem,
      options: parsed.options,
      answerIndex: parsed.answerIndex,
      explanation: parsed.explanation ?? "",
      images,
      // These sources carry no Indian previous-paper history, so the app shows
      // no appearance line for them rather than inventing one.
      pyq: { appearCount: 0, years: [], exams: [], verified: false },
      source: source.attribution,
    });
  }

  return { questions, stats };
}

const config = JSON.parse(await readFile(sourcesFile, "utf8"));
const enabled = (config.sources ?? []).filter((source) => source.enabled);

if (enabled.length === 0) {
  console.log(
    `No enabled sources in ${sourcesFile}.\n` +
      'Add a licensed source and set "enabled": true, then run this again.',
  );
} else {
  await mkdir(importedDir, { recursive: true });

  for (const source of enabled) {
    console.log(`\n${source.id}: fetching ${source.hf.dataset}`);
    try {
      const { questions, stats } = await importSource(source);
      const outFile = path.join(importedDir, `${source.id}.json`);
      await writeFile(
        outFile,
        `${JSON.stringify({ source: source.attribution, questions }, null, 2)}\n`,
        "utf8",
      );

      console.log(
        `  kept ${questions.length} of ${stats.fetched} ` +
          `(${stats.unmapped} off-syllabus, ${stats.unusable} unusable, ${stats.duplicate} duplicate)`,
      );
    } catch (error) {
      console.error(`  failed: ${error.message}`);
    }
  }
}

const stats = await buildBank();
console.log(
  `\nQuestion bank rebuilt: ${stats.total} questions across ${stats.chapters} chapters ` +
    `(${stats.seeded} seeded, ${stats.imported} imported).\n` +
    "Run `npm run seed:sql` and apply supabase/seed.sql to push the update to Supabase.",
);
