export interface Avatar {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  gender: 'male' | 'female';
  accent: string;
}

export interface Voice {
  id: string;
  name: string;
  language: string;
  flag: string;
  gender: 'male' | 'female';
  description: string;
  previewText: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  useCase: string;
}

export interface VideoProject {
  id: string;
  name: string;
  script: string;
  avatar_id: string;
  voice_id: string;
  template_id: string | null;
  background: string;
  status: 'draft' | 'processing' | 'completed';
  duration: number;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

export type PageId =
  | 'landing'
  | 'dashboard'
  | 'studio'
  | 'avatars'
  | 'voices'
  | 'templates';
