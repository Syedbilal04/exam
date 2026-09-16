import { buildBank, bankFile } from "./lib/bank.mjs";

const stats = await buildBank();
console.log(
  `Question bank written to ${bankFile}\n` +
    `  total:     ${stats.total}\n` +
    `  seeded:    ${stats.seeded}\n` +
    `  generated: ${stats.generated}\n` +
    `  imported:  ${stats.imported}\n` +
    `  chapters:  ${stats.chapters}`,
);
