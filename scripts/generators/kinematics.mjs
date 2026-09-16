import { velocityTimeGraph } from "../lib/diagrams.mjs";
import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "physics-motion-in-a-straight-line";

const SPEED_CASES = [
  { u: 2, a: 1, v: 4 },
  { u: 3, a: 2, v: 5 },
  { u: 4, a: 2, v: 6 },
  { u: 3, a: 1, v: 5 },
  { u: 6, a: 2, v: 8 },
  { u: 2, a: 3, v: 8 },
  { u: 5, a: 2, v: 7 },
  { u: 4, a: 1, v: 6 },
  { u: 8, a: 1, v: 10 },
  { u: 6, a: 1, v: 8 },
  { u: 5, a: 4, v: 13 },
  { u: 7, a: 2, v: 11 },
  { u: 9, a: 1, v: 11 },
  { u: 4, a: 3, v: 10 },
  { u: 10, a: 2, v: 14 },
  { u: 8, a: 3, v: 14 },
  { u: 12, a: 1, v: 14 },
  { u: 6, a: 4, v: 14 },
  { u: 9, a: 2, v: 15 },
  { u: 8, a: 4, v: 16 },
];

function fromRest(n) {
  const a = 2 * (1 + (n % 5));
  const t = 3 + (n % 6);
  const inputs = { a, t };
  const s = compute("displacementFromRest", inputs);
  return draft({
    key: `rest-${a}-${t}`,
    chapterId,
    stem: `A body starts from rest and moves with a uniform acceleration of ${a} m s^-2. The distance covered in the first ${t} s is`,
    formula: "displacementFromRest",
    inputs,
    unit: "m",
    wrongValues: [a * t * t, (a / 2) * t, a * t],
    explanation: `s = (1/2)at^2 = (1/2)(${a})(${t})^2 = ${s} m.`,
    mustInclude: [`${a} m s^-2`, `${t} s`],
  });
}

function finalVelocity(n) {
  const u = 2 + (n % 9);
  const a = 1 + (n % 4);
  const t = 2 + (n % 5);
  const inputs = { u, a, t };
  const v = compute("velocityUat", inputs);
  return draft({
    key: `uat-${u}-${a}-${t}`,
    chapterId,
    stem: `A body moving at ${u} m s^-1 accelerates at ${a} m s^-2 for ${t} s. Its velocity then is`,
    formula: "velocityUat",
    inputs,
    unit: "m s^-1",
    wrongValues: [u + a, u + a * t * t, Math.abs(u - a * t), u * a],
    explanation: `v = u + at = ${u} + (${a})(${t}) = ${v} m s^-1.`,
    mustInclude: [`${u} m s^-1`, `${a} m s^-2`, `${t} s`],
  });
}

function speedFromDistance(n) {
  const spec = SPEED_CASES[n % SPEED_CASES.length];
  const s = compute("distanceForFinalSpeed", spec);
  const inputs = { u: spec.u, a: spec.a, s };
  const v = compute("finalSpeed", inputs);
  return draft({
    key: `v2-${spec.u}-${spec.a}-${s}`,
    chapterId,
    stem: `A body moving at ${spec.u} m s^-1 accelerates at ${spec.a} m s^-2 through ${s} m. Its speed then is`,
    formula: "finalSpeed",
    inputs,
    unit: "m s^-1",
    wrongValues: [spec.u + spec.a, spec.u + s, spec.a * s, v + spec.a],
    explanation: `v^2 = u^2 + 2as = ${spec.u}^2 + 2(${spec.a})(${s}) = ${v * v}, so v = ${v} m s^-1.`,
    mustInclude: [`${spec.u} m s^-1`, `${spec.a} m s^-2`, `${s} m`],
  });
}

function graphDisplacement(n) {
  const u = 2 + (n % 8);
  const a = 1 + (n % 3);
  const t = 4 + 2 * (n % 3);
  const v = compute("velocityUat", { u, a, t });
  const inputs = { u, v, t };
  const s = compute("displacementFromVelocities", inputs);
  return draft({
    key: `vt-${u}-${v}-${t}`,
    chapterId,
    stem: `The velocity-time graph shows a body whose velocity changes uniformly from ${u} m s^-1 to ${v} m s^-1 in ${t} s. The displacement in this time is`,
    formula: "displacementFromVelocities",
    inputs,
    unit: "m",
    wrongValues: [(u + v) / 2, v * t, u * t],
    explanation: `Displacement is the area under the graph: ((${u} + ${v})/2)(${t}) = ${s} m.`,
    mustInclude: [`${u} m s^-1`, `${v} m s^-1`, `${t} s`],
    svg: velocityTimeGraph({ u, v, t }),
    alt: `Velocity-time graph from ${u} m/s to ${v} m/s in ${t} s`,
  });
}

export const subjectId = "physics";
export const file = "physics-kinematics.json";
export const idPrefix = "gen-phy-msl";

export function generate() {
  return [
    ...fill(10, fromRest),
    ...fill(10, finalVelocity),
    ...fill(10, speedFromDistance),
    ...fill(10, graphDisplacement),
  ];
}
