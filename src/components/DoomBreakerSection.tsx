import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Wind, Home, Eye, CheckCircle2 } from 'lucide-react';
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
    <section id="doombreaker" className="py-24 px-4 sm:px-8 relative bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-coral text-white border border-slate-900/15 shadow-cartoon-sm mb-4">
            <span>🛡️ Section 09</span>
            <span>•</span>
            <span>ScrollBreakActivity.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            DoomScroll Breaker: Mindful Interventions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Reclaim your attention. When continuous feeds hijack your focus, inStill intervenes
            with a deep harmonic singing bowl gong and autonomic resets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Settings Simulation */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-900/10 shadow-cartoon-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-100 text-amber-900 border-2 border-slate-900 shadow-cartoon-sm">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Doom-Scroll Breaker Service</h3>
                    <p className="text-xs text-slate-500">Full-screen gentle intervention over predatory infinite feeds</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-pop-lime text-pop-forest font-mono text-xs font-bold border border-pop-forest">
                  Active
                </div>
              </div>

              {/* Slider */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">Continuous Scroll Limit</span>
                  <span className="text-xs font-mono text-pop-forest font-bold px-3 py-1 rounded-full bg-pop-lime">
                    {scrollLimit} min
                  </span>
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
                  className="w-full accent-pop-forest cursor-pointer h-2.5 bg-slate-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500 mt-1">
                  <span>1m</span>
                  <span>15m</span>
                  <span>30m</span>
                  <span>45m</span>
                  <span>60m</span>
                </div>
              </div>

              {/* Monitored Apps Grid */}
              <div className="mb-6">
                <span className="text-xs font-bold text-slate-700 block mb-3">Monitored Infinite Feeds</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {Object.entries(monitoredApps).map(([app, enabled]) => (
                    <button
                      key={app}
                      onClick={() => toggleApp(app)}
                      data-cursor="pointer"
                      className={`p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cartoon-sticker ${
                        enabled
                          ? 'bg-pop-lime text-pop-forest border-2 border-pop-forest shadow-cartoon-sm'
                          : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{app}</span>
                      {enabled && <CheckCircle2 className="w-3.5 h-3.5 text-pop-forest" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trigger Break Intervention */}
              <button
                onClick={triggerIntervention}
                data-cursor="pointer"
                className="w-full py-4 rounded-full bg-slate-950 text-white font-bold text-sm tracking-wide shadow-cartoon hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
              >
                <Eye className="w-4 h-4 text-pop-lime group-hover:scale-110 transition-transform" />
                <span>⚡ Preview Break Intervention Screen (With Gong)</span>
              </button>
            </div>
          </div>

          {/* Screenshot Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <AdaptiveScreenshotFrame
              src="./assets/screenshots/profile-doombreaker.jpeg"
              alt="inStill Doom-Scroll Breaker Profile Settings"
              orientation="vertical"
              tiltDirection="right"
              glowColor="rgba(250, 123, 96, 0.45)"
              badge="Accessibility Monitor"
            />
          </div>
        </div>
      </div>

      {/* Full-Screen Break Intervention Overlay */}
      <AnimatePresence>
        {isInterventionOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              className="max-w-md w-full rounded-[40px] bg-white p-8 sm:p-10 border-4 border-slate-900 shadow-cartoon text-center relative overflow-hidden"
            >
              <div className="w-20 h-20 rounded-full bg-pop-lime border-4 border-pop-forest flex items-center justify-center mx-auto mb-6 shadow-cartoon animate-pulse">
                <Wind className="w-10 h-10 text-pop-forest" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 mb-2">Time for Stillness</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                You’ve been immersed for 18 minutes. Take a gentle breath, soften your gaze, and let your nervous system recalibrate.
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-8 font-mono text-xs">
                <div>
                  <div className="text-pop-forest font-bold text-base">18m</div>
                  <div className="text-[10px] text-slate-500 font-bold">Current App</div>
                </div>
                <div>
                  <div className="text-amber-600 font-bold text-base">42m</div>
                  <div className="text-[10px] text-slate-500 font-bold">Social Today</div>
                </div>
                <div>
                  <div className="text-purple-700 font-bold text-base">48m</div>
                  <div className="text-[10px] text-slate-500 font-bold">Rest Left</div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    soundEngine.playBreatheBell();
                    setIsInterventionOpen(false);
                  }}
                  data-cursor="pointer"
                  className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-cartoon transition-colors"
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
                  className="w-full py-3.5 rounded-full bg-pop-lime hover:bg-lime-300 text-pop-forest font-bold text-xs uppercase flex items-center justify-center gap-2 border-2 border-pop-forest transition-colors block text-center shadow-cartoon-sm"
                >
                  <Wind className="w-4 h-4" />
                  <span>Breathe with inStill (Box 4-4-4-4)</span>
                </a>

                <button
                  onClick={() => {
                    soundEngine.playStepClick();
                    setIsInterventionOpen(false);
                  }}
                  data-cursor="pointer"
                  className="w-full py-2.5 rounded-full text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
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
