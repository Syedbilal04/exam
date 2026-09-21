insert into question_pyq_meta (question_id, appear_count, years, exams, verified)
select id, appear_count, coalesce((select array_agg(v::int) from jsonb_array_elements_text(years) as v), '{}')::int[], coalesce((select array_agg(v) from jsonb_array_elements_text(exams) as v), '{}')::text[], verified
from jsonb_to_recordset($json$[{"id":"che-pe-171","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Ionisation enthalpy is the energy needed to remove an electron from an isolated gaseous atom in its","options":["first excited state only","ground state","metallic crystal","aqueous solution"],"answer_index":1,"explanation":"The textbook definition uses the ground-state gaseous atom: M(g) → M⁺(g) + e⁻.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"ionization-enthalpy","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-172","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"The first ionisation enthalpy refers to removal of an electron from the","options":["uninegative ion","neutral gaseous atom","dipositive cation","solid metal lattice"],"answer_index":1,"explanation":"IE₁ is for M(g); IE₂ is for M⁺(g), and so on.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"ionization-enthalpy","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-173","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"First ionisation enthalpy generally increases from left to right across a","options":["group","period","f-block row only","set of isotopes"],"answer_index":1,"explanation":"Zeff rises and size falls across a period, so the outer electron is harder to remove.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"ionization-enthalpy","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-174","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"First ionisation enthalpy generally decreases from top to bottom in a","options":["period","group","isoelectronic pair","triad of identical Z"],"answer_index":1,"explanation":"The valence electron is farther from the nucleus and more shielded in the heavier congener.","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"ionization-enthalpy","appear_count":0,"years":[],"exams":[],"verified":false},{"id":"che-pe-175","chapter_id":"chemistry-classification-of-elements-and-periodicity-in-properties","subject_id":"chemistry","stem":"Ionisation enthalpies of elements are commonly expressed in","options":["kelvin","kilojoules per mole","atmospheres","cubic centimetres"],"answer_index":1,"explanation":"TSBIE tables quote ΔᵢH in kJ mol⁻¹ (sometimes also in eV per atom).","images":[],"source":{"name":"ASTRA chemistry practice set","license":"Original syllabus-based practice questions (exam-frequent themes; not verbatim past papers)"},"difficulty":"easy","concept_id":"ionization-enthalpy","appear_count":0,"years":[],"exams":[],"verified":false}]$json$::jsonb) as x(
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