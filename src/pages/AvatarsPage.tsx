import { useState } from 'react';
import { Search, Play, Check, Sparkles } from 'lucide-react';
import type { PageId, Avatar } from '@/types';
import { avatars } from '@/data/avatars';

interface AvatarsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectAvatar: (avatar: Avatar) => void;
}

export function AvatarsPage({ onNavigate, onSelectAvatar }: AvatarsPageProps) {
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const filtered = avatars.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesGender = filterGender === 'all' || a.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  function handleUse(avatar: Avatar) {
    onSelectAvatar(avatar);
    onNavigate('studio');
  }

  return (
    <div className="animate-fade-in p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-dark-900">AI Avatars</h1>
        <p className="mt-1 text-sm text-dark-500">
          Choose from {avatars.length} lifelike AI presenters for your videos
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search avatars by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !pl-11"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'male', 'female'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setFilterGender(g)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                filterGender === g
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : 'bg-white text-dark-600 border border-dark-200 hover:border-dark-300'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((avatar, i) => (
          <div
            key={avatar.id}
            className="card card-hover group overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={avatar.image}
                alt={avatar.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {avatar.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-dark-700 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedAvatar(avatar)}
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-transform hover:scale-110">
                  <Play className="h-6 w-6 fill-primary-600 text-primary-600" />
                </div>
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-white">{avatar.name}</h3>
                <p className="text-xs text-white/70">{avatar.accent} · {avatar.gender}</p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-dark-600 line-clamp-2">{avatar.description}</p>
              <button
                onClick={() => handleUse(avatar)}
                className="btn-primary mt-3 w-full !py-2"
              >
                <Sparkles className="h-4 w-4" />
                Use This Avatar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
          <p className="text-dark-500">No avatars found matching your search.</p>
        </div>
      )}

      {selectedAvatar && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-dark-950/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setSelectedAvatar(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-[3/4] sm:aspect-auto overflow-hidden">
                <img
                  src={selectedAvatar.image}
                  alt={selectedAvatar.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col">
                <h2 className="text-2xl font-extrabold text-dark-900">{selectedAvatar.name}</h2>
                <p className="mt-1 text-sm text-dark-500">
                  {selectedAvatar.accent} · {selectedAvatar.gender}
                </p>
                <p className="mt-4 text-sm text-dark-600">{selectedAvatar.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedAvatar.tags.map((tag) => (
                    <span key={tag} className="badge bg-primary-50 text-primary-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex gap-3">
                  <button
                    onClick={() => setSelectedAvatar(null)}
                    className="btn-secondary flex-1"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleUse(selectedAvatar)}
                    className="btn-primary flex-1"
                  >
                    <Check className="h-4 w-4" />
                    Use Avatar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
