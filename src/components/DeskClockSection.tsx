import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, BatteryCharging, BellOff, Palette, Maximize2, Shield, Zap, Thermometer } from 'lucide-react';
import { AdaptiveScreenshotFrame } from './AdaptiveScreenshotFrame';
import { soundEngine } from '../utils/audio';

type ClockStyle = 'bubble' | 'serif' | 'mono' | 'geometric';
type PastelPaletteKey = 'olive' | 'lavender' | 'matcha' | 'rose';

interface DeskClockSectionProps {
  onOpenFullscreenModal: () => void;
}

export const DeskClockSection: React.FC<DeskClockSectionProps> = ({ onOpenFullscreenModal }) => {
  const [clockStyle, setClockStyle] = useState<ClockStyle>('bubble');
  const [activePalette, setActivePalette] = useState<PastelPaletteKey>('olive');
  const [currentTime, setCurrentTime] = useState({ hours: '07', minutes: '32' });

  // Update live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime({
        hours: String(now.getHours()).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0'),
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const palettes: Record<
    PastelPaletteKey,
    { name: string; colors: string[]; arcColor: string; bg: string; glow: string }
  > = {
    olive: {
      name: 'Lite Olive & Lavender',
      colors: ['#A8C6FA', '#E8C5F0', '#FDE7A9', '#B8EAD0'],
      arcColor: '#C3B1E1',
      bg: '#0B1310',
      glow: 'rgba(197, 216, 164, 0.45)',
    },
    lavender: {
      name: 'Soft Lavender Mist',
      colors: ['#C3B1E1', '#B4C5E4', '#D8B4E2', '#A8D8B9'],
      arcColor: '#B4C5E4',
      bg: '#0E0F1A',
      glow: 'rgba(195, 177, 225, 0.45)',
    },
    matcha: {
      name: 'Matcha & Pastel Peach',
      colors: ['#BFD8B8', '#F7C59F', '#E8A598', '#D4E09B'],
      arcColor: '#BFD8B8',
      bg: '#0A120E',
      glow: 'rgba(191, 216, 184, 0.45)',
    },
    rose: {
      name: 'Moonlit Rose & Lilac',
      colors: ['#D8C3E8', '#F2BAC9', '#E8DAB2', '#B8D8BA'],
      arcColor: '#F2BAC9',
      bg: '#140D14',
      glow: 'rgba(242, 186, 201, 0.45)',
    },
  };

  const currentPal = palettes[activePalette];

  return (
    <section id="desk-clock" className="py-24 px-4 sm:px-8 relative bg-still-darkBg text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700"
        style={{ background: currentPal.glow }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/20 mb-4">
            <span>Section 08</span>
            <span>•</span>
            <span>FullScreenDeskClockOverlay.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">
            Focus Desk Clock & StandBy Mode
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Turn your bedside nightstand or work desk into an organic sanctuary. Overlapping pastel digits,
            a precision 270° battery telemetry gauge, and strict distraction-free DND.
          </p>

          <button
            onClick={() => {
              onOpenFullscreenModal();
              soundEngine.playBreatheBell();
            }}
            data-cursor="pointer"
            className="mt-6 px-6 py-3 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-lg"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Launch StandBy Fullscreen Mode</span>
          </button>
        </div>

        {/* HORIZONTAL SCREENSHOT SHOWCASE (Wide Panoramic Horizon Tilt) */}
        <div className="mb-16">
          <div className="text-center mb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Panoramic Horizon Perspective • Scroll to Observe Responsive 3D Stand Pitch
            </span>
          </div>

          <AdaptiveScreenshotFrame
            src="./assets/screenshots/desk-clock-landscape-1.jpeg"
            alt="inStill StandBy Landscape Desk Clock"
            orientation="horizontal"
            glowColor={currentPal.glow}
            badge="MagSafe Landscape Stand"
            hotspots={[
              {
                x: 18,
                y: 12,
                label: 'Strict DND Policy',
                detail: 'Mutes all system notifications, app alerts, and haptics via ACCESS_NOTIFICATION_POLICY.',
              },
              {
                x: 25,
                y: 50,
                label: 'Overlapping Pastel Digits',
                detail: '152sp fluid overlapping numerals rendered with subtle specular drop shadows.',
              },
              {
                x: 82,
                y: 50,
                label: '270° Circular Battery Gauge',
                detail: 'Real-time decimal battery percentage with wattage telemetry and thermals.',
              },
            ]}
          />
        </div>

        {/* Interactive Customization Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Interactive Desk Clock Simulator */}
          <div className="lg:col-span-8 glass-card-dark rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
            {/* DND Status Pill */}
            <div className="flex items-center justify-between mb-8">
              <div className="px-4 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
                <BellOff className="w-3.5 h-3.5 text-slate-400" />
                <span>Focus Active • Notifications & Sounds Muted</span>
              </div>
              <div className="text-xs font-mono text-emerald-300">Live Simulator</div>
            </div>

            {/* Main Clock Face Display */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center py-6">
              {/* Digits Display */}
              <div className="sm:col-span-7 flex items-center justify-center">
                {clockStyle === 'bubble' && (
                  <div className="flex items-center tracking-tighter text-6xl sm:text-8xl md:text-9xl font-bold select-none drop-shadow-2xl">
                    <span style={{ color: currentPal.colors[0] }}>{currentTime.hours[0]}</span>
                    <span style={{ color: currentPal.colors[1] }} className="-ml-3 sm:-ml-5">
                      {currentTime.hours[1]}
                    </span>
                    <span style={{ color: currentPal.colors[2] }} className="-ml-3 sm:-ml-5">
                      {currentTime.minutes[0]}
                    </span>
                    <span style={{ color: currentPal.colors[3] }} className="-ml-3 sm:-ml-5">
                      {currentTime.minutes[1]}
                    </span>
                  </div>
                )}
                {clockStyle === 'serif' && (
                  <div className="font-serif italic text-6xl sm:text-8xl font-medium tracking-tight text-slate-100">
                    {currentTime.hours}:{currentTime.minutes}
                  </div>
                )}
                {clockStyle === 'mono' && (
                  <div className="font-mono text-5xl sm:text-7xl font-bold tracking-widest text-emerald-300">
                    {currentTime.hours}:{currentTime.minutes}
                  </div>
                )}
                {clockStyle === 'geometric' && (
                  <div className="font-sans font-light text-6xl sm:text-8xl tracking-tight text-white">
                    {currentTime.hours}
                    <span className="text-slate-400">:</span>
                    {currentTime.minutes}
                  </div>
                )}
              </div>

              {/* 270° Circular Battery Gauge */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-45" viewBox="0 0 100 100">
                    {/* Background Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="6"
                      strokeDasharray="188.5"
                      strokeDashoffset="62.8"
                      strokeLinecap="round"
                    />
                    {/* Active Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={currentPal.arcColor}
                      strokeWidth="6"
                      strokeDasharray="188.5"
                      strokeDashoffset="95"
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>

                  {/* Inside Telemetry Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-white">81.59%</span>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-300" /> 0 W
                      </span>
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-rose-400" /> 40°C
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Style & Palette Controls */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* 4 Typography Styles */}
            <div className="glass-card-dark rounded-3xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-300" />
                <span>Typography Styles</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bubble', label: 'Bubble Overlap' },
                  { id: 'serif', label: 'Editorial Serif' },
                  { id: 'mono', label: 'Minimal Mono' },
                  { id: 'geometric', label: 'Geometric Lite' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setClockStyle(s.id as ClockStyle);
                      soundEngine.playStepClick();
                    }}
                    data-cursor="pointer"
                    className={`p-3 rounded-2xl text-xs text-left transition-all ${
                      clockStyle === s.id
                        ? 'bg-emerald-500/25 border-2 border-emerald-400 text-white font-medium'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Pastel Palettes Picker */}
            <div className="glass-card-dark rounded-3xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-300" />
                <span>4 Curated Pastel Palettes</span>
              </h4>
              <div className="space-y-2.5">
                {(Object.keys(palettes) as PastelPaletteKey[]).map((key) => {
                  const pal = palettes[key];
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActivePalette(key);
                        soundEngine.playKalimba(2);
                      }}
                      data-cursor="pointer"
                      className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                        activePalette === key
                          ? 'bg-white/15 border-2 border-white/40 shadow-md'
                          : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-medium text-slate-200">{pal.name}</span>
                      <div className="flex items-center gap-1.5">
                        {pal.colors.map((c, idx) => (
                          <span
                            key={idx}
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ background: c }}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
