insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-st-146","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"A molecular formula is related to the empirical formula by a positive integer $n$ such that","options":["molecular formula $= n \\times$ empirical formula","empirical formula $= n \\times$ molecular formula","$n$ equals the number of elements","$n$ is always 1 for covalent compounds"],"answer_index":0,"explanation":"$n = M / $ (empirical formula mass), and the molecular formula is that multiple of the empirical set.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"empirical-molecular","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-147","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Benzene has molecular formula $\\mathrm{C_6H_6}$. Its empirical formula is therefore","options":["$\\mathrm{CH}$","$\\mathrm{C_2H_2}$","$\\mathrm{C_6H_6}$","$\\mathrm{C_3H_3}$"],"answer_index":0,"explanation":"Dividing $\\mathrm{C_6H_6}$ by 6 gives the simplest ratio CH.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"empirical-molecular","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-148","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Glucose, $\\mathrm{C_6H_{12}O_6}$, reduces to the empirical set","options":["$\\mathrm{CHO}$","$\\mathrm{CH_2O}$","$\\mathrm{C_2H_4O_2}$","$\\mathrm{C_6H_{12}O_6}$"],"answer_index":1,"explanation":"Each subscript is divisible by 6, leaving CH$_2$O.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"empirical-molecular","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-149","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Hydrogen peroxide $\\mathrm{H_2O_2}$ has the empirical formula","options":["$\\mathrm{HO}$","$\\mathrm{H_2O}$","$\\mathrm{HO_2}$","$\\mathrm{H_2O_2}$"],"answer_index":0,"explanation":"The simplest H : O ratio in hydrogen peroxide is 1 : 1, written HO.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"empirical-molecular","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-150","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"An organic gas has empirical formula $\\mathrm{CH_2}$ and a molar mass of 56 g mol$^{-1}$. Its molecular formula is","options":["$\\mathrm{C_2H_4}$","$\\mathrm{C_3H_6}$","$\\mathrm{C_4H_8}$","$\\mathrm{C_5H_{10}}$"],"answer_index":2,"explanation":"Empirical mass is 14; $n = 56/14 = 4$, so the molecule is $\\mathrm{C_4H_8}$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"empirical-molecular","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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