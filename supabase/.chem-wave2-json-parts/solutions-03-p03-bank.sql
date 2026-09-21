insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-so-171","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"An ideal blend has $x_A = 0.30$, $p_A^\\circ = 200$ torr and $p_B^\\circ = 100$ torr. Mole fraction of A in the vapour is nearest","options":["0.46","0.30","0.67","0.23"],"answer_index":0,"explanation":"$p_A = 60$ torr, $p_B = 70$ torr, $p = 130$ torr, so $y_A = 60/130 \\approx 0.46$.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"raoult-vapour","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-172","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"At 350 K the liquid mole fraction of hexane is 0.25 ($p^\\circ_{\\mathrm{hex}} = 90$ kPa, $p^\\circ_{\\mathrm{hept}} = 30$ kPa). Total vapour pressure of this ideal pair is","options":["45 kPa","60 kPa","30 kPa","120 kPa"],"answer_index":0,"explanation":"$p = 90 \\times 0.25 + 30 \\times 0.75 = 22.5 + 22.5 = 45$ kPa.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"raoult-vapour","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-173","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"An ideal liquid solution is characterised by","options":["$\\Delta H_{\\mathrm{mix}} = 0$ and $\\Delta V_{\\mathrm{mix}} = 0$","$\\Delta H_{\\mathrm{mix}} > 0$ only","$\\Delta G_{\\mathrm{mix}} = 0$","$\\Delta S_{\\mathrm{mix}} = 0$"],"answer_index":0,"explanation":"No heat is absorbed or evolved and the volumes are strictly additive for an ideal mix.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"ideal-nonideal","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-174","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Molecular interactions in an ideal A–B solution satisfy","options":["A–A, B–B and A–B forces of similar strength","A–B much stronger than like pairs","A–B much weaker than like pairs","no A–B contacts at all"],"answer_index":0,"explanation":"Equal interaction energies make the mixture obey Raoult’s law at all compositions.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"ideal-nonideal","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-175","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Benzene and toluene form a nearly ideal pair because they have","options":["similar size and intermolecular forces","opposite polarity","hydrogen bonds of very different strength","ionic lattices"],"answer_index":0,"explanation":"Both are non-polar aromatics of comparable size, so A–B forces match A–A and B–B.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"ideal-nonideal","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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