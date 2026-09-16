import { parabolaGraph } from "../lib/diagrams.mjs";
import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "maths-parabola";

function simple(n) {
  const a = 1 + (n % 4);
  const x = 2 + Math.floor(n / 4);
  const inputs = { a, b: 0, c: 0, x };
  const y = compute("parabola", inputs);
  return draft({
    key: `par-${a}-${x}`,
    chapterId,
    stem: `For the parabola y = ${a}x^2, the value of y at x = ${x} is`,
    formula: "parabola",
    inputs,
    unit: "",
    wrongValues: [a * x, a * x * x * x, (a + 1) * x * x],
    explanation: `y = ${a}(${x})^2 = ${y}.`,
    mustInclude: [`y = ${a}x^2`, `x = ${x}`],
    svg: parabolaGraph({ a, b: 0, c: 0, x }),
    alt: `Graph of y = ${a}x^2 with a marker at x = ${x}`,
  });
}

function shifted(n) {
  const a = 1 + (n % 3);
  const b = 1 + (n % 4);
  const c = n % 5;
  const x = 2 + (n % 4);
  const inputs = { a, b, c, x };
  const y = compute("parabola", inputs);
  return draft({
    key: `par-${a}-${b}-${c}-${x}`,
    chapterId,
    stem: `For y = ${a}x^2 + ${b}x + ${c}, the value of y at x = ${x} is`,
    formula: "parabola",
    inputs,
    unit: "",
    wrongValues: [a * x * x, a * x * x + c, b * x + c],
    explanation: `y = ${a}(${x})^2 + ${b}(${x}) + ${c} = ${y}.`,
    mustInclude: [`${a}x^2`, `x = ${x}`],
    svg: parabolaGraph({ a, b, c, x }),
    alt: `Graph of y = ${a}x^2 + ${b}x + ${c} with a marker at x = ${x}`,
  });
}

export const subjectId = "maths";
export const file = "maths-parabola.json";
export const idPrefix = "gen-mat-par";

export function generate() {
  return [...fill(20, simple), ...fill(20, shifted)];
}
