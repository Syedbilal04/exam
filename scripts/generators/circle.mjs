import { circleDiagram } from "../lib/diagrams.mjs";
import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "maths-circle";

function radius(n) {
  const h = 1 + (n % 5);
  const k = 1 + (Math.floor(n / 5) % 5);
  const r = 3 + Math.floor(n / 25) + (n % 3);
  const inputs = { r };
  const value = compute("circleRadius", inputs);
  return draft({
    key: `cir-${h}-${k}-${r}`,
    chapterId,
    stem: `The radius of the circle (x - ${h})^2 + (y - ${k})^2 = ${r * r} is`,
    formula: "circleRadius",
    inputs,
    unit: "units",
    wrongValues: [r * r, 2 * r, h + k],
    explanation: `Comparing with (x - h)^2 + (y - k)^2 = r^2 gives r = ${value}.`,
    mustInclude: [`(x - ${h})^2`, `(y - ${k})^2`, `= ${r * r}`],
    svg: circleDiagram({ h, k, r }),
    alt: `Circle centred at (${h}, ${k})`,
  });
}

export const subjectId = "maths";
export const file = "maths-circle.json";
export const idPrefix = "gen-mat-cir";

export function generate() {
  return fill(40, radius);
}
