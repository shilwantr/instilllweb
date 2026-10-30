import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playScrubTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white text-slate-900 pt-20 pb-12 px-4 sm:px-8 border-t-2 border-slate-900/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-100">
          {/* Brand Info with Cartoon Mascot */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-900/15 shadow-cartoon-sm flex-shrink-0 bg-purple-100">
                <img
                  src="./assets/logo.png"
                  alt="inStill Logo"
                  className="w-full h-full object-cover block"
                />
              </div>
              <span className="font-sans text-2xl font-black text-slate-900 tracking-tight">
                in<span className="font-extrabold">STILL</span>
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mb-6">
              Mindful Presence & Daily Balance. A luxury sensory wellness ecosystem engineered with 60 FPS liquid canvas shaders, bio-responsive breathwork, and clinical telehealth.
            </p>

            {/* Cartoon Mascot Message Bubble */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-pop-lime/40 border-2 border-pop-forest/40 shadow-cartoon-sm">
              <span className="text-2xl select-none">🐱</span>
              <span className="text-xs font-bold text-pop-forest">
                Mew Mew says: &ldquo;Take a deep breath and smile!&rdquo;
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-slate-900 mb-4">Experience</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
              <li>
                <a href="#today" className="hover:text-pop-forest transition-colors">
                  Today: Daily Hub
                </a>
              </li>
              <li>
                <a href="#practice" className="hover:text-pop-forest transition-colors">
                  Breathe: Liquid Glass Orb
                </a>
              </li>
              <li>
                <a href="#practice" className="hover:text-pop-forest transition-colors">
                  Heal: Bilateral EMDR Audio
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-pop-forest transition-colors">
                  Journal & Biometric Splines
                </a>
              </li>
              <li>
                <a href="#telehealth" className="hover:text-pop-forest transition-colors">
                  Clinical Agora Telehealth
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-slate-900 mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
              <li>
                <a href="#companions" className="hover:text-pop-forest transition-colors">
                  Mew Mew & EMO AI
                </a>
              </li>
              <li>
                <a href="#desk-clock" className="hover:text-pop-forest transition-colors">
                  StandBy Desk Clock
                </a>
              </li>
              <li>
                <a href="#doombreaker" className="hover:text-pop-forest transition-colors">
                  DoomScroll Breaker
                </a>
              </li>
              <li>
                <a href="#soundboard" className="hover:text-pop-forest transition-colors">
                  Sensory Acoustics
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-pop-forest transition-colors">
                  988 Crisis Lifeline
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              data-cursor="pointer"
              className="p-3.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-mono font-bold shadow-cartoon transform hover:-translate-y-0.5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="text-[11px] font-mono text-slate-500 mt-6 md:mt-0 text-left md:text-right font-medium">
              <div>Encrypted Local State</div>
              <div>Zero Ad Tracking</div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-medium">
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
