# Chemistry Question Bank Growth — Design Spec

**Date:** 2026-09-22  
**Scope:** Four high-weight TSBIE Chemistry chapters to ~200 items each  
**Related:** `docs/superpowers/specs/2026-09-09-mock-exam-portal-design.md`, `docs/superpowers/specs/2026-09-22-bio-question-bank-growth-design.md`

## Product summary

Grow the ASTRA Chemistry bank so four exam-heavy TSBIE chapters each hold about **200** original MCQs. Students should leave a mock having **learned the chapter**, not just survived a hard paper. New items are mostly easy, exam-typical, and cover every textbook idea — not a dump of similar lines to hit a count.

Official TS EAMCET / JEE / NEET papers stay copyrighted. We write **original** questions on **themes that repeat**. We do not paste, scrape, or reconstruct official stems.

Chemistry is sat by **MPC and BiPC** (TS EAMCET, JEE Main, NEET). This wave does **not** split items into exclusive per-exam papers. One Intermediate-level pool serves every mock that picks the chapter.

## Locked decisions

| Topic | Decision |
|-------|----------|
| Subject this wave | Chemistry only |
| Chapters | Atomic Structure; Chemical Bonding and Molecular Structure; Chemical Equilibrium and Acids–Bases; Organic Chemistry: Some Basic Principles and Techniques |
| Per-chapter target | ~**200** total items (existing + new) |
| Difficulty mix | **60% easy / 30% medium / 10% hard**, counted on the **new** file (±10 points) |
| Exam tagging | New items have empty `pyq.exams`. No invented years. No exclusive EAMCET/NEET/JEE split |
| PYQ metadata | `appearCount` 0, `years` [], `exams` [], `verified` false |
| Question source | Original authored seed JSON |
| Dedup | Normalized-stem match against local bank **and** live Supabase `question_bank` |
| Student-facing UI | Stem, options, explanation, existing PYQ line. Difficulty and concept id are **not** shown |
| Existing seeds / MMLU | Keep. Do not rewrite. Off-syllabus MMLU rows do not count as covering a TSBIE concept |

## Current baseline (2026-09-22)

Local bank and live `exam` project match for Chemistry: **258** items.

| Chapter | Existing | New target | Prefix |
|---------|---------:|-----------:|--------|
| Organic basics | 3 | ~197 | `che-ob` |
| Atomic structure | 14 | ~186 | `che-as` |
| Chemical bonding | 24 | ~176 | `che-cb` |
| Equilibrium and acids–bases | 34 | ~166 | `che-eq` |

Ids start at `101` so they never collide with `che-as-001` etc.

## Concept maps

Each chapter gets a checklist **before** its questions are written.

Path: `content/concepts/chemistry/<chapterId>.json`

```json
{
  "chapterId": "chemistry-atomic-structure",
  "subjectId": "chemistry",
  "concepts": [
    { "id": "quantum-numbers", "label": "Quantum numbers n, l, m, s", "examHot": true }
  ]
}
```

A chapter file is rejected if any mapped concept has zero items, even if the row count is 200.

### Organic Chemistry: Some Basic Principles — quotas (new items)

| conceptId | New | Notes |
|-----------|----:|-------|
| classification-homologous | 18 | Acyclic/cyclic, homologous series |
| functional-groups | 16 | Identification from formula / name |
| iupac-nomenclature | 28 | Highest exam frequency |
| structural-isomerism | 22 | Chain, position, functional, metamerism, tautomerism |
| geometrical-isomerism | 10 | Restricted rotation, cis–trans |
| fission-reagents | 18 | Homo/hetero, nucleophile, electrophile, free radical |
| inductive-electromeric | 16 | +I/−I, electromeric |
| resonance-hyperconjugation | 18 | Carbocation / radical stability |
| reaction-types | 14 | Addition, substitution, elimination, rearrangement |
| purification | 16 | Crystallisation, distillation, chromatography |
| qualitative-lassaigne | 12 | N, S, halogens |
| quantitative-analysis | 9 | Liebig, Dumas, Kjeldahl, Carius |

### Atomic Structure — quotas (new items)

| conceptId | New |
|-----------|----:|
| particles-models | 16 |
| planck-photoelectric | 12 |
| hydrogen-spectrum | 20 |
| bohr-model | 28 |
| debroglie-heisenberg | 16 |
| quantum-mechanical | 8 |
| quantum-numbers | 24 |
| orbital-shapes-nodes | 14 |
| aufbau-pauli-hund | 18 |
| configuration-exceptions | 20 |
| unpaired-magnetic | 10 |

### Chemical Bonding — quotas (new items)

| conceptId | New |
|-----------|----:|
| lewis-bond-types | 16 |
| formal-charge-resonance | 14 |
| bond-parameters | 12 |
| fajan-dipole | 16 |
| vsepr | 24 |
| hybridisation | 24 |
| vbt-mot-intro | 8 |
| mot-diatomics | 28 |
| hydrogen-bonding | 14 |
| metallic-bonding | 8 |
| sigma-pi-counts | 12 |

### Chemical Equilibrium and Acids–Bases — quotas (new items)

| conceptId | New |
|-----------|----:|
| dynamic-equilibrium | 10 |
| kc-kp | 24 |
| homo-hetero-k | 8 |
| degree-dissociation | 12 |
| le-chatelier | 20 |
| acid-base-theories | 14 |
| ph-strong | 20 |
| weak-ka-kb | 16 |
| conjugate-pairs | 10 |
| buffer-henderson | 12 |
| salt-hydrolysis | 10 |
| ksp-common-ion | 10 |

## Question record

Keep the existing seed shape. Add two authoring fields. `npm run bank:build` copies both onto the runtime `Question` type when present.

| Field | Required | Notes |
| --- | --- | --- |
| `id` | yes | `che-<prefix>-<nnn>` from 101 |
| `chapterId` | yes | Must exist in `src/content/catalog.ts` |
| `stem` | yes | 20–420 chars; TeX only inside `$...$` |
| `options` | yes | Exactly **4**, all distinct, each ≤ 220 chars |
| `answerIndex` | yes | `0–3` |
| `explanation` | yes | One or two teaching sentences |
| `difficulty` | yes | `"easy"` \| `"medium"` \| `"hard"` |
| `conceptId` | yes | Must exist on that chapter’s concept map |
| `pyq` | yes | Empty exams; count 0; no years |
| `images` | no | Empty unless a local diagram exists |

Difficulty meaning:

- **Easy:** textbook-direct definition, one fact, or one-step recall. Builds confidence. Still a real concept.
- **Medium:** standard exam application (hybridisation from structure, Kp–Kc with Δn, IUPAC of a branched chain).
- **Hard:** two-step Intermediate. Not JEE Advanced. About 10% of the new file.

Every mapped concept must have **at least one easy** item.

## File layout

| Path | Role |
|------|------|
| `content/concepts/chemistry/<chapterId>.json` | Concept map |
| `content/seed/chemistry__atomic-structure.json` | New Atomic Structure items |
| `content/seed/chemistry__chemical-bonding.json` | New bonding items |
| `content/seed/chemistry__chemical-equilibrium.json` | New equilibrium items |
| `content/seed/chemistry__organic-basics.json` | New organic-basics items |
| `content/seed/chemistry.json`, `chemistry-extra.json` | Existing seeds; **do not rewrite** |
| `src/content/question-bank.json` | Generated bank. Never edit by hand |
| `scripts/lib/stems.mjs` | Shared stem normalize + fingerprint |
| `scripts/lib/author-chem.mjs` | Shared author helpers |
| `scripts/check-authored-chem.mjs` | Import gate |

## Dedup

Normalize: lowercase, replace non-alphanumeric runs with a single space, trim.

Reject a new item if any of these match an existing local or remote stem:

1. Exact normalized stem.
2. Normalized stem with digits stripped (blocks number-only clones).

Allowed: same `conceptId`, new angle, **different** wording (not a paraphrase). Calculation families (Bohr, pH, Kp–Kc) must change the **sentence**, not only the number.

Local sources: `content/seed`, `content/generated`, `content/imported`, `src/content/question-bank.json`.  
Remote source: Supabase `question_bank.stem` when credentials are present. If remote is unreachable, local `bank:build` may still run, but **nothing is upserted** to Supabase.

## Import gate

`node scripts/check-authored-chem.mjs` must pass before a new Chemistry file is treated as shippable. It checks:

- Catalog `chapterId` / `subjectId`
- Unique `id` across the whole bank
- Four options, valid `answerIndex`
- `difficulty` and `conceptId` present and valid
- Every map concept has ≥1 item and ≥1 easy item
- Per-file difficulty mix within 10 points of 60/30/10
- Stem dedup (local always; remote when uploading)
- Non-empty explanation
- TeX / `check:bank` rules still apply

Failures are **dropped or the file is rejected**. They are not merged silently.

## Schema and live upload

No new database columns this wave. `difficulty` and `conceptId` live in seed JSON and in `question-bank.json`. Supabase keeps the existing `question_bank` / `question_pyq_meta` columns.

Pipeline:

1. Author concept map + chapter seed file.
2. `node scripts/check-authored-chem.mjs --file <path>`
3. `npm run bank:build`
4. `npm run check:bank` and `npm run check:paper`
5. Upload **new ids only** to Supabase (`insert … on conflict (id) do update`). **No truncate**.

Local JSON is the source of truth. Supabase is the hosted copy.

## Authoring quality

- Prefer questions students will actually meet: definitions, hybridisation, MOT of O₂, IUPAC, Le Chatelier, pH of strong acids.
- Easy items still teach. Wrong options are plausible (common mix-ups), not nonsense.
- Explanations say why the key is right in one or two sentences.
- No figure-dependent stem unless we ship the image.
- No off-syllabus college content (NMR, EDTA, spin trapping, group theory, Schrödinger as an operator).
- Order of work: organic basics → atomic structure → bonding → equilibrium.

## Out of scope (this wave)

- Other Chemistry chapters
- Botany, Zoology, Physics, Maths
- Verified official PYQ years
- Exclusive per-exam routing for Chemistry
- Showing difficulty or concept tags to students
- Enabling SciQ or other NC-licensed imports
- Deleting or re-tagging existing MMLU rows
- Rewriting `chemistry.json` / `chemistry-extra.json`

## Success criteria

- Four concept maps and four per-chapter seed files pass the import gate.
- Each of the four chapters has ≥ ~200 items in the built bank.
- Every mapped concept has items, including at least one easy item.
- New items have empty PYQ years and are original.
- Dedup rejects exact and digit-stripped stem clones against local + remote banks.
- Difficulty mix is ~60/30/10 on each new file.
- Existing papers and old seeds keep working.
- `npm run check:bank` and `npm run check:paper` still pass.
- New ids are present in live Supabase `question_bank`.

## Rollout

1. Concept maps + check script + optional `difficulty` / `conceptId` on the JSON bank.
2. Author the four chapter files in the order above.
3. Build bank, upload new rows, spot-check one Chemistry mock in the browser.
