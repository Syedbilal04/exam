insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$[{"id":"che-st-246","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"A 100 mL portion of 2.0 M HCl is diluted with water to 500 mL. The molarity after dilution is","options":["0.20 M","0.40 M","1.0 M","2.0 M"],"answer_index":1,"explanation":"$M_2 = (2.0 \\times 100)/500 = 0.40$ M.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"molarity-dilution","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-247","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"A student must prepare 250 mL of 1.0 M $\\mathrm{H_2SO_4}$ from a 5.0 M stock. The volume of stock that should be pipetted is","options":["25 mL","50 mL","100 mL","200 mL"],"answer_index":1,"explanation":"$V_1 = (1.0 \\times 250)/5.0 = 50$ mL of stock, then diluted to 250 mL.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"molarity-dilution","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-248","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"200 mL of 0.50 M NaCl is mixed with 300 mL of 1.50 M NaCl (volumes additive). The molarity of the blended solution is","options":["0.90 M","1.00 M","1.10 M","1.20 M"],"answer_index":2,"explanation":"Solute moles $= 0.10 + 0.45 = 0.55$; total volume $= 0.50$ L, so $M = 1.10$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"molarity-dilution","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
    id text,
    chapter_id text,
    subject_id text,
    stem text,
    options jsonb,
    answer_index int,
    explanation text,
    images jsonb,
    source jsonb,
    difficulty text,
    concept_id text,
    appear_count int,
    years jsonb,
    exams jsonb,
    verified boolean
  )
on conflict (question_id) do update set
  appear_count = excluded.appear_count,
  years = excluded.years,
  exams = excluded.exams,
  verified = excluded.verified;