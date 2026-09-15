import { readFile } from "node:fs/promises";
import path from "node:path";
import { repoRoot } from "./bank.mjs";

/**
 * Maps an incoming question onto a TSBIE chapter using the keyword signatures
 * in content/chapter-keywords.json. Imported banks come from sources that have
 * no Indian chapter labels, so this is what keeps a paper on-syllabus.
 */

const keywordFile = path.join(repoRoot, "content", "chapter-keywords.json");

let signatures = null;

async function load() {
  if (signatures) return signatures;

  const raw = JSON.parse(await readFile(keywordFile, "utf8"));
  signatures = Object.entries(raw)
    .filter(([chapterId]) => !chapterId.startsWith("$"))
    .map(([chapterId, keywords]) => ({
      chapterId,
      subjectId: chapterId.slice(0, chapterId.indexOf("-")),
      keywords: keywords.map((keyword) => ({
        text: keyword.toLowerCase(),
        weight: keyword.split(/\s+/).length,
      })),
    }));

  return signatures;
}

export async function classify(text, allowedSubjects) {
  const haystack = text.toLowerCase();
  const allowed = new Set(allowedSubjects);

  let best = null;
  let runnerUpScore = 0;

  for (const chapter of await load()) {
    if (!allowed.has(chapter.subjectId)) continue;

    let score = 0;
    let longestMatch = 0;
    for (const keyword of chapter.keywords) {
      if (haystack.includes(keyword.text)) {
        score += keyword.weight;
        longestMatch = Math.max(longestMatch, keyword.text.length);
      }
    }

    if (score === 0) continue;
    if (!best || score > best.score) {
      runnerUpScore = best?.score ?? 0;
      best = { chapterId: chapter.chapterId, subjectId: chapter.subjectId, score, longestMatch };
    } else if (score > runnerUpScore) {
      runnerUpScore = score;
    }
  }

  if (!best) return null;

  // One multi-word phrase, two plain words, or a single distinctive term such
  // as "photosynthesis" is enough; anything weaker is too likely to be a
  // coincidental word match.
  const confident = best.score >= 2 || best.longestMatch >= 9;
  return confident ? best : null;
}
