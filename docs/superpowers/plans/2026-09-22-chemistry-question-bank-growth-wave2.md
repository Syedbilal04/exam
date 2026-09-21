# Chemistry Wave 2 Implementation Plan

**Goal:** Bring Stoichiometry, Electrochemistry and Chemical Kinetics, Periodicity, and Solutions to ~200 original MCQs each.

**Spec:** `docs/superpowers/specs/2026-09-22-chemistry-question-bank-growth-wave2-design.md`

Do not rewrite existing seeds. Do not commit unless asked.

## Tasks

1. Concept maps in `content/concepts/chemistry/` (quotas sum to new-item counts).
2. Author scripts + seed JSON for the four chapters (`che-st` / `che-ek` / `che-pe` / `che-so`, ids from 101).
3. `node scripts/check-authored-chem.mjs --file <path>` for each file.
4. `npm run bank:build`, `check:bank`, `check:paper`.
5. Upsert new ids only to live Supabase. Browser spot-check one mock.
