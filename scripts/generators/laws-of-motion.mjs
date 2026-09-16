import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "physics-laws-of-motion";

function acceleration(n) {
  const m = 2 + (n % 7);
  const a = 2 + (n % 5);
  const f = m * a;
  const inputs = { f, m };
  const value = compute("acceleration", inputs);
  return draft({
    key: `a-${f}-${m}`,
    chapterId,
    stem: `A net force of ${f} N acts on a body of mass ${m} kg. Its acceleration is`,
    formula: "acceleration",
    inputs,
    unit: "m s^-2",
    wrongValues: [f, m, f + m, f * m],
    explanation: `a = F/m = ${f}/${m} = ${value} m s^-2.`,
    mustInclude: [`${f} N`, `${m} kg`],
  });
}

function force(n) {
  const m = 2 + (n % 7);
  const a = 2 + (n % 5);
  const inputs = { m, a };
  const value = compute("force", inputs);
  return draft({
    key: `f-${m}-${a}`,
    chapterId,
    stem: `A body of mass ${m} kg has an acceleration of ${a} m s^-2. The net force on it is`,
    formula: "force",
    inputs,
    unit: "N",
    wrongValues: [m + a, m, a, m * a + m],
    explanation: `F = ma = (${m})(${a}) = ${value} N.`,
    mustInclude: [`${m} kg`, `${a} m s^-2`],
  });
}

function momentum(n) {
  const m = 2 + (n % 8);
  const v = 2 + (n % 6);
  const inputs = { m, v };
  const value = compute("momentum", inputs);
  return draft({
    key: `p-${m}-${v}`,
    chapterId,
    stem: `A body of mass ${m} kg moves at ${v} m s^-1. Its momentum is`,
    formula: "momentum",
    inputs,
    unit: "kg m s^-1",
    wrongValues: [m + v, m, v, m * v * 2],
    explanation: `p = mv = (${m})(${v}) = ${value} kg m s^-1.`,
    mustInclude: [`${m} kg`, `${v} m s^-1`],
  });
}

function mass(n) {
  const a = 2 + (n % 5);
  const m = 2 + (n % 7);
  const f = m * a;
  const inputs = { f, a };
  const value = compute("massFromForce", inputs);
  return draft({
    key: `m-${f}-${a}`,
    chapterId,
    stem: `A net force of ${f} N produces an acceleration of ${a} m s^-2. The mass of the body is`,
    formula: "massFromForce",
    inputs,
    unit: "kg",
    wrongValues: [f, a, f * a, f + a],
    explanation: `m = F/a = ${f}/${a} = ${value} kg.`,
    mustInclude: [`${f} N`, `${a} m s^-2`],
  });
}

export const subjectId = "physics";
export const file = "physics-laws-of-motion.json";
export const idPrefix = "gen-phy-lom";

export function generate() {
  return [
    ...fill(10, acceleration),
    ...fill(10, force),
    ...fill(10, momentum),
    ...fill(10, mass),
  ];
}
