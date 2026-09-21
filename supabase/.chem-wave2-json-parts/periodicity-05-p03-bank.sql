insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-pe-221","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Electronegativity falls in the order N > P > As because","options":["atomic size increases down group 15","nuclear charge falls down the group","they become alkali metals","the number of valence electrons decreases"],"answer_index":0,"explanation":"The bonded pair is held farther from the nucleus in the larger P and As atoms.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"electronegativity","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-222","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"In period 2 the electronegativity order is","options":["F < O < N < C","C < N < O < F","N < C < F < O","O < C < N < F"],"answer_index":1,"explanation":"χ rises steadily across the period as Zeff increases and radius falls.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"electronegativity","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-223","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Fluorine is more electronegative than chlorine, bromine and iodine because of its","options":["larger size and lower Zeff","small size and high effective nuclear charge","half-filled 3d subshell","metallic character"],"answer_index":1,"explanation":"The shared pair in an F–X bond sits closest to a compact, highly charged fluorine atom.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"electronegativity","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-224","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"On the Mulliken scale, electronegativity is taken as the average of","options":["atomic radius and density","ionisation enthalpy and electron gain enthalpy (in suitable units)","mass number and atomic number","melting point and boiling point"],"answer_index":1,"explanation":"Mulliken wrote χ ∝ (IE + EA)/2, combining the two isolated-atom energies that measure electron holding and accepting.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"electronegativity","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-225","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"The H–F bond is more polar than the H–Cl bond because fluorine is","options":["less electronegative than chlorine","more electronegative than chlorine","larger than chlorine","a metal"],"answer_index":1,"explanation":"The greater χ(F) − χ(H) gap displaces the shared pair more strongly toward fluorine.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"electronegativity","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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