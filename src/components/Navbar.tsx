import React, { useState, useEffect } from 'react';
import { Moon, Volume2, Sparkles, User, Clock, Menu, X } from 'lucide-react';
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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
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
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 px-5 sm:px-7 py-3 flex items-center justify-between ${
          scrolled
            ? 'glass-card-dark text-white border border-white/15 shadow-xl'
            : 'glass-panel-dark text-slate-100 border border-white/10 backdrop-blur-xl'
        }`}
      >
        {/* Brand Logotype */}
        <a
          href="#"
          data-cursor="pointer"
          className="flex items-center gap-2.5 group"
          onClick={() => soundEngine.playScrubTick()}
        >
          <div className="w-8 h-8 rounded-full bg-still-forestSage/70 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-xs tracking-wider transition-transform group-hover:scale-105">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.28em] text-lg font-bold text-white uppercase group-hover:text-emerald-300 transition-colors">
              inStill
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider uppercase text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              data-cursor="pointer"
              onClick={() => soundEngine.playScrubTick()}
              className="hover:text-emerald-300 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 after:transition-all hover:after:w-full"
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
            className="px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider bg-white/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-all"
          >
            <Clock className="w-4 h-4 text-emerald-300" />
          </button>

          {/* Soundscapes Modal Button */}
          <button
            onClick={() => {
              onOpenSoundModal();
              soundEngine.playKalimba(2);
            }}
            data-cursor="pointer"
            title="Test Sensory Soundscapes"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-all"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/10 text-slate-200 lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto rounded-3xl p-5 glass-card-dark border border-white/15 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-3 text-sm tracking-wider uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundEngine.playScrubTick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-slate-300 hover:text-emerald-300 border-b border-white/5 transition-colors"
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
