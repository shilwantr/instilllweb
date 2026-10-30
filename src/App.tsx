import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TodayDashboardSection } from './components/TodayDashboardSection';
import { PracticeSection } from './components/PracticeSection';
import { JournalSection } from './components/JournalSection';
import { TherapySection } from './components/TherapySection';
import { PlayCompanionsSection } from './components/PlayCompanionsSection';
import { DeskClockSection } from './components/DeskClockSection';
import { DoomBreakerSection } from './components/DoomBreakerSection';
import { SoundboardSection } from './components/SoundboardSection';
import { ProfileLifelineSection } from './components/ProfileLifelineSection';
import { LivingThemesMatrix } from './components/LivingThemesMatrix';
import { Footer } from './components/Footer';
import { StandByClockModal } from './components/StandByClockModal';
import { SoundscapesModal } from './components/SoundscapesModal';
import { LivingTheme } from './components/LivingCanvas';

export const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<LivingTheme>('FW');
  const [isClockModalOpen, setIsClockModalOpen] = useState(false);
  const [isSoundModalOpen, setIsSoundModalOpen] = useState(false);

  const themeCycleOrder: LivingTheme[] = ['FW', 'CW', 'MS', 'CD', 'OA', 'TP', 'ZR', 'HW', 'TD', 'LT', 'RT'];

  const cycleTheme = () => {
    const currentIndex = themeCycleOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeCycleOrder.length;
    setCurrentTheme(themeCycleOrder[nextIndex]);
  };

  return (
    <div className="relative min-h-screen bg-still-darkBg text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Bespoke Translucent Hourglass Cursor (Desktop) */}
      <CustomCursor />

      {/* Floating Status & Navigation Header */}
      <Navbar
        currentTheme={currentTheme}
        onThemeCycle={cycleTheme}
        onOpenClockModal={() => setIsClockModalOpen(true)}
        onOpenSoundModal={() => setIsSoundModalOpen(true)}
      />

      <main>
        {/* Section 1: Hero & Living Canvas Background */}
        <HeroSection
          currentTheme={currentTheme}
          onThemeSelect={(t) => setCurrentTheme(t)}
          onOpenSoundModal={() => setIsSoundModalOpen(true)}
        />

        {/* Section 3: Today (Dashboard) Feature Suite */}
        <TodayDashboardSection />

        {/* Section 4: Practice (Breathe, Heal & Sleep) */}
        <PracticeSection />

        {/* Section 5: Journal & Multi-Scale Trend Analytics */}
        <JournalSection />

        {/* Section 6: Clinical Telehealth (Agora RTC) */}
        <TherapySection />

        {/* Section 7: Play & Sensory Companions */}
        <PlayCompanionsSection />

        {/* Section 8: Focus Desk Clock & StandBy Mode (Landscape Showcase) */}
        <DeskClockSection onOpenFullscreenModal={() => setIsClockModalOpen(true)} />

        {/* Section 9: DoomScroll Breaker (Digital Wellbeing) */}
        <DoomBreakerSection />

        {/* Section 10: Sensory Acoustics & Soundboard */}
        <SoundboardSection />

        {/* Section 11: Profile, Safety & 24/7 Crisis Lifeline */}
        <ProfileLifelineSection />

        {/* Section 12: The 11 Living Canvas Ambient Themes Matrix */}
        <LivingThemesMatrix
          currentTheme={currentTheme}
          onThemeSelect={(t) => setCurrentTheme(t)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Modals */}
      <StandByClockModal
        isOpen={isClockModalOpen}
        onClose={() => setIsClockModalOpen(false)}
      />

      <SoundscapesModal
        isOpen={isSoundModalOpen}
        onClose={() => setIsSoundModalOpen(false)}
      />
    </div>
  );
};

export default App;
