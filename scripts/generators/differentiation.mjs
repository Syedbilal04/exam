import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "maths-differentiation";

function derivative(n) {
  const a = 1 + (n % 8);
  const power = 2 + (n % 2);
  const x = 2 + (n % 5);
  const inputs = { a, n: power, x };
  const value = compute("derivativePower", inputs);
  const second =
    power === 2 ? a * 2 : a * power * (power - 1) * x ** (power - 2);
  return draft({
    key: `dy-${a}-${power}-${x}`,
    chapterId,
    stem: `The derivative of ${a}x^${power} at x = ${x} is`,
    formula: "derivativePower",
    inputs,
    unit: "",
    wrongValues: [a * x ** (power - 1), a * power * x ** power, second],
    explanation: `d/dx (${a}x^${power}) = ${a * power}x^${power - 1}. At x = ${x} this is ${value}.`,
    mustInclude: [`${a}x^${power}`, `x = ${x}`],
  });
}

export const subjectId = "maths";
export const file = "maths-differentiation.json";
export const idPrefix = "gen-mat-diff";

export function generate() {
  return fill(40, derivative);
}
