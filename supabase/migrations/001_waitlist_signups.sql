-- Waitlist signups table + RLS + RPC functions for count and queue position.
create table if not exists waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  store_name text not null,
  store_url text not null,
  category text not null,
  monthly_orders text not null,
  platform text not null,
  email text not null unique,
  phone text,
  phone_verified boolean not null default false,
  status text not null default 'pending'
);

-- If the table already existed from an earlier run, add the phone columns.
alter table waitlist_signups add column if not exists phone text;
alter table waitlist_signups add column if not exists phone_verified boolean not null default false;

alter table waitlist_signups enable row level security;

-- Anyone (anon or a phone-verified authenticated visitor) may insert their own row.
drop policy if exists "anon_insert_waitlist" on waitlist_signups;
create policy "public_insert_waitlist"
  on waitlist_signups
  for insert
  to anon, authenticated
  with check (true);

create or replace function get_waitlist_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*)::bigint from waitlist_signups;
$$;

create or replace function get_waitlist_position(signup_id uuid)
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*)::bigint
  from waitlist_signups
  where created_at <= (
    select created_at from waitlist_signups where id = signup_id
  );
$$;

grant execute on function get_waitlist_count() to anon, authenticated;
grant execute on function get_waitlist_position(uuid) to anon, authenticated;
