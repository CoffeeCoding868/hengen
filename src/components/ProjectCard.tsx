import { Play, MoreVertical, Trash2, Pencil, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { VideoProject } from '@/types';
import { getAvatarById } from '@/data/avatars';

interface ProjectCardProps {
  project: VideoProject;
  onOpen: (project: VideoProject) => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onOpen, onDelete }: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatar = getAvatarById(project.avatar_id);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusConfig = {
    draft: { label: 'Draft', icon: Pencil, color: 'bg-dark-100 text-dark-600' },
    processing: { label: 'Processing', icon: Loader2, color: 'bg-warning-500/10 text-warning-600' },
    completed: { label: 'Completed', icon: CheckCircle2, color: 'bg-success-500/10 text-success-600' },
  };
  const status = statusConfig[project.status];

  return (
    <div className="card card-hover group overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-dark-100">
        {project.thumbnail_url || avatar ? (
          <img
            src={project.thumbnail_url || avatar?.image}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Play className="h-12 w-12 text-dark-300" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <button
          onClick={() => onOpen(project)}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-transform hover:scale-110">
            <Play className="h-6 w-6 fill-primary-600 text-primary-600" />
          </div>
        </button>

        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.color}`}>
            <status.icon className={`h-3 w-3 ${project.status === 'processing' ? 'animate-spin' : ''}`} />
            {status.label}
          </span>
        </div>

        <div className="absolute top-3 right-3" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-dark-600 shadow-sm backdrop-blur transition-colors hover:bg-white"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl border border-dark-200 bg-white py-1 shadow-xl animate-scale-in z-10">
              <button
                onClick={() => {
                  onOpen(project);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-dark-700 hover:bg-dark-50"
              >
                <Pencil className="h-4 w-4" /> Edit
              </button>
              <button
                onClick={() => {
                  onDelete(project.id);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-error-600 hover:bg-error-50"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-dark-900 truncate">{project.name}</h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-dark-500">
          {avatar && (
            <span className="flex items-center gap-1.5">
              <img src={avatar.image} alt={avatar.name} className="h-5 w-5 rounded-full object-cover" />
              {avatar.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDuration(project.duration)}
          </span>
        </div>
        <p className="mt-2 text-xs text-dark-400">
          {new Date(project.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
