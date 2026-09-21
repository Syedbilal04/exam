import assert from "node:assert/strict";
import { collectCoverage, fileErrors, chemFileErrors, mixShares } from "./lib/authored.mjs";

const concepts = [
  { id: "binomial-nomenclature", label: "Binomial nomenclature" },
  { id: "species-concept", label: "Species" },
];

const questions = [
  {
    id: "bot-lw-e-101",
    chapterId: "botany-the-living-world",
    stem: "The scientist who introduced binomial nomenclature is",
    options: ["Linnaeus", "Darwin", "Hooke", "Mendel"],
    answerIndex: 0,
    explanation: "Linnaeus gave the two-word naming system.",
    exam: "ts-eamcet",
    difficulty: "easy",
    conceptId: "binomial-nomenclature",
    pyq: { appearCount: 0, years: [], exams: ["TS EAMCET"], verified: false },
  },
  {
    id: "bot-lw-n-101",
    chapterId: "botany-the-living-world",
    stem: "Binomial nomenclature of an organism consists of",
    options: ["genus and species", "family and genus", "order and family", "class and order"],
    answerIndex: 0,
    explanation: "The scientific name is genus + specific epithet.",
    exam: "neet",
    difficulty: "easy",
    conceptId: "binomial-nomenclature",
    pyq: { appearCount: 0, years: [], exams: ["NEET"], verified: false },
  },
  {
    id: "bot-lw-e-102",
    chapterId: "botany-the-living-world",
    stem: "The basic unit of classification is the",
    options: ["genus", "family", "species", "order"],
    answerIndex: 2,
    explanation: "Species is the lowest and basic taxonomic category.",
    exam: "ts-eamcet",
    difficulty: "easy",
    conceptId: "species-concept",
    pyq: { appearCount: 0, years: [], exams: ["TS EAMCET"], verified: false },
  },
  {
    id: "bot-lw-n-102",
    chapterId: "botany-the-living-world",
    stem: "Which of the following is the lowest taxonomic category?",
    options: ["Family", "Genus", "Species", "Order"],
    answerIndex: 2,
    explanation: "Species is the lowest rank in the hierarchy.",
    exam: "neet",
    difficulty: "easy",
    conceptId: "species-concept",
    pyq: { appearCount: 0, years: [], exams: ["NEET"], verified: false },
  },
];

const coverage = collectCoverage(concepts, questions);
assert.equal(coverage.missing.length, 0);

const mix = mixShares(questions.filter((q) => q.exam === "neet"));
assert.ok(mix.easy >= 0.6);

const cloneErrors = fileErrors(
  {
    subjectId: "botany",
    source: { name: "t", license: "t" },
    questions: [
      ...questions,
      {
        ...questions[0],
        id: "bot-lw-e-199",
        stem: "The scientist who introduced binomial nomenclature is",
      },
    ],
  },
  {
    chapterId: "botany-the-living-world",
    concepts,
    existing: [],
  },
);
assert.ok(
  cloneErrors.some((e) => /duplicate stem/i.test(e)),
  `expected a duplicate-stem error, got: ${cloneErrors.join(" | ")}`,
);

const ok = fileErrors(
  { subjectId: "botany", source: { name: "t", license: "t" }, questions },
  { chapterId: "botany-the-living-world", concepts, existing: [] },
);
assert.deepEqual(ok, []);

const chemOk = chemFileErrors(
  {
    subjectId: "chemistry",
    source: { name: "t", license: "t" },
    questions: [
      {
        id: "che-ob-101",
        chapterId: "chemistry-organic-chemistry-some-basic-principles-and-techniques",
        stem: "A homologous series is a family of compounds that",
        options: [
          "differ by a CH2 unit",
          "have the same molecular mass",
          "are all gases",
          "contain a metal ion",
        ],
        answerIndex: 0,
        explanation: "Adjacent members of a homologous series differ by CH2.",
        difficulty: "easy",
        conceptId: "classification-homologous",
        pyq: { appearCount: 0, years: [], exams: [], verified: false },
      },
    ],
  },
  {
    chapterId: "chemistry-organic-chemistry-some-basic-principles-and-techniques",
    concepts: [{ id: "classification-homologous", quota: 1 }],
    existing: [],
  },
);
assert.deepEqual(chemOk, []);

console.log("Authored-file helper checks passed (5)");
