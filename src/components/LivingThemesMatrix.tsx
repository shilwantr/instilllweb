import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
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
      id: 'CW',
      name: 'Clean White',
      code: 'CW',
      description: 'Porcelain ceramic minimalism with whisper-soft celadon sage waves.',
      paletteDesc: 'High-contrast Slate & Ceramic',
    },
    {
      id: 'FW',
      name: 'Ferris Wheel',
      code: 'FW',
      description: 'Celestial translucent bubbles and harmonic ambient cloud layers.',
      paletteDesc: 'Pastel Lime & Periwinkle',
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
    <section id="themes" className="py-24 px-4 sm:px-8 relative bg-pop-cream text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-lime text-pop-forest border border-pop-forest/20 shadow-cartoon-sm mb-4">
            <span>🎨 Section 12</span>
            <span>•</span>
            <span>Living Canvas Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            The 11 Living Canvas Ambient Themes
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
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
                className={`group rounded-3xl p-4 text-left transition-all duration-200 relative overflow-hidden flex flex-col justify-between cartoon-sticker ${
                  isSelected
                    ? 'bg-white border-4 border-pop-forest shadow-cartoon scale-[1.02]'
                    : 'bg-white border-2 border-slate-900/10 hover:border-slate-900/30 shadow-cartoon-sm'
                }`}
              >
                {/* Mini Canvas */}
                <div className="w-full h-32 rounded-2xl overflow-hidden mb-3 border-2 border-slate-900/10 relative bg-slate-50">
                  <LivingCanvas theme={t.id} isMini={true} />
                  {isSelected && (
                    <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-pop-forest text-pop-lime font-mono font-bold text-[10px] flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-slate-900">{t.name}</span>
                    <span className="text-[10px] font-mono font-bold text-pop-forest px-2 py-0.5 rounded-full bg-pop-lime">
                      • {t.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{t.description}</p>
                </div>

                <div className="text-[11px] font-mono font-semibold text-slate-500 border-t border-slate-100 pt-2 flex items-center justify-between">
                  <span>{t.paletteDesc}</span>
                  <span className="text-pop-forest font-bold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
