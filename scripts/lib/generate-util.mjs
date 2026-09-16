import { compute } from "./formulae.mjs";

export const SOURCE = {
  name: "ASTRA generated set",
  license: "Generated from public formulae",
};

export const EMPTY_PYQ = {
  appearCount: 0,
  years: [],
  exams: [],
  verified: false,
};

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function quantity(value, unit) {
  return unit ? `${value} ${unit}` : String(value);
}

/** Three positive integers that are not the correct value. */
export function wrongNumbers(correct, preferred) {
  const values = [];
  for (const value of preferred) {
    if (!Number.isInteger(value) || value <= 0 || value === correct || values.includes(value)) {
      continue;
    }
    values.push(value);
  }
  let bump = 1;
  while (values.length < 3) {
    const value = correct + bump;
    bump += 1;
    if (!values.includes(value)) values.push(value);
  }
  return values.slice(0, 3);
}

function choices(key, correct, wrongs) {
  if (wrongs.length !== 3) throw new Error(`${key}: expected 3 wrong options`);
  const all = [correct, ...wrongs];
  if (new Set(all).size !== 4) {
    throw new Error(`${key}: options are not distinct (${all.join(" | ")})`);
  }

  const rng = mulberry32(hashString(key));
  const options = [...all];
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return { options, answerIndex: options.indexOf(correct), correct };
}

export function draft({
  key,
  chapterId,
  stem,
  formula,
  inputs,
  unit,
  wrongValues,
  explanation,
  mustInclude,
  svg,
  alt,
}) {
  const value = compute(formula, inputs);
  const correct = quantity(value, unit);
  const wrongs = wrongNumbers(value, wrongValues).map((item) => quantity(item, unit));
  return {
    chapterId,
    stem,
    ...choices(key, correct, wrongs),
    explanation,
    mustInclude,
    audit: { formula, inputs },
    value,
    unit,
    svg,
    alt,
  };
}

/** Calls make(0), make(1), ... until count unique stems exist. */
export function fill(count, make) {
  const items = [];
  const stems = new Set();
  let n = 0;
  while (items.length < count) {
    if (n > count * 40) {
      throw new Error(`could not fill ${count} unique stems (got ${items.length}: ${[...stems].slice(0, 3).join(" || ")})`);
    }
    const item = make(n);
    n += 1;
    if (!item || stems.has(item.stem)) continue;
    stems.add(item.stem);
    items.push(item);
  }
  return items;
}

export function padId(prefix, index) {
  return `${prefix}-${String(index).padStart(3, "0")}`;
}
