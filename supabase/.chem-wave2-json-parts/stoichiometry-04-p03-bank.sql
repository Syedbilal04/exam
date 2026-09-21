insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-st-196","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"A preparation is calculated to give 50 g of crystals; the dried crop actually weighs 40 g. The percentage yield of that run is","options":["40%","50%","80%","125%"],"answer_index":2,"explanation":"$(40/50) \\times 100 = 80\\%$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"yield","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-197","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"A process is known to run at 80% yield. If the equation predicts 25 g of product, the mass a student should expect to isolate is","options":["5 g","20 g","25 g","31.25 g"],"answer_index":1,"explanation":"Actual $= 0.80 \\times 25 = 20$ g.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"yield","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-198","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Excess oxygen is used to burn 4.0 g of hydrogen. The equation predicts 36 g of water, but only 27 g is condensed. The percentage yield of water is","options":["27%","67%","75%","133%"],"answer_index":2,"explanation":"4.0 g H$_2$ is 2.0 mol and can give 2.0 mol (36 g) of water; $27/36 \\times 100 = 75\\%$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"yield","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-199","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"An uncombined free element, whether atom or molecule, is assigned an oxidation number of","options":["$+1$","$-1$","$0$","$+2$"],"answer_index":2,"explanation":"The oxidation number of an element in its elemental form is zero.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"oxidation-number","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-200","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Except in peroxides, superoxides and $\\mathrm{OF_2}$, oxygen in compounds is assigned the oxidation number","options":["$-1$","$-2$","$+2$","$0$"],"answer_index":1,"explanation":"The common oxidation number of oxygen in oxides and oxo-salts is $-2$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"oxidation-number","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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