insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$[{"id":"che-ek-246","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"If 60% of a first-order reactant remains after 20 min, the leftover fraction after a further 20 min is nearest","options":["0.36","0.60","0.16","0.48"],"answer_index":0,"explanation":"First order: the same time interval multiplies [A] by the same factor 0.60, so $0.60 \\times 0.60 = 0.36$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"integrated-half-life","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-247","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"How long does a first-order reaction of half-life 15 min take to reach 75% completion?","options":["30 min","15 min","45 min","7.5 min"],"answer_index":0,"explanation":"75% completion is two half-lives, so $2 \\times 15 = 30\\ \\mathrm{min}$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"integrated-half-life","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-248","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"From a measured first-order half-life of 46.2 min one obtains $k$ equal to","options":["$1.50 \\times 10^{-2}\\ \\mathrm{min^{-1}}$","$46.2\\ \\mathrm{min^{-1}}$","$0.693\\ \\mathrm{min^{-1}}$","$3.00 \\times 10^{-2}\\ \\mathrm{min^{-1}}$"],"answer_index":0,"explanation":"$k = 0.693/t_{1/2} = 0.693/46.2 = 1.50 \\times 10^{-2}\\ \\mathrm{min^{-1}}$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"integrated-half-life","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-249","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"A zero-order reaction with $k = 2.0 \\times 10^{-3}\\ \\mathrm{mol\\ L^{-1}\\ min^{-1}}$ and $[\\mathrm{A}]_0 = 0.20\\ \\mathrm{M}$ is complete after","options":["100 min","50 min","200 min","0.10 min"],"answer_index":0,"explanation":"Completion means $[\\mathrm{A}] = 0$, so $t = [\\mathrm{A}]_0/k = 0.20/(2.0 \\times 10^{-3}) = 100\\ \\mathrm{min}$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"integrated-half-life","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-250","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"Starting from a first-order sample, the number of half-lives needed to leave only one-eighth of the reactant is","options":["3","2","4","8"],"answer_index":0,"explanation":"$(1/2)^n = 1/8$ gives $n = 3$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"integrated-half-life","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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