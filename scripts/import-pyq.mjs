import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { buildBank, importedDir, repoRoot } from "./lib/bank.mjs";
import { chapters } from "../src/content/catalog.ts";

/**
 * Pulls question sets from the allowlisted sources in content/sources.json,
 * maps them onto TSBIE chapters, and rebuilds src/content/question-bank.json.
 *
 * Only sources whose licence permits reuse belong in the allowlist. The script
 * refuses anything that is not declared there.
 */

const sourcesFile = path.join(repoRoot, "content", "sources.json");
const knownChapterIds = new Set(chapters.map((c) => c.id));

const adapters = {
  /**
   * Shape expected from a `generic-v1` source:
   * { questions: [{ id, topic, question, options: [], answer: 0|"A",
   *                 explanation?, previousYears?: [2019, 2022], exams?: [] }] }
   */
  "generic-v1": (payload, source) => {
    const rows = Array.isArray(payload) ? payload : (payload.questions ?? []);

    return rows.flatMap((row, index) => {
      const chapterId = source.chapterMap?.[row.topic] ?? row.chapterId;
      if (!chapterId || !knownChapterIds.has(chapterId)) {
        console.warn(
          `  skipped ${source.id}#${row.id ?? index}: unmapped topic "${row.topic ?? ""}"`,
        );
        return [];
      }

      const options = row.options ?? [];
      const answerIndex =
        typeof row.answer === "number"
          ? row.answer
          : typeof row.answer === "string"
            ? row.answer.trim().toUpperCase().charCodeAt(0) - 65
            : -1;

      if (options.length < 2 || answerIndex < 0 || answerIndex >= options.length) {
        console.warn(`  skipped ${source.id}#${row.id ?? index}: bad answer key`);
        return [];
      }

      const years = (row.previousYears ?? []).filter(Number.isInteger);

      return [
        {
          id: `${source.id}-${row.id ?? index}`,
          chapterId,
          stem: String(row.question ?? row.stem ?? "").trim(),
          options: options.map(String),
          answerIndex,
          explanation: row.explanation ?? "",
          pyq: {
            appearCount: years.length || (row.appearCount ?? 0),
            years,
            exams: row.exams ?? [],
            // Imported metadata comes from the source itself, not our samples.
            verified: years.length > 0,
          },
          source: source.attribution,
        },
      ];
    });
  },
};

async function fetchSource(source) {
  const response = await fetch(source.url, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${source.url} responded ${response.status}`);
  }
  return response.json();
}

const config = JSON.parse(await readFile(sourcesFile, "utf8"));
const enabled = (config.sources ?? []).filter((source) => source.enabled);

if (enabled.length === 0) {
  console.log(
    `No enabled sources in ${sourcesFile}.\n` +
      "Add a licensed source and set \"enabled\": true, then run this again.",
  );
} else {
  await mkdir(importedDir, { recursive: true });

  for (const source of enabled) {
    const adapter = adapters[source.adapter];
    if (!adapter) {
      console.error(`Unknown adapter "${source.adapter}" for ${source.id}`);
      continue;
    }
    if (!source.attribution?.license) {
      console.error(`${source.id} has no licence declared; skipping.`);
      continue;
    }

    console.log(`Fetching ${source.id} from ${source.url}`);
    try {
      const questions = adapter(await fetchSource(source), source);
      const outFile = path.join(importedDir, `${source.id}.json`);
      await writeFile(
        outFile,
        `${JSON.stringify(
          {
            subjectId: source.subjectId,
            source: source.attribution,
            questions,
          },
          null,
          2,
        )}\n`,
        "utf8",
      );
      console.log(`  wrote ${questions.length} questions to ${outFile}`);
    } catch (error) {
      console.error(`  failed: ${error.message}`);
    }
  }
}

const stats = await buildBank();
console.log(
  `Question bank rebuilt: ${stats.total} questions across ${stats.chapters} chapters ` +
    `(${stats.seeded} seeded, ${stats.imported} imported).\n` +
    "Run `npm run seed:sql` and apply supabase/seed.sql to push the update to Supabase.",
);
