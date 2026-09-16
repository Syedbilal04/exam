# ASTRA — mock exam portal

Exam-pattern mock tests for Telangana Intermediate students preparing for
**TS EAMCET**, **JEE Main** and **NEET**. A student picks the exam, picks the
TSBIE chapters they are revising, and sits a paper that follows the real
question count, clock and marking scheme.

## How a paper is built

1. The exam fixes the pattern: subject quotas, duration and marking.
2. The student must pick at least one chapter from every subject that exam
   needs (MPC or BiPC).
3. Questions are drawn from those chapters only. Questions the student has not
   seen before come first; once those run out, earlier questions from the same
   chapters are mixed back in silently.
4. The paper never blocks and never nags the student to select more chapters.
   Revising a single chapter repeatedly is a supported way to use the app.
5. Question ids are frozen on the attempt, so a refresh returns the same paper.

Under every question the student sees how many times it has appeared in
previous papers and in which years.

## Running locally

```bash
npm install
npm run dev
```

No configuration is needed. Without Supabase credentials the app runs in
**local mode**: accounts, attempts and the anti-repeat ledger live in `./.data`.
Guests can take papers immediately; history moves to the account on sign-in.

## Supabase mode

Set all three values in `.env.local` (see `.env.example`) to switch to Supabase
for auth and history:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Then apply the schema and content:

```bash
npm run seed:sql     # regenerates supabase/seed.sql from the catalog + bank
# apply supabase/migrations/0001_init.sql, then supabase/seed.sql
```

Question rows carry the answer key, so RLS grants them to the service role
only. Attempts and the seen-question ledger are written server-side, which is
what lets guest sessions work before an account exists.

## Content pipeline

| Path | Purpose |
| --- | --- |
| `src/content/catalog.ts` | Exams, streams, subjects and TSBIE chapter lists |
| `content/seed/*.json` | Hand-authored starter questions |
| `content/sources.json` | Allowlist of licensed question sources |
| `content/chapter-keywords.json` | Keyword signatures that map imported questions onto chapters |
| `content/imported/*.json` | Output of the import run |
| `src/content/question-bank.json` | Generated bank the app reads |

Current bank: **1167 questions** covering all **135 TSBIE chapters** (Maths 283, Physics 289, Chemistry 218, Botany 198, Zoology 179).

```bash
npm run import:pyq          # fetch allowlisted sources, then rebuild the bank
npm run generate:questions  # write original numerical items and their diagrams
npm run bank:build          # rebuild the bank without fetching
npm run check:bank   # fail loudly if any question would show raw TeX
npm run check:paper  # paper generation rules: quotas, freshness, silent recycle
```

Only sources whose licence permits reuse belong in `content/sources.json`; the
importer refuses anything that is not declared there with a licence. The
rejected candidates and the reason each was turned down are recorded in the
same file — most Indian previous-paper dumps circulating online carry no usable
licence, because the papers remain the property of NTA and the IITs.

The importer maps every incoming question onto a TSBIE chapter by keyword, and
drops anything it cannot place confidently, anything that depends on a figure,
anything outside the Intermediate syllabus, and anything containing unrendered
TeX. Expect roughly half of a source to be discarded; that is the filter doing
its job.

### Maths and diagrams

Question text may contain TeX between `$...$`, rendered with KaTeX at render
time. Sources routinely delimit math in the stem but leave options as bare
`\frac{1}{12}`; the importer wraps a field that is pure TeX and rejects a field
that mixes prose with undelimited TeX, so nothing reaches a student as raw
backslash markup. `npm run check:bank` guards this.

A question may also carry diagrams. They are stored as
`{ url, alt, width, height }` and served from `public/questions/<source>/`; the
importer downloads and measures each file rather than hotlinking it, and drops
a figure-based question whose image could not be fetched. Generated items draw
their own SVG from the same numbers as the stem, under `public/questions/gen/`.
The enabled import sources still ship no figures.

Previous-year metadata: the hand-authored seed questions ship with **sample**
appearance data so the feature is visible from the first run, and imported
questions carry none, so no appearance line is shown for them. Real years only
appear once a source supplies them, which sets `pyq.verified: true`.

## Project layout

```
src/app          routes: landing, setup wizard, mock cockpit, result, history, login
src/components   landing 3D scene, wizard, cockpit, auth form
src/lib/paper    paper generation and scoring
src/lib/db       store interface with local-file and Supabase implementations
src/lib/auth     session handling for both modes
supabase         schema migration and generated seed
```
