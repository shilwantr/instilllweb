import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Play, Pause, Bell, Droplet, Sparkles, Wind } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface SoundscapesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundscapesModal: React.FC<SoundscapesModalProps> = ({ isOpen, onClose }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const tracks = [
    {
      id: 'bell',
      title: 'Tibetan Tingsha Bell',
      freq: '1568 Hz • Inhale Phase Bell',
      action: () => soundEngine.playBreatheBell(),
      icon: Bell,
    },
    {
      id: 'gong',
      title: 'Singing Bowl Resonator',
      freq: '174 Hz • Vagal Relaxation',
      action: () => soundEngine.playGong(),
      icon: Wind,
    },
    {
      id: 'water',
      title: 'Spring Water Cascade',
      freq: 'Frequency Modulated Hydro-Acoustics',
      action: () => soundEngine.playWaterPour(),
      icon: Droplet,
    },
    {
      id: 'kalimba',
      title: 'Pentatonic Kalimba Arpeggio',
      freq: '528 Hz • Miraculous Frequency',
      action: () => soundEngine.playKalimba(3),
      icon: Sparkles,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="max-w-lg w-full rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl relative"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-white">Sensory Soundscapes</h3>
              <p className="text-xs text-slate-400">Synthesized acoustic frequencies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            data-cursor="pointer"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {tracks.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{t.freq}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    t.action();
                    setPlayingId(t.id);
                    setTimeout(() => setPlayingId(null), 2500);
                  }}
                  data-cursor="pointer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>{playingId === t.id ? 'Playing...' : 'Play'}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center text-[11px] text-slate-400 font-mono">
          Hardware-synthesized via Web Audio API • Zero audio downloads required
        </div>
      </motion.div>
    </div>
  );
};
