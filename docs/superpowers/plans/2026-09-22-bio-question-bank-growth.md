# Bio Question Bank Growth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add exam-aware paper routing, authored-question checks, and a first Bio wave (~12–15 TS EAMCET + ~12–15 NEET items per Botany/Zoology chapter) without duplicate stems.

**Architecture:** Stem fingerprinting and an import gate sit in `scripts/`. Runtime `Question` records gain `difficulty` and `conceptId`. `selectPaper` prefers items tagged for the sitting exam. Concept maps + per-chapter seed JSON are the content source; `bank:build` remains the merge step; Supabase gets new columns and new-row upserts only.

**Tech Stack:** Next.js (existing), Node test scripts (`node:assert`), JSON seed files, Supabase SQL migration.

**Spec:** `docs/superpowers/specs/2026-09-22-bio-question-bank-growth-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `scripts/lib/stems.mjs` | Normalize / fingerprint / clash detection |
| `scripts/check-stems.mjs` | Unit checks for stem helpers |
| `src/lib/paper/generate.ts` | Exam-preferring paper pick |
| `scripts/check-paper-engine.mjs` | Paper-engine checks including exam buckets |
| `src/lib/types.ts` | `difficulty`, `conceptId` on `Question` |
| `scripts/lib/bank.mjs` | Persist new fields; copy `exam` → `pyq.exams` |
| `src/lib/db/local-store.ts` | Pass `exams` into the pool |
| `src/lib/db/supabase-store.ts` | Select `pyq` and pass `exams` |
| `src/lib/attempts/service.ts` | Give `selectPaper` the sitting `examId` |
| `supabase/migrations/0002_question_meta.sql` | `difficulty`, `concept_id`; refresh `questions` view |
| `scripts/generate-seed.mjs` | Write new columns |
| `scripts/check-authored.mjs` | Schema, coverage, mix, local/remote dedup |
| `content/concepts/{botany,zoology}/*.json` | Chapter concept maps |
| `content/seed/{botany,zoology}__*.json` | New single-exam items |
| `package.json` | `check:stems`, `check:authored` scripts |

Do not edit `src/content/question-bank.json` by hand.

---

### Task 1: Stem helpers

**Files:**
- Create: `scripts/lib/stems.mjs`
- Create: `scripts/check-stems.mjs`
- Modify: `package.json` (add `"check:stems": "node scripts/check-stems.mjs"`)

- [ ] **Step 1: Write the failing checks** in `scripts/check-stems.mjs`

```js
import assert from "node:assert/strict";
import { normalizeStem, fingerprint, stemsClash } from "./lib/stems.mjs";

assert.equal(normalizeStem("  DNA, the  molecule! "), "dna the molecule");
assert.equal(fingerprint("DNA the molecule"), fingerprint("dna, the molecule!"));
assert.equal(stemsClash("A body of mass 2 kg", "A body of mass 5 kg"), true);
assert.equal(stemsClash("Linnaeus proposed binomial nomenclature", "Species is the basic unit"), false);
```

- [ ] **Step 2: Run** `node scripts/check-stems.mjs` — expect FAIL (module missing).

- [ ] **Step 3: Implement** `scripts/lib/stems.mjs`

```js
import { createHash } from "node:crypto";

export function normalizeStem(stem) {
  return String(stem).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function stripDigits(stem) {
  return normalizeStem(stem).replace(/[0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

export function fingerprint(stem) {
  return createHash("sha1").update(normalizeStem(stem)).digest("hex").slice(0, 12);
}

export function stemsClash(a, b) {
  const na = normalizeStem(a);
  const nb = normalizeStem(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  const da = stripDigits(a);
  const db = stripDigits(b);
  return Boolean(da && db && da === db);
}
```

- [ ] **Step 4: Run** `node scripts/check-stems.mjs` — expect PASS.

- [ ] **Step 5: Add npm script** `check:stems`. Do not commit unless the user asks.

---

### Task 2: Exam-aware paper picker

**Files:**
- Modify: `src/lib/paper/generate.ts`
- Modify: `scripts/check-paper-engine.mjs`
- Modify: `src/lib/db/types.ts` (no change if `PoolQuestion` is imported from generate)
- Modify: `src/lib/db/local-store.ts`
- Modify: `src/lib/db/supabase-store.ts`
- Modify: `src/lib/attempts/service.ts`

Sitting-exam labels:

```js
const EXAM_LABEL = {
  "ts-eamcet": "TS EAMCET",
  "jee-main": "JEE Main",
  "neet": "NEET",
};
```

`PoolQuestion` becomes `{ id, subjectId, exams?: string[] }`.  
`PaperRequest` gains optional `examId`.  
Missing/empty `exams` = legacy fallback.

Bucket order (unseen then seen inside each): matching exam only → legacy/empty/dual → other exam only.

- [ ] **Step 1: Add failing checks** to `scripts/check-paper-engine.mjs`

```js
function tagged(subjectId, id, exams) {
  return { id, subjectId, exams };
}

check("prefers sitting-exam tags before the other exam", () => {
  const { questionIds } = selectPaper({
    examId: "neet",
    quotas: [{ subjectId: "botany", count: 2 }],
    pool: [
      tagged("botany", "eamcet-1", ["TS EAMCET"]),
      tagged("botany", "eamcet-2", ["TS EAMCET"]),
      tagged("botany", "neet-1", ["NEET"]),
      tagged("botany", "neet-2", ["NEET"]),
    ],
    seenIds: new Set(),
  });
  assert.deepEqual([...questionIds].sort(), ["neet-1", "neet-2"]);
});

check("falls back to legacy dual-tag before the other exam", () => {
  const { questionIds } = selectPaper({
    examId: "neet",
    quotas: [{ subjectId: "botany", count: 2 }],
    pool: [
      tagged("botany", "eamcet-1", ["TS EAMCET"]),
      tagged("botany", "legacy-1", ["TS EAMCET", "NEET"]),
    ],
    seenIds: new Set(),
  });
  assert.equal(questionIds[0], "legacy-1");
  assert.equal(questionIds[1], "eamcet-1");
});

check("without examId keeps old unseen-first behaviour", () => {
  const seenIds = new Set(["phy-0"]);
  const { questionIds } = selectPaper({
    quotas: [{ subjectId: "physics", count: 1 }],
    pool: pool("physics", 2, "phy"),
    seenIds,
  });
  assert.equal(questionIds[0], "phy-1");
});
```

- [ ] **Step 2: Run** `npm run check:paper` — new checks FAIL.

- [ ] **Step 3: Implement** `selectPaper` buckets + pass `exams` from both stores + pass `examId` from `startAttempt`.

- [ ] **Step 4: Run** `npm run check:paper` — all PASS.

---

### Task 3: Persist difficulty and conceptId

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `scripts/lib/bank.mjs`
- Create: `supabase/migrations/0002_question_meta.sql`
- Modify: `scripts/generate-seed.mjs`
- Modify: `src/lib/db/supabase-store.ts` (`toQuestion`)

```ts
export type QuestionDifficulty = "easy" | "medium" | "hard";

// on Question:
difficulty?: QuestionDifficulty;
conceptId?: string;
```

`bank.mjs` `normalizeFile`:

- Read `difficulty`, `conceptId`, `exam`.
- If `exam` is `ts-eamcet` or `neet`, set `pyq.exams` to `["TS EAMCET"]` or `["NEET"]` when `pyq.exams` is missing.
- If both present and they disagree, throw.

Migration:

```sql
alter table question_bank add column if not exists difficulty text
  check (difficulty in ('easy', 'medium', 'hard'));
alter table question_bank add column if not exists concept_id text;

create or replace view questions as
select
  q.id, q.chapter_id, q.subject_id, q.stem, q.options, q.answer_index,
  q.explanation, q.images, q.source, q.difficulty, q.concept_id,
  jsonb_build_object(
    'appearCount', coalesce(m.appear_count, 0),
    'years', to_jsonb(coalesce(m.years, '{}')),
    'exams', to_jsonb(coalesce(m.exams, '{}')),
    'verified', coalesce(m.verified, false)
  ) as pyq
from question_bank q
left join question_pyq_meta m on m.question_id = q.id;
```

Old seed files without the new fields stay valid (`difficulty`/`conceptId` optional on legacy rows).

- [ ] **Step 1: Extend** `scripts/build-bank.mjs` smoke by running `npm run bank:build` after a tiny fixture check in `check-authored` (Task 4) if needed. First add types + normalize + migration.
- [ ] **Step 2: Run** `npm run bank:build` — existing bank still builds.

---

### Task 4: Authored-file import gate

**Files:**
- Create: `scripts/check-authored.mjs`
- Modify: `package.json` (`"check:authored": "node scripts/check-authored.mjs"`)

Gate a file (or all `content/seed/*__*.json`):

1. `chapterId` in catalog, `subjectId` matches.
2. Unique ids vs built bank + file.
3. Exactly 4 options, valid `answerIndex`, explanation non-empty, stem 20–420 chars.
4. `exam` is `ts-eamcet` or `neet`; `difficulty` is easy/medium/hard; `conceptId` is on that chapter’s map.
5. `pyq.exams` is exactly one matching exam; `appearCount` 0; `years` []; `verified` false.
6. Concept map: every concept has ≥1 EAMCET and ≥1 NEET item in the file.
7. Difficulty mix per exam: easy share within 10 points of 70%, hard share ≤ 15% (small-N off-by-one allowed).
8. Local stem clash vs seed/generated/imported/bank using `stemsClash`.
9. Remote: if `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are set, fetch stems and clash-check. If `--upload` is passed and remote is unset/unreachable, exit non-zero. Without `--upload`, skip remote.

- [ ] **Step 1: Write a tiny fixture** under `content/concepts/botany/_gate-sample.json` only if needed; prefer checking a real first chapter file in Task 5. For the gate itself, add assertions at the top of `check-authored.mjs` for helper functions, or a `scripts/check-authored-self.mjs` that imports internals.

Keep helpers exported from `check-authored.mjs` (`loadConceptMap`, `summarizeFile`) and assert in `scripts/check-authored-self.mjs` with a temp map+questions object (no disk fixture required if helpers accept data).

- [ ] **Step 2: Implement gate. Run self-check, then `npm run check:authored` on empty new-file set (exit 0).**

---

### Task 5: First Bio chapter (proves the pipe)

**Files:**
- Create: `content/concepts/botany/botany-the-living-world.json`
- Create: `content/seed/botany__the-living-world.json`

Living World concepts (minimum set):

- `binomial-nomenclature`
- `taxonomic-hierarchy`
- `species-concept`
- `herbarium-and-keys`
- `botanical-gardens-museums`
- `taxonomic-aids`
- `icbn-iczn`
- `systematics-vs-taxonomy`
- `growth-reproduction-as-criteria`
- `diversity-and-nomenclature`

Write 13 EAMCET + 13 NEET original items (`bot-lw-e-101…`, `bot-lw-n-101…`), 70/25/5, every concept ≥1 each exam, explanations, no invented PYQ years. Dedup against existing `bot-lw-001`… stems.

- [ ] **Step 1: Write map + seed.**
- [ ] **Step 2: Run** `node scripts/check-authored.mjs --file content/seed/botany__the-living-world.json`
- [ ] **Step 3: Run** `npm run bank:build` and `npm run check:bank`

---

### Task 6: Remaining 38 Bio chapters

Repeat Task 5 for every remaining Botany and Zoology catalog chapter. Same counts, same gate, same id scheme (existing short prefixes + `e`/`n` + 101+).

Short prefixes to reuse/extend:

| Chapter id | Prefix |
|------------|--------|
| botany-the-living-world | lw |
| botany-biological-classification | bc |
| botany-science-of-plants-botany | sp |
| botany-plant-kingdom | pk |
| botany-morphology-of-flowering-plants | mf |
| botany-modes-of-nutrition | mn |
| botany-cell-the-unit-of-life | cl |
| botany-internal-organisation-of-plants | io |
| botany-plant-ecology | pe |
| botany-transport-in-plants | tp |
| botany-mineral-nutrition | min |
| botany-enzymes | enz |
| botany-photosynthesis-in-higher-plants | ps |
| botany-respiration-in-plants | rp |
| botany-plant-growth-and-development | pg |
| botany-reproduction-in-plants | rpl |
| botany-continuity-of-life | col |
| botany-molecular-basis-of-inheritance | mb |
| botany-biotechnology | bt |
| botany-plants-microbes-and-human-welfare | pm |
| zoology-diversity-in-the-living-world | dv |
| zoology-structural-organisation-in-animals | so |
| zoology-animal-diversity-i-invertebrate-phyla | ad1 |
| zoology-animal-diversity-ii-phylum-chordata | ad2 |
| zoology-locomotion-and-reproduction-in-protozoa | prt |
| zoology-biology-in-human-welfare | hw |
| zoology-periplaneta-americana-cockroach | ck |
| zoology-ecology-and-environment | eco |
| zoology-digestion-and-absorption | dig |
| zoology-breathing-and-respiration | br |
| zoology-body-fluids-and-circulation | bf |
| zoology-excretory-products-and-their-elimination | ex |
| zoology-muscular-and-skeletal-system | ms |
| zoology-neural-control-and-coordination | nc |
| zoology-endocrine-system-and-chemical-coordination | en |
| zoology-human-reproduction | hr |
| zoology-genetics | gn |
| zoology-organic-evolution | ev |
| zoology-applied-biology | ab |

After each batch: `check-authored` on those files, then `bank:build` + `check:bank`.

---

### Task 7: Wire checks and verify mocks

- [ ] Add `check:authored` to `package.json`.
- [ ] Run `npm run check:stems`, `check:paper`, `check:bank`, `check:authored`, `bank:build`.
- [ ] Apply `0002_question_meta.sql` to Supabase when credentials exist; upsert **new ids only**.
- [ ] Browser: start a NEET BiPC mock (Living World + Digestion) and an EAMCET BiPC mock; confirm Bio items match the sitting exam while stock lasts.

---

## Spec coverage

| Spec section | Task |
|--------------|------|
| Concept maps | 5, 6 |
| New fields / exam copy | 3 |
| Dedup | 1, 4 |
| Import gate | 4 |
| Paper routing | 2 |
| Schema + upload | 3, 7 |
| Bio wave content | 5, 6 |
| No invented PYQ years | 4, 5, 6 |
| Legacy fallback | 2 |

## Notes for the implementer

- Do not commit unless the user asks.
- Do not paste official paper stems.
- Do not dual-tag new items.
- Existing `botany.json` / `zoology.json` stay untouched.
