# Mock Exam Portal — Design Spec

**Date:** 2026-09-09  
**Stack:** Next.js + Supabase + React Three Fiber (landing 3D)

## Product summary

Web app for **Telangana Intermediate (TSBIE)** **MPC** and **BIPC** students preparing for **TS EAMCET**, **JEE Main**, and **NEET**. Students take **Custom Mocks** only: pick an exam, pick a stream, select **at least one chapter per required subject**, then receive a paper in that exam’s **official pattern** (question counts, timer, marking). Questions come from an **open/public PYQ-style import pipeline** (not AI generation, not manual-only admin entry, not scraping arbitrary coaching sites). Each question shows **PYQ appearance count and years**. Guests can take mocks; **history saves after login**.

## Locked decisions

| Topic | Decision |
|-------|----------|
| Streams | MPC + BIPC |
| Syllabus / chapters | Telangana Intermediate (TSBIE) latest textbook chapter names |
| Target exams | TS EAMCET, JEE Main, NEET |
| MVP mode | Custom Mock only (no full-syllabus mode, no single-chapter drill mode) |
| Chapter rule | ≥1 chapter from each required subject for the chosen exam/stream |
| Questions source | Open/public PYQ datasets + fetch/import pipeline; enrich chapter banks over time |
| PYQ UI | Show times appeared + years under each question |
| Auth | Guest mocks allowed; history persisted after login (merge guest attempts) |
| UI | Landing: space/neon 3D; setup + test: glass + exam cockpit |
| Stack | Next.js + Supabase |
| Pool shortage | Deepen banks via import; if still short, **silent recycle** of same-chapter questions. **No** “add more chapters” block. **No** user-facing repeat warning |

## User flow

1. Landing (3D hero) → Start Mock  
2. Choose exam → Choose stream (valid combos only)  
3. Select chapters (TSBIE names); enforce ≥1 per required subject  
4. Generate paper from selected chapters using exam pattern quotas  
5. Take timed mock in cockpit UI; PYQ meta under each question  
6. Result screen (subject-wise score, review)  
7. Optional login → save/merge history  

## Data model (Supabase/Postgres)

- `exams` — pattern JSON: subject quotas, duration, marking scheme  
- `streams` — MPC, BIPC  
- `subjects` — Physics, Chemistry, Maths, Botany, Zoology (as needed)  
- `chapters` — TSBIE Intermediate chapter names, linked to subject  
- `questions` — stem, options, correct answer, chapter_id, subject_id, source attribution  
- `question_pyq_meta` — appear_count, years[]  
- `attempts` — user_id nullable, guest_session_id, exam, stream, selected chapters, score, timing  
- `attempt_answers` — per-question response  
- `seen_questions` — user/guest + question_id + last_seen_at  

## Paper generation (anti-repeat)

1. Read exam pattern → target N per subject  
2. Build pool from selected chapters only  
3. Prefer questions not in `seen_questions` for that user/guest  
4. Sample **without replacement** within the attempt  
5. If unique pool &lt; N for a subject: **silently** fill remaining from already-seen questions in the **same selected chapters** (reshuffled). Never block start. Never show a recycle notice  
6. Persist frozen question ID list on attempt create (stable across refresh)  
7. After submit, update `seen_questions`  

Background/import jobs continuously deepen per-chapter banks from configured open sources so recycle is rare.

## Import pipeline

- Configured allowlist of open/public PYQ resources  
- Normalize → map to TSBIE chapters → upsert questions + PYQ meta  
- Store source attribution; do not scrape sites that forbid it or lack clear reuse rights  

## UI surfaces

- **Landing** — R3F space/neon, brand-forward hero, single CTA  
- **Setup wizard** — glass UI: exam → stream → chapter pickers  
- **Mock cockpit** — timer, question palette, options, PYQ meta  
- **Result** — scores + review  
- **History** — logged-in attempts; guest prompt to login to save  
- **Auth modal** — email/password (+ optional Google)  

## Out of scope (MVP)

- Full syllabus mock mode  
- Single-chapter practice (non-exam pattern)  
- AI-generated questions  
- Admin-only manual question authoring as the primary content path  
- Payment / subscriptions  
- Live classes / video content  

## Success criteria

- Student can complete Custom Mock for EAMCET/JEE/NEET with correct pattern  
- Second attempt on same chapters is not a trivial reshuffle of the identical set when a deeper unique pool exists  
- Guest → login preserves history  
- Landing feels premium 3D; test UI stays readable and fast  
