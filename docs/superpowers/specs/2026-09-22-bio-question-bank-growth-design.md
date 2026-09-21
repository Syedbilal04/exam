# Bio Question Bank Growth — Design Spec

**Date:** 2026-09-22  
**Scope:** Botany + Zoology TSBIE chapters (first growth wave)  
**Related:** `docs/superpowers/specs/2026-09-09-mock-exam-portal-design.md`

## Product summary

Grow the ASTRA question bank so each TSBIE chapter can eventually hold about **200** original MCQs. This wave starts with **Botany and Zoology** (the thinnest subjects) and adds a concept-complete first layer to **every Bio chapter**, with **separate TS EAMCET and NEET items** (not one stem tagged for both).

Students should leave a mock having **learned the chapter**, not just survived a hard paper. New items are mostly easy, exam-typical, and cover every concept — not a dump of similar lines to hit a count.

Official NEET / TS EAMCET / NTA papers stay copyrighted. We write **original** questions on **themes that repeat**. We do not paste, scrape, or reconstruct official stems.

## Locked decisions

| Topic | Decision |
|-------|----------|
| Subjects this wave | Botany + Zoology only (20 + 19 = **39** catalog chapters) |
| Later subjects | Physics, Chemistry, Maths after this wave’s pipeline is proven |
| Chapter order | All 39 Bio chapters in parallel this wave (coverage first, depth later) |
| Per-chapter target this wave | **12–15 TS EAMCET + 12–15 NEET** new items (~24–30 per chapter) |
| Long-term chapter target | ~**200** items **per chapter total**, split across the two exams (about 100 each), not 200 per exam yet |
| Difficulty mix | **70% easy / 25% medium / 5% hard**, counted per chapter **and** per exam |
| Exam split | Separate stems. No new item may list both exams. |
| Exam voice | EAMCET: TSBIE Intermediate phrasing, direct fact / one-step. NEET: NCERT-line phrasing, exception / location / “which is incorrect”, still 4-option MCQ. |
| Same concept, two exams | Required: different stem **and** different options. Same sentence with the exam name swapped is rejected. |
| PYQ metadata on new items | `exams`: one of `["TS EAMCET"]` or `["NEET"]`. `appearCount`: **0**. `years`: **[]**. `verified`: **false**. Do not invent appearance years or counts. |
| Question source | Original authored seed JSON (licensed imports stay a separate path) |
| Dedup | Normalized-stem match against local bank **and** live Supabase `question_bank` |
| Paper routing | Prefer items tagged for the sitting exam; fallback documented below |
| Student-facing UI | Stem, options, explanation, existing PYQ line. Difficulty and concept id are **not** shown. |

## Current baseline (2026-09-22)

- Bank: **1701** questions, **135** chapters, **0** chapters at 200.
- Bio: **377** questions across **39** chapters.
- Deepest Bio: Cell (49), Evolution (40), Molecular Basis (39), Genetics (30).
- Many Bio chapters have **1–6** items (Animal Diversity I, Protozoa, Plant Kingdom, etc.).
- Paper engine today ignores exam tags: it draws from selected chapters only, then prefers unseen ids.

## Concept maps

Each Bio chapter gets a checklist file **before** its questions are written.

Path: `content/concepts/<subjectId>/<chapterId>.json`

```json
{
  "chapterId": "zoology-digestion-and-absorption",
  "subjectId": "zoology",
  "concepts": [
    {
      "id": "digestive-enzymes-site",
      "label": "Enzyme source and site of action",
      "examHot": ["ts-eamcet", "neet"]
    }
  ]
}
```

Rules:

- The list must cover **all TSBIE ideas** in that chapter, not only trivia that is easy to write.
- `examHot` marks themes that commonly appear in that exam. Extra slots after the 1+1 minimum go here.
- This wave: every concept gets **at least one EAMCET item and one NEET item**.
- A chapter is not accepted because it reached 25 items if any mapped concept is empty for either exam.

## Question record

Authored items keep the existing seed shape and add three fields. `npm run bank:build` persists all three on the runtime `Question` type.

| Field | Required | Notes |
|-------|----------|--------|
| `id` | yes | Unique. Keep the existing short chapter prefix (`lw`, `dig`, `cl`, …). New series: `<bot\|zoo>-<prefix>-<e\|n>-<nnn>` starting at `101` so it never collides with `001–099`. Examples: `bot-lw-e-101`, `zoo-dig-n-101`. |
| `chapterId` | yes | Must exist in `src/content/catalog.ts` and match `subjectId` |
| `stem` | yes | 20–420 chars; TeX only inside `$...$` if needed |
| `options` | yes | Exactly **4**, all distinct, each ≤ 220 chars |
| `answerIndex` | yes | `0–3` |
| `explanation` | yes | Short teaching line (why the answer is right; one misconception if useful) |
| `exam` | yes | `"ts-eamcet"` or `"neet"` only |
| `difficulty` | yes | `"easy"` \| `"medium"` \| `"hard"` |
| `conceptId` | yes | Must exist on that chapter’s concept map |
| `pyq` | yes | Single exam; `appearCount` 0; `years` []; `verified` false |
| `images` | no | Empty unless a generated/local diagram exists |

Bank build copies `exam` → `pyq.exams` as one name (`TS EAMCET` or `NEET`). If `exam` and `pyq.exams` disagree, the file fails the import gate.

Difficulty meaning:

- **Easy:** textbook-direct definition, location, one fact, or one-step recall. Builds confidence. Still a real concept.
- **Medium:** exception, “which is incorrect”, two facts, simple application.
- **Hard:** rare. Pathway / three-statement / multi-step. At most ~5% per exam per chapter.

Every concept must have **at least one easy** item for each exam it is written for.

## File layout

| Path | Role |
|------|------|
| `content/concepts/botany/<chapterId>.json` | Botany concept map |
| `content/concepts/zoology/<chapterId>.json` | Zoology concept map |
| `content/seed/botany__<slug>.json` | New Botany items for one chapter (both exams in one file, tagged) |
| `content/seed/zoology__<slug>.json` | New Zoology items for one chapter |
| `content/seed/botany.json`, `zoology.json`, `*-extra.json` | Existing seeds; **do not rewrite**. They remain fallback pool. |
| `src/content/question-bank.json` | Generated bank. Never edit by hand. |
| `scripts/lib/stems.mjs` | Shared stem normalize + fingerprint |
| `scripts/check-authored.mjs` | Import gate: schema, coverage, local + remote dedup |

Existing `physics__laws-of-motion.json` naming is the model for per-chapter seed files.

## Dedup

Normalize: lowercase, replace non-alphanumeric runs with a single space, trim.

Reject a new item if any of these match an existing local or remote stem:

1. Exact normalized stem.
2. Normalized stem with digits stripped (blocks number-only clones).
3. The same normalized stem already used for the **other** exam.

Allowed:

- Same `conceptId`, different `exam`, **different** stem and options.
- Same `conceptId` and `exam`, new angle (not a paraphrase of an existing stem).

Local sources: `content/seed`, `content/generated`, `content/imported`, `src/content/question-bank.json`.  
Remote source: Supabase `question_bank.stem` when project credentials are present. If remote is unreachable, the gate **fails closed** for the upload step (local `bank:build` may still run, but nothing is upserted to Supabase).

## Import gate

`scripts/check-authored.mjs` must pass before `bank:build` is treated as shippable for a new file. It checks:

- Catalog `chapterId` / `subjectId`
- Unique `id` across the whole bank
- Four options, valid `answerIndex`
- `exam`, `difficulty`, `conceptId` present and valid
- `pyq.exams` is exactly one exam and matches `exam`
- Per-file concept coverage (every map concept has ≥1 EAMCET and ≥1 NEET)
- Per-file difficulty mix within 10 points of 70/25/5 for each exam (small files may be off by one item)
- Stem dedup (local always; remote when uploading)
- No empty explanation
- TeX / `check:bank` rules still apply

Failures are **dropped or the file is rejected**. They are not merged silently.

## Paper routing

`selectPaper` and `startAttempt` gain the sitting `examId`. Each pool row includes `exams: string[]` from `pyq.exams`.

Fill each subject quota in this order, still shuffling inside a bucket and still preferring unseen ids **inside** each bucket:

1. Unseen, tagged only for the sitting exam
2. Seen, tagged only for the sitting exam
3. Unseen, legacy dual-tag or empty `exams` (old seeds)
4. Seen, legacy dual-tag or empty `exams`
5. Unseen, tagged only for the other exam
6. Seen, tagged only for the other exam

A paper is still never blocked for shortage. Silent recycle stays. No “you have seen these” notice.

JEE Main does not use Botany/Zoology. This wave does not change JEE paper routing.

## Schema and live upload

New columns on `question_bank` (migration after `0001_init.sql`):

- `difficulty text` — `easy` \| `medium` \| `hard`, nullable for old rows
- `concept_id text` — nullable for old rows

Exam targeting stays in `question_pyq_meta.exams`.

Pipeline:

1. Author concept map + chapter seed file.
2. `node scripts/check-authored.mjs --file <path>`
3. `npm run bank:build` (local mocks read JSON).
4. `npm run seed:sql` regenerates `supabase/seed.sql` for full rebuilds.
5. Upload **new ids only** to Supabase (`insert … on conflict (id) do update` for those rows), after remote stem compare. **No truncate** of the live bank.

Local JSON is the source of truth. Supabase is the hosted copy.

## Authoring quality

- Prefer questions students will actually meet: definitions, locations, exceptions, standard numericals, “incorrect statement”.
- Easy items still teach. Wrong options are plausible (common mix-ups), not nonsense.
- Explanations say why the key is right in one or two sentences.
- No figure-dependent stem unless we ship the image.
- No offensive, medical-advice, or out-of-syllabus college content (same `OFF_SYLLABUS` spirit as the importer).
- Write in waves of a few chapters so review stays possible. The **commitment** is still all 39 Bio chapters this wave, not a sample.

## Out of scope (this wave)

- Physics, Chemistry, Maths growth
- Hitting 200 items per chapter in this wave
- Verified official PYQ years
- Assertion-reason as a separate UI type (NEET-style thinking is still 4-option MCQ)
- Showing difficulty or concept tags to students
- Enabling SciQ or other NC-licensed imports
- Rewriting existing dual-tagged seeds

## Success criteria

- Every Bio chapter has a concept map and a per-chapter seed file that passes the import gate.
- Every mapped concept has ≥1 EAMCET and ≥1 NEET item.
- New items are single-exam; no new dual tags.
- A NEET mock draws NEET-tagged Bio items first; an EAMCET mock does the same for EAMCET.
- Dedup rejects exact and digit-stripped stem clones against local + remote banks.
- Difficulty mix is ~70/25/5 per exam per new chapter file.
- Existing papers and old seeds keep working (legacy items are fallback).
- `npm run check:bank` and `npm run check:paper` still pass.

## Rollout

1. Schema + paper routing + check script (empty maps allowed until a chapter file is added).
2. Author maps + questions chapter-by-chapter for all 39 Bio chapters.
3. Build bank, upload new rows to Supabase, verify one NEET and one EAMCET Bio mock in the browser.
4. After this wave, repeat the same pipeline for Chemistry, then Physics, then Maths, deepening toward ~200/chapter.
