import { readFileSync, writeFileSync } from "node:fs";
import spread from "../content/seed/maths-spread-extra.json" with { type: "json" };

function esc(s) {
  return s.replaceAll("'", "''");
}

const values = spread.questions.map((q) => `('${esc(q.stem)}')`).join(",\n");
const sql = `with new_stems(stem) as (values
${values}
)
select new_stems.stem
from new_stems
where exists (
  select 1 from question_bank qb
  where qb.subject_id = 'maths'
    and lower(regexp_replace(qb.stem, '[^a-zA-Z0-9]+', ' ', 'g'))
      = lower(regexp_replace(new_stems.stem, '[^a-zA-Z0-9]+', ' ', 'g'))
);`;

writeFileSync(new URL("./.maths-dupcheck.sql", import.meta.url), sql);
console.log("questions", spread.questions.length, "sql bytes", sql.length);
