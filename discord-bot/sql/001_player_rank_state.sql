-- Run this once in the Supabase SQL editor before enabling the rank-up sync.
--
-- Tracks the last known global rank tier per player so discord-bot's
-- checkRankUps() poller can detect a *change* (network_leaderboard is a
-- read/aggregated view — there's nowhere else to durably store this).
--
-- Intentionally locked down: no anon/public RLS policies. Only the bot's
-- service-role client (which bypasses RLS) reads/writes this table.

create table if not exists player_rank_state (
  uuid text primary key,
  last_rank_name text not null,
  last_rank_hours numeric not null,
  updated_at timestamptz not null default now()
);

alter table player_rank_state enable row level security;
