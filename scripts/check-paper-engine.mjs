import assert from "node:assert/strict";
import { selectPaper } from "../src/lib/paper/generate.ts";

function pool(subjectId, size, prefix) {
  return Array.from({ length: size }, (_, i) => ({
    id: `${prefix}-${i}`,
    subjectId,
  }));
}

const checks = [];

function check(name, fn) {
  fn();
  checks.push(name);
}

check("fills each subject quota from its own pool", () => {
  const { questionIds } = selectPaper({
    quotas: [
      { subjectId: "physics", count: 4 },
      { subjectId: "maths", count: 6 },
    ],
    pool: [...pool("physics", 20, "phy"), ...pool("maths", 20, "mat")],
    seenIds: new Set(),
  });

  assert.equal(questionIds.length, 10);
  assert.equal(questionIds.filter((id) => id.startsWith("phy")).length, 4);
  assert.equal(questionIds.filter((id) => id.startsWith("mat")).length, 6);
});

check("never repeats a question inside one paper", () => {
  const { questionIds } = selectPaper({
    quotas: [{ subjectId: "physics", count: 12 }],
    pool: pool("physics", 12, "phy"),
    seenIds: new Set(),
  });

  assert.equal(new Set(questionIds).size, questionIds.length);
});

check("serves unseen questions before anything already seen", () => {
  const seenIds = new Set(["phy-0", "phy-1", "phy-2", "phy-3", "phy-4"]);
  const { questionIds } = selectPaper({
    quotas: [{ subjectId: "physics", count: 5 }],
    pool: pool("physics", 10, "phy"),
    seenIds,
  });

  assert.equal(questionIds.length, 5);
  assert.ok(
    questionIds.every((id) => !seenIds.has(id)),
    `expected only unseen questions, got ${questionIds.join(", ")}`,
  );
});

check("two runs on the same chapters differ while fresh stock lasts", () => {
  const available = pool("physics", 40, "phy");
  const first = selectPaper({
    quotas: [{ subjectId: "physics", count: 20 }],
    pool: available,
    seenIds: new Set(),
  });
  const second = selectPaper({
    quotas: [{ subjectId: "physics", count: 20 }],
    pool: available,
    seenIds: new Set(first.questionIds),
  });

  const overlap = second.questionIds.filter((id) =>
    first.questionIds.includes(id),
  );
  assert.equal(overlap.length, 0, "second paper reused questions unnecessarily");
});

check("still delivers a paper when every question has been seen", () => {
  const available = pool("physics", 6, "phy");
  const { questionIds, breakdown } = selectPaper({
    quotas: [{ subjectId: "physics", count: 40 }],
    pool: available,
    seenIds: new Set(available.map((q) => q.id)),
  });

  assert.equal(questionIds.length, 6, "paper must not be blocked");
  assert.equal(new Set(questionIds).size, 6);
  assert.equal(breakdown[0].recycled, 6);
});

console.log(`Paper engine checks passed (${checks.length}):`);
for (const name of checks) console.log(`  - ${name}`);
