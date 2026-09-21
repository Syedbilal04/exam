# Chemistry Question Bank Growth — Wave 2 Design

**Date:** 2026-09-22  
**Scope:** Four more high-weight TSBIE Chemistry chapters to ~200 items each  
**Follows:** `docs/superpowers/specs/2026-09-22-chemistry-question-bank-growth-design.md`

Wave 1 (Atomic Structure, Bonding, Equilibrium, Organic basics) is shipped. This wave uses the same pipeline, mix, and quality rules on the next exam-heavy leftovers.

## Locked decisions (unchanged)

| Topic | Decision |
|-------|----------|
| Mix | 60% easy / 30% medium / 10% hard on the **new** file (±10 points) |
| Exam tagging | Empty `pyq.exams`. Shared Intermediate pool |
| Dedup | `stemsClash` vs local bank and live `question_bank` |
| Existing seeds / MMLU | Keep. Do not rewrite. Off-syllabus MMLU does not count as coverage |

## Chapters

| Chapter | Existing | New | Prefix | Seed file |
|---------|---------:|----:|--------|-----------|
| Stoichiometry | 52 | 148 | `che-st` | `chemistry__stoichiometry.json` |
| Electrochemistry and Chemical Kinetics | 15 | 185 | `che-ek` | `chemistry__electrochemistry-kinetics.json` |
| Classification of Elements and Periodicity in Properties | 16 | 184 | `che-pe` | `chemistry__periodicity.json` |
| Solutions | 8 | 192 | `che-so` | `chemistry__solutions.json` |

Ids start at `101`. Existing `che-st-001` / `che-ek-001` / `che-so-001` stay.

Concentration of solutions is owned by **Solutions**. Stoichiometry may keep a thin molarity/dilution slice for year-1 exam items.

## Success

Same gate as wave 1: concept maps, quotas, ≥1 easy per concept, `check:authored-chem`, `bank:build`, `check:bank`, `check:paper`, live upsert of new ids only, browser spot-check.
