import React, { useState, useEffect } from 'react';
import { Clock, BatteryCharging, BellOff, Palette, Maximize2, Zap, Thermometer } from 'lucide-react';
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
    { name: string; colors: string[]; arcColor: string; glow: string }
  > = {
    olive: {
      name: 'Lite Olive & Lavender',
      colors: ['#8FA8FF', '#CBB4F5', '#FED668', '#D2F56C'],
      arcColor: '#8FA8FF',
      glow: 'rgba(210, 245, 108, 0.5)',
    },
    lavender: {
      name: 'Soft Lavender Mist',
      colors: ['#C3B1E1', '#B4C5E4', '#D8B4E2', '#A8D8B9'],
      arcColor: '#B4C5E4',
      glow: 'rgba(195, 177, 225, 0.5)',
    },
    matcha: {
      name: 'Matcha & Pastel Peach',
      colors: ['#BFD8B8', '#F7C59F', '#E8A598', '#D4E09B'],
      arcColor: '#BFD8B8',
      glow: 'rgba(191, 216, 184, 0.5)',
    },
    rose: {
      name: 'Moonlit Rose & Lilac',
      colors: ['#D8C3E8', '#F2BAC9', '#E8DAB2', '#B8D8BA'],
      arcColor: '#F2BAC9',
      glow: 'rgba(242, 186, 201, 0.5)',
    },
  };

  const currentPal = palettes[activePalette];

  return (
    <section id="desk-clock" className="py-24 px-4 sm:px-8 relative bg-pop-cream text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-lime text-pop-forest border border-pop-forest/20 shadow-cartoon-sm mb-4">
            <span>⏰ Section 08</span>
            <span>•</span>
            <span>FullScreenDeskClockOverlay.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            Focus Desk Clock & StandBy Mode
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Turn your bedside nightstand or work desk into an organic sanctuary. Overlapping pastel digits,
            a precision 270° battery telemetry gauge, and strict distraction-free DND.
          </p>

          <button
            onClick={() => {
              onOpenFullscreenModal();
              soundEngine.playBreatheBell();
            }}
            data-cursor="pointer"
            aria-label="Launch StandBy Fullscreen Mode"
            className="mt-6 px-7 py-3 rounded-full bg-slate-950 text-white text-xs font-bold font-mono uppercase tracking-wider inline-flex items-center gap-2 shadow-cartoon hover:bg-slate-800 transition-all transform hover:-translate-y-0.5"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Launch StandBy Fullscreen Mode</span>
          </button>
        </div>

        {/* HORIZONTAL SCREENSHOT SHOWCASE (Panoramic Horizon Stand) */}
        <div className="mb-16">
          <div className="text-center mb-4">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500">
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
          {/* Main Simulator Display */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-900/10 shadow-cartoon relative overflow-hidden">
            {/* DND Status Pill */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-6">
              <div className="px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-2 font-bold">
                <BellOff className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span>Focus Active <span className="hidden sm:inline">• Notifications & Sounds Muted</span></span>
              </div>
              <div className="text-xs font-mono font-bold text-pop-forest px-3 py-1 rounded-full bg-pop-lime self-start sm:self-auto">
                Live Simulator
              </div>
            </div>

            {/* Digits Display */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center py-6">
              <div className="sm:col-span-7 flex items-center justify-center">
                {clockStyle === 'bubble' && (
                  <div className="flex items-center tracking-tighter text-5xl xs:text-7xl sm:text-8xl md:text-9xl font-extrabold select-none drop-shadow-md">
                    <span style={{ color: currentPal.colors[0] }}>{currentTime.hours[0]}</span>
                    <span style={{ color: currentPal.colors[1] }} className="-ml-2 xs:-ml-3 sm:-ml-5">
                      {currentTime.hours[1]}
                    </span>
                    <span style={{ color: currentPal.colors[2] }} className="-ml-2 xs:-ml-3 sm:-ml-5">
                      {currentTime.minutes[0]}
                    </span>
                    <span style={{ color: currentPal.colors[3] }} className="-ml-2 xs:-ml-3 sm:-ml-5">
                      {currentTime.minutes[1]}
                    </span>
                  </div>
                )}
                {clockStyle === 'serif' && (
                  <div className="font-serif italic text-5xl xs:text-7xl sm:text-8xl font-bold tracking-tight text-slate-900">
                    {currentTime.hours}:{currentTime.minutes}
                  </div>
                )}
                {clockStyle === 'mono' && (
                  <div className="font-mono text-4xl xs:text-6xl sm:text-7xl font-extrabold tracking-widest text-pop-forest">
                    {currentTime.hours}:{currentTime.minutes}
                  </div>
                )}
                {clockStyle === 'geometric' && (
                  <div className="font-sans font-light text-5xl xs:text-7xl sm:text-8xl tracking-tight text-slate-900">
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
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F1F5F9"
                      strokeWidth="7"
                      strokeDasharray="188.5"
                      strokeDashoffset="62.8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={currentPal.arcColor}
                      strokeWidth="7"
                      strokeDasharray="188.5"
                      strokeDashoffset="95"
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-extrabold font-mono text-slate-900">81.59%</span>
                    <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" /> 0 W
                      </span>
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3.5 h-3.5 text-rose-500" /> 40°C
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-cartoon-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-pop-forest" />
                <span>Typography Styles</span>
              </h3>
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
                    aria-label={`Select clock typography: ${s.label}`}
                    className={`p-3 rounded-2xl text-xs text-left transition-all cartoon-sticker ${
                      clockStyle === s.id
                        ? 'bg-pop-lime text-pop-forest font-bold border-2 border-pop-forest shadow-cartoon-sm'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-cartoon-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-600" />
                <span>Curated Pastel Palettes</span>
              </h3>
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
                      aria-label={`Select pastel palette: ${pal.name}`}
                      className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all cartoon-sticker ${
                        activePalette === key
                          ? 'bg-pop-lavender/40 border-2 border-slate-900 shadow-cartoon-sm font-bold'
                          : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs text-slate-900">{pal.name}</span>
                      <div className="flex items-center gap-1.5">
                        {pal.colors.map((c, idx) => (
                          <span
                            key={idx}
                            className="w-4 h-4 rounded-full border-2 border-slate-900 shadow-sm"
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
