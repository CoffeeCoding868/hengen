import { useState } from 'react';
import { Search, Play, Pause, Volume2, Check, Globe } from 'lucide-react';
import type { PageId, Voice } from '@/types';
import { voices } from '@/data/voices';

interface VoicesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectVoice: (voice: Voice) => void;
}

export function VoicesPage({ onNavigate, onSelectVoice }: VoicesPageProps) {
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered = voices.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.language.toLowerCase().includes(search.toLowerCase());
    const matchesGender = filterGender === 'all' || v.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  function togglePlay(voice: Voice) {
    if (playingId === voice.id) {
      setPlayingId(null);
    } else {
      setPlayingId(voice.id);
      setTimeout(() => setPlayingId(null), 3000);
    }
  }

  function handleUse(voice: Voice) {
    onSelectVoice(voice);
    onNavigate('studio');
  }

  return (
    <div className="animate-fade-in p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-dark-900">AI Voices</h1>
        <p className="mt-1 text-sm text-dark-500">
          {voices.length} ultra-realistic voices in multiple languages
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search voices by name or language..."
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((voice, i) => (
          <div
            key={voice.id}
            className="card card-hover p-5 animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold ${
                  voice.gender === 'female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {voice.flag}
                </div>
                <div>
                  <h3 className="font-bold text-dark-900">{voice.name}</h3>
                  <p className="text-xs text-dark-500">{voice.language}</p>
                </div>
              </div>
              <span className={`badge ${voice.gender === 'female' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>
                {voice.gender}
              </span>
            </div>

            <p className="text-sm text-dark-600 mb-3">{voice.description}</p>

            <div className="rounded-xl bg-dark-50 p-3 mb-3">
              <p className="text-xs text-dark-500 italic">"{voice.previewText}"</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => togglePlay(voice)}
                className="flex items-center gap-2 rounded-lg bg-dark-100 px-4 py-2 text-xs font-medium text-dark-700 transition-colors hover:bg-dark-200 flex-1 justify-center"
              >
                {playingId === voice.id ? (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    <div className="flex items-end gap-0.5 h-4">
                      {[...Array(6)].map((_, j) => (
                        <div
                          key={j}
                          className="w-0.5 rounded-full bg-primary-500"
                          style={{
                            height: `${30 + Math.sin(j + Date.now() / 200) * 50 + 20}%`,
                            animation: `float ${0.3 + j * 0.08}s ease-in-out infinite`,
                          }}
                        />
                      ))}
                    </div>
                    Playing
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5" />
                    Preview
                  </>
                )}
              </button>
              <button
                onClick={() => handleUse(voice)}
                className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-primary-700 active:scale-95"
              >
                <Check className="h-3.5 w-3.5" />
                Use
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
          <Globe className="h-12 w-12 text-dark-300 mb-4" />
          <p className="text-dark-500">No voices found matching your search.</p>
        </div>
      )}
    </div>
  );
}
