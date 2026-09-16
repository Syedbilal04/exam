import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { chapters } from "../src/content/catalog.ts";
import { generatedDir, repoRoot, seedDir, importedDir } from "./lib/bank.mjs";
import { DIAGRAM } from "./lib/diagrams.mjs";
import { compute } from "./lib/formulae.mjs";
import { EMPTY_PYQ, SOURCE, padId, quantity } from "./lib/generate-util.mjs";
import * as circle from "./generators/circle.mjs";
import * as differentiation from "./generators/differentiation.mjs";
import * as electricity from "./generators/electricity.mjs";
import * as kinematics from "./generators/kinematics.mjs";
import * as lawsOfMotion from "./generators/laws-of-motion.mjs";
import * as parabola from "./generators/parabola.mjs";
import * as quadratic from "./generators/quadratic.mjs";
import * as rayOptics from "./generators/ray-optics.mjs";
import * as stoichiometry from "./generators/stoichiometry.mjs";
import * as workEnergy from "./generators/work-energy.mjs";

/**
 * Writes original numerical questions whose answers are computed, not copied.
 * The same inputs always produce the same ids, options, and diagrams.
 */

const generators = [
  kinematics,
  electricity,
  stoichiometry,
  parabola,
  circle,
  lawsOfMotion,
  workEnergy,
  differentiation,
  quadratic,
  rayOptics,
];

const chapterIds = new Set(chapters.map((chapter) => chapter.id));
const imageDir = path.join(repoRoot, "public", "questions", "gen");

function normalStem(stem) {
  return stem.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

async function existingStems() {
  const stems = new Set();
  for (const dir of [seedDir, importedDir]) {
    let files = [];
    try {
      files = (await readdir(dir)).filter((file) => file.endsWith(".json"));
    } catch {
      continue;
    }
    for (const file of files) {
      const raw = JSON.parse(await readFile(path.join(dir, file), "utf8"));
      for (const question of raw.questions ?? []) {
        stems.add(normalStem(question.stem));
      }
    }
  }
  return stems;
}

function assertDraft(draft, where, seenStems) {
  const value = compute(draft.audit.formula, draft.audit.inputs);
  if (value !== draft.value) {
    throw new Error(`${where}: formula recomputed ${value}, item stored ${draft.value}`);
  }
  if (draft.correct !== quantity(draft.value, draft.unit)) {
    throw new Error(`${where}: correct option is not the computed value`);
  }
  if (draft.options[draft.answerIndex] !== draft.correct) {
    throw new Error(`${where}: answerIndex does not point at the computed value`);
  }
  if (draft.options.length !== 4 || new Set(draft.options).size !== 4) {
    throw new Error(`${where}: need four distinct options`);
  }
  if (draft.stem.length < 20 || draft.stem.length > 420) {
    throw new Error(`${where}: stem length ${draft.stem.length}`);
  }
  if (draft.options.some((option) => !option || option.length > 220)) {
    throw new Error(`${where}: option length out of range`);
  }
  if (!draft.explanation.includes(String(draft.value))) {
    throw new Error(`${where}: explanation does not show the computed value`);
  }
  for (const phrase of draft.mustInclude) {
    if (!draft.stem.includes(phrase)) {
      throw new Error(`${where}: stem is missing "${phrase}"`);
    }
  }
  if (seenStems.has(normalStem(draft.stem))) {
    throw new Error(`${where}: stem duplicates an existing question`);
  }
  if (!chapterIds.has(draft.chapterId)) {
    throw new Error(`${where}: unknown chapter ${draft.chapterId}`);
  }
  if (draft.svg && /<script|on[a-z]+\s*=/i.test(draft.svg)) {
    throw new Error(`${where}: diagram contains active content`);
  }
}

const seenStems = await existingStems();
const files = [];
let diagrams = 0;

for (const generator of generators) {
  const drafts = generator.generate();
  if (drafts.length !== 40) {
    throw new Error(`${generator.file}: expected 40 questions, got ${drafts.length}`);
  }

  const questions = drafts.map((draft, index) => {
    const id = padId(generator.idPrefix, index + 1);
    const where = `${generator.file}#${id}`;
    if (!draft.chapterId.startsWith(`${generator.subjectId}-`)) {
      throw new Error(`${where}: chapter does not match subject`);
    }
    assertDraft(draft, where, seenStems);
    seenStems.add(normalStem(draft.stem));

    const images = [];
    if (draft.svg) {
      diagrams += 1;
      images.push({
        url: `/questions/gen/${id}.svg`,
        alt: draft.alt || "Question diagram",
        width: DIAGRAM.width,
        height: DIAGRAM.height,
        svg: draft.svg,
      });
    }

    return {
      id,
      chapterId: draft.chapterId,
      stem: draft.stem,
      options: draft.options,
      answerIndex: draft.answerIndex,
      explanation: draft.explanation,
      images: images.map(({ url, alt, width, height }) => ({ url, alt, width, height })),
      pyq: EMPTY_PYQ,
      svg: images[0]?.svg,
    };
  });

  files.push({ generator, questions });
}

await mkdir(generatedDir, { recursive: true });
await rm(imageDir, { recursive: true, force: true });
await mkdir(imageDir, { recursive: true });

const written = new Set();
for (const { generator, questions } of files) {
  for (const question of questions) {
    if (!question.svg) continue;
    await writeFile(path.join(imageDir, `${question.id}.svg`), question.svg, "utf8");
  }

  const outFile = path.join(generatedDir, generator.file);
  written.add(generator.file);
  await writeFile(
    outFile,
    `${JSON.stringify(
      {
        subjectId: generator.subjectId,
        source: SOURCE,
        questions: questions.map(({ svg: _svg, ...question }) => question),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

const stale = (await readdir(generatedDir)).filter(
  (file) => file.endsWith(".json") && !written.has(file),
);
for (const file of stale) await rm(path.join(generatedDir, file));

console.log(
  `Generated ${files.reduce((sum, file) => sum + file.questions.length, 0)} questions ` +
    `and ${diagrams} diagrams across ${files.length} types.`,
);
