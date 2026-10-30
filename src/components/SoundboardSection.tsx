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
      color: 'from-emerald-400 to-teal-300',
    },
    {
      id: 'water',
      title: 'WATER_POUR',
      subtitle: 'Hydration Cascade',
      desc: 'Frequency-modulated droplet cascades signaling hydration logging.',
      icon: Droplet,
      visual: 'ripple' as const,
      color: 'from-cyan-400 to-blue-400',
    },
    {
      id: 'kalimba',
      title: 'TILE_PENTATONIC',
      subtitle: 'Wooden Kalimba Chime',
      desc: 'Harmonic 5-note pentatonic scale triggered on mini-game actions.',
      icon: Disc,
      visual: 'fanfare' as const,
      color: 'from-amber-300 to-orange-400',
    },
    {
      id: 'gong',
      title: 'SCROLL_GONG',
      subtitle: '174 Hz Solfeggio Gong',
      desc: 'Deep Tibetan singing bowl resonance dissolving mental overdrive.',
      icon: Radio,
      visual: 'swell' as const,
      color: 'from-purple-400 to-rose-400',
    },
    {
      id: 'step',
      title: 'STEP_CLICK',
      subtitle: 'Mechanical Sensor Tick',
      desc: 'Crisp micro-transient confirming hardware pedometer increments.',
      icon: Activity,
      visual: 'ripple' as const,
      color: 'from-slate-300 to-slate-100',
    },
    {
      id: 'scrub',
      title: 'GRAPH_TICK',
      subtitle: 'Microscopic Glass Tick',
      desc: '4200 Hz haptic feedback when scrubbing spline graphs and sliders.',
      icon: Sparkles,
      visual: 'fanfare' as const,
      color: 'from-pink-300 to-purple-300',
    },
  ];

  return (
    <section id="soundboard" className="py-24 px-4 sm:px-8 relative bg-still-darkBg text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/20 mb-4">
            <span>Section 10</span>
            <span>•</span>
            <span>Sensory Acoustics & Haptics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">
            Acoustic Engineering Soundboard
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Every audio cue in inStill is synthesized dynamically via hardware oscillators,
            ensuring zero bandwidth lag, clean transients, and soothing therapeutic frequencies.
          </p>
        </div>

        {/* Visual Waveform Canvas Display */}
        <div className="max-w-3xl mx-auto h-36 rounded-3xl glass-card-dark border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden mb-12 shadow-2xl">
          <div className="absolute top-3 left-5 text-xs font-mono text-slate-400 flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Realtime Web Audio Waveform Simulator</span>
          </div>

          {activeVisualizer === 'none' && (
            <span className="text-xs font-mono text-slate-500">
              Click any sound tile below to trigger live synthesis & visual ripples
            </span>
          )}

          {activeVisualizer === 'ripple' && (
            <div className="relative flex items-center justify-center">
              <span className="absolute w-20 h-20 rounded-full border-2 border-cyan-400 animate-ping opacity-75" />
              <span className="absolute w-12 h-12 rounded-full bg-cyan-400/30 blur-sm" />
              <span className="w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee]" />
            </div>
          )}

          {activeVisualizer === 'swell' && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500/40 via-teal-400/40 to-purple-500/40 blur-md border border-white/40"
            />
          )}

          {activeVisualizer === 'fanfare' && (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                <motion.div
                  key={bar}
                  animate={{ height: [8, 48, 12, 36, 16] }}
                  transition={{ duration: 0.7, repeat: 1, delay: bar * 0.05 }}
                  className="w-2.5 rounded-full bg-gradient-to-t from-amber-400 to-rose-400"
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
                className="group p-6 rounded-3xl glass-card-dark border border-white/10 hover:border-emerald-400/40 text-left transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${cue.color} text-slate-900 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
                    Synthesized
                  </span>
                </div>

                <div className="text-sm font-bold text-white font-mono mb-0.5">{cue.title}</div>
                <div className="text-xs text-emerald-300 font-medium mb-2">{cue.subtitle}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{cue.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
