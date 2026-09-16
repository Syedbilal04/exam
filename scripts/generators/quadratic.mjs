import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "maths-quadratic-expressions";

function roots(n) {
  const p = 2 + (n % 7);
  const q = p + 1 + Math.floor(n / 7);
  const sum = p + q;
  const product = p * q;
  const askProduct = n % 2 === 1;
  const formula = askProduct ? "productOfRoots" : "sumOfRoots";
  const inputs = { p, q };
  const value = compute(formula, inputs);
  const equation = `x^2 - ${sum}x + ${product} = 0`;
  return draft({
    key: `${formula}-${p}-${q}`,
    chapterId,
    stem: askProduct
      ? `The product of the roots of ${equation} is`
      : `The sum of the roots of ${equation} is`,
    formula,
    inputs,
    unit: "",
    wrongValues: askProduct ? [sum, p, q] : [product, p, q],
    explanation: askProduct
      ? `For x^2 - (sum)x + (product) = 0, the product of the roots is ${value}.`
      : `For x^2 - (sum)x + (product) = 0, the sum of the roots is ${value}.`,
    mustInclude: [equation],
  });
}

export const subjectId = "maths";
export const file = "maths-quadratic.json";
export const idPrefix = "gen-mat-quad";

export function generate() {
  return fill(40, roots);
}
