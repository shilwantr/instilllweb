import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { InstilllBrand } from './InstilllBrand';

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
                  alt="instilll Logo"
                  width="44"
                  height="44"
                  className="w-full h-full object-cover block"
                />
              </div>
              <InstilllBrand size="lg" variant="lowercase" />
            </div>
            <p className="text-slate-700 text-sm leading-relaxed max-w-sm mb-6">
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
            <h2 className="text-xs uppercase font-mono font-bold tracking-widest text-slate-900 mb-4">Experience</h2>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
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
            <h2 className="text-xs uppercase font-mono font-bold tracking-widest text-slate-900 mb-4">Ecosystem</h2>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
              <li>
                <a href="#companions" className="hover:text-pop-forest transition-colors">
                  Mew Mew & Companions
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
              <li>
                <a href="/learn" className="hover:text-pop-forest transition-colors font-bold text-pop-forest">
                  Wellness Library & Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              data-cursor="pointer"
              aria-label="Scroll back to top of page"
              className="p-3.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-mono font-bold shadow-cartoon transform hover:-translate-y-0.5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="text-[11px] font-mono text-slate-600 mt-6 md:mt-0 text-left md:text-right font-medium">
              <div>Encrypted Local State</div>
              <div>Zero Ad Tracking</div>
            </div>
          </div>
        </div>

        {/* Directory Navigation for Deep Crawling & SEO */}
        <div className="py-6 border-b border-slate-100 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-[11px] font-mono font-semibold text-slate-500">
          <a href="/today" className="hover:text-pop-forest transition-colors">Today Rituals</a>
          <span className="text-slate-300">•</span>
          <a href="/breathe" className="hover:text-pop-forest transition-colors">Breathwork</a>
          <span className="text-slate-300">•</span>
          <a href="/box-breathing" className="hover:text-pop-forest transition-colors">Box Breathing</a>
          <span className="text-slate-300">•</span>
          <a href="/heal" className="hover:text-pop-forest transition-colors">Bilateral EMDR</a>
          <span className="text-slate-300">•</span>
          <a href="/sleep" className="hover:text-pop-forest transition-colors">Sleep Dreamscapes</a>
          <span className="text-slate-300">•</span>
          <a href="/journal" className="hover:text-pop-forest transition-colors">Reflective Journal</a>
          <span className="text-slate-300">•</span>
          <a href="/telehealth" className="hover:text-pop-forest transition-colors">Clinical Telehealth</a>
          <span className="text-slate-300">•</span>
          <a href="/companions" className="hover:text-pop-forest transition-colors">Mindful Companions</a>
          <span className="text-slate-300">•</span>
          <a href="/desk-clock" className="hover:text-pop-forest transition-colors">StandBy Clock</a>
          <span className="text-slate-300">•</span>
          <a href="/doombreaker" className="hover:text-pop-forest transition-colors">DoomBreaker</a>
          <span className="text-slate-300">•</span>
          <a href="/soundboard" className="hover:text-pop-forest transition-colors">Sensory Acoustics</a>
          <span className="text-slate-300">•</span>
          <a href="/safety" className="hover:text-pop-forest transition-colors">988 Lifeline</a>
          <span className="text-slate-300">•</span>
          <a href="/themes" className="hover:text-pop-forest transition-colors">Living Themes</a>
          <span className="text-slate-300">•</span>
          <a href="/about" className="hover:text-pop-forest transition-colors">About instilll</a>
          <span className="text-slate-300">•</span>
          <a href="/faq" className="hover:text-pop-forest transition-colors">FAQ</a>
          <span className="text-slate-300">•</span>
          <a href="/privacy" className="hover:text-pop-forest transition-colors">Privacy</a>
          <span className="text-slate-300">•</span>
          <a href="/terms" className="hover:text-pop-forest transition-colors">Terms</a>
        </div>

        {/* Wellness & Disorder Guides Deep Links for 1-Hop Crawler Discovery */}
        <div className="py-4 border-b border-slate-100 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-[11px] font-mono text-slate-500">
          <span className="text-slate-900 font-bold uppercase tracking-wider">Clinical Guides:</span>
          <a href="/learn" className="text-pop-forest font-bold hover:underline">Wellness Hub (/learn)</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/anxiety-panic-vagal-regulation" className="hover:text-pop-forest transition-colors">Anxiety & Vagus Nerve</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/doomscrolling-dopamine-attention-reset" className="hover:text-pop-forest transition-colors">Doomscrolling & Dopamine</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/insomnia-circadian-rhythm-sleep-hygiene" className="hover:text-pop-forest transition-colors">Insomnia & Sleep Hygiene</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/burnout-chronic-stress-recovery" className="hover:text-pop-forest transition-colors">Burnout & Chronic Stress</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/trauma-ptsd-somatic-emdr-therapy" className="hover:text-pop-forest transition-colors">Trauma & Somatic EMDR</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/depression-low-mood-behavioral-activation" className="hover:text-pop-forest transition-colors">Low Mood & Behavioral Activation</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/sensory-overload-gentle-grounding" className="hover:text-pop-forest transition-colors">Sensory Overload & Grounding</a>
          <span className="text-slate-300">•</span>
          <a href="/learn/hydration-movement-cognitive-balance" className="hover:text-pop-forest transition-colors">Hydration, Walking & Focus</a>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4 font-medium">
          <div className="flex items-center gap-1.5">
            <span>Crafted with gentle care for mindful living.</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>© {new Date().getFullYear()} instilll. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
