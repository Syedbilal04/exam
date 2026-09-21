import { readFileSync, writeFileSync } from "node:fs";

const valuesPart = readFileSync(
  new URL("./.maths-dupcheck.sql", import.meta.url),
  "utf8",
).match(/with new_stems\(stem\) as \(values\n[\s\S]*?\n\)/)[0];

const sql = `${valuesPart}
select count(*)::int as checked,
       count(*) filter (where exists (
         select 1 from question_bank qb
         where qb.subject_id = 'maths'
           and lower(regexp_replace(qb.stem, '[^a-zA-Z0-9]+', ' ', 'g'))
             = lower(regexp_replace(new_stems.stem, '[^a-zA-Z0-9]+', ' ', 'g'))
       ))::int as already_in_db
from new_stems;`;

writeFileSync(new URL("./.maths-dupcheck-final.sql", import.meta.url), sql);
console.log("bytes", sql.length);
