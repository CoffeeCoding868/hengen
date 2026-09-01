import { Video, Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { PageId } from '@/types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Avatars', page: 'avatars' },
    { label: 'Voices', page: 'voices' },
    { label: 'Templates', page: 'templates' },
  ];

  const isLanding = currentPage === 'landing';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLanding ? 'bg-transparent' : 'glass border-b border-dark-200'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30">
              <Video className="h-5 w-5 text-white" />
            </div>
            <span className={`text-lg font-bold ${isLanding ? 'text-white' : 'text-dark-900'}`}>
              AvatarAI
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  currentPage === link.page
                    ? isLanding
                      ? 'bg-white/10 text-white'
                      : 'bg-primary-50 text-primary-700'
                    : isLanding
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-dark-600 hover:bg-dark-100 hover:text-dark-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`text-sm font-medium transition-colors ${
                isLanding ? 'text-white/80 hover:text-white' : 'text-dark-600 hover:text-dark-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('studio')}
              className="btn-primary !py-2.5"
            >
              Create Video
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className={`h-6 w-6 ${isLanding ? 'text-white' : 'text-dark-900'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isLanding ? 'text-white' : 'text-dark-900'}`} />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden animate-fade-in-down border-t border-dark-200 bg-white py-4">
            <div className="flex flex-col gap-2 px-4">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    onNavigate(link.page);
                    setMobileOpen(false);
                  }}
                  className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium ${
                    currentPage === link.page
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-dark-600 hover:bg-dark-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileOpen(false);
                }}
                className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-dark-600 hover:bg-dark-100"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  onNavigate('studio');
                  setMobileOpen(false);
                }}
                className="btn-primary mt-2"
              >
                Create Video
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
