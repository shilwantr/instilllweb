import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Bell, Droplet, Sparkles, Activity, Disc, Radio } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const SoundboardSection: React.FC = () => {
  const [activeVisualizer, setActiveVisualizer] = useState<'none' | 'ripple' | 'swell' | 'fanfare'>('none');
  const [kalimbaStep, setKalimbaStep] = useState(0);

  const triggerSound = (type: string, visual: 'ripple' | 'swell' | 'fanfare') => {
    setActiveVisualizer(visual);
    setTimeout(() => setActiveVisualizer('none'), 1800);

    switch (type) {
      case 'bell':
        soundEngine.playBreatheBell();
        break;
      case 'water':
        soundEngine.playWaterPour();
        break;
      case 'kalimba':
        soundEngine.playKalimba(kalimbaStep);
        setKalimbaStep((prev) => (prev + 1) % 8);
        break;
      case 'step':
        soundEngine.playStepClick();
        break;
      case 'scrub':
        soundEngine.playScrubTick();
        break;
      case 'gong':
        soundEngine.playGong();
        break;
    }
  };

  const soundCues = [
    {
      id: 'bell',
      title: 'BREATHE_BELL',
      subtitle: 'Tibetan Tingsha Chime',
      desc: '1568 Hz crystalline chime guiding respiratory phase transitions.',
      icon: Bell,
      visual: 'swell' as const,
      color: 'bg-pop-lime text-pop-forest border-pop-forest',
    },
    {
      id: 'water',
      title: 'WATER_POUR',
      subtitle: 'Hydration Cascade',
      desc: 'Frequency-modulated droplet cascades signaling hydration logging.',
      icon: Droplet,
      visual: 'ripple' as const,
      color: 'bg-sky-100 text-sky-800 border-sky-400',
    },
    {
      id: 'kalimba',
      title: 'TILE_PENTATONIC',
      subtitle: 'Wooden Kalimba Chime',
      desc: 'Harmonic 5-note pentatonic scale triggered on mini-game actions.',
      icon: Disc,
      visual: 'fanfare' as const,
      color: 'bg-pop-yellow text-amber-900 border-amber-400',
    },
    {
      id: 'gong',
      title: 'SCROLL_GONG',
      subtitle: '174 Hz Solfeggio Gong',
      desc: 'Deep Tibetan singing bowl resonance dissolving mental overdrive.',
      icon: Radio,
      visual: 'swell' as const,
      color: 'bg-pop-lavender text-purple-950 border-purple-400',
    },
    {
      id: 'step',
      title: 'STEP_CLICK',
      subtitle: 'Mechanical Sensor Tick',
      desc: 'Crisp micro-transient confirming hardware pedometer increments.',
      icon: Activity,
      visual: 'ripple' as const,
      color: 'bg-slate-100 text-slate-800 border-slate-300',
    },
    {
      id: 'scrub',
      title: 'GRAPH_TICK',
      subtitle: 'Microscopic Glass Tick',
      desc: '4200 Hz haptic feedback when scrubbing spline graphs and sliders.',
      icon: Sparkles,
      visual: 'fanfare' as const,
      color: 'bg-pop-coral text-white border-rose-400',
    },
  ];

  return (
    <section id="soundboard" className="py-24 px-4 sm:px-8 relative bg-pop-cream text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-yellow text-slate-900 border border-slate-900/15 shadow-cartoon-sm mb-4">
            <span>🔔 Section 10</span>
            <span>•</span>
            <span>Sensory Acoustics & Haptics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            Acoustic Engineering Soundboard
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Every audio cue in inStill is synthesized dynamically via hardware oscillators,
            ensuring zero bandwidth lag, clean transients, and soothing therapeutic frequencies.
          </p>
        </div>

        {/* Visual Waveform Canvas Display */}
        <div className="max-w-3xl mx-auto h-36 rounded-3xl bg-white border-2 border-slate-900/10 p-6 flex flex-col items-center justify-center relative overflow-hidden mb-12 shadow-cartoon-sm">
          <div className="absolute top-3 left-5 text-xs font-mono font-bold text-slate-500 flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-pop-forest" />
            <span>Realtime Web Audio Waveform Simulator</span>
          </div>

          {activeVisualizer === 'none' && (
            <span className="text-xs font-mono font-semibold text-slate-400">
              Click any sound tile below to trigger live synthesis & visual ripples
            </span>
          )}

          {activeVisualizer === 'ripple' && (
            <div className="relative flex items-center justify-center">
              <span className="absolute w-20 h-20 rounded-full border-2 border-sky-400 animate-ping opacity-75" />
              <span className="absolute w-12 h-12 rounded-full bg-sky-400/30 blur-sm" />
              <span className="w-5 h-5 rounded-full bg-sky-500 shadow-cartoon-sm" />
            </div>
          )}

          {activeVisualizer === 'swell' && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-pop-lime via-pop-periwinkle to-pop-yellow blur-md border-2 border-slate-900 shadow-cartoon"
            />
          )}

          {activeVisualizer === 'fanfare' && (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                <motion.div
                  key={bar}
                  animate={{ height: [8, 48, 12, 36, 16] }}
                  transition={{ duration: 0.7, repeat: 1, delay: bar * 0.05 }}
                  className="w-3 rounded-full bg-pop-forest"
                />
              ))}
            </div>
          )}
        </div>

        {/* 6 Sound Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {soundCues.map((cue) => {
            const Icon = cue.icon;
            return (
              <button
                key={cue.id}
                onClick={() => triggerSound(cue.id, cue.visual)}
                data-cursor="pointer"
                className="group p-6 rounded-3xl bg-white border-2 border-slate-900/10 hover:border-pop-forest text-left transition-all duration-200 hover:-translate-y-1.5 shadow-cartoon-sm hover:shadow-cartoon relative overflow-hidden cartoon-sticker"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3.5 rounded-2xl ${cue.color} border-2 shadow-cartoon-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    Web Audio
                  </span>
                </div>

                <div className="text-sm font-extrabold text-slate-900 font-mono mb-0.5">{cue.title}</div>
                <div className="text-xs text-pop-forest font-bold mb-2">{cue.subtitle}</div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{cue.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
