insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-pe-246","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"In the third period the most metallic element is","options":["chlorine","silicon","sodium","argon"],"answer_index":2,"explanation":"Na stands at the left of period 3 and has the lowest IE of that row.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"metallic-character","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-247","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"In the second period the most non-metallic element is","options":["lithium","carbon","fluorine","beryllium"],"answer_index":2,"explanation":"Fluorine has the highest electronegativity and a very high IE among the period-2 non-nobles.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"metallic-character","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-248","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"The reducing power of alkali metals increases down the group, in parallel with","options":["ionisation enthalpy","metallic character","electronegativity","electron gain enthalpy becoming more negative"],"answer_index":1,"explanation":"The heavier alkali metal loses its ns¹ electron more easily and is therefore the stronger reductant.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"metallic-character","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-249","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Metallic character in the set Na, Mg, Al decreases from","options":["aluminium to sodium","sodium to aluminium","magnesium to sodium","aluminium to argon"],"answer_index":1,"explanation":"Across period 3 the atoms become smaller and harder to ionise, so metallic character falls Na > Mg > Al.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"metallic-character","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-250","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Among Li, Na and K, potassium is the most metallic because it has the","options":["smallest size and highest IE","largest size and the lowest ionisation enthalpy","highest electronegativity","closed 3p⁶ valence shell"],"answer_index":1,"explanation":"Down group 1, size rises and IE falls, so K loses its 4s electron most readily of the three.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"metallic-character","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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