insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-so-246","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Reverse osmosis is used in","options":["desalination of sea water","measuring $K_b$ only","making azeotropes","recording NMR spectra"],"answer_index":0,"explanation":"Pressure greater than $\\pi$ drives solvent from the brine through a membrane, leaving salts behind.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"osmotic-pressure","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-247","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"In $\\pi = CRT$, the symbol C stands for","options":["molarity of the solute","molality","mole fraction","mass percent"],"answer_index":0,"explanation":"Osmotic pressure uses the molar concentration (mol L⁻¹), not molality.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"osmotic-pressure","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-248","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Osmotic pressure is a","options":["colligative property","collisional nuclear property","surface colour","magnetic property"],"answer_index":0,"explanation":"For a given solvent it depends on the number of solute particles per unit volume.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"osmotic-pressure","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-249","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"A semipermeable membrane allows","options":["solvent molecules to pass but not the solute","both solute and solvent to pass freely","only ions to pass","only proteins to pass"],"answer_index":0,"explanation":"That selective permeability is what makes osmosis (and $\\pi$) observable.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"osmotic-pressure","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-250","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Plant cells placed in a hypertonic solution undergo","options":["plasmolysis","bursting","no change at all","photosynthesis only"],"answer_index":0,"explanation":"Water leaves the cell, the protoplast shrinks, and plasmolysis is observed.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"osmotic-pressure","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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