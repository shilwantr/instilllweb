import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, CheckCircle2 } from 'lucide-react';
import { LivingCanvas, LivingTheme } from './LivingCanvas';
import { soundEngine } from '../utils/audio';

interface LivingThemesMatrixProps {
  currentTheme: LivingTheme;
  onThemeSelect: (theme: LivingTheme) => void;
}

export const LivingThemesMatrix: React.FC<LivingThemesMatrixProps> = ({
  currentTheme,
  onThemeSelect,
}) => {
  const themesList: {
    id: LivingTheme;
    name: string;
    code: string;
    description: string;
    paletteDesc: string;
  }[] = [
    {
      id: 'FW',
      name: 'Ferris Wheel',
      code: 'FW',
      description: 'Celestial translucent bubbles and harmonic ambient cloud layers.',
      paletteDesc: 'Soft Eucalyptus & Dusty Rose',
    },
    {
      id: 'CW',
      name: 'Clean White',
      code: 'CW',
      description: 'Porcelain ceramic minimalism with whisper-soft celadon sage waves.',
      paletteDesc: 'High-contrast Slate & Ceramic',
    },
    {
      id: 'MS',
      name: 'Midnight Sage',
      code: 'MS',
      description: 'Deep obsidian #091210 canvas accented with floating bio-luminescent starlight.',
      paletteDesc: 'Deep Slate & Bio Emerald',
    },
    {
      id: 'TP',
      name: 'Liquid Topography',
      code: 'TP',
      description: 'Flowing marble contour ribbons simulating geographic elevation contours.',
      paletteDesc: 'Warm Ochre & Sand',
    },
    {
      id: 'CD',
      name: 'Cosmic Dusk',
      code: 'CD',
      description: 'Plum and deep purple nebulae with warm crimson horizon undulations.',
      paletteDesc: 'Deep Violet & Plum Amber',
    },
    {
      id: 'ZR',
      name: 'Zen Sand Ripples',
      code: 'ZR',
      description: 'Concentric Seigaiha wave medallions reminiscent of Kyoto pebble gardens.',
      paletteDesc: 'Kyoto Moss & Sandstone',
    },
    {
      id: 'OA',
      name: 'Ocean Abyss',
      code: 'OA',
      description: 'Deep oceanic trench cyan transitioning into radiant predawn light.',
      paletteDesc: 'Cyan Depth & Horizon Light',
    },
    {
      id: 'HW',
      name: 'Halftone Silk Wave',
      code: 'HW',
      description: '3D undulating kinetic dot-matrix simulating shifting silk jacquard fabric.',
      paletteDesc: 'Monochrome Jacquard Silk',
    },
    {
      id: 'TD',
      name: 'Time Dynamic',
      code: 'TD',
      description: 'Synchronized in real-time to your circadian daylight and twilight hours.',
      paletteDesc: 'Circadian Solar Continuum',
    },
    {
      id: 'LT',
      name: 'Looping Trios',
      code: 'LT',
      description: 'Kinetic sacred geometry triangles rotating in continuous golden ratio orbits.',
      paletteDesc: 'Geometric Champagne Mist',
    },
    {
      id: 'RT',
      name: 'Resonance Tunnel',
      code: 'RT',
      description: 'Infinite ribbed obsidian acoustic vortex evoking deep auditory mindfulness.',
      paletteDesc: 'Acoustic Obsidian Void',
    },
  ];

  return (
    <section id="themes" className="py-24 px-4 sm:px-8 relative bg-still-darkBg text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-700/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/20 mb-4">
            <span>Section 12</span>
            <span>•</span>
            <span>Living Canvas Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">
            The 11 Living Canvas Ambient Themes
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Every screen in inStill breathes with 60 FPS procedural shader physics.
            Click any canvas card below to immediately transform the website's living backdrop.
          </p>
        </div>

        {/* 11 Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {themesList.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  onThemeSelect(t.id);
                  soundEngine.playBreatheBell();
                }}
                data-cursor="pointer"
                className={`group rounded-3xl p-4 text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'glass-card-dark border-2 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] scale-[1.02]'
                    : 'glass-card-dark border border-white/10 hover:border-white/25 hover:-translate-y-1'
                }`}
              >
                {/* Mini Live Canvas Preview */}
                <div className="w-full h-32 rounded-2xl overflow-hidden mb-3 border border-white/10 relative bg-black">
                  <LivingCanvas theme={t.id} isMini={true} />
                  {isSelected && (
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-500/80 text-white font-mono text-[10px] flex items-center gap-1 shadow-md">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white font-serif">{t.name}</span>
                    <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      • {t.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{t.description}</p>
                </div>

                <div className="text-[11px] font-mono text-slate-400 border-t border-white/5 pt-2 flex items-center justify-between">
                  <span>{t.paletteDesc}</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
