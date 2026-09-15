import { readFile } from "node:fs/promises";
import { bankFile } from "./lib/bank.mjs";

/**
 * Reports question text the cockpit cannot render: TeX commands sitting
 * outside `$...$`, where KaTeX never sees them and the student would be shown
 * raw backslash markup.
 */
const bank = JSON.parse(await readFile(bankFile, "utf8"));

const MATH_SPAN = /\$\$[^$]+\$\$|\$[^$\n]+\$/g;
const TEX_COMMAND = /\\[a-zA-Z]+/;

const delimited = [];
const leaking = [];

for (const question of bank) {
  const text = `${question.stem} ${question.options.join(" ")} ${question.explanation ?? ""}`;
  if (text.includes("$")) delimited.push(question);
  if (TEX_COMMAND.test(text.replace(MATH_SPAN, " "))) leaking.push(question);
}

console.log(`questions:        ${bank.length}`);
console.log(`delimited math:   ${delimited.length}`);
console.log(`leaking raw TeX:  ${leaking.length}`);

for (const question of leaking.slice(0, 6)) {
  console.log(
    `  - ${question.id}\n    ${question.stem.slice(0, 110)}\n    options: ${question.options.join(" | ").slice(0, 140)}`,
  );
}
