insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$[{"id":"che-st-221","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"A disproportionation reaction is one in which the same element is","options":["only oxidised","only reduced","simultaneously oxidised and reduced","left with an unchanged oxidation number"],"answer_index":2,"explanation":"Part of the element’s atoms rise in ON and part fall, as in $2\\mathrm{H_2O_2} \\rightarrow 2\\mathrm{H_2O} + \\mathrm{O_2}$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"redox-balancing","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-222","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"The combination $\\mathrm{H_2} + \\mathrm{Cl_2} \\rightarrow 2\\mathrm{HCl}$ is classified as redox because","options":["no oxidation number changes","hydrogen is oxidised (0 to $+1$) and chlorine is reduced (0 to $-1$)","it is only an acid–base reaction","both elements are oxidised"],"answer_index":1,"explanation":"H$_2$ loses electrons and Cl$_2$ gains them, so the combination is a redox process.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"redox-balancing","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-223","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Which of the following laboratory changes is not a redox reaction?","options":["$2\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\mathrm{H_2O}$","$\\mathrm{Zn} + \\mathrm{H_2SO_4} \\rightarrow \\mathrm{ZnSO_4} + \\mathrm{H_2}$","$\\mathrm{HCl} + \\mathrm{NaOH} \\rightarrow \\mathrm{NaCl} + \\mathrm{H_2O}$","$\\mathrm{Fe_2O_3} + 3\\mathrm{CO} \\rightarrow 2\\mathrm{Fe} + 3\\mathrm{CO_2}$"],"answer_index":2,"explanation":"Acid–base neutralisation exchanges H$^+$ and OH$^-$ with no change in oxidation numbers.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"redox-balancing","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-224","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"In acid solution $\\mathrm{MnO_4^-}$ is reduced to $\\mathrm{Mn^{2+}}$. The number of electrons gained by one permanganate ion is","options":["2","3","5","7"],"answer_index":2,"explanation":"Mn goes from $+7$ to $+2$, a gain of five electrons.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"redox-balancing","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-st-225","chapter_id":"chemistry-stoichiometry","subject_id":"chemistry","stem":"Dichromate $\\mathrm{Cr_2O_7^{2-}}$ is reduced to two $\\mathrm{Cr^{3+}}$ ions in acid. Electrons consumed per dichromate ion are","options":["3","4","6","8"],"answer_index":2,"explanation":"Two chromium atoms each fall from $+6$ to $+3$, a total of six electrons.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"redox-balancing","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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