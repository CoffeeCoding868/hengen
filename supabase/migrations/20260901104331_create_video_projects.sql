/*
# Create video projects table (single-tenant, no auth)

This app is a single-tenant AI video generation platform (HeyGen-style).
No sign-in screen — all data is shared/public. Users can create, read, update,
and delete video projects freely.

1. New Tables
- `video_projects`
  - `id` (uuid, primary key)
  - `name` (text, not null) — project title
  - `script` (text, default '') — the script the avatar will speak
  - `avatar_id` (text, not null) — which avatar to use
  - `voice_id` (text, not null) — which voice to use
  - `template_id` (text, nullable) — optional template used as base
  - `background` (text, default 'studio') — background setting
  - `status` (text, default 'draft') — draft | processing | completed
  - `duration` (integer, default 0) — estimated video duration in seconds
  - `thumbnail_url` (text, nullable) — optional thumbnail image
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `video_projects`.
- Allow anon + authenticated CRUD because the data is intentionally shared/public (no sign-in).
*/

CREATE TABLE IF NOT EXISTS video_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Untitled Project',
  script text NOT NULL DEFAULT '',
  avatar_id text NOT NULL DEFAULT 'ava_1',
  voice_id text NOT NULL DEFAULT 'voi_1',
  template_id text,
  background text NOT NULL DEFAULT 'studio',
  status text NOT NULL DEFAULT 'draft',
  duration integer NOT NULL DEFAULT 0,
  thumbnail_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE video_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_video_projects" ON video_projects;
CREATE POLICY "anon_select_video_projects"
ON video_projects FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_video_projects" ON video_projects;
CREATE POLICY "anon_insert_video_projects"
ON video_projects FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_video_projects" ON video_projects;
CREATE POLICY "anon_update_video_projects"
ON video_projects FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_video_projects" ON video_projects;
CREATE POLICY "anon_delete_video_projects"
ON video_projects FOR DELETE
TO anon, authenticated USING (true);
