insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-pe-146","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Helium is placed with the noble gases even though its configuration is $1s^{2}$ because","options":["it has an incomplete p subshell","it has a closed shell and is chemically inert","it is an alkali metal","its atomic number is eighteen"],"answer_index":1,"explanation":"A filled 1s shell gives helium the noble-gas chemistry of group 18, not the s-block reactivity of group 2.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"periods-groups-blocks","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-147","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"The fourth period contains eighteen elements because the subshells that fill in that period are","options":["4s and 4p only","4s, 3d and 4p","5s, 4d and 5p","4f and 5d only"],"answer_index":1,"explanation":"Capacity 2 + 10 + 6 = 18; 4f is not occupied until period 6.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"periods-groups-blocks","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-148","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"The f-block is printed below the main table because inserting the fourteen lanthanoids into period 6 would","options":["violate the modern periodic law","make that row awkwardly wide","change their atomic numbers","turn them into s-block metals"],"answer_index":1,"explanation":"The two-row footnote is a display convention; chemically the lanthanoids still belong in period 6.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"periods-groups-blocks","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-149","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"On moving from left to right across a period, the atomic radius of the elements generally","options":["increases","decreases","remains exactly constant","becomes infinite"],"answer_index":1,"explanation":"Rising effective nuclear charge pulls the same-shell electrons inward, so the atom shrinks.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"atomic-ionic-radius","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-150","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"On descending a group, the atomic radius of the elements generally","options":["decreases","increases","becomes zero","is independent of the new shell"],"answer_index":1,"explanation":"Each step down adds a principal shell, which outweighs the extra nuclear charge.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"atomic-ionic-radius","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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