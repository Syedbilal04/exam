insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-pe-121","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"The period number of an element equals the","options":["number of valence electrons","principal quantum number of its valence shell","atomic number divided by two","group number in every case"],"answer_index":1,"explanation":"Period 3 elements have n = 3 as the outer shell, period 4 have n = 4, and so on.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"modern-law-table","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-122","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"IUPAC temporary names for elements with Z greater than 100 are built from","options":["the discoverer's surname only","Latin roots of the digits of the atomic number","the atomic mass rounded to an integer","the name of the mineral in which they occur"],"answer_index":1,"explanation":"Each digit 0–9 has a Latin stem (nil, un, bi, …) so Z = 107 is unnilseptium until a permanent name is approved.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"modern-law-table","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-123","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Isotopes of one element occupy a single position in the modern table because they share the","options":["mass number","atomic number","neutron number","atomic mass exactly"],"answer_index":1,"explanation":"The modern law uses Z; isotopes differ in N and A but not in Z or chemistry.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"modern-law-table","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-124","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"The argon–potassium pair is placed in the order Ar then K once elements are arranged by","options":["atomic mass","atomic number","density","atomic volume"],"answer_index":1,"explanation":"Z(Ar) = 18 and Z(K) = 19, so the modern sequence matches chemical groups even though A(Ar) > A(K).","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"modern-law-table","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-125","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"A group-2 (alkaline earth) atom has how many valence electrons in the ns subshell?","options":["one","two","three","eight"],"answer_index":1,"explanation":"The configuration ends in ns², so the group number in the s-block equals the valence-electron count.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"modern-law-table","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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