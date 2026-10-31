import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, TrendingUp, X } from 'lucide-react';
import { AdaptiveScreenshotFrame } from './AdaptiveScreenshotFrame';
import { soundEngine } from '../utils/audio';

export const JournalSection: React.FC = () => {
  const [metric, setMetric] = useState<'mood' | 'steps' | 'water'>('mood');
  const [interval, setInterval] = useState<'hrs' | 'days' | 'weeks' | 'months'>('days');

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [entryTitle, setEntryTitle] = useState('Evening Stillness');
  const [entryContent, setEntryContent] = useState(
    'Took a long walk through the garden after the rain. The breathing practice before sunset grounded my mind.'
  );
  const [entryMood, setEntryMood] = useState('Centred & Serene');

  return (
    <section id="journal" className="py-24 px-4 sm:px-8 relative bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-lavender text-purple-950 border border-slate-900/15 shadow-cartoon-sm mb-4">
            <span>📖 Section 05</span>
            <span>•</span>
            <span>JournalScreen.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            Journal & Multi-Scale Trend Analytics
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Reflective journaling paired with automated pedometer and hydration tracking,
            synthesized into mathematical cubic spline trend curves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: App Screenshot in Light Frame */}
          <div className="lg:col-span-5 flex flex-col items-center order-2 lg:order-1">
            <AdaptiveScreenshotFrame
              src="./assets/screenshots/journal-metrics.jpeg"
              alt="inStill Journal and Telemetry Metrics"
              orientation="vertical"
              tiltDirection="left"
              glowColor="rgba(203, 180, 245, 0.45)"
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

          {/* Right: Interactive Spline Chart & Reflections Composer */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
            {/* Chart Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-900/10 shadow-cartoon-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-pop-forest" />
                    <span>Hermite Cubic Spline Trends</span>
                  </h3>
                  <p className="text-xs text-slate-500">Continuous biometric trajectory analytics</p>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
                  {(['mood', 'steps', 'water'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMetric(m);
                        soundEngine.playStepClick();
                      }}
                      data-cursor="pointer"
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                        metric === m
                          ? 'bg-pop-lime text-pop-forest shadow-sm'
                          : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Intervals */}
              <div className="flex items-center gap-2 mb-6">
                {(['hrs', 'days', 'weeks', 'months'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setInterval(t);
                      soundEngine.playScrubTick();
                    }}
                    data-cursor="pointer"
                    className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                      interval === t
                        ? 'bg-slate-900 text-white shadow-cartoon-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Spline SVG */}
              <div className="h-44 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="splineLightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#CBB4F5" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#CBB4F5" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,80 C 100,50 150,90 200,40 C 280,10 350,60 420,25 C 500,10 550,40 600,15 L 600,120 L 0,120 Z"
                    fill="url(#splineLightGradient)"
                  />
                  <path
                    d="M 0,80 C 100,50 150,90 200,40 C 280,10 350,60 420,25 C 500,10 550,40 600,15"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
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
                      r="5.5"
                      className="fill-pop-yellow stroke-slate-900 stroke-2 shadow-cartoon-sm hover:scale-125 transition-transform"
                    />
                  ))}
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 mt-4 pt-3 border-t border-slate-100">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Quick Reflections Composer Trigger */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-cartoon-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pop-lavender text-purple-950 flex items-center justify-center border-2 border-slate-900 shadow-cartoon-sm">
                  <PenLine className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Reflections & Thoughts Composer</h4>
                  <p className="text-xs text-slate-500">Capture daily insights, mood shifts, and gratitude milestones.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsComposerOpen(true);
                  soundEngine.playKalimba(2);
                }}
                data-cursor="pointer"
                className="px-7 py-3 rounded-full bg-slate-950 text-white text-xs font-bold tracking-wider uppercase hover:bg-slate-800 transition-colors shadow-cartoon"
              >
                Write Entry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {isComposerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="journal-modal-heading"
              className="max-w-lg w-full rounded-3xl bg-white p-5 sm:p-8 border-2 border-slate-900 shadow-cartoon relative max-h-[90dvh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <span id="journal-modal-heading" className="text-xs font-mono font-bold uppercase tracking-widest text-pop-forest">
                  ✨ New Journal Reflection
                </span>
                <button
                  onClick={() => setIsComposerOpen(false)}
                  data-cursor="pointer"
                  aria-label="Close reflections composer"
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="journal-entry-title" className="text-xs text-slate-700 font-bold block mb-1">Title</label>
                  <input
                    id="journal-entry-title"
                    name="entryTitle"
                    type="text"
                    value={entryTitle}
                    onChange={(e) => setEntryTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-pop-forest font-semibold"
                  />
                </div>

                <div>
                  <label htmlFor="journal-entry-content" className="text-xs text-slate-700 font-bold block mb-1">Reflections</label>
                  <textarea
                    id="journal-entry-content"
                    name="entryContent"
                    rows={4}
                    value={entryContent}
                    onChange={(e) => setEntryContent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-pop-forest resize-none leading-relaxed font-normal"
                  />
                </div>

                <div>
                  <span className="text-xs text-slate-700 font-bold block mb-1">Mood Tag</span>
                  <div className="flex flex-wrap gap-2">
                    {['Centred & Serene', 'Grateful', 'Deep Focus', 'Reflective Stillness'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setEntryMood(tag);
                          soundEngine.playScrubTick();
                        }}
                        type="button"
                        aria-label={`Select mood tag: ${tag}`}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                          entryMood === tag
                            ? 'bg-pop-lime text-pop-forest border-2 border-pop-forest shadow-cartoon-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setIsComposerOpen(false)}
                    data-cursor="pointer"
                    className="px-5 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-slate-950"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playBreatheBell();
                      setIsComposerOpen(false);
                    }}
                    data-cursor="pointer"
                    className="px-7 py-2.5 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-cartoon-sm"
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
