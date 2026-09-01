import { useState } from 'react';
import { Search, Clock, Play, ArrowRight } from 'lucide-react';
import type { PageId } from '@/types';
import { templates } from '@/data/templates';

interface TemplatesPageProps {
  onNavigate: (page: PageId) => void;
}

export function TemplatesPage({ onNavigate }: TemplatesPageProps) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | string>('all');

  const categories = ['all', ...Array.from(new Set(templates.map((t) => t.category)))];

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-dark-900">Templates</h1>
        <p className="mt-1 text-sm text-dark-500">
          Start from a ready-made template and customize it in seconds
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !pl-11"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                filterCategory === cat
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : 'bg-white text-dark-600 border border-dark-200 hover:border-dark-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template, i) => (
          <div
            key={template.id}
            className="card card-hover group overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={template.image}
                alt={template.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="badge bg-white/90 text-dark-700 backdrop-blur">
                  {template.category}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="flex items-center gap-1 rounded-full bg-dark-950/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                  <Clock className="h-3 w-3" />
                  {template.duration}
                </span>
              </div>

              <button
                onClick={() => onNavigate('studio')}
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-transform hover:scale-110">
                  <Play className="h-6 w-6 fill-primary-600 text-primary-600" />
                </div>
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-dark-900">{template.name}</h3>
              <p className="mt-1 text-sm text-dark-600 line-clamp-2">{template.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-dark-500">{template.useCase}</span>
                <button
                  onClick={() => onNavigate('studio')}
                  className="flex items-center gap-1 text-xs font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Use Template
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
          <p className="text-dark-500">No templates found matching your search.</p>
        </div>
      )}
    </div>
  );
}
