-- ASTRA mock exam portal: core schema.
-- Catalog tables mirror src/content/catalog.ts, question tables are filled by
-- the import pipeline, and attempt tables hold student history.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- catalog ---

create table if not exists subjects (
  id text primary key,
  name text not null
);

create table if not exists streams (
  id text primary key,
  name text not null
);

create table if not exists stream_subjects (
  stream_id text not null references streams (id) on delete cascade,
  subject_id text not null references subjects (id) on delete cascade,
  primary key (stream_id, subject_id)
);

create table if not exists exams (
  id text primary key,
  name text not null,
  authority text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  marking jsonb not null
);

create table if not exists exam_quotas (
  exam_id text not null references exams (id) on delete cascade,
  stream_id text not null references streams (id) on delete cascade,
  subject_id text not null references subjects (id) on delete cascade,
  question_count integer not null check (question_count > 0),
  primary key (exam_id, stream_id, subject_id)
);

create table if not exists chapters (
  id text primary key,
  subject_id text not null references subjects (id) on delete cascade,
  name text not null,
  year smallint not null check (year in (1, 2))
);

create index if not exists chapters_subject_idx on chapters (subject_id);

-- -------------------------------------------------------------- questions ---

create table if not exists question_bank (
  id text primary key,
  chapter_id text not null references chapters (id) on delete cascade,
  subject_id text not null references subjects (id) on delete cascade,
  stem text not null,
  options jsonb not null,
  answer_index integer not null check (answer_index >= 0),
  explanation text,
  -- Diagrams served from public/questions/, as [{url, alt, width, height}].
  images jsonb not null default '[]',
  source jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists question_bank_chapter_idx on question_bank (chapter_id);
create index if not exists question_bank_subject_idx on question_bank (subject_id);

create table if not exists question_pyq_meta (
  question_id text primary key references question_bank (id) on delete cascade,
  appear_count integer not null default 0,
  years integer[] not null default '{}',
  exams text[] not null default '{}',
  -- False while the bundled sample metadata is in place.
  verified boolean not null default false
);

-- Read model used by the app: question plus its previous-year metadata.
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
  jsonb_build_object(
    'appearCount', coalesce(m.appear_count, 0),
    'years', to_jsonb(coalesce(m.years, '{}')),
    'exams', to_jsonb(coalesce(m.exams, '{}')),
    'verified', coalesce(m.verified, false)
  ) as pyq
from question_bank q
left join question_pyq_meta m on m.question_id = q.id;

create or replace view chapter_question_counts as
select chapter_id, count(*)::int as question_count
from question_bank
group by chapter_id;

-- --------------------------------------------------------------- attempts ---

create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  guest_session_id text,
  exam_id text not null references exams (id),
  stream_id text not null references streams (id),
  chapter_ids text[] not null,
  question_ids text[] not null,
  duration_minutes integer not null,
  status text not null default 'in_progress' check (status in ('in_progress', 'submitted')),
  answers jsonb not null default '{}',
  score jsonb,
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  constraint attempts_has_owner check (user_id is not null or guest_session_id is not null)
);

create index if not exists attempts_user_idx on attempts (user_id, created_at desc);
create index if not exists attempts_guest_idx on attempts (guest_session_id, created_at desc);

create table if not exists attempt_answers (
  attempt_id uuid not null references attempts (id) on delete cascade,
  question_id text not null references question_bank (id) on delete cascade,
  chosen_index integer,
  is_correct boolean not null default false,
  primary key (attempt_id, question_id)
);

-- Anti-repeat ledger. Guests are tracked by their session cookie so a fresh
-- paper stays fresh even before the student creates an account.
create table if not exists seen_questions (
  owner_kind text not null check (owner_kind in ('user', 'guest')),
  owner_id text not null,
  question_id text not null references question_bank (id) on delete cascade,
  last_seen_at timestamptz not null default now(),
  primary key (owner_kind, owner_id, question_id)
);

create index if not exists seen_questions_owner_idx on seen_questions (owner_kind, owner_id);

-- -------------------------------------------------------------------- RLS ---

alter table subjects enable row level security;
alter table streams enable row level security;
alter table stream_subjects enable row level security;
alter table exams enable row level security;
alter table exam_quotas enable row level security;
alter table chapters enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['subjects', 'streams', 'stream_subjects', 'exams', 'exam_quotas', 'chapters']
  loop
    execute format(
      'create policy %I on %I for select using (true)',
      t || '_public_read', t
    );
  exception when duplicate_object then
    null;
  end loop;
end
$$;

-- Question rows carry the answer key, so no anon or authenticated policy is
-- created: only the server-side service role may read them.
alter table question_bank enable row level security;
alter table question_pyq_meta enable row level security;

alter table attempts enable row level security;
alter table attempt_answers enable row level security;
alter table seen_questions enable row level security;

drop policy if exists attempts_owner_read on attempts;
create policy attempts_owner_read on attempts
  for select using (auth.uid() = user_id);

drop policy if exists attempt_answers_owner_read on attempt_answers;
create policy attempt_answers_owner_read on attempt_answers
  for select using (
    exists (
      select 1 from attempts a
      where a.id = attempt_answers.attempt_id and a.user_id = auth.uid()
    )
  );

drop policy if exists seen_questions_owner_read on seen_questions;
create policy seen_questions_owner_read on seen_questions
  for select using (owner_kind = 'user' and owner_id = auth.uid()::text);
