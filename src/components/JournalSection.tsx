import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Footprints, Droplets, TrendingUp, Sparkles, X, Check } from 'lucide-react';
import { AdaptiveScreenshotFrame } from './AdaptiveScreenshotFrame';
import { soundEngine } from '../utils/audio';

export const JournalSection: React.FC = () => {
  // Metric and Interval Toggles
  const [metric, setMetric] = useState<'mood' | 'steps' | 'water'>('mood');
  const [interval, setInterval] = useState<'hrs' | 'days' | 'weeks' | 'months'>('days');

  // Interactive Journal Entry Composer Modal State
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [entryTitle, setEntryTitle] = useState('Evening Stillness');
  const [entryContent, setEntryContent] = useState(
    'Took a long walk through the garden after the rain. The breathing practice before sunset grounded my mind.'
  );
  const [entryMood, setEntryMood] = useState('Centred & Serene');

  const splinePoints: Record<string, number[]> = {
    mood: [65, 72, 85, 78, 92, 88, 95],
    steps: [4500, 7200, 8900, 10200, 6800, 11400, 9500],
    water: [1800, 2200, 2500, 2100, 2500, 2400, 2500],
  };

  return (
    <section id="journal" className="py-24 px-4 sm:px-8 relative bg-still-darkBg/95 text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pastelLavender-gauge/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/20 mb-4">
            <span>Section 05</span>
            <span>•</span>
            <span>JournalScreen.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">
            Journal & Multi-Scale Trend Analytics
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Reflective journaling paired with automated pedometer and hydration tracking,
            synthesized into mathematical cubic spline trend curves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Real App Screenshot in Adaptive Tilt Frame */}
          <div className="lg:col-span-5 flex flex-col items-center order-2 lg:order-1">
            <AdaptiveScreenshotFrame
              src="./assets/screenshots/journal-metrics.jpeg"
              alt="inStill Journal and Telemetry Metrics"
              orientation="vertical"
              tiltDirection="left"
              glowColor="rgba(195, 177, 225, 0.4)"
              badge="JournalScreen.kt"
              hotspots={[
                {
                  x: 50,
                  y: 18,
                  label: 'Quiet Reflections Hub',
                  detail: 'Secure encrypted diary entries tagged with emotional states and time stamps.',
                },
                {
                  x: 50,
                  y: 48,
                  label: 'Hardware Sensor Active',
                  detail: 'Direct Step Counter sensor telemetry requiring zero battery-draining GPS.',
                },
                {
                  x: 50,
                  y: 78,
                  label: '2,500 ml Hydration Target',
                  detail: 'Real-time intake tracking with single-tap volume increments.',
                },
              ]}
            />
          </div>

          {/* Right Column: Interactive Spline Chart & Reflections Composer */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
            {/* Interactive Trend Chart Card */}
            <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-serif font-medium text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-300" />
                    <span>Hermite Cubic Spline Trends</span>
                  </h3>
                  <p className="text-xs text-slate-400">Continuous biometric trajectory analytics</p>
                </div>

                {/* Metric Selector Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 self-start sm:self-auto">
                  {(['mood', 'steps', 'water'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMetric(m);
                        soundEngine.playStepClick();
                      }}
                      data-cursor="pointer"
                      className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                        metric === m
                          ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Interval Tabs */}
              <div className="flex items-center gap-2 mb-6">
                {(['hrs', 'days', 'weeks', 'months'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setInterval(t);
                      soundEngine.playScrubTick();
                    }}
                    data-cursor="pointer"
                    className={`px-3 py-1 rounded-full text-xs font-mono uppercase transition-all ${
                      interval === t
                        ? 'bg-white/20 text-white font-semibold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* The Spline Curve SVG */}
              <div className="h-44 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="splineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C3B1E1" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#C3B1E1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Fill area */}
                  <path
                    d="M 0,80 C 100,50 150,90 200,40 C 280,10 350,60 420,25 C 500,10 550,40 600,15 L 600,120 L 0,120 Z"
                    fill="url(#splineGradient)"
                  />
                  {/* Stroke path */}
                  <path
                    d="M 0,80 C 100,50 150,90 200,40 C 280,10 350,60 420,25 C 500,10 550,40 600,15"
                    fill="none"
                    stroke="#C3B1E1"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Points */}
                  {[
                    { x: 0, y: 80 },
                    { x: 100, y: 50 },
                    { x: 200, y: 40 },
                    { x: 300, y: 30 },
                    { x: 420, y: 25 },
                    { x: 510, y: 18 },
                    { x: 600, y: 15 },
                  ].map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r="4.5"
                      className="fill-purple-300 stroke-white stroke-2 shadow-md hover:scale-125 transition-transform"
                    />
                  ))}
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-4 pt-3 border-t border-white/5">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Quick Reflections Composer Trigger Card */}
            <div className="glass-card-dark rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30">
                  <PenLine className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Reflections & Thoughts Composer</h4>
                  <p className="text-xs text-slate-400">Capture daily insights, mood shifts, and gratitude milestones.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsComposerOpen(true);
                  soundEngine.playKalimba(2);
                }}
                data-cursor="pointer"
                className="px-6 py-2.5 rounded-full bg-still-buttonDark text-white text-xs font-medium tracking-wider uppercase hover:bg-emerald-600 transition-colors shadow-lg"
              >
                Write Entry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal: Reflections Composer */}
      <AnimatePresence>
        {isComposerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="max-w-lg w-full rounded-3xl glass-card-dark p-6 sm:p-8 border border-white/20 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
                  New Journal Reflection
                </span>
                <button
                  onClick={() => setIsComposerOpen(false)}
                  data-cursor="pointer"
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Title</label>
                  <input
                    type="text"
                    value={entryTitle}
                    onChange={(e) => setEntryTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Reflections</label>
                  <textarea
                    rows={4}
                    value={entryContent}
                    onChange={(e) => setEntryContent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-emerald-400 resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Mood Tag</label>
                  <div className="flex flex-wrap gap-2">
                    {['Centred & Serene', 'Grateful', 'Deep Focus', 'Reflective Stillness'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setEntryMood(tag);
                          soundEngine.playScrubTick();
                        }}
                        type="button"
                        className={`px-3 py-1 rounded-full text-xs transition-all ${
                          entryMood === tag
                            ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    onClick={() => setIsComposerOpen(false)}
                    data-cursor="pointer"
                    className="px-5 py-2 rounded-full text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playBreatheBell();
                      setIsComposerOpen(false);
                    }}
                    data-cursor="pointer"
                    className="px-6 py-2 rounded-full bg-still-buttonDark text-white text-xs font-semibold hover:bg-emerald-600 transition-colors shadow-md"
                  >
                    Save Entry
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
