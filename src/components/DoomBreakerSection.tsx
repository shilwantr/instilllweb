import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, PauseCircle, Clock, Wind, Home, RotateCcw, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';
import { AdaptiveScreenshotFrame } from './AdaptiveScreenshotFrame';
import { soundEngine } from '../utils/audio';

export const DoomBreakerSection: React.FC = () => {
  const [isInterventionOpen, setIsInterventionOpen] = useState(false);
  const [scrollLimit, setScrollLimit] = useState(15);
  const [monitoredApps, setMonitoredApps] = useState<{ [key: string]: boolean }>({
    YouTube: true,
    Instagram: true,
    'X (Twitter)': true,
    Facebook: false,
    Reddit: true,
  });

  const toggleApp = (app: string) => {
    soundEngine.playStepClick();
    setMonitoredApps((prev) => ({ ...prev, [app]: !prev[app] }));
  };

  const triggerIntervention = () => {
    soundEngine.playGong();
    setIsInterventionOpen(true);
  };

  return (
    <section id="doombreaker" className="py-24 px-4 sm:px-8 relative bg-still-darkBg/95 text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/20 mb-4">
            <span>Section 09</span>
            <span>•</span>
            <span>ScrollBreakActivity.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">
            DoomScroll Breaker: Mindful Interventions
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Reclaim your attention. When continuous feeds hijack your focus, inStill intervenes
            with a deep harmonic singing bowl gong and autonomic resets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Settings Simulation */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Doom-Scroll Breaker Service</h3>
                    <p className="text-xs text-slate-400">Full-screen gentle intervention over predatory infinite feeds</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs">
                  Active
                </div>
              </div>

              {/* Continuous Scroll Limit Slider */}
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-200">Continuous Scroll Limit</span>
                  <span className="text-xs font-mono text-emerald-300 font-semibold">{scrollLimit} min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={scrollLimit}
                  onChange={(e) => {
                    setScrollLimit(parseInt(e.target.value));
                    soundEngine.playScrubTick();
                  }}
                  className="w-full accent-emerald-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>1m</span>
                  <span>15m</span>
                  <span>30m</span>
                  <span>45m</span>
                  <span>60m</span>
                </div>
              </div>

              {/* Monitored Apps Grid */}
              <div className="mb-6">
                <span className="text-xs font-medium text-slate-300 block mb-3">Monitored Infinite Feeds</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {Object.entries(monitoredApps).map(([app, enabled]) => (
                    <button
                      key={app}
                      onClick={() => toggleApp(app)}
                      data-cursor="pointer"
                      className={`p-3 rounded-2xl text-xs font-medium transition-all flex items-center justify-between ${
                        enabled
                          ? 'bg-emerald-500/20 border-2 border-emerald-400/50 text-emerald-200'
                          : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{app}</span>
                      {enabled && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trigger Break Intervention Screen Preview */}
              <button
                onClick={triggerIntervention}
                data-cursor="pointer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-medium text-sm tracking-wide shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
              >
                <Eye className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                <span>⚡ Preview Break Intervention Screen (With Gong)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Actual App Screenshot in Adaptive Tilt Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <AdaptiveScreenshotFrame
              src="./assets/screenshots/profile-doombreaker.jpeg"
              alt="inStill Doom-Scroll Breaker Profile Settings"
              orientation="vertical"
              tiltDirection="right"
              glowColor="rgba(247, 197, 159, 0.4)"
              badge="Accessibility Monitor"
              hotspots={[
                {
                  x: 50,
                  y: 32,
                  label: 'Scroll Timer Telemetry',
                  detail: 'Detects continuous scrolling across flagged social applications.',
                },
                {
                  x: 50,
                  y: 58,
                  label: 'App Filter Target',
                  detail: 'Granular per-application toggle with zero invasive content logging.',
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Full-Screen Break Intervention Overlay Modal */}
      <AnimatePresence>
        {isInterventionOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              className="max-w-md w-full rounded-[40px] glass-card-dark p-8 sm:p-10 border border-emerald-400/30 shadow-[0_0_80px_rgba(31,92,63,0.5)] text-center relative overflow-hidden"
            >
              {/* Harmonic Glow Behind Gong */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

              {/* Pulsing Tibetan Gong Icon */}
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
                <Wind className="w-10 h-10 text-emerald-300" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">Time for Stillness</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                You’ve been immersed for 18 minutes. Take a gentle breath, soften your gaze, and let your nervous system recalibrate.
              </p>

              {/* Metrics Pill Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 mb-8 font-mono text-xs">
                <div>
                  <div className="text-emerald-300 font-bold">18m</div>
                  <div className="text-[10px] text-slate-400">Current App</div>
                </div>
                <div>
                  <div className="text-amber-300 font-bold">42m</div>
                  <div className="text-[10px] text-slate-400">Social Today</div>
                </div>
                <div>
                  <div className="text-purple-300 font-bold">48m</div>
                  <div className="text-[10px] text-slate-400">Rest Left</div>
                </div>
              </div>

              {/* 3 Mindful Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    soundEngine.playBreatheBell();
                    setIsInterventionOpen(false);
                  }}
                  data-cursor="pointer"
                  className="w-full py-3.5 rounded-full bg-still-buttonDark hover:bg-emerald-600 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Exit to Home & Rest</span>
                </button>

                <a
                  href="#practice"
                  onClick={() => {
                    soundEngine.playBreatheBell();
                    setIsInterventionOpen(false);
                  }}
                  data-cursor="pointer"
                  className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/15 transition-colors block text-center"
                >
                  <Wind className="w-4 h-4 text-emerald-300" />
                  <span>Breathe with inStill (Box 4-4-4-4)</span>
                </a>

                <button
                  onClick={() => {
                    soundEngine.playStepClick();
                    setIsInterventionOpen(false);
                  }}
                  data-cursor="pointer"
                  className="w-full py-2.5 rounded-full text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Snooze 5 Minutes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
