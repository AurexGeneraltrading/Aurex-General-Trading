-- AUREX Projects & Installations gallery setup
-- Run this entire script in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_aurex_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()); $$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  category text not null check (category in ('LED Screen Installations','Lighting & Programming','Electrical Works','Building Materials')),
  location text,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  media_type text not null check (media_type in ('image','video')),
  storage_path text not null unique,
  public_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;

-- Public visitors can only read published projects and their media.
drop policy if exists "Public read published projects" on public.projects;
create policy "Public read published projects" on public.projects for select to anon, authenticated using (is_published or public.is_aurex_admin());
drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects" on public.projects for all to authenticated using (public.is_aurex_admin()) with check (public.is_aurex_admin());
drop policy if exists "Public read media for published projects" on public.project_media;
create policy "Public read media for published projects" on public.project_media for select to anon, authenticated using (exists (select 1 from public.projects p where p.id=project_id and (p.is_published or public.is_aurex_admin())));
drop policy if exists "Admins manage project media" on public.project_media;
create policy "Admins manage project media" on public.project_media for all to authenticated using (public.is_aurex_admin()) with check (public.is_aurex_admin());

-- Create the public-read storage bucket (100 MB per object). The browser admin uses the public URL for display.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('aurex-project-media','aurex-project-media',true,104857600,array['image/jpeg','image/png','image/webp','video/mp4','video/webm'])
on conflict (id) do update set public=true,file_size_limit=104857600,allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "Public view AUREX project media" on storage.objects;
create policy "Public view AUREX project media" on storage.objects for select to anon, authenticated using (bucket_id='aurex-project-media');
drop policy if exists "AUREX admins upload project media" on storage.objects;
create policy "AUREX admins upload project media" on storage.objects for insert to authenticated with check (bucket_id='aurex-project-media' and public.is_aurex_admin());
drop policy if exists "AUREX admins update project media" on storage.objects;
create policy "AUREX admins update project media" on storage.objects for update to authenticated using (bucket_id='aurex-project-media' and public.is_aurex_admin()) with check (bucket_id='aurex-project-media' and public.is_aurex_admin());
drop policy if exists "AUREX admins delete project media" on storage.objects;
create policy "AUREX admins delete project media" on storage.objects for delete to authenticated using (bucket_id='aurex-project-media' and public.is_aurex_admin());

-- IMPORTANT: after creating your admin user in Supabase Authentication > Users,
-- copy that user's UUID and run the following separately (replace the UUID):
-- insert into public.admin_users (user_id) values ('YOUR-AUTH-USER-UUID');
