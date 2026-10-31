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
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-7 py-3 flex items-center justify-between ${
          scrolled
            ? 'bg-white/95 text-slate-900 border-2 border-slate-900/10 shadow-lg backdrop-blur-xl'
            : 'bg-white/85 text-slate-900 border border-slate-200/90 shadow-sm backdrop-blur-md'
        }`}
      >
        {/* Brand Logotype with Sleeping Cats Mascot Logo */}
        <a
          href="#"
          data-cursor="pointer"
          className="flex items-center gap-2.5 sm:gap-3 group"
          onClick={() => soundEngine.playCatPurr()}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-slate-900/15 shadow-cartoon-sm transition-transform group-hover:scale-110 flex-shrink-0 bg-purple-100">
            <img
              src="./assets/logo.png"
              alt="inStill Brand Logo"
              className="w-full h-full object-cover block select-none"
            />
          </div>
          <div className="flex items-center">
            <span className="font-sans text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-pop-forest transition-colors">
              in<span className="font-extrabold">STILL</span>
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
        <div className="flex items-center gap-1 sm:gap-2.5">
          {/* Interactive Theme Pill (hidden on xs screens to avoid overcrowding) */}
          <button
            onClick={() => {
              onThemeCycle();
              soundEngine.playStepClick();
            }}
            data-cursor="pointer"
            title="Cycle Living Canvas Theme"
            className="hidden sm:flex px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-pop-lime text-pop-forest border border-pop-forest/20 items-center gap-1.5 transition-transform hover:scale-105 shadow-sm"
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
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
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
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <Volume2 className="w-4 h-4 text-pop-coral" />
          </button>

          {/* Top-Right Mascot Avatar Icon */}
          <button
            onClick={() => {
              soundEngine.playCatPurr();
            }}
            data-cursor="pointer"
            title="Pet inStill Mascot"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-slate-900/20 hover:border-pop-forest transition-transform hover:scale-110 shadow-cartoon-sm flex-shrink-0 bg-purple-100 cursor-pointer"
          >
            <img
              src="./assets/logo.png"
              alt="inStill Mascot Icon"
              className="w-full h-full object-cover block select-none"
            />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-slate-100 text-slate-700 lg:hidden min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto rounded-3xl p-5 bg-white/95 backdrop-blur-2xl text-slate-900 border-2 border-slate-900/10 shadow-2xl animate-in fade-in slide-in-from-top-4 max-h-[85dvh] overflow-y-auto">
          {/* Quick Controls in Mobile Drawer */}
          <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-slate-100">
            <button
              onClick={() => {
                onThemeCycle();
                soundEngine.playStepClick();
              }}
              className="py-2.5 px-3 rounded-2xl bg-pop-lime text-pop-forest border border-pop-forest/20 text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-pop-forest animate-pulse" />
              <span>Theme: {currentTheme}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenClockModal();
                soundEngine.playBreatheBell();
              }}
              className="py-2.5 px-3 rounded-2xl bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-pop-forest" />
              <span>StandBy Clock</span>
            </button>
          </div>

          <div className="flex flex-col gap-1 text-sm font-semibold tracking-wider uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundEngine.playScrubTick();
                  setMobileMenuOpen(false);
                }}
                className="py-3 px-3 rounded-xl text-slate-700 hover:text-pop-forest hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
