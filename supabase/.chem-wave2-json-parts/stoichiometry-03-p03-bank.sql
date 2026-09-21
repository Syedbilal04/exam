insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-st-171","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Two moles of $\\mathrm{KClO_3}$ are fully decomposed to KCl and O$_2$. The STP volume of oxygen collected is","options":["22.4 L","44.8 L","67.2 L","89.6 L"],"answer_index":2,"explanation":"2 mol chlorate give 3 mol O$_2$; $3 \\times 22.4 = 67.2$ L at STP.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"equation-mole-ratio","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-172","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"A bunsen flame consumes 16 g of methane completely (M = 16 g mol$^{-1}$). The STP volume of $\\mathrm{CO_2}$ produced is","options":["11.2 L","16.0 L","22.4 L","44.8 L"],"answer_index":2,"explanation":"16 g is 1 mol $\\mathrm{CH_4}$ and gives 1 mol $\\mathrm{CO_2}$, which occupies 22.4 L at STP.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"equation-mole-ratio","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-173","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"A 50 g charge of $\\mathrm{CaCO_3}$ (M = 100 g mol$^{-1}$) is heated until decomposition is complete. The lime $\\mathrm{CaO}$ (M = 56 g mol$^{-1}$) obtained weighs","options":["28 g","50 g","56 g","44 g"],"answer_index":0,"explanation":"0.50 mol of carbonate yields 0.50 mol of CaO, i.e. 28 g.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"equation-mole-ratio","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-174","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Ethane burns as $2\\mathrm{C_2H_6} + 7\\mathrm{O_2} \\rightarrow 4\\mathrm{CO_2} + 6\\mathrm{H_2O}$. A 15 g sample of ethane (M = 30) is burnt in 64 g of oxygen. The mass of $\\mathrm{CO_2}$ formed and the unused $\\mathrm{O_2}$ are","options":["44 g and 8 g","22 g and 16 g","88 g and 0 g","44 g and 0 g"],"answer_index":0,"explanation":"0.50 mol ethane needs 1.75 mol (56 g) O$_2$ and makes 1.0 mol (44 g) CO$_2$; 64 − 56 = 8 g O$_2$ remains.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"equation-mole-ratio","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-175","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"After a reaction stops, the starting material that is left unused is called the","options":["limiting reagent","excess reagent","catalyst","theoretical product"],"answer_index":1,"explanation":"The excess reagent remains because the other reactant ran out first.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"limiting-reagent","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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