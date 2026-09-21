insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-so-121","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Adding the mole fractions of every component of a solution yields","options":["zero","exactly one","one hundred","the molarity"],"answer_index":1,"explanation":"Mole fractions are fractions of a whole, so $\\sum x_i = 1$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"concentration-terms","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-122","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Volume percent is the concentration unit most often quoted for","options":["solid metal alloys","liquid–liquid mixtures","gas occluded in a metal","ionic unit cells"],"answer_index":1,"explanation":"v/v % is convenient when both solute and solvent are liquids.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"concentration-terms","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-123","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"A 1.0 molal aqueous preparation contains 1.0 mol of solute dissolved in","options":["1.0 L of solution","1.0 kg of water","1.0 kg of solution","1.0 L of water"],"answer_index":1,"explanation":"Molality is moles per kilogram of solvent, not per litre of solution.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"concentration-terms","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-124","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Mass/volume percent is 100 times the ratio of","options":["mass of solute to volume of solution","volume of solute to mass of solvent","moles of solute to kilograms of solvent","mass of solvent to mass of solute"],"answer_index":0,"explanation":"w/v % = (mass of solute / volume of solution) × 100, with consistent units.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"concentration-terms","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-125","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"For a very dilute aqueous sample, 1 ppm is nearly the same as","options":["1 mg of solute in one litre of solution","1 g in one litre","1 mol in one litre","1% by mass"],"answer_index":0,"explanation":"1 L of dilute aqueous solution has a mass of about 10³ g, so 1 ppm ≈ 1 mg L⁻¹.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"concentration-terms","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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