import { readFileSync, writeFileSync } from "node:fs";
import spread from "../content/seed/maths-spread-extra.json" with { type: "json" };

function esc(s) {
  return s.replaceAll("'", "''");
}

const batchSize = 50;
for (let i = 0, b = 0; i < spread.questions.length; i += batchSize, b++) {
  const batch = spread.questions.slice(i, i + batchSize);
  const values = batch.map((q) => `('${esc(q.stem)}')`).join(",\n");
  const sql = `with new_stems(stem) as (values
${values}
)
select count(*)::int as checked,
       count(*) filter (where exists (
         select 1 from question_bank qb
         where qb.subject_id = 'maths'
           and lower(regexp_replace(qb.stem, '[^a-zA-Z0-9]+', ' ', 'g'))
             = lower(regexp_replace(new_stems.stem, '[^a-zA-Z0-9]+', ' ', 'g'))
       ))::int as already_in_db
from new_stems;`;
  writeFileSync(
    new URL(`./.maths-dup-batch-${b}.sql`, import.meta.url),
    sql,
  );
  console.log("batch", b, batch.length);
}
