-- Add bio column to profiles
alter table public.profiles add column bio text;

-- Create storage bucket for avatar images
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- Storage RLS: anyone can view avatars
create policy "avatars_select" on storage.objects
  for select using (bucket_id = 'avatars');

-- Storage RLS: authenticated users can upload their own avatar
create policy "avatars_insert" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and auth.role() = 'authenticated'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS: users can update their own avatar
create policy "avatars_update" on storage.objects
  for update using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS: users can delete their own avatar
create policy "avatars_delete" on storage.objects
  for delete using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
