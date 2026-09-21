# Chemistry Question Bank Growth Implementation Plan

> **For agentic workers:** Execute this plan in the current session. Do not stop for execution-mode questions. Do not commit unless the user asks.

**Goal:** Bring four TSBIE Chemistry chapters to about 200 original, concept-complete MCQs each, without duplicating the local or live bank.

**Architecture:** Concept-map JSON per chapter, original seed JSON per chapter, a check script that enforces coverage / mix / dedup, `npm run bank:build` to merge into `src/content/question-bank.json`, then upsert **new ids only** to Supabase.

**Tech Stack:** Node scripts, existing seed JSON shape, Supabase `question_bank` + `question_pyq_meta`.

**Spec:** `docs/superpowers/specs/2026-09-22-chemistry-question-bank-growth-design.md`

---

## Files

| Path | Responsibility |
|------|----------------|
| `content/concepts/chemistry/<chapterId>.json` | Concept checklist and quotas |
| `content/seed/chemistry__atomic-structure.json` | New Atomic Structure items |
| `content/seed/chemistry__chemical-bonding.json` | New bonding items |
| `content/seed/chemistry__chemical-equilibrium.json` | New equilibrium items |
| `content/seed/chemistry__organic-basics.json` | New organic-basics items |
| `scripts/lib/author-chem.mjs` | Shared `item()` helper, source, empty PYQ |
| `scripts/check-authored-chem.mjs` | Schema, coverage, mix, local (+ optional remote) dedup |
| `scripts/lib/bank.mjs` | Persist optional `difficulty` and `conceptId` |
| `src/lib/types.ts` | Optional `difficulty` and `conceptId` on `Question` |
| `package.json` | `check:authored-chem` script |

Do not rewrite `content/seed/chemistry.json` or `chemistry-extra.json`. Do not add database columns this wave.

---

### Task 1: Persist optional authoring fields

**Files:**
- Modify: `scripts/lib/bank.mjs`
- Modify: `src/lib/types.ts`
- Modify: `package.json`

- [ ] Copy `difficulty` and `conceptId` through `normalizeFile` when present
- [ ] Add optional fields on `Question`
- [ ] Add `"check:authored-chem": "node scripts/check-authored-chem.mjs"`

### Task 2: Concept maps + check gate

**Files:**
- Create: `content/concepts/chemistry/*.json` (four maps, ids from the spec)
- Create: `scripts/lib/author-chem.mjs`
- Create: `scripts/check-authored-chem.mjs`

- [ ] Maps list every spec `conceptId` with a `quota`
- [ ] Gate fails if a concept is empty, mix is off 60/30/10 by more than 10 points, stems clash, or ids collide
- [ ] Run: `node scripts/check-stems.mjs` — still passes

### Task 3: Author four chapter files

Order: organic basics → atomic structure → bonding → equilibrium.

Each file:

```json
{
  "subjectId": "chemistry",
  "source": {
    "name": "ASTRA chemistry practice set",
    "license": "Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"
  },
  "questions": []
}
```

Ids: `che-ob-101`, `che-as-101`, `che-cb-101`, `che-eq-101`.

- [ ] Hit spec quotas per concept
- [ ] 60/30/10 mix, ≥1 easy item per concept
- [ ] Four distinct options, teaching explanation, empty PYQ
- [ ] `node scripts/check-authored-chem.mjs --file <path>` passes

### Task 4: Build, verify, upload

- [ ] `npm run bank:build`
- [ ] `npm run check:bank` (0 leaking TeX)
- [ ] `npm run check:paper`
- [ ] Confirm each of the four chapters has ≥ 200 items
- [ ] Upsert new ids only into live Supabase (`hghoqfwdxnlwjxxulxkp`). No truncate.

### Task 5: Browser spot-check

- [ ] Start or use the local app, pick Chemistry chapters in a mock, confirm a new item renders with options and explanation.
