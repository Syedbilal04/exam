import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "physics-work-energy-and-power";

function kinetic(n) {
  const m = 2 * (1 + (n % 5));
  const v = 2 + (n % 6);
  const inputs = { m, v };
  const value = compute("kineticEnergy", inputs);
  return draft({
    key: `ke-${m}-${v}`,
    chapterId,
    stem: `The kinetic energy of a ${m} kg body moving at ${v} m s^-1 is`,
    formula: "kineticEnergy",
    inputs,
    unit: "J",
    wrongValues: [m * v, m * v * v, v * v],
    explanation: `KE = (1/2)mv^2 = (1/2)(${m})(${v})^2 = ${value} J.`,
    mustInclude: [`${m} kg`, `${v} m s^-1`],
  });
}

function potential(n) {
  const m = 2 + (n % 6);
  const h = 2 + (n % 5);
  const g = 10;
  const inputs = { m, g, h };
  const value = compute("potentialEnergy", inputs);
  return draft({
    key: `pe-${m}-${h}`,
    chapterId,
    stem: `A body of mass ${m} kg is raised through ${h} m. Taking g = 10 m s^-2, its gain in potential energy is`,
    formula: "potentialEnergy",
    inputs,
    unit: "J",
    wrongValues: [m * h, m * g, g * h],
    explanation: `PE = mgh = (${m})(10)(${h}) = ${value} J.`,
    mustInclude: [`${m} kg`, `${h} m`, "g = 10 m s^-2"],
  });
}

function work(n) {
  const f = 2 + (n % 8);
  const s = 2 + (n % 5);
  const inputs = { f, s };
  const value = compute("work", inputs);
  return draft({
    key: `w-${f}-${s}`,
    chapterId,
    stem: `A force of ${f} N displaces a body by ${s} m in the direction of the force. The work done is`,
    formula: "work",
    inputs,
    unit: "J",
    wrongValues: [f + s, f, s],
    explanation: `W = Fs = (${f})(${s}) = ${value} J.`,
    mustInclude: [`${f} N`, `${s} m`],
  });
}

function power(n) {
  const t = 2 + (n % 5);
  const p = 5 + n;
  const w = p * t;
  const inputs = { w, t };
  const value = compute("power", inputs);
  return draft({
    key: `p-${w}-${t}`,
    chapterId,
    stem: `A machine does ${w} J of work in ${t} s. Its power is`,
    formula: "power",
    inputs,
    unit: "W",
    wrongValues: [w, t, w * t],
    explanation: `P = W/t = ${w}/${t} = ${value} W.`,
    mustInclude: [`${w} J`, `${t} s`],
  });
}

export const subjectId = "physics";
export const file = "physics-work-energy.json";
export const idPrefix = "gen-phy-wep";

export function generate() {
  return [...fill(10, kinetic), ...fill(10, potential), ...fill(10, work), ...fill(10, power)];
}
