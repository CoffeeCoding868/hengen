import {
  LayoutDashboard,
  Video,
  UserCircle2,
  AudioLines,
  LayoutTemplate,
  Sparkles,
} from 'lucide-react';
import type { PageId } from '@/types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'studio', label: 'Create Video', icon: Video },
    { id: 'avatars', label: 'Avatars', icon: UserCircle2 },
    { id: 'voices', label: 'Voices', icon: AudioLines },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  ];

  return (
    <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-64 border-r border-dark-200 bg-white lg:flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-dark-600 hover:bg-dark-100 hover:text-dark-900'
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-primary-600' : 'text-dark-400 group-hover:text-dark-600'
                  }`}
                />
                {item.label}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-dark-200 p-4">
        <div className="rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 p-4 text-white">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-white/80 mb-3">
            Unlock 4K exports, custom avatars, and unlimited renders.
          </p>
          <button className="w-full rounded-lg bg-white/20 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/30">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
