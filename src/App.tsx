import { useState, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { ToastContainer, ToastData } from '@/components/Toast';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { StudioPage } from '@/pages/StudioPage';
import { AvatarsPage } from '@/pages/AvatarsPage';
import { VoicesPage } from '@/pages/VoicesPage';
import { TemplatesPage } from '@/pages/TemplatesPage';
import type { PageId, VideoProject, Avatar, Voice } from '@/types';
import { avatars } from '@/data/avatars';
import { voices } from '@/data/voices';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [editingProject, setEditingProject] = useState<VideoProject | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((type: ToastData['type'], message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  function handleNavigate(page: PageId) {
    setCurrentPage(page);
    if (page !== 'studio') {
      setEditingProject(null);
    }
    window.scrollTo(0, 0);
  }

  function handleOpenProject(project: VideoProject) {
    setEditingProject(project);
    setCurrentPage('studio');
  }

  function handleSelectAvatar(avatar: Avatar) {
    setSelectedAvatar(avatar);
  }

  function handleSelectVoice(voice: Voice) {
    setSelectedVoice(voice);
  }

  const isLanding = currentPage === 'landing';
  const isStudio = currentPage === 'studio';
  const hasSidebar = !isLanding && !isStudio;

  return (
    <div className="min-h-screen bg-dark-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {isLanding ? (
        <LandingPage onNavigate={handleNavigate} />
      ) : (
        <div className={`pt-16 ${hasSidebar ? 'lg:pl-64' : ''}`}>
          {hasSidebar && <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />}
          {currentPage === 'dashboard' && (
            <DashboardPage
              onNavigate={handleNavigate}
              onOpenProject={handleOpenProject}
              showToast={showToast}
            />
          )}
          {currentPage === 'studio' && (
            <StudioPage
              onNavigate={handleNavigate}
              editingProject={editingProject}
              initialAvatar={selectedAvatar}
              initialVoice={selectedVoice}
              showToast={showToast}
            />
          )}
          {currentPage === 'avatars' && (
            <AvatarsPage
              onNavigate={handleNavigate}
              onSelectAvatar={handleSelectAvatar}
            />
          )}
          {currentPage === 'voices' && (
            <VoicesPage
              onNavigate={handleNavigate}
              onSelectVoice={handleSelectVoice}
            />
          )}
          {currentPage === 'templates' && (
            <TemplatesPage onNavigate={handleNavigate} />
          )}
        </div>
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
