insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-so-271","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Observed $\\Delta T_f$ divided by the $\\Delta T_f$ calculated with the theoretical molar mass equals","options":["i","$K_b$","$K_f$","$\\pi$"],"answer_index":0,"explanation":"That ratio is the definition of the van’t Hoff factor from freezing-point data.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"vanthoff-abnormal","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-272","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"K4[Fe(CN)6] on complete ionisation yields particles numbering","options":["5","4","2","1"],"answer_index":0,"explanation":"Four K⁺ ions plus [Fe(CN)6]⁴⁻ give five particles, so i = 5 when fully split.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"vanthoff-abnormal","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-273","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"A binary electrolyte is 60% dissociated. The van’t Hoff factor is","options":["1.60","2.00","0.60","1.00"],"answer_index":0,"explanation":"i = 1 + (2 − 1)(0.60) = 1.60.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"vanthoff-abnormal","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-274","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Acetic acid appears to have molar mass 120 g mol⁻¹ in benzene (true M = 60). Then i equals","options":["0.50","2.0","1.0","1.5"],"answer_index":0,"explanation":"i = $M_{\\mathrm{true}} / M_{\\mathrm{obs}} = 60/120 = 0.50$ (essentially complete dimerisation).","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"vanthoff-abnormal","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-275","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"BaCl2 is 80% dissociated. With n = 3, i is","options":["2.60","3.00","0.80","1.80"],"answer_index":0,"explanation":"i = 1 + (3 − 1)(0.80) = 2.60.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"vanthoff-abnormal","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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
on conflict (id) do update set
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  images = excluded.images,
  source = excluded.source,
  difficulty = excluded.difficulty,
  concept_id = excluded.concept_id;