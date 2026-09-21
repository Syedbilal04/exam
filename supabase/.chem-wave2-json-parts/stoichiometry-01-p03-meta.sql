insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$[{"id":"che-st-121","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"If a flask holds $3.011 \\times 10^{23}$ molecules of nitrogen, the amount of $\\mathrm{N_2}$ in that flask is","options":["0.25 mol","0.50 mol","1.00 mol","2.00 mol"],"answer_index":1,"explanation":"$N / N_A = 3.011 \\times 10^{23} / 6.022 \\times 10^{23} = 0.50$ mol.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"mole-avogadro","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-122","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"One mole of helium atoms and one mole of hydrogen molecules agree in","options":["total mass","number of elementary entities counted as ‘one mole’","number of atoms","density at STP"],"answer_index":1,"explanation":"A mole always contains $N_A$ of the named entities: He atoms or $\\mathrm{H_2}$ molecules.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"mole-avogadro","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-123","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"An STP sample of ammonia occupying 11.2 L contains molecules numbering","options":["$6.022 \\times 10^{23}$","$3.011 \\times 10^{23}$","$1.505 \\times 10^{23}$","$12.044 \\times 10^{23}$"],"answer_index":1,"explanation":"11.2 L at STP is 0.50 mol, so the molecule count is $0.50\\,N_A = 3.011 \\times 10^{23}$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"mole-avogadro","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-124","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"A 4.4 g portion of carbon dioxide is analysed for atoms. Taking $M(\\mathrm{CO_2}) = 44\\ \\mathrm{g\\,mol^{-1}}$, the total number of atoms present is","options":["$0.1\\,N_A$","$0.3\\,N_A$","$N_A$","$3\\,N_A$"],"answer_index":1,"explanation":"4.4 g is 0.10 mol of $\\mathrm{CO_2}$; each molecule has 3 atoms, giving $0.30\\,N_A$ atoms.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"mole-avogadro","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-125","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Compare 16 g of methane with 16 g of dioxygen. The sample that holds more molecules is","options":["the methane sample","the dioxygen sample","neither; the molecule counts are equal","impossible to decide without density"],"answer_index":0,"explanation":"16 g $\\mathrm{CH_4}$ is 1.0 mol of molecules; 16 g $\\mathrm{O_2}$ is only 0.50 mol, so methane has twice as many molecules.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"mole-avogadro","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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