import { rayDiagram } from "../lib/diagrams.mjs";
import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "physics-ray-optics-and-optical-instruments";

function pairs() {
  const found = [];
  for (let f = 10; f <= 50; f += 5) {
    for (let u = f + 5; u <= 160; u += 5) {
      const gap = u - f;
      if ((f * u) % gap !== 0) continue;
      const v = (f * u) / gap;
      if (v === u || v === f || v === gap) continue;
      found.push({ f, u, v });
    }
  }
  return found;
}

const PAIRS = pairs();

function imageDistance(n) {
  const spec = PAIRS[n % PAIRS.length];
  const inputs = { f: spec.f, u: spec.u };
  const value = compute("mirrorImageDistance", inputs);
  return draft({
    key: `ray-${spec.f}-${spec.u}`,
    chapterId,
    stem: `A concave mirror has a focal length of ${spec.f} cm. An object is placed ${spec.u} cm in front of it. Using the new Cartesian sign convention, the image distance from the mirror is`,
    formula: "mirrorImageDistance",
    inputs,
    unit: "cm",
    wrongValues: [spec.f, spec.u, spec.u - spec.f],
    explanation: `With f = -${spec.f} cm and u = -${spec.u} cm, v = fu/(u - f) = -${value} cm, so the image is ${value} cm in front of the mirror.`,
    mustInclude: [`${spec.f} cm`, `${spec.u} cm`],
    svg: rayDiagram({ f: spec.f, u: spec.u }),
    alt: `Concave mirror with focal length ${spec.f} cm and object at ${spec.u} cm`,
  });
}

export const subjectId = "physics";
export const file = "physics-ray-optics.json";
export const idPrefix = "gen-phy-ray";

export function generate() {
  if (PAIRS.length < 40) {
    throw new Error(`only ${PAIRS.length} mirror pairs; need 40`);
  }
  return fill(40, imageDistance);
}
