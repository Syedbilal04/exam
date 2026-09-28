# ASTRA: Mock Exam Portal

> Exam-pattern mock tests for Telangana Intermediate students preparing for **TS EAMCET**, **JEE Main** and **NEET**.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-optional-3FCF8E?style=flat-square&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

A student picks the exam, picks the TSBIE chapters they are revising, and sits a paper that follows the real question count, clock and marking scheme.

## ✨ Features

- **Real exam patterns:** each exam sets its subject quotas, duration and marking scheme.
- **Chapter-based papers:** the student picks at least one chapter per subject the exam needs (MPC or BiPC). Questions come only from those chapters.
- **Anti-repeat ledger:** unseen questions come first. Once they run out, earlier questions from the same chapters are mixed back in silently. The app never blocks the student and never nags them to pick more chapters.
- **Stable attempts:** question ids are frozen on the attempt, so a refresh returns the same paper.
- **Previous-year appearances:** under each question, the student sees how often it has appeared in past papers and in which years. Some seed questions ship with **sample** appearance data (labelled "sample paper history" on the result page); real years only appear when a source supplies verified data.
- **Maths & diagrams:** TeX rendered with KaTeX, plus SVG diagrams generated from the same numbers as the question stem.
- **Guest mode:** anyone can take a paper right away. History moves to the account on sign-in.
- **Two storage modes:** zero-config local mode (files in `./.data`) or Supabase mode for auth and history.
- **3D landing page:** hero scene built with React Three Fiber.

## 📚 Question bank

**4186 questions** covering all **135 TSBIE chapters** (Maths 584, Physics 623, Chemistry 1692, Botany 614, Zoology 673).

The content pipeline:
- imports only from sources with a declared reuse licence (`content/sources.json`), and records rejected sources with the reason
- maps imported questions to chapters by keyword signatures, and drops questions it can't place confidently, figure-dependent items, off-syllabus items and anything with unrendered TeX
- adds hand-authored practice sets (`scripts/author/`, mainly Chemistry and Biology)
- generates original numerical items (circle, parabola, quadratic, differentiation, kinematics, laws of motion, work-energy, electricity, ray optics, stoichiometry) together with their diagrams

## 🛠️ Tech Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling / UI | Tailwind CSS 4, Motion, React Three Fiber + Drei (Three.js) |
| Math rendering | KaTeX |
| Validation | Zod |
| Auth & data | Local file store **or** Supabase (`@supabase/ssr`, Postgres + RLS) |
| Deployment | Render Blueprint (`render.yaml`, health check at `/api/health`) |

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+ (required by Next.js 16; `render.yaml` uses Node 24)

### Local mode (no configuration)

```bash
npm install
npm run dev
# open http://localhost:3000
```

Without Supabase credentials, the app stores accounts, attempts and the anti-repeat ledger in `./.data`.

### Supabase mode

Copy the template and set all three Supabase values (`cp .env.example .env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

If only some of the three are set, the server refuses to start. Other variables the app reads (all listed in `.env.example`):

- `AUTH_SECRET` signs local-mode session cookies. It is **required when you run the local store in production** (see `src/lib/supabase/env.ts`); `render.yaml` generates it automatically.
- `ALLOW_LOCAL_STORE_IN_PRODUCTION=true` lets a production build run on the local file store (data in `./.data` is lost whenever the host wipes the disk).

Then apply the schema and seed:

```bash
npm run seed:sql   # regenerates supabase/seed.sql from the catalog + bank
# apply supabase/migrations/0001_init.sql and 0002_question_meta.sql in order, then supabase/seed.sql
```

The question rows contain the answer key, so RLS grants them to the service role only. Attempts and the seen-question ledger are written server-side, which is what lets guest sessions work before an account exists.

### Content & quality scripts

```bash
npm run import:pyq          # fetch allowlisted sources, then rebuild the bank
npm run generate:questions  # write original numerical items and their diagrams
npm run bank:build          # rebuild the bank without fetching
npm run check:bank          # fail if any question would show raw TeX
npm run check:paper         # paper rules: quotas, freshness, silent recycle
npm run check:stems         # unit checks for the duplicate-stem matcher
npm run lint
```

### Deploy to Render

`render.yaml` defines a free-tier Node web service (`npm ci && npm run build`, then `npm start`). Set the three Supabase variables in the Render dashboard; `AUTH_SECRET` is generated by the blueprint.

## 📁 Project Structure

```
src/app          routes: landing, setup wizard, mock cockpit, result, history, login
src/components   landing 3D scene, wizard, cockpit, auth form, math/figure rendering
src/content      exam/chapter catalog, brand, generated question-bank.json
src/lib/paper    paper generation, shuffling and scoring
src/lib/db       store interface with local-file and Supabase implementations
src/lib/auth     session handling for both modes
content/         seed questions, concepts, imported + generated items, source allowlist
scripts/         importers, generators, bank builder and checks
supabase/        schema migration and generated seed
public/questions generated SVG diagrams
```

## 📄 License

No licence file has been added yet, so all rights are reserved by default. Imported questions keep the licences listed in `content/sources.json`.
