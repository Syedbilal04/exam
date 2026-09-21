insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$[{"id":"che-ek-221","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"Molecularity is a meaningful idea only for","options":["an elementary step","every complex multi-step reaction as a whole","equilibrium constants","conductivity experiments"],"answer_index":0,"explanation":"A complex reaction is a sequence of elementary steps; it has an order but not a single molecularity.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"order-molecularity","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-222","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"Decomposition of a single gaseous molecule in one elementary act is described as","options":["unimolecular","bimolecular","zero-order by definition","termolecular only"],"answer_index":0,"explanation":"One reactant species appears in the elementary step, so the molecularity is one.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"order-molecularity","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-223","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"A bimolecular elementary reaction involves","options":["a collision between two species (like or unlike)","the simultaneous meeting of four molecules","no collision at all","only a change of solvent polarity"],"answer_index":0,"explanation":"Two particles must encounter each other; the step is first order in each (or second order in one if they are identical).","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"order-molecularity","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-224","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"Ammonia decomposition on a tungsten surface at high pressure is a familiar textbook example of a","options":["zero-order reaction","third-order gas reaction","unimolecular reaction in the gas phase only","reaction with no rate constant"],"answer_index":0,"explanation":"The surface is saturated, so the rate becomes independent of the NH$_3$ pressure: order zero.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"order-molecularity","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-225","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"The experimental law rate $= k[\\mathrm{H_2}][\\mathrm{Br_2}]^{1/2}$ has overall order","options":["1.5","2","0.5","1"],"answer_index":0,"explanation":"Exponents add: $1 + 1/2 = 3/2$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"order-molecularity","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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