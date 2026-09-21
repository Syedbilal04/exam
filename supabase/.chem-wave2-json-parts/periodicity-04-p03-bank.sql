insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-pe-196","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"A more negative electron gain enthalpy means a greater tendency of the atom to","options":["lose a proton","accept an electron","form a cation","expand its nucleus"],"answer_index":1,"explanation":"The more energy released on adding an electron, the more favourable the gain.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electron-gain","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-197","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Halogens have the most negative electron gain enthalpies in their respective periods because they","options":["have empty valence shells","are one electron short of a noble-gas configuration","are the largest atoms of the period","cannot form anions"],"answer_index":1,"explanation":"Adding one electron completes ns² np⁶ and releases a large amount of energy.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electron-gain","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-198","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Noble-gas atoms have positive electron gain enthalpies because the extra electron must","options":["pair in a half-filled p set","enter a new shell","remove a proton","form a metallic bond"],"answer_index":1,"explanation":"The incoming electron is added to a higher-n orbital against a closed shell, so energy must be supplied.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electron-gain","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-199","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Electron gain enthalpy generally becomes more negative on moving from left to right in a","options":["group","period","set of isotopes","metallic crystal"],"answer_index":1,"explanation":"Zeff rises and the vacancy is closer to the nucleus, so electron attachment is more exothermic.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electron-gain","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-200","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"On moving down a halogen group, electron gain enthalpy generally becomes less negative after","options":["fluorine","chlorine","astatine","helium"],"answer_index":1,"explanation":"Cl has the most negative value; Br and I are less exothermic as the added electron is farther from the nucleus.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electron-gain","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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