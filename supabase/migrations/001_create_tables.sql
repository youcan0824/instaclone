-- 1. profiles table
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. posts table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.posts enable row level security;

-- 3. likes table
create table public.likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  post_id uuid references public.posts(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, post_id)
);

alter table public.likes enable row level security;

-- 4. comments table
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  post_id uuid references public.posts(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.comments enable row level security;

-- RLS policies: profiles
create policy "profiles_select" on public.profiles
  for select using (true);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- RLS policies: posts
create policy "posts_select" on public.posts
  for select using (published = true or auth.uid() = user_id);

create policy "posts_insert" on public.posts
  for insert with check (auth.uid() = user_id);

create policy "posts_update_own" on public.posts
  for update using (auth.uid() = user_id);

create policy "posts_delete_own" on public.posts
  for delete using (auth.uid() = user_id);

-- RLS policies: likes
create policy "likes_select" on public.likes
  for select using (true);

create policy "likes_insert" on public.likes
  for insert with check (auth.uid() = user_id);

create policy "likes_delete_own" on public.likes
  for delete using (auth.uid() = user_id);

-- RLS policies: comments
create policy "comments_select" on public.comments
  for select using (true);

create policy "comments_insert" on public.comments
  for insert with check (auth.uid() = user_id);

create policy "comments_update_own" on public.comments
  for update using (auth.uid() = user_id);

create policy "comments_delete_own" on public.comments
  for delete using (auth.uid() = user_id);

-- updated_at auto-update trigger
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.update_updated_at();

create trigger comments_updated_at
  before update on public.comments
  for each row execute function public.update_updated_at();
