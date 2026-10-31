import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BellOff, Zap, Thermometer, Palette } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface StandByClockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandByClockModal: React.FC<StandByClockModalProps> = ({ isOpen, onClose }) => {
  const [time, setTime] = useState({ hours: '07', minutes: '32' });
  const [paletteIndex, setPaletteIndex] = useState(0);

  const palettes = [
    { name: 'Olive & Lavender', colors: ['#A8C6FA', '#E8C5F0', '#FDE7A9', '#B8EAD0'], arc: '#C3B1E1' },
    { name: 'Lavender Mist', colors: ['#C3B1E1', '#B4C5E4', '#D8B4E2', '#A8D8B9'], arc: '#B4C5E4' },
    { name: 'Matcha & Peach', colors: ['#BFD8B8', '#F7C59F', '#E8A598', '#D4E09B'], arc: '#BFD8B8' },
    { name: 'Moonlit Rose', colors: ['#D8C3E8', '#F2BAC9', '#E8DAB2', '#B8D8BA'], arc: '#F2BAC9' },
  ];

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime({
        hours: String(now.getHours()).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0'),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard Esc listener for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPal = palettes[paletteIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] bg-black flex flex-col justify-between p-4 sm:p-12 overflow-hidden select-none safe-area-p">
        {/* Top Bar with DND indicator and Close */}
        <div className="flex items-center justify-between z-20 gap-2">
          <div className="px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-300 flex items-center gap-1.5 sm:gap-2">
            <BellOff className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="hidden sm:inline">Focus Active • Notifications & Sounds Muted</span>
            <span className="sm:hidden font-bold">Focus Mode</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Palette Switcher */}
            <button
              onClick={() => {
                setPaletteIndex((prev) => (prev + 1) % palettes.length);
                soundEngine.playKalimba(2);
              }}
              data-cursor="pointer"
              className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-purple-300 flex-shrink-0" />
              <span className="hidden md:inline">{currentPal.name}</span>
            </button>

            {/* Exit StandBy */}
            <button
              onClick={() => {
                soundEngine.playStepClick();
                onClose();
              }}
              data-cursor="pointer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              title="Close Fullscreen Desk Clock"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Display: 2-Column StandBy Layout */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center justify-center my-auto">
          {/* Overlapping Digits */}
          <div className="md:col-span-7 flex items-center justify-center md:justify-start">
            <div className="flex items-center tracking-tighter text-6xl xs:text-7xl sm:text-9xl md:text-[13rem] font-bold select-none drop-shadow-2xl">
              <span style={{ color: currentPal.colors[0] }}>{time.hours[0]}</span>
              <span style={{ color: currentPal.colors[1] }} className="-ml-3 sm:-ml-8 md:-ml-12">
                {time.hours[1]}
              </span>
              <span style={{ color: currentPal.colors[2] }} className="-ml-3 sm:-ml-8 md:-ml-12">
                {time.minutes[0]}
              </span>
              <span style={{ color: currentPal.colors[3] }} className="-ml-4 sm:-ml-8 md:-ml-12">
                {time.minutes[1]}
              </span>
            </div>
          </div>

          {/* 270° Circular Battery & Sensor Telemetry Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-45" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="5.5"
                  strokeDasharray="188.5"
                  strokeDashoffset="62.8"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={currentPal.arc}
                  strokeWidth="5.5"
                  strokeDasharray="188.5"
                  strokeDashoffset="95"
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl sm:text-4xl font-bold font-mono text-white">81.59%</span>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-300" /> 0 W
                  </span>
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-rose-400" /> 40°C
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ambient Note */}
        <div className="text-center text-xs font-mono text-slate-500 z-20">
          inStill StandBy Display • Press ESC or tap top-right to exit
        </div>
      </div>
    </AnimatePresence>
  );
};
