import { readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";
import path from "node:path";

const dir = path.join("supabase", ".chem-batches");

function wrap(sql, name) {
  const b64 = Buffer.from(sql, "utf8").toString("base64");
  return [
    "DO $chem_batch$",
    "DECLARE",
    "  sql text;",
    "  stmt text;",
    "BEGIN",
    `  sql := convert_from(decode('${b64}', 'base64'), 'utf8');`,
    "  FOREACH stmt IN ARRAY regexp_split_to_array(rtrim(sql, E'; \\n\\r'), E';\\r?\\n')",
    "  LOOP",
    "    stmt := btrim(stmt);",
    "    IF stmt <> '' THEN",
    "      EXECUTE stmt;",
    "    END IF;",
    "  END LOOP;",
    "END",
    "$chem_batch$;",
    "",
  ].join("\n");
}

for (let i = 10; i <= 19; i++) {
  const n = String(i).padStart(2, "0");
  const old = path.join(dir, `wrap-${n}.sql`);
  if (existsSync(old)) unlinkSync(old);

  const raw = readFileSync(path.join(dir, `batch-${n}.sql`), "utf8");
  const stmts = raw
    .split(/;\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const CHUNK = 20;
  let part = 0;
  for (let start = 0; start < stmts.length; start += CHUNK) {
    part += 1;
    const slice = stmts.slice(start, start + CHUNK).map((s) => `${s};`).join("\n") + "\n";
    const letter = String.fromCharCode(96 + part);
    const out = path.join(dir, `wrap-${n}${letter}.sql`);
    writeFileSync(out, wrap(slice, `${n}${letter}`));
    console.log(`wrap-${n}${letter}`, "stmts", Math.min(CHUNK, stmts.length - start), "bytes", wrap(slice).length);
  }
}
