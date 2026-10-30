import React, { useState, useEffect } from 'react';
import { Clock, Volume2, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { LivingTheme } from './LivingCanvas';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  currentTheme: LivingTheme;
  onThemeCycle: () => void;
  onOpenClockModal: () => void;
  onOpenSoundModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeCycle,
  onOpenClockModal,
  onOpenSoundModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Today', href: '#today' },
    { name: 'Breathe & Sleep', href: '#practice' },
    { name: 'Journal', href: '#journal' },
    { name: 'Telehealth', href: '#telehealth' },
    { name: 'Companions', href: '#companions' },
    { name: 'Desk Clock', href: '#desk-clock' },
    { name: 'Soundboard', href: '#soundboard' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 transition-all duration-300">
      <nav
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 px-5 sm:px-8 py-3.5 flex items-center justify-between ${
          scrolled
            ? 'bg-white/95 text-slate-900 border-2 border-slate-900/10 shadow-lg backdrop-blur-xl'
            : 'bg-white/80 text-slate-900 border border-slate-200/80 shadow-sm backdrop-blur-md'
        }`}
      >
        {/* Brand Logotype */}
        <a
          href="#"
          data-cursor="pointer"
          className="flex items-center gap-2.5 group"
          onClick={() => soundEngine.playScrubTick()}
        >
          <div className="w-8 h-8 rounded-full bg-pop-forest flex items-center justify-center text-pop-lime font-bold text-xs tracking-wider transition-transform group-hover:scale-110 shadow-sm">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.22em] text-lg font-bold text-slate-900 uppercase group-hover:text-pop-forest transition-colors">
              inStill
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              data-cursor="pointer"
              onClick={() => soundEngine.playScrubTick()}
              className="hover:text-pop-forest transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-pop-forest after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Status Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Interactive Theme Pill */}
          <button
            onClick={() => {
              onThemeCycle();
              soundEngine.playStepClick();
            }}
            data-cursor="pointer"
            title="Cycle Living Canvas Theme"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-pop-lime text-pop-forest border border-pop-forest/20 flex items-center gap-1.5 transition-transform hover:scale-105 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-pop-forest animate-pulse" />
            <span>• {currentTheme}</span>
          </button>

          {/* StandBy Clock Button */}
          <button
            onClick={() => {
              onOpenClockModal();
              soundEngine.playBreatheBell();
            }}
            data-cursor="pointer"
            title="Open Fullscreen StandBy Desk Clock"
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Clock className="w-4 h-4 text-pop-forest" />
          </button>

          {/* Soundscapes Modal Button */}
          <button
            onClick={() => {
              onOpenSoundModal();
              soundEngine.playKalimba(2);
            }}
            data-cursor="pointer"
            title="Test Sensory Soundscapes"
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-pop-coral" />
          </button>

          {/* Black Pill CTA button (matching reference) */}
          <a
            href="#today"
            data-cursor="pointer"
            onClick={() => soundEngine.playBreatheBell()}
            className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md"
          >
            <span>Explore App</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-slate-100 text-slate-700 lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto rounded-3xl p-5 bg-white text-slate-900 border border-slate-200 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-3 text-sm font-semibold tracking-wider uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundEngine.playScrubTick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-slate-700 hover:text-pop-forest border-b border-slate-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
