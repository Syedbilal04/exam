-- Authored items carry difficulty and a concept map id.
-- Exam targeting stays in question_pyq_meta.exams.
-- Drop the read-model view first: CREATE OR REPLACE cannot reorder columns.

drop view if exists questions;

alter table question_bank
  add column if not exists difficulty text;

alter table question_bank
  add column if not exists concept_id text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'question_bank_difficulty_check'
  ) then
    alter table question_bank
      add constraint question_bank_difficulty_check
      check (difficulty is null or difficulty in ('easy', 'medium', 'hard'));
  end if;
end $$;

create or replace view questions as
select
  q.id,
  q.chapter_id,
  q.subject_id,
  q.stem,
  q.options,
  q.answer_index,
  q.explanation,
  q.images,
  q.source,
  q.difficulty,
  q.concept_id,
  jsonb_build_object(
    'appearCount', coalesce(m.appear_count, 0),
    'years', to_jsonb(coalesce(m.years, '{}')),
    'exams', to_jsonb(coalesce(m.exams, '{}')),
    'verified', coalesce(m.verified, false)
  ) as pyq
from question_bank q
left join question_pyq_meta m on m.question_id = q.id;
