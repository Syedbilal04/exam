import { createHash } from "node:crypto";

export function normalizeStem(stem) {
  return String(stem)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function stripDigits(stem) {
  return normalizeStem(stem)
    .replace(/[0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function fingerprint(stem) {
  return createHash("sha1").update(normalizeStem(stem)).digest("hex").slice(0, 12);
}

export function stemsClash(a, b) {
  const na = normalizeStem(a);
  const nb = normalizeStem(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  const da = stripDigits(a);
  const db = stripDigits(b);
  return Boolean(da && db && da === db);
}
