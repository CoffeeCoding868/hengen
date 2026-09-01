import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  UserCircle2,
  Mic,
  FileText,
  Play,
  Pause,
  Download,
  Save,
  Sparkles,
  Wand2,
  Volume2,
  Check,
  Settings2,
  Loader2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import type { VideoProject, PageId, Avatar, Voice } from '@/types';
import { supabase } from '@/lib/supabase';
import { avatars } from '@/data/avatars';
import { voices } from '@/data/voices';
import { ToastData } from '@/components/Toast';

interface StudioPageProps {
  onNavigate: (page: PageId) => void;
  editingProject: VideoProject | null;
  initialAvatar?: Avatar | null;
  initialVoice?: Voice | null;
  showToast: (type: ToastData['type'], message: string) => void;
}

type StudioTab = 'avatar' | 'voice' | 'script' | 'background';

export function StudioPage({ onNavigate, editingProject, initialAvatar, initialVoice, showToast }: StudioPageProps) {
  const [activeTab, setActiveTab] = useState<StudioTab>('avatar');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatars[0]);
  const [selectedVoice, setSelectedVoice] = useState<Voice>(voices[0]);
  const [script, setScript] = useState('');
  const [projectName, setProjectName] = useState('Untitled Project');
  const [background, setBackground] = useState('studio');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [estimatedDuration, setEstimatedDuration] = useState(0);

  useEffect(() => {
    if (editingProject) {
      setProjectName(editingProject.name);
      setScript(editingProject.script);
      setBackground(editingProject.background);
      setProjectId(editingProject.id);
      const avatar = avatars.find((a) => a.id === editingProject.avatar_id);
      const voice = voices.find((v) => v.id === editingProject.voice_id);
      if (avatar) setSelectedAvatar(avatar);
      if (voice) setSelectedVoice(voice);
      if (editingProject.status === 'completed') setHasGenerated(true);
    }
  }, [editingProject]);

  useEffect(() => {
    if (initialAvatar) {
      setSelectedAvatar(initialAvatar);
    }
  }, [initialAvatar]);

  useEffect(() => {
    if (initialVoice) {
      setSelectedVoice(initialVoice);
    }
  }, [initialVoice]);

  useEffect(() => {
    const words = script.trim() ? script.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setEstimatedDuration(Math.ceil((words / 150) * 60));
  }, [script]);

  function handleGenerateScript() {
    const templates = [
      'Welcome to our product showcase. Today, I am excited to walk you through the features that make our platform the best choice for your business.\n\nWith AI-powered automation, intuitive design, and enterprise-grade security, we help you save time and reduce costs while delivering exceptional results.\n\nLet me show you how it works. Simply upload your content, choose your preferences, and let our AI handle the rest. It is that easy.\n\nReady to get started? Visit our website today and experience the future of content creation.',
      'Are you tired of spending hours creating videos? What if I told you that you can now produce professional-quality content in just minutes?\n\nWith our AI video platform, you can choose from over fifty lifelike avatars, select from one hundred and twenty natural voices, and generate stunning videos in any language.\n\nNo cameras, no studios, no expensive equipment. Just your script and our AI. It is fast, it is easy, and it is affordable.\n\nStart your free trial today and see the difference for yourself.',
      'In this tutorial, I will guide you through the process of creating your first AI-generated video. Let us start by selecting an avatar that best represents your brand.\n\nNext, we will choose a voice that matches the tone of your message. Whether you need something professional, friendly, or energetic, we have you covered.\n\nNow, simply type or paste your script into the editor. Our AI will analyze the text and generate natural speech with perfect lip-sync.\n\nFinally, click the generate button and watch your video come to life in seconds. It really is that simple.',
    ];
    const randomScript = templates[Math.floor(Math.random() * templates.length)];
    setScript(randomScript);
    showToast('success', 'AI script generated!');
  }

  async function handleSave() {
    if (!script.trim()) {
      showToast('error', 'Please write a script first');
      return;
    }

    const payload = {
      name: projectName,
      script,
      avatar_id: selectedAvatar.id,
      voice_id: selectedVoice.id,
      background,
      duration: estimatedDuration,
      status: hasGenerated ? 'completed' : 'draft',
      thumbnail_url: selectedAvatar.image,
    };

    if (projectId) {
      const { error } = await supabase
        .from('video_projects')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', projectId);
      if (error) {
        showToast('error', 'Failed to save project');
      } else {
        showToast('success', 'Project saved');
      }
    } else {
      const { data, error } = await supabase
        .from('video_projects')
        .insert(payload)
        .select()
        .single();
      if (error) {
        showToast('error', 'Failed to create project');
      } else {
        setProjectId(data.id);
        showToast('success', 'Project created');
      }
    }
  }

  function handleGenerate() {
    if (!script.trim()) {
      showToast('error', 'Please write a script first');
      setActiveTab('script');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setHasGenerated(false);

    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setHasGenerated(true);
          showToast('success', 'Video generated successfully!');
          handleSave();
          return 100;
        }
        return prev + 2;
      });
    }, 80);
  }

  const tabs: { id: StudioTab; label: string; icon: typeof UserCircle2 }[] = [
    { id: 'avatar', label: 'Avatar', icon: UserCircle2 },
    { id: 'voice', label: 'Voice', icon: Mic },
    { id: 'script', label: 'Script', icon: FileText },
    { id: 'background', label: 'Background', icon: Layers },
  ];

  const backgrounds = [
    { id: 'studio', name: 'Studio', color: 'from-dark-700 to-dark-900' },
    { id: 'office', name: 'Office', color: 'from-primary-600 to-primary-800' },
    { id: 'gradient', name: 'Gradient', color: 'from-accent-500 to-primary-600' },
    { id: 'warm', name: 'Warm', color: 'from-warning-500 to-error-500' },
    { id: 'cool', name: 'Cool', color: 'from-primary-400 to-accent-400' },
    { id: 'minimal', name: 'Minimal', color: 'from-dark-100 to-dark-300' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col animate-fade-in">
      <div className="flex items-center justify-between border-b border-dark-200 bg-white px-6 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-sm font-medium text-dark-600 hover:text-dark-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="h-6 w-px bg-dark-200" />
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="text-sm font-semibold text-dark-900 bg-transparent border-none focus:outline-none focus:ring-0 w-64"
            placeholder="Project name..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="btn-secondary !py-2">
            <Save className="h-4 w-4" />
            Save
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !script.trim()}
            className="btn-primary !py-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate Video
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-20 flex-col items-center gap-2 border-r border-dark-200 bg-white py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-16 flex-col items-center gap-1.5 rounded-xl py-3 text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-dark-500 hover:bg-dark-50 hover:text-dark-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="w-96 overflow-y-auto border-r border-dark-200 bg-white scrollbar-thin">
          {activeTab === 'avatar' && (
            <AvatarPanel selectedAvatar={selectedAvatar} onSelect={setSelectedAvatar} />
          )}
          {activeTab === 'voice' && (
            <VoicePanel selectedVoice={selectedVoice} onSelect={setSelectedVoice} />
          )}
          {activeTab === 'script' && (
            <ScriptPanel
              script={script}
              onChange={setScript}
              onGenerate={handleGenerateScript}
              wordCount={wordCount}
              estimatedDuration={estimatedDuration}
            />
          )}
          {activeTab === 'background' && (
            <BackgroundPanel
              backgrounds={backgrounds}
              selected={background}
              onSelect={setBackground}
            />
          )}
        </div>

        <div className="flex flex-1 items-center justify-center bg-dark-100 p-6">
          <PreviewPanel
            avatar={selectedAvatar}
            voice={selectedVoice}
            script={script}
            background={background}
            backgrounds={backgrounds}
            isGenerating={isGenerating}
            generationProgress={generationProgress}
            hasGenerated={hasGenerated}
            isPlaying={isPreviewPlaying}
            onTogglePlay={() => setIsPreviewPlaying(!isPreviewPlaying)}
            estimatedDuration={estimatedDuration}
          />
        </div>
      </div>
    </div>
  );
}

function AvatarPanel({
  selectedAvatar,
  onSelect,
}: {
  selectedAvatar: Avatar;
  onSelect: (avatar: Avatar) => void;
}) {
  return (
    <div className="p-4">
      <h3 className="mb-1 text-sm font-bold text-dark-900">Choose Avatar</h3>
      <p className="mb-4 text-xs text-dark-500">Select an AI presenter for your video</p>

      <div className="grid grid-cols-2 gap-3">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => onSelect(avatar)}
            className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
              selectedAvatar.id === avatar.id
                ? 'border-primary-500 ring-2 ring-primary-500/20'
                : 'border-transparent hover:border-dark-200'
            }`}
          >
            <img
              src={avatar.image}
              alt={avatar.name}
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="truncate text-xs font-semibold text-white">{avatar.name}</p>
              <p className="truncate text-xs text-white/60">{avatar.accent}</p>
            </div>
            {selectedAvatar.id === avatar.id && (
              <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 shadow-lg">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function VoicePanel({
  selectedVoice,
  onSelect,
}: {
  selectedVoice: Voice;
  onSelect: (voice: Voice) => void;
}) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  function togglePlay(voice: Voice) {
    if (playingId === voice.id) {
      setPlayingId(null);
    } else {
      setPlayingId(voice.id);
      setTimeout(() => setPlayingId(null), 3000);
    }
  }

  return (
    <div className="p-4">
      <h3 className="mb-1 text-sm font-bold text-dark-900">Choose Voice</h3>
      <p className="mb-4 text-xs text-dark-500">Select a voice for your avatar</p>

      <div className="space-y-2">
        {voices.map((voice) => (
          <div
            key={voice.id}
            onClick={() => onSelect(voice)}
            className={`cursor-pointer rounded-xl border-2 p-3 transition-all ${
              selectedVoice.id === voice.id
                ? 'border-primary-500 bg-primary-50/50'
                : 'border-dark-200 hover:border-dark-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                  voice.gender === 'female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {voice.flag}
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-900">{voice.name}</p>
                  <p className="text-xs text-dark-500">{voice.language}</p>
                </div>
              </div>
              {selectedVoice.id === voice.id && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-dark-500">{voice.description}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay(voice);
              }}
              className="mt-2 flex items-center gap-2 rounded-lg bg-dark-50 px-3 py-1.5 text-xs font-medium text-dark-600 transition-colors hover:bg-dark-100"
            >
              {playingId === voice.id ? (
                <>
                  <Pause className="h-3 w-3" /> Playing...
                  <div className="flex items-end gap-0.5 h-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 rounded-full bg-primary-500"
                        style={{
                          height: `${30 + Math.sin(i + Date.now() / 200) * 50 + 30}%`,
                          animation: `float ${0.3 + i * 0.1}s ease-in-out infinite`,
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <Volume2 className="h-3 w-3" /> Preview
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScriptPanel({
  script,
  onChange,
  onGenerate,
  wordCount,
  estimatedDuration,
}: {
  script: string;
  onChange: (script: string) => void;
  onGenerate: () => void;
  wordCount: number;
  estimatedDuration: number;
}) {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-dark-900">Script Editor</h3>
          <p className="text-xs text-dark-500">Write or generate your video script</p>
        </div>
        <button
          onClick={onGenerate}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-3 py-2 text-xs font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Write
        </button>
      </div>

      <textarea
        value={script}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or paste your script here... Or click 'AI Write' to generate one automatically."
        className="input-field flex-1 resize-none !leading-relaxed text-sm scrollbar-thin"
        style={{ minHeight: '300px' }}
      />

      <div className="mt-4 flex items-center justify-between rounded-xl bg-dark-50 px-4 py-3">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs text-dark-500">Words</p>
            <p className="text-sm font-bold text-dark-900">{wordCount}</p>
          </div>
          <div className="h-8 w-px bg-dark-200" />
          <div>
            <p className="text-xs text-dark-500">Est. Duration</p>
            <p className="text-sm font-bold text-dark-900">
              {Math.floor(estimatedDuration / 60)}:{(estimatedDuration % 60).toString().padStart(2, '0')}
            </p>
          </div>
        </div>
        <Settings2 className="h-5 w-5 text-dark-400" />
      </div>
    </div>
  );
}

function BackgroundPanel({
  backgrounds,
  selected,
  onSelect,
}: {
  backgrounds: { id: string; name: string; color: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="p-4">
      <h3 className="mb-1 text-sm font-bold text-dark-900">Background</h3>
      <p className="mb-4 text-xs text-dark-500">Choose a backdrop for your video</p>

      <div className="grid grid-cols-2 gap-3">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onSelect(bg.id)}
            className={`group relative aspect-video overflow-hidden rounded-xl border-2 transition-all ${
              selected === bg.id
                ? 'border-primary-500 ring-2 ring-primary-500/20'
                : 'border-transparent hover:border-dark-200'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${bg.color}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-white drop-shadow-lg">{bg.name}</span>
            </div>
            {selected === bg.id && (
              <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 shadow-lg">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function PreviewPanel({
  avatar,
  voice,
  script,
  background,
  backgrounds,
  isGenerating,
  generationProgress,
  hasGenerated,
  isPlaying,
  onTogglePlay,
  estimatedDuration,
}: {
  avatar: Avatar;
  voice: Voice;
  script: string;
  background: string;
  backgrounds: { id: string; name: string; color: string }[];
  isGenerating: boolean;
  generationProgress: number;
  hasGenerated: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
  estimatedDuration: number;
}) {
  const bg = backgrounds.find((b) => b.id === background) || backgrounds[0];

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative overflow-hidden rounded-2xl border border-dark-200 shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${bg.color}`} />

        <div className="relative aspect-video flex items-center justify-center p-8">
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={avatar.image}
                alt={avatar.name}
                className={`h-72 w-56 object-cover transition-all duration-500 ${
                  isPlaying || isGenerating ? 'scale-100' : 'scale-95'
                }`}
              />
              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-950/60 backdrop-blur-sm">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-10 w-10 animate-spin text-white" />
                    <p className="mt-3 text-sm font-semibold text-white">Generating Video...</p>
                    <p className="mt-1 text-xs text-white/70">{generationProgress}%</p>
                  </div>
                </div>
              )}
              {hasGenerated && !isGenerating && (
                <div className="absolute top-3 right-3 rounded-full bg-success-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3" />
                    Ready
                  </span>
                </div>
              )}
            </div>

            {isPlaying && !isGenerating && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 shadow-xl">
                <div className="flex items-end gap-0.5 h-6">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-primary-500"
                      style={{
                        height: `${30 + Math.sin(i * 0.8 + Date.now() / 200) * 50 + 20}%`,
                        animation: `float ${0.3 + i * 0.08}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-dark-950/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2 text-white">
            <span className="text-xs font-medium">{avatar.name}</span>
            <span className="text-xs text-white/50">·</span>
            <span className="text-xs text-white/70">{voice.name} ({voice.language})</span>
          </div>
          <span className="text-xs text-white/50">
            {Math.floor(estimatedDuration / 60)}:{(estimatedDuration % 60).toString().padStart(2, '0')}
          </span>
        </div>

        {isGenerating && (
          <div className="absolute bottom-0 left-0 h-1 bg-primary-500 transition-all duration-100" style={{ width: `${generationProgress}%` }} />
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={onTogglePlay}
          disabled={!hasGenerated || isGenerating}
          className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-dark-900 shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPlaying ? (
            <>
              <Pause className="h-5 w-5" /> Pause
            </>
          ) : (
            <>
              <Play className="h-5 w-5 fill-dark-900" /> Play Preview
            </>
          )}
        </button>
        {hasGenerated && (
          <button
            onClick={() => {}}
            className="flex items-center gap-2 rounded-xl border border-dark-200 bg-white px-6 py-3 text-sm font-semibold text-dark-900 shadow-lg transition-all hover:shadow-xl active:scale-95"
          >
            <Download className="h-5 w-5" /> Download
          </button>
        )}
      </div>

      {!script && !isGenerating && (
        <p className="mt-4 text-center text-sm text-dark-400">
          Write a script and click Generate to create your video
        </p>
      )}
    </div>
  );
}
