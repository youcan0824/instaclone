-- Add image_url column to posts
alter table public.posts add column image_url text;

-- Create storage bucket for post images
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true);

-- Storage RLS: anyone can view images
create policy "post_images_select" on storage.objects
  for select using (bucket_id = 'post-images');

-- Storage RLS: authenticated users can upload
create policy "post_images_insert" on storage.objects
  for insert with check (
    bucket_id = 'post-images'
    and auth.role() = 'authenticated'
  );

-- Storage RLS: users can delete their own uploads
create policy "post_images_delete" on storage.objects
  for delete using (
    bucket_id = 'post-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
