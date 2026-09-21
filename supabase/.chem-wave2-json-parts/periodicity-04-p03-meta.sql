insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
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
on conflict (question_id) do update set
  appear_count = excluded.appear_count,
  years = excluded.years,
  exams = excluded.exams,
  verified = excluded.verified;