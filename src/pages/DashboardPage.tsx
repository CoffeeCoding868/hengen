import { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Video,
  Clock,
  CheckCircle2,
  Loader2,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import type { VideoProject, PageId } from '@/types';
import { supabase } from '@/lib/supabase';
import { ProjectCard } from '@/components/ProjectCard';
import { ToastData } from '@/components/Toast';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
  onOpenProject: (project: VideoProject) => void;
  showToast: (type: ToastData['type'], message: string) => void;
}

export function DashboardPage({ onNavigate, onOpenProject, showToast }: DashboardPageProps) {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'draft' | 'processing' | 'completed'>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('video_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showToast('error', 'Failed to load projects');
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('video_projects').delete().eq('id', id);
    if (error) {
      showToast('error', 'Failed to delete project');
    } else {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('success', 'Project deleted');
    }
  }

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === 'completed').length,
    processing: projects.filter((p) => p.status === 'processing').length,
    drafts: projects.filter((p) => p.status === 'draft').length,
  };

  return (
    <div className="animate-fade-in p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-dark-900">My Projects</h1>
          <p className="mt-1 text-sm text-dark-500">Create, manage, and share your AI videos</p>
        </div>
        <button
          onClick={() => onNavigate('studio')}
          className="btn-primary"
        >
          <Plus className="h-5 w-5" />
          New Video
        </button>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Projects" value={stats.total} icon={Video} color="from-primary-500 to-primary-700" />
        <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} color="from-success-500 to-success-600" />
        <StatCard label="Processing" value={stats.processing} icon={Loader2} color="from-warning-500 to-warning-600" />
        <StatCard label="Drafts" value={stats.drafts} icon={Clock} color="from-dark-500 to-dark-700" />
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !pl-11"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'draft', 'processing', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : 'bg-white text-dark-600 border border-dark-200 hover:border-dark-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="aspect-video shimmer-bg animate-shimmer" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 rounded shimmer-bg animate-shimmer" />
                <div className="h-4 w-1/2 rounded shimmer-bg animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyState onNavigate={onNavigate} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={onOpenProject}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: typeof Video;
  color: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-dark-500">{label}</p>
          <p className="mt-1 text-2xl font-extrabold text-dark-900">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-xl shadow-primary-500/30">
        <Sparkles className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-xl font-bold text-dark-900">No projects yet</h3>
      <p className="mt-2 max-w-md text-sm text-dark-500">
        Create your first AI video to get started. Choose an avatar, write a script, and let AI do the rest.
      </p>
      <button
        onClick={() => onNavigate('studio')}
        className="btn-primary mt-6"
      >
        <Plus className="h-5 w-5" />
        Create Your First Video
      </button>
    </div>
  );
}
