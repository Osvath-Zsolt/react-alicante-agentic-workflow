-- Adds `sessions.level` as a proper Postgres enum (same rationale as
-- `session_track` in 20260918100000_session_track_enum.sql): the allowed
-- values live in the schema, and `pnpm db:types` then generates a union type
-- for them instead of a plain string.
--
-- The column can't be added NOT NULL with no default on a table that already
-- has rows in one step, so this adds it nullable, backfills every existing
-- row by id, then tightens it to NOT NULL once every row has a value.

create type public.session_level as enum ('beginner', 'intermediate', 'advanced');

alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions set level = 'beginner' where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced' where id = 'server-components-deep-dive';
update public.sessions set level = 'advanced' where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'advanced' where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner' where id = 'closing-panel';

alter table public.sessions
  alter column level set not null;
