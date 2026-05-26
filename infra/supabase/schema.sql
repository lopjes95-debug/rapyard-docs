-- USERS
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  email text unique not null,
  avatar_url text,
  lane text not null check (lane in ('rapper', 'producer', 'listener')),
  styles text[] not null default '{}',
  followers int not null default 0,
  following int not null default 0,
  created_at timestamptz not null default now()
);

-- TRACKS
create table if not exists tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  description text,
  audio_url text not null,
  cover_url text,
  style text not null,
  duration int not null,
  plays int not null default 0,
  likes int not null default 0,
  created_at timestamptz not null default now()
);

-- CYPHERS
create table if not exists cyphers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  is_live boolean not null default false,
  participants int not null default 0,
  host_user_id uuid references users(id),
  created_at timestamptz not null default now()
);

-- BATTLES
create table if not exists battles (
  id uuid primary key default gen_random_uuid(),
  rapper_a uuid not null references users(id),
  rapper_b uuid not null references users(id),
  points_a int not null default 0,
  points_b int not null default 0,
  votes_a int not null default 0,
  votes_b int not null default 0,
  status text not null check (status in ('upcoming', 'live', 'finished')),
  started_at timestamptz,
  ended_at timestamptz
);

-- BATTLE VOTES
create table if not exists battle_votes (
  id uuid primary key default gen_random_uuid(),
  battle_id uuid not null references battles(id) on delete cascade,
  voter_id uuid not null references users(id) on delete cascade,
  voted_for text not null check (voted_for in ('A', 'B')),
  created_at timestamptz not null default now(),
  unique (battle_id, voter_id)
);

-- DROPS
create table if not exists drops (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references tracks(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  plays int not null default 0,
  likes int not null default 0,
  created_at timestamptz not null default now()
);

-- NOTIFICATIONS
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  payload jsonb not null default '{}'::jsonb,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- FEED ITEMS
create table if not exists feed_items (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  ref_id uuid not null,
  created_at timestamptz not null default now()
);
