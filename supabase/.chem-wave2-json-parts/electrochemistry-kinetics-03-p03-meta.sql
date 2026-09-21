insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$[{"id":"che-ek-171","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"One faraday of charge liberates from an electrolyte","options":["one gram-equivalent of the substance","one gram-molecule regardless of $n$","exactly one gram of any metal","22.4 L of every gas at STP"],"answer_index":0,"explanation":"1 F deposits 1 equivalent: 108 g Ag, 31.75 g Cu, 9 g Al, 11.2 L H$_2$ at STP, and so on.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electrolysis-faraday","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-172","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"The charge carried by one mole of electrons is called","options":["one faraday","one ampere","one siemens","one equivalent conductivity"],"answer_index":0,"explanation":"$F = N_A e \\approx 96500\\ \\mathrm{C\\ mol^{-1}}$. It is the charge needed to reduce one mole of a univalent ion.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electrolysis-faraday","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-173","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"Electrolysis of molten sodium chloride yields, as the electrode products,","options":["sodium metal at the cathode and chlorine gas at the anode","hydrogen at the cathode and oxygen at the anode","chlorine at both electrodes","solid NaCl crystals on the anode"],"answer_index":0,"explanation":"In the melt the only ions are Na$^+$ and Cl$^-$, so Na and Cl$_2$ are discharged.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electrolysis-faraday","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-174","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"When aqueous CuSO$_4$ is electrolysed with copper electrodes, the anode reaction is","options":["dissolution of copper metal as Cu$^{2+}$","evolution of oxygen from water","deposition of solid sulphur","reduction of Cu$^{2+}$ to Cu"],"answer_index":0,"explanation":"A copper anode is oxidised in preference to water or sulphate, so the anode loses mass while copper plates at the cathode.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electrolysis-faraday","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-175","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"Preferential discharge at an electrode is decided by","options":["the ion that is most easily reduced (or oxidised) under the prevailing conditions","the ion present in the largest catalogue mass only","the colour of the electrolyte","the cell constant of the vessel"],"answer_index":0,"explanation":"The couple with the more favourable discharge potential (including overvoltage and concentration) is liberated first.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"electrolysis-faraday","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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