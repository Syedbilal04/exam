insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
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
on conflict (id) do update set
  stem = excluded.stem,
  options = excluded.options,
  answer_index = excluded.answer_index,
  explanation = excluded.explanation,
  images = excluded.images,
  source = excluded.source,
  difficulty = excluded.difficulty,
  concept_id = excluded.concept_id;