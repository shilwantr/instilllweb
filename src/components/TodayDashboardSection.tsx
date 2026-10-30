import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, Droplet, Flame, Footprints, Clock, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { AdaptiveScreenshotFrame } from './AdaptiveScreenshotFrame';
import { soundEngine } from '../utils/audio';

const quotesList = [
  {
    quote: 'Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself.',
    author: 'Hermann Hesse',
  },
  {
    quote: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.',
    author: 'Thich Nhat Hanh',
  },
  {
    quote: 'Quiet the mind, and the soul will speak. In stillness, we find clarity.',
    author: 'Jaya Ram',
  },
  {
    quote: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.',
    author: 'Thich Nhat Hanh',
  },
];

export const TodayDashboardSection: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>('Okay');
  const [waterMl, setWaterMl] = useState(750);
  const [history, setHistory] = useState<number[]>([750]);
  const [steps, setSteps] = useState(4820);
  const [scrubberDay, setScrubberDay] = useState(4);

  const moodData = [
    { day: 'Mon', mood: 78, label: 'Calm & Productive' },
    { day: 'Tue', mood: 65, label: 'Reflective' },
    { day: 'Wed', mood: 84, label: 'Energized' },
    { day: 'Thu', mood: 70, label: 'Centered' },
    { day: 'Fri', mood: 92, label: 'Joyful Balance' },
    { day: 'Sat', mood: 88, label: 'Restful Calm' },
    { day: 'Sun', mood: 95, label: 'Deep Stillness' },
  ];

  const handleNextQuote = () => {
    soundEngine.playScrubTick();
    setQuoteIndex((prev) => (prev + 1) % quotesList.length);
  };

  const addWater = (amount: number) => {
    soundEngine.playWaterPour();
    setHistory((prev) => [...prev, waterMl]);
    setWaterMl((prev) => Math.min(2500, prev + amount));
  };

  const undoWater = () => {
    if (history.length > 0) {
      soundEngine.playStepClick();
      const last = history[history.length - 1];
      setWaterMl(last);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const moods = [
    { id: 'Happy', emoji: '😊', symbol: '~', bg: 'bg-pop-yellow text-slate-900 border-amber-400' },
    { id: 'Okay', emoji: '😌', symbol: '•', bg: 'bg-pop-lime text-pop-forest border-pop-forest' },
    { id: 'Low', emoji: '🌧️', symbol: '⌢', bg: 'bg-pop-periwinkle text-slate-900 border-blue-400' },
    { id: 'Anxious', emoji: '⚡', symbol: '~', bg: 'bg-pop-coral text-white border-rose-400' },
    { id: 'Tired', emoji: '😴', symbol: '≈', bg: 'bg-pop-lavender text-purple-950 border-purple-400' },
  ];

  const caloriesBurned = (0.04 * steps).toFixed(0);
  const distanceKm = (0.000762 * steps).toFixed(2);

  return (
    <section id="today" className="py-24 px-4 sm:px-8 relative bg-white text-slate-900 overflow-hidden border-t border-b border-slate-100">
      {/* Light background auras */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pop-lime/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pop-periwinkle/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-lime text-pop-forest border border-pop-forest/20 shadow-cartoon-sm mb-4">
            <span>✨ Section 03</span>
            <span>•</span>
            <span>DashboardScreen.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            Today: The Daily Balance Hub
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Every morning begins with mindful presence. Track your emotional climate, log pure hydration,
            and monitor sensory telemetry seamlessly in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Cards & Micro-Interactions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 1. Daily Reflection Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 relative overflow-hidden border-2 border-slate-900/10 shadow-cartoon-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-pop-forest font-bold font-mono flex items-center gap-1.5">
                  <span className="text-lg">”</span> Daily Reflection
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsFavorited(!isFavorited);
                      soundEngine.playKalimba(1);
                    }}
                    data-cursor="pointer"
                    className="p-2 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-600 transition-colors"
                    title="Favorite Quote"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                  <button
                    onClick={handleNextQuote}
                    data-cursor="pointer"
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Re-roll Quote"
                  >
                    <RefreshCw className="w-4 h-4 hover:rotate-180 transition-transform duration-500" />
                  </button>
                </div>
              </div>

              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl font-serif italic text-slate-800 leading-relaxed mb-3"
              >
                &ldquo;{quotesList[quoteIndex].quote}&rdquo;
              </motion.p>
              <div className="text-xs text-pop-forest font-bold font-mono tracking-wider">
                — {quotesList[quoteIndex].author}
              </div>
            </div>

            {/* 2. 5-State Mood Check-In Bar */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-cartoon-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  How are you feeling right now?
                </span>
                <span className="text-xs text-pop-forest font-bold px-3 py-1 rounded-full bg-pop-lime">
                  {selectedMood}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {moods.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMood(m.id);
                      soundEngine.playKalimba(idx);
                    }}
                    data-cursor="pointer"
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 cartoon-sticker ${
                      selectedMood === m.id
                        ? `${m.bg} border-2 shadow-cartoon scale-105 font-bold`
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-2xl mb-1 select-none">{m.emoji}</span>
                    <span className="text-[11px] font-semibold">{m.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hydration & Walking Telemetry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Hydration Intake Card */}
              <div className="bg-white rounded-3xl p-5 border-2 border-slate-900/10 shadow-cartoon-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-mono font-bold text-sky-700 flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-sky-500 fill-current" /> Hydration
                    </span>
                    <span className="text-xs font-bold text-slate-500">{((waterMl / 2500) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="text-2xl font-sans font-extrabold text-slate-900 mb-1">
                    {(waterMl / 1000).toFixed(2)} <span className="text-sm font-normal text-slate-500">/ 2.5 L</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-4 border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-pop-lime rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (waterMl / 2500) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => addWater(150)}
                    data-cursor="pointer"
                    className="flex-1 py-1.5 text-xs font-bold rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition-colors"
                  >
                    +150ml
                  </button>
                  <button
                    onClick={() => addWater(250)}
                    data-cursor="pointer"
                    className="flex-1 py-1.5 text-xs font-bold rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition-colors"
                  >
                    +250ml
                  </button>
                  <button
                    onClick={() => addWater(500)}
                    data-cursor="pointer"
                    className="flex-1 py-1.5 text-xs font-bold rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition-colors"
                  >
                    +500ml
                  </button>
                  <button
                    onClick={undoWater}
                    data-cursor="pointer"
                    className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors font-semibold"
                    title="Undo last log"
                  >
                    Undo
                  </button>
                </div>
              </div>

              {/* Walking Activity Telemetry Card */}
              <div className="bg-white rounded-3xl p-5 border-2 border-slate-900/10 shadow-cartoon-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-mono font-bold text-pop-forest flex items-center gap-1.5">
                      <Footprints className="w-3.5 h-3.5" /> Walking Activity
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-pop-lime text-pop-forest font-mono font-bold text-[10px]">
                      Live Sensor
                    </span>
                  </div>
                  <div className="text-2xl font-sans font-extrabold text-slate-900 mb-1">
                    {steps.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ 10,000 steps</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-4 border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-pop-lime to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (steps / 10000) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1 font-bold text-amber-700">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span>{caloriesBurned} kcal</span>
                  </div>
                  <div className="font-mono text-slate-500">{distanceKm} km</div>
                  <button
                    onClick={() => {
                      setSteps((prev) => prev + 500);
                      soundEngine.playStepClick();
                    }}
                    data-cursor="pointer"
                    className="text-[11px] font-bold text-pop-forest hover:underline"
                  >
                    +500 steps
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Interactive Mood Trend Wave Graph with Scrubber */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-cartoon-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">7-Day Emotional Climate</h4>
                  <p className="text-xs text-slate-500">Drag scrubber to hear microscopic glass ticks</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-pop-forest px-3 py-1 rounded-full bg-pop-lime">
                    {moodData[scrubberDay].day}: {moodData[scrubberDay].label} ({moodData[scrubberDay].mood}%)
                  </span>
                </div>
              </div>

              {/* Scrubber slider */}
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={scrubberDay}
                onChange={(e) => {
                  setScrubberDay(parseInt(e.target.value));
                  soundEngine.playScrubTick();
                }}
                className="w-full accent-pop-forest cursor-pointer h-2.5 bg-slate-100 rounded-lg appearance-none mb-3"
              />

              {/* SVG Bezier wave in crisp emerald */}
              <div className="h-28 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="waveLightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D2F56C" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#D2F56C" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,30 C 100,50 150,20 233,15 C 316,10 350,45 466,25 C 550,10 600,18 700,5 L 700,100 L 0,100 Z"
                    fill="url(#waveLightGradient)"
                  />
                  <path
                    d="M 0,30 C 100,50 150,20 233,15 C 316,10 350,45 466,25 C 550,10 600,18 700,5"
                    fill="none"
                    stroke="#0A4839"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx={`${(scrubberDay / 6) * 700}`}
                    cy={`${30 - scrubberDay * 3}`}
                    r="7"
                    className="fill-pop-lime stroke-pop-forest stroke-[3px] shadow-cartoon-sm"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Actual App Screenshot in Clean White Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <AdaptiveScreenshotFrame
              src="./assets/screenshots/dashboard-light.jpeg"
              alt="inStill Light Dashboard Clean White"
              orientation="vertical"
              tiltDirection="right"
              glowColor="rgba(210, 245, 108, 0.45)"
              badge="Clean White (CW) Theme"
              hotspots={[
                {
                  x: 50,
                  y: 19,
                  label: 'Clean Porcelain Canvas',
                  detail: 'High-contrast slate typography meeting WCAG AAA legibility with frosted glass borders.',
                },
                {
                  x: 50,
                  y: 44,
                  label: 'Interactive Mood Chips',
                  detail: 'Spring bounce animation on selection with custom tactile sound cues.',
                },
                {
                  x: 50,
                  y: 75,
                  label: 'Hardware Walking Sensor',
                  detail: 'Direct device pedometer telemetry stream calculating distance and active calories.',
                },
              ]}
            />
            <p className="mt-4 text-xs font-mono text-slate-500 text-center max-w-xs font-medium">
              Screenshots automatically tilt inward or outward based on viewport scroll depth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
