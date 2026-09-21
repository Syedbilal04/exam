insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-pe-281","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Na⁺ and neon are isoelectronic, but Na⁺ has the higher ionisation enthalpy because of its","options":["smaller nuclear charge","greater nuclear charge","extra 3s electron","f-block contraction"],"answer_index":1,"explanation":"Both have 10 electrons; Z(Na⁺) = 11 > Z(Ne) = 10, so the Na⁺ cloud is more tightly bound.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"periodic-trends-general","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-282","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"The first ionisation enthalpy of gallium is slightly higher than that of aluminium because the poorly shielding 3d¹⁰ electrons","options":["lower Zeff on Ga","raise Zeff on Ga","remove the 4p electron","turn Ga into an alkali metal"],"answer_index":1,"explanation":"d-block contraction increases Zeff and offsets the expected fall of IE down group 13.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"periodic-trends-general","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-283","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Oxygen is smaller than nitrogen, which would suggest a higher IE for O, yet IE of O is lower than that of N because","options":["oxygen has a half-filled 2p³ set","the paired 2p⁴ electron of oxygen is easier to remove","nitrogen has the larger nuclear charge","oxygen lacks a 2s pair"],"answer_index":1,"explanation":"The size trend and the pairing-repulsion trend oppose each other; pairing wins, so IE(N) > IE(O).","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"periodic-trends-general","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-284","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Size decreases from Be to B, which would suggest a higher IE for B; the observed lower IE of B is due to","options":["the ease of removing the 2p electron compared with Be 2s²","a fall in nuclear charge from Be to B","boron having a closed 2p⁶ shell","beryllium being a halogen"],"answer_index":0,"explanation":"Again two trends conflict: smaller radius would raise IE, but the change of subshell (2s → 2p) lowers it.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"periodic-trends-general","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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
