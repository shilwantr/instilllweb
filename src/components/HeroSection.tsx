import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Volume2, ShieldCheck, Heart, Droplets, Footprints } from 'lucide-react';
import { LivingCanvas, LivingTheme } from './LivingCanvas';
import { AdaptiveScreenshotFrame } from './AdaptiveScreenshotFrame';
import { soundEngine } from '../utils/audio';

interface HeroSectionProps {
  currentTheme: LivingTheme;
  onThemeSelect: (theme: LivingTheme) => void;
  onOpenSoundModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTheme,
  onThemeSelect,
  onOpenSoundModal,
}) => {
  const [selectedDashboardVariant, setSelectedDashboardVariant] = useState<'dark' | 'light' | 'cosmic'>('dark');

  const dashboardImages = {
    dark: './assets/screenshots/dashboard-dark.jpeg',
    light: './assets/screenshots/dashboard-light.jpeg',
    cosmic: './assets/screenshots/dashboard-cosmic.jpeg',
  };

  const themePills: { id: LivingTheme; label: string }[] = [
    { id: 'FW', label: 'Ferris Wheel' },
    { id: 'CW', label: 'Clean White' },
    { id: 'MS', label: 'Midnight Sage' },
    { id: 'CD', label: 'Cosmic Dusk' },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-8 flex flex-col justify-center overflow-hidden">
      {/* Living Canvas Interactive Background */}
      <div className="absolute inset-0 -z-20 pointer-events-auto">
        <LivingCanvas theme={currentTheme} />
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left Column: Vision, Headline, Tagline, CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Mindful Presence & Daily Balance
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-medium tracking-tight text-white leading-[1.08] mb-6">
            The Art of Presence.{' '}
            <span className="italic font-normal text-emerald-300">
              The Science of Calm.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mb-8">
            A luxury sensory wellness ecosystem engineered with 60 FPS liquid canvas shaders,
            bio-responsive breathwork, telehealth therapy, companion pets, and digital wellbeing.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#today"
              data-cursor="pointer"
              onClick={() => soundEngine.playBreatheBell()}
              className="px-7 py-3.5 rounded-full bg-still-buttonDark text-white font-medium text-sm tracking-wide shadow-lg shadow-emerald-950/40 hover:bg-emerald-600 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Explore the Experience</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>

            <button
              onClick={() => {
                onOpenSoundModal();
                soundEngine.playKalimba(3);
              }}
              data-cursor="pointer"
              className="px-7 py-3.5 rounded-full glass-card-dark text-slate-200 font-medium text-sm tracking-wide border border-white/20 hover:border-emerald-400/40 hover:text-white transition-all flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>Listen to Soundscapes</span>
            </button>
          </div>

          {/* Living Canvas Theme Quick Switcher */}
          <div className="p-4 rounded-2xl glass-card-dark border border-white/10 max-w-lg w-full">
            <div className="text-xs uppercase tracking-widest text-slate-400 font-mono mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Interactive Living Canvas Themes</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {themePills.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onThemeSelect(t.id);
                    soundEngine.playStepClick();
                  }}
                  data-cursor="pointer"
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    currentTheme === t.id
                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Centerpiece 3D-Tilted Device Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Variant Selector Tabs */}
          <div className="flex items-center gap-2 mb-4 p-1 rounded-full glass-card-dark border border-white/15">
            <button
              onClick={() => {
                setSelectedDashboardVariant('dark');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-3.5 py-1 text-xs rounded-full transition-all ${
                selectedDashboardVariant === 'dark'
                  ? 'bg-emerald-500/30 text-emerald-200 font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ferris Wheel (Dark)
            </button>
            <button
              onClick={() => {
                setSelectedDashboardVariant('light');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-3.5 py-1 text-xs rounded-full transition-all ${
                selectedDashboardVariant === 'light'
                  ? 'bg-emerald-500/30 text-emerald-200 font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Clean White
            </button>
            <button
              onClick={() => {
                setSelectedDashboardVariant('cosmic');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-3.5 py-1 text-xs rounded-full transition-all ${
                selectedDashboardVariant === 'cosmic'
                  ? 'bg-emerald-500/30 text-emerald-200 font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cosmic Dusk
            </button>
          </div>

          {/* Adaptive Phone Mockup with Vertical Scroll Tilt Physics */}
          <AdaptiveScreenshotFrame
            src={dashboardImages[selectedDashboardVariant]}
            alt="inStill Today Dashboard"
            orientation="vertical"
            tiltDirection="left"
            glowColor="rgba(143, 175, 155, 0.45)"
            badge="DashboardScreen.kt"
            hotspots={[
              {
                x: 48,
                y: 22,
                label: 'Daily Reflection',
                detail: 'Dynamic daily wisdom quote with favorite heart and instant re-roll interactions.',
              },
              {
                x: 48,
                y: 43,
                label: '5-State Mood Bar',
                detail: 'Tactile mood check-in with spring physics and gentle haptic acoustic feedback.',
              },
              {
                x: 48,
                y: 63,
                label: 'Glass Bubble Breathwork',
                detail: 'Instant quick-launch for guided breath sessions with animated progress badge.',
              },
            ]}
          />

          {/* Micro status badge below mockup */}
          <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              60 FPS Shaders
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Sensor Telemetry
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
