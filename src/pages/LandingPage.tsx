import {
  Video,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Mic,
  UserCircle2,
  LayoutTemplate,
  Globe,
  Zap,
  Star,
  Wand2,
} from 'lucide-react';
import type { PageId } from '@/types';
import { avatars } from '@/data/avatars';
import { voices } from '@/data/voices';

interface LandingPageProps {
  onNavigate: (page: PageId) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="relative">
      <HeroSection onNavigate={onNavigate} />
      <StatsSection />
      <FeaturesSection />
      <AvatarShowcase onNavigate={onNavigate} />
      <HowItWorks />
      <UseCasesSection />
      <CTASection onNavigate={onNavigate} />
    </div>
  );
}

function HeroSection({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <section className="gradient-bg relative overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              <Sparkles className="h-4 w-4 text-accent-400" />
              <span>AI-Powered Video Generation</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Create studio-quality
              <span className="block bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
                AI videos in minutes
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70 lg:mx-0">
              Generate professional videos with lifelike AI avatars and natural voices.
              No camera, no studio, no actors — just your script and our AI.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <button
                onClick={() => onNavigate('studio')}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-dark-900 shadow-xl transition-all hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <Wand2 className="h-5 w-5 text-primary-600" />
                Start Creating Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate('avatars')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 lg:justify-start">
              <div className="flex -space-x-3">
                {avatars.slice(0, 5).map((avatar) => (
                  <img
                    key={avatar.id}
                    src={avatar.image}
                    alt={avatar.name}
                    className="h-10 w-10 rounded-full border-2 border-dark-900 object-cover"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning-400 text-warning-400" />
                  ))}
                </div>
                <p className="text-sm text-white/60">Trusted by 50,000+ creators</p>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 animate-pulse-glow rounded-3xl bg-primary-500/20 blur-2xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={avatars[0].image}
                    alt="AI Avatar"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500">
                        <Mic className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-end gap-0.5 h-5">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 rounded-full bg-accent-400"
                              style={{
                                height: `${30 + Math.sin(i * 0.5) * 50 + Math.random() * 30}%`,
                                animation: `float ${0.5 + i * 0.05}s ease-in-out infinite`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-white">Sarah · EN</span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 rounded-full bg-success-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                      Live AI
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 animate-float rounded-2xl border border-dark-200 bg-white p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-500/10">
                    <CheckCircle2 className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-dark-900">Video Ready</p>
                    <p className="text-xs text-dark-500">Generated in 45s</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 animate-float rounded-2xl border border-dark-200 bg-white p-3 shadow-xl" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10">
                    <Globe className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-dark-900">120+ Languages</p>
                    <p className="text-xs text-dark-500">Global voices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: '50K+', label: 'Creators' },
    { value: '2M+', label: 'Videos Generated' },
    { value: '120+', label: 'Languages' },
    { value: '50+', label: 'AI Avatars' },
  ];

  return (
    <section className="border-b border-dark-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl font-extrabold text-dark-900 sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-dark-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: UserCircle2,
      title: 'Lifelike AI Avatars',
      description: 'Choose from 50+ realistic avatars with natural facial expressions and gestures.',
      color: 'from-primary-500 to-primary-700',
    },
    {
      icon: Mic,
      title: 'Natural AI Voices',
      description: '120+ ultra-realistic voices in multiple languages with emotional range.',
      color: 'from-accent-500 to-accent-700',
    },
    {
      icon: LayoutTemplate,
      title: 'Pro Templates',
      description: 'Start from ready-made templates for marketing, sales, education, and more.',
      color: 'from-success-500 to-success-600',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate a complete video in under a minute. No waiting, no rendering queues.',
      color: 'from-warning-500 to-warning-600',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Translate and dub your videos into 120+ languages with one click.',
      color: 'from-primary-500 to-accent-500',
    },
    {
      icon: Sparkles,
      title: 'AI Script Assistant',
      description: 'Let AI help you write compelling scripts tailored to your audience.',
      color: 'from-accent-500 to-primary-500',
    },
  ];

  return (
    <section className="py-24 bg-dark-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge bg-primary-50 text-primary-700">Features</span>
          <h2 className="mt-4 text-3xl font-extrabold text-dark-900 sm:text-4xl">
            Everything you need to create
            <span className="gradient-text"> professional videos</span>
          </h2>
          <p className="mt-4 text-lg text-dark-600">
            From script to screen — our AI platform handles it all.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="card card-hover p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-dark-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-dark-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AvatarShowcase({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge bg-accent-50 text-accent-700">Avatars</span>
          <h2 className="mt-4 text-3xl font-extrabold text-dark-900 sm:text-4xl">
            Meet your AI presenters
          </h2>
          <p className="mt-4 text-lg text-dark-600">
            Diverse, professional, and ready to deliver your message with confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {avatars.slice(0, 6).map((avatar, i) => (
            <div
              key={avatar.id}
              className="group relative overflow-hidden rounded-2xl animate-scale-in cursor-pointer"
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => onNavigate('avatars')}
            >
              <img
                src={avatar.image}
                alt={avatar.name}
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-sm font-semibold text-white">{avatar.name}</p>
                <p className="text-xs text-white/70">{avatar.accent}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <Play className="h-4 w-4 fill-primary-600 text-primary-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('avatars')}
            className="btn-secondary"
          >
            View All Avatars
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Avatar',
      description: 'Pick from 50+ realistic AI avatars that match your brand and message.',
    },
    {
      number: '02',
      title: 'Write Your Script',
      description: 'Type or paste your script. Use AI to refine and optimize your message.',
    },
    {
      number: '03',
      title: 'Select a Voice',
      description: 'Choose from 120+ natural-sounding voices in multiple languages.',
    },
    {
      number: '04',
      title: 'Generate Video',
      description: 'Click generate and watch your AI avatar come to life in seconds.',
    },
  ];

  return (
    <section className="py-24 bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge bg-white/10 text-white">How It Works</span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            From idea to video in 4 simple steps
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
              )}
              <div className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-xl font-extrabold text-white shadow-lg shadow-primary-500/30">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/60">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const useCases = [
    { title: 'Marketing Videos', desc: 'Create promo videos, ads, and social media content.', icon: Video },
    { title: 'Sales Presentations', desc: 'Delash polished pitches without being on camera.', icon: Play },
    { title: 'Educational Content', desc: 'Produce courses, tutorials, and training videos.', icon: Sparkles },
    { title: 'Product Demos', desc: 'Showcase features with AI-guided walkthroughs.', icon: Zap },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge bg-success-500/10 text-success-600">Use Cases</span>
          <h2 className="mt-4 text-3xl font-extrabold text-dark-900 sm:text-4xl">
            Built for every type of video
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase, i) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.title}
                className="card card-hover p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
                  <Icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="font-bold text-dark-900">{useCase.title}</h3>
                <p className="mt-2 text-sm text-dark-600">{useCase.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <section className="py-24 bg-dark-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-12 text-center lg:p-20">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-500/30 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to create your first
              <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                AI video?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              Join 50,000+ creators making professional videos with AI avatars.
              No credit card required to start.
            </p>
            <button
              onClick={() => onNavigate('studio')}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-dark-900 shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Wand2 className="h-5 w-5 text-primary-600" />
              Start Creating Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
