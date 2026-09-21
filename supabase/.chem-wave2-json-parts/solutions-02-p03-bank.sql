insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-so-146","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"At 298 K, $K_H$ for N2 in water is 8.0 × 10⁴ atm. Under 0.80 atm of nitrogen the dissolved mole fraction is","options":["1.0 × 10⁻⁵","8.0 × 10⁻⁴","0.80","1.0 × 10⁻³"],"answer_index":0,"explanation":"x = p / $K_H$ = 0.80 / 8.0 × 10⁴ = 1.0 × 10⁻⁵.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"henrys-law","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-147","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Two gases have $K_H$ values 2 × 10³ atm and 5 × 10⁴ atm. At the same partial pressure the more soluble gas is the one with","options":["$K_H$ = 2 × 10³ atm","$K_H$ = 5 × 10⁴ atm","equal solubility in both cases","neither gas dissolving"],"answer_index":0,"explanation":"Solubility falls as $K_H$ rises, so the smaller constant marks the more soluble gas.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"henrys-law","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-148","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"A mountaineer takes up less oxygen at high altitude mainly because","options":["the partial pressure of O2 in the air is lower","$K_H$ of oxygen becomes zero","blood volume instantly doubles","nitrogen is absent from the atmosphere"],"answer_index":0,"explanation":"Henry’s law: dissolved x(O2) tracks p(O2), which falls as total air pressure falls.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"henrys-law","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-149","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"If the partial pressure of CO2 above a drink is doubled at constant temperature, the dissolved mole fraction of CO2","options":["doubles","halves","becomes four times","stays exactly the same"],"answer_index":0,"explanation":"x ∝ p at fixed T, so doubling p doubles the dissolved mole fraction.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"henrys-law","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-so-150","chapter_id":"chemistry-solutions","subject_id":"chemistry","stem":"Dry air is 0.21 mole fraction oxygen. With $K_H$(O2) = 3.3 × 10⁷ torr and a total air pressure of 760 torr, dissolved x(O2) is nearest","options":["4.8 × 10⁻⁶","2.1 × 10⁻¹","3.3 × 10⁻⁷","1.6 × 10⁻⁴"],"answer_index":0,"explanation":"p(O2) = 0.21 × 760 = 160 torr; x = 160 / 3.3 × 10⁷ ≈ 4.8 × 10⁻⁶.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"hard","concept_id":"henrys-law","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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