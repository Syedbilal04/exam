import { seriesCircuit } from "../lib/diagrams.mjs";
import { compute } from "../lib/formulae.mjs";
import { draft, fill } from "../lib/generate-util.mjs";

const chapterId = "physics-current-electricity";

const PARALLEL = [
  [6, 3],
  [12, 4],
  [12, 6],
  [8, 8],
  [10, 10],
  [15, 10],
  [20, 20],
  [16, 16],
  [20, 30],
  [24, 8],
  [6, 6],
  [4, 12],
  [5, 20],
  [10, 40],
  [15, 30],
  [18, 18],
  [24, 24],
  [30, 6],
  [14, 14],
  [8, 24],
];

function current(n) {
  const r = 2 + (n % 8);
  const i = 2 + (n % 5);
  const v = i * r;
  const inputs = { v, r };
  const value = compute("ohmCurrent", inputs);
  return draft({
    key: `ohm-i-${v}-${r}`,
    chapterId,
    stem: `A resistor of ${r} ohm is connected to a ${v} V supply. The current in the resistor is`,
    formula: "ohmCurrent",
    inputs,
    unit: "A",
    wrongValues: [v, r, v * r],
    explanation: `I = V/R = ${v}/${r} = ${value} A.`,
    mustInclude: [`${r} ohm`, `${v} V`],
  });
}

function resistance(n) {
  const i = 2 + (n % 5);
  const r = 3 + Math.floor(n / 5) + (n % 3);
  const v = i * r;
  const inputs = { v, i };
  const value = compute("ohmResistance", inputs);
  return draft({
    key: `ohm-r-${v}-${i}`,
    chapterId,
    stem: `A ${v} V supply sends a current of ${i} A through a resistor. The resistance is`,
    formula: "ohmResistance",
    inputs,
    unit: "ohm",
    wrongValues: [v, i, v * i],
    explanation: `R = V/I = ${v}/${i} = ${value} ohm.`,
    mustInclude: [`${v} V`, `${i} A`],
  });
}

function series(n) {
  const r1 = 2 + (n % 6);
  const r2 = 3 + (n % 5);
  const i = 2 + (n % 4);
  const v = i * (r1 + r2);
  const inputs = { v, r1, r2 };
  const value = compute("seriesCurrent", inputs);
  return draft({
    key: `series-${v}-${r1}-${r2}`,
    chapterId,
    stem: `Two resistors of ${r1} ohm and ${r2} ohm are connected in series to a ${v} V battery. The current in the circuit is`,
    formula: "seriesCurrent",
    inputs,
    unit: "A",
    wrongValues: [v, r1 + r2, r1, r2],
    explanation: `Req = ${r1} + ${r2} = ${r1 + r2} ohm. I = V/Req = ${v}/${r1 + r2} = ${value} A.`,
    mustInclude: [`${r1} ohm`, `${r2} ohm`, `${v} V`],
    svg: seriesCircuit({ v, r1, r2 }),
    alt: `Series circuit with ${r1} ohm and ${r2} ohm on a ${v} V battery`,
  });
}

function parallel(n) {
  const [r1, r2] = PARALLEL[n % PARALLEL.length];
  const inputs = { r1, r2 };
  const value = compute("parallelResistance", inputs);
  return draft({
    key: `parallel-${r1}-${r2}`,
    chapterId,
    stem: `Two resistors of ${r1} ohm and ${r2} ohm are connected in parallel. The equivalent resistance is`,
    formula: "parallelResistance",
    inputs,
    unit: "ohm",
    wrongValues: [r1, r2, r1 + r2, r1 * r2],
    explanation: `1/Req = 1/${r1} + 1/${r2}, so Req = ${value} ohm.`,
    mustInclude: [`${r1} ohm`, `${r2} ohm`],
  });
}

export const subjectId = "physics";
export const file = "physics-electricity.json";
export const idPrefix = "gen-phy-ce";

export function generate() {
  return [
    ...fill(10, current),
    ...fill(10, resistance),
    ...fill(10, series),
    ...fill(10, parallel),
  ];
}
