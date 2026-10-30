import React from 'react';
import { ArrowUp, Heart, Shield, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playScrubTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-white pt-20 pb-12 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      {/* Decorative ambient underglow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-still-forestSage/80 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-xs tracking-wider">
                S
              </div>
              <span className="font-serif tracking-[0.28em] text-2xl font-bold text-white uppercase">
                inStill
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Mindful Presence & Daily Balance. A luxury sensory wellness ecosystem engineered with 60 FPS liquid canvas shaders, bio-responsive breathwork, and clinical telehealth.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Version 2.4.0 • Android Kotlin Native & Web</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-300 mb-4">Experience</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#today" className="hover:text-emerald-300 transition-colors">
                  Today: Daily Hub
                </a>
              </li>
              <li>
                <a href="#practice" className="hover:text-emerald-300 transition-colors">
                  Breathe: Liquid Glass Orb
                </a>
              </li>
              <li>
                <a href="#practice" className="hover:text-emerald-300 transition-colors">
                  Heal: Bilateral EMDR Audio
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-emerald-300 transition-colors">
                  Journal & Biometric Splines
                </a>
              </li>
              <li>
                <a href="#telehealth" className="hover:text-emerald-300 transition-colors">
                  Clinical Agora Telehealth
                </a>
              </li>
            </ul>
          </div>

          {/* Sensory & Tech Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-300 mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#companions" className="hover:text-emerald-300 transition-colors">
                  Mew Mew & EMO AI
                </a>
              </li>
              <li>
                <a href="#desk-clock" className="hover:text-emerald-300 transition-colors">
                  StandBy Desk Clock
                </a>
              </li>
              <li>
                <a href="#doombreaker" className="hover:text-emerald-300 transition-colors">
                  DoomScroll Breaker
                </a>
              </li>
              <li>
                <a href="#soundboard" className="hover:text-emerald-300 transition-colors">
                  Sensory Acoustics
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-emerald-300 transition-colors">
                  988 Crisis Lifeline
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top & privacy */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              data-cursor="pointer"
              className="p-3 rounded-full glass-card-dark border border-white/15 text-slate-300 hover:text-white hover:border-emerald-400/40 transition-all flex items-center gap-2 text-xs font-mono"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="text-[11px] font-mono text-slate-500 mt-6 md:mt-0 text-left md:text-right">
              <div>Encrypted Local State</div>
              <div>Zero Ad Tracking</div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1.5">
            <span>Crafted with gentle care for mindful living.</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>MIT License</span>
            <span>GitHub: shilwantr/instilllweb</span>
            <span>© {new Date().getFullYear()} inStill Ecosystem</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
