insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$[{"id":"che-pe-271","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Down a group, the increase in shielding and the addition of shells outweigh the rise in nuclear charge, so","options":["atomic size shrinks","atomic size grows","IE rises sharply","all elements become noble gases"],"answer_index":1,"explanation":"The net result is a larger, more loosely held valence electron in the heavier congener.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"periodic-trends-general","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-272","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"In a given period, a smaller atomic size is generally accompanied by a","options":["smaller ionisation enthalpy","larger ionisation enthalpy","negative nuclear charge","new f subshell"],"answer_index":1,"explanation":"The outer electron is closer to the nucleus and harder to remove in the smaller atom.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"periodic-trends-general","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-273","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Non-metallic character increases from left to right across a","options":["group","period","set of alkali metals","lanthanoid contraction pair"],"answer_index":1,"explanation":"IE and electronegativity rise, so the tendency to gain or share electrons grows.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"periodic-trends-general","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-274","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Melting points, boiling points and densities of elements also display","options":["no variation with Z","periodic variation","a linear fall with mass number only","identical values in every group"],"answer_index":1,"explanation":"These bulk properties repeat in a rough pattern because bonding type and size are themselves periodic.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"periodic-trends-general","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-275","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"s-block elements are strongly electropositive metals, except for","options":["sodium and potassium","hydrogen and helium","calcium and barium","all of group 2"],"answer_index":1,"explanation":"H and He are non-metals placed in period 1; the rest of the s-block are typical metals.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"periodic-trends-general","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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