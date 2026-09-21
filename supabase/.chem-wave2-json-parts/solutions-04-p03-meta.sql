insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$[{"id":"che-so-196","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"The molar mass of a non-volatile solute can be estimated from a measurement of","options":["relative lowering of vapour pressure","the colour of the solution","the density of the pure solute alone","$K_H$ of an unrelated gas"],"answer_index":0,"explanation":"$(p^\\circ - p)/p^\\circ = n_B / (n_A + n_B)$ can be solved for $M_B$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"relative-lowering","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-197","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"The Ostwald–Walker dynamic method is a classical experiment for measuring","options":["relative lowering of vapour pressure","osmotic pressure","Henry’s constant","pH"],"answer_index":0,"explanation":"Air is passed through solution and then through pure solvent; the mass losses give $(p^\\circ - p)/p^\\circ$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"relative-lowering","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-198","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Two dilute solutions that share the same mole fraction of non-electrolyte solute in the same solvent show","options":["the same relative lowering","different relative lowerings proportional to solute mass only","zero lowering","lowering equal to $K_b$"],"answer_index":0,"explanation":"Relative lowering tracks $x_B$, which is identical for the two solutions.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"relative-lowering","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-199","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"A solvent has $p^\\circ = 80$ torr. After a non-volatile solute is added the pressure is 76 torr. Relative lowering is","options":["0.050","4.0","76","0.95"],"answer_index":0,"explanation":"$(80 - 76)/80 = 0.050$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"relative-lowering","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-200","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Relative lowering of 0.020 is recorded for a dilute non-electrolyte. The mole fraction of solute is","options":["0.020","0.980","2.0","0.20"],"answer_index":0,"explanation":"For a dilute non-volatile non-electrolyte, $(p^\\circ - p)/p^\\circ = x_B$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"relative-lowering","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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