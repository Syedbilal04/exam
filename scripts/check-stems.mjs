import assert from "node:assert/strict";
import { normalizeStem, fingerprint, stemsClash } from "./lib/stems.mjs";

assert.equal(normalizeStem("  DNA, the  molecule! "), "dna the molecule");
assert.equal(fingerprint("DNA the molecule"), fingerprint("dna, the molecule!"));
assert.equal(stemsClash("A body of mass 2 kg", "A body of mass 5 kg"), true);
assert.equal(stemsClash("Linnaeus proposed binomial nomenclature", "Species is the basic unit"), false);

console.log("Stem checks passed (4)");
