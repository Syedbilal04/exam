insert into question_bank (id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id)
select id, chapter_id, subject_id, stem, options, answer_index, explanation, images, source, difficulty, concept_id
from jsonb_to_recordset($json$[{"id":"che-ek-281","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"According to collision theory, a chemically effective encounter must supply at least the","options":["threshold (activation) energy","lattice energy of a salt","Faraday equivalent of the product","standard EMF of a Daniell cell"],"answer_index":0,"explanation":"Only collisions whose relative kinetic energy exceeds $E_a$ can cross the barrier into products.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"collision-qual","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-282","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"Besides enough energy, colliding molecules must also have a suitable","options":["orientation of the reactive parts toward each other","nuclear spin of every proton","colour in the visible spectrum","negative activation energy"],"answer_index":0,"explanation":"A steric (orientation) requirement means that a sideways or backside-wrong hit wastes the energy of an otherwise hot collision.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"collision-qual","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-283","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"An effective collision is one that","options":["has both sufficient energy and the correct geometry, and therefore leads to product","occurs at the wall of the vessel only","involves the solvent but never the solute","always produces light"],"answer_index":0,"explanation":"Collision theory writes rate ∝ (collision frequency) × (energy factor) × (steric factor).","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"collision-qual","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-284","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"Most collisions in a gas-phase sample do not yield product because","options":["they lack either the required energy or the required orientation (or both)","molecules never touch one another","the collision frequency is exactly zero","Faraday's first law forbids gas reactions"],"answer_index":0,"explanation":"The exponential energy factor $e^{-E_a/RT}$ is usually ≪ 1, and the steric factor is also less than 1, so only a tiny fraction of hits succeed.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"collision-qual","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-ek-285","chapter_id":"chemistry-electrochemistry-and-chemical-kinetics","subject_id":"chemistry","stem":"The steric factor $P$ introduced in collision theory is less than one when","options":["only some geometries of an otherwise energetic collision can lead to reaction","every collision is chemically productive","$E_a$ is exactly zero","the reaction is zero order"],"answer_index":0,"explanation":"$P$ (also called the probability factor) corrects the simple hard-sphere collision rate for orientation and other restrictions.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"medium","concept_id":"collision-qual","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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
