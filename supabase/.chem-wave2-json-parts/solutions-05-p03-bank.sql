insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-so-221","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Fully ionised KCl (i = 2) at 0.10 mol kg⁻¹ in water ($K_b = 0.52$ K kg mol⁻¹) produces a boiling-point elevation of","options":["0.104 K","0.052 K","0.208 K","0.52 K"],"answer_index":0,"explanation":"$\\Delta T_b = i K_b m = 2 \\times 0.52 \\times 0.10 = 0.104$ K.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"boiling-elevation","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-222","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"A 0.20 m Na2SO4 solution is 80% dissociated. Taking three ions per formula unit, $K_b = 0.512$ K kg mol⁻¹, $\\Delta T_b$ is nearest","options":["0.27 K","0.10 K","0.51 K","0.80 K"],"answer_index":0,"explanation":"$i = 1 + (3 - 1)(0.80) = 2.60$; $\\Delta T_b = 2.60 \\times 0.512 \\times 0.20 \\approx 0.27$ K.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"boiling-elevation","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-223","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Adding a non-volatile solute to a solvent","options":["lowers the freezing point","raises the freezing point","leaves the freezing point unchanged","equals the boiling point"],"answer_index":0,"explanation":"The solid solvent is in equilibrium with a solution of lower chemical potential, so the freezing point falls.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"freezing-depression","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-224","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"The molal freezing-point depression constant $K_f$ is also called the","options":["cryoscopic constant","ebullioscopic constant","Henry constant","Faraday constant"],"answer_index":0,"explanation":"$K_f$ is the cryoscopic constant of the solvent.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"freezing-depression","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-225","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"$\\Delta T_f$ for a dilute non-electrolyte equals","options":["$K_f \\times$ molality","$K_b \\times$ molarity","$K_f / m$","$\\pi V$"],"answer_index":0,"explanation":"The working relation is $\\Delta T_f = K_f m$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"freezing-depression","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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