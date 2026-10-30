import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Music, Moon, Play, Pause, Volume2, Sparkles, CloudRain, Flame, Waves, Star, Compass } from 'lucide-react';
import { AdaptiveScreenshotFrame } from './AdaptiveScreenshotFrame';
import { soundEngine } from '../utils/audio';

type PracticeMode = 'breathe' | 'heal' | 'sleep';

type BreathingPattern = 'box' | '478' | '46' | 'equal';

const breathingConfig: Record<BreathingPattern, { name: string; subtitle: string; phases: { name: string; dur: number }[] }> = {
  box: {
    name: 'Box Breathing',
    subtitle: 'Navy SEAL 4-4-4-4 equal autonomic stabilization',
    phases: [
      { name: 'Inhale', dur: 4 },
      { name: 'Hold', dur: 4 },
      { name: 'Exhale', dur: 4 },
      { name: 'Rest', dur: 4 },
    ],
  },
  478: {
    name: '4-7-8 Relaxing',
    subtitle: 'Vagus nerve stimulation for rapid stress dissipation',
    phases: [
      { name: 'Inhale', dur: 4 },
      { name: 'Hold', dur: 7 },
      { name: 'Exhale', dur: 8 },
    ],
  },
  46: {
    name: 'Slow 4-6 Calm',
    subtitle: 'Optimizes Heart Rate Variability (HRV)',
    phases: [
      { name: 'Inhale', dur: 4 },
      { name: 'Exhale', dur: 6 },
    ],
  },
  equal: {
    name: 'Equal Calm (5-5)',
    subtitle: 'Cardiorespiratory resonance coherence',
    phases: [
      { name: 'Inhale', dur: 5 },
      { name: 'Exhale', dur: 5 },
    ],
  },
};

export const PracticeSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PracticeMode>('breathe');

  // Breathe Mode State
  const [pattern, setPattern] = useState<BreathingPattern>('box');
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);

  // Heal Mode State (5-Channel Nature Mixer)
  const [mixerLevels, setMixerLevels] = useState<{ [key: string]: number }>({
    'Forest Rain': 65,
    'Ocean Waves': 45,
    'Mountain Stream': 50,
    'Night Crickets': 30,
    'Pink / White Noise': 20,
  });

  // Sleep Mode State
  const [selectedSleepScene, setSelectedSleepScene] = useState<number>(0);

  const currentPatternConfig = breathingConfig[pattern];
  const currentPhase = currentPatternConfig.phases[phaseIndex];

  // Breathing timer loop
  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setPhaseSecondsLeft((prev) => {
        if (prev <= 1) {
          // Advance phase
          const nextIndex = (phaseIndex + 1) % currentPatternConfig.phases.length;
          setPhaseIndex(nextIndex);
          soundEngine.playBreatheBell();
          return currentPatternConfig.phases[nextIndex].dur;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingActive, phaseIndex, currentPatternConfig]);

  const toggleBreathing = () => {
    if (!isBreathingActive) {
      soundEngine.playBreatheBell();
      setPhaseIndex(0);
      setPhaseSecondsLeft(currentPatternConfig.phases[0].dur);
      setIsBreathingActive(true);
    } else {
      setIsBreathingActive(false);
    }
  };

  const sleepScenes = [
    {
      id: 'rain',
      name: 'Rain on Window',
      desc: 'Streaking raindrops on cold glass with gentle rhythmic thunder in the distance.',
      img: './assets/screenshots/art-sleep-moonlight.jpeg',
      icon: CloudRain,
      ambientColor: 'rgba(74, 108, 140, 0.4)',
    },
    {
      id: 'pond',
      name: 'Lotus Pond Bridge',
      desc: 'Moonlit waters reflecting weeping willow boughs with twinkling fireflies.',
      img: './assets/screenshots/art-nature-pond.jpeg',
      icon: Waves,
      ambientColor: 'rgba(40, 90, 70, 0.4)',
    },
    {
      id: 'breeze',
      name: 'Summer Breeze Meadow',
      desc: 'Gentle hillside gusts rustling leaves under radiant sunlight and rolling clouds.',
      img: './assets/screenshots/art-tree-breeze.jpeg',
      icon: Wind,
      ambientColor: 'rgba(180, 200, 140, 0.4)',
    },
  ];

  return (
    <section id="practice" className="py-24 px-4 sm:px-8 relative bg-still-darkBg text-white overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/20 mb-4">
            <span>Section 04</span>
            <span>•</span>
            <span>BreatheScreen.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">
            Practice: Breathe, Heal & Sleep
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Science-backed vagal toning, acoustic solfeggio therapy, and restorative dreamscapes
            engineered for effortless nervous system regulation.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full glass-card-dark border border-white/15 mt-8 shadow-xl">
            <button
              onClick={() => {
                setActiveMode('breathe');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeMode === 'breathe'
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Breathe</span>
            </button>

            <button
              onClick={() => {
                setActiveMode('heal');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeMode === 'heal'
                  ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Heal</span>
            </button>

            <button
              onClick={() => {
                setActiveMode('sleep');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeMode === 'sleep'
                  ? 'bg-blue-500/30 text-blue-200 border border-blue-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Sleep</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Breathe Mode */}
        {activeMode === 'breathe' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-500">
            {/* Left: Interactive Liquid Glass Bubble Orb Simulation */}
            <div className="lg:col-span-7 flex flex-col items-center">
              {/* Pattern Selector */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 w-full max-w-lg">
                {(Object.keys(breathingConfig) as BreathingPattern[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setPattern(key);
                      setPhaseIndex(0);
                      setPhaseSecondsLeft(breathingConfig[key].phases[0].dur);
                      soundEngine.playStepClick();
                    }}
                    data-cursor="pointer"
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      pattern === key
                        ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {breathingConfig[key].name}
                  </button>
                ))}
              </div>

              {/* The Liquid Glass Bubble Orb */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center mb-8">
                {/* Outer Breathing Aura */}
                <motion.div
                  animate={{
                    scale:
                      isBreathingActive && currentPhase.name === 'Inhale'
                        ? 1.25
                        : isBreathingActive && currentPhase.name === 'Exhale'
                        ? 0.95
                        : 1.08,
                    opacity: isBreathingActive ? 0.7 : 0.3,
                  }}
                  transition={{
                    duration: isBreathingActive ? currentPhase.dur : 3,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-400/25 to-pastelOlive-gauge/20 blur-2xl pointer-events-none"
                />

                {/* Glass Meniscus Orb Sphere */}
                <motion.button
                  onClick={toggleBreathing}
                  data-cursor="visualizer"
                  animate={{
                    scale:
                      isBreathingActive && currentPhase.name === 'Inhale'
                        ? 1.15
                        : isBreathingActive && currentPhase.name === 'Exhale'
                        ? 0.88
                        : 1,
                  }}
                  transition={{
                    duration: isBreathingActive ? currentPhase.dur : 2,
                    ease: 'easeInOut',
                  }}
                  className="relative w-64 h-64 rounded-full glass-card-dark border-2 border-white/40 shadow-2xl flex flex-col items-center justify-center p-6 cursor-pointer group overflow-hidden"
                >
                  {/* Internal Liquid Level Simulation */}
                  <motion.div
                    animate={{
                      height:
                        isBreathingActive && currentPhase.name === 'Inhale'
                          ? '75%'
                          : isBreathingActive && currentPhase.name === 'Exhale'
                          ? '25%'
                          : '45%',
                    }}
                    transition={{
                      duration: isBreathingActive ? currentPhase.dur : 2,
                      ease: 'easeInOut',
                    }}
                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-600/40 via-teal-500/30 to-emerald-300/15 backdrop-blur-sm pointer-events-none rounded-b-full"
                  />

                  {/* Specular Glint */}
                  <div className="absolute top-4 left-6 w-16 h-8 rounded-full bg-white/20 blur-[2px] transform -rotate-30 pointer-events-none" />

                  {/* Content inside Orb */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className="text-4xl sm:text-5xl font-mono font-bold text-white mb-1">
                      {isBreathingActive ? phaseSecondsLeft : '4'}
                    </span>
                    <span className="text-sm font-semibold tracking-widest uppercase text-emerald-300">
                      {isBreathingActive ? currentPhase.name : 'Tap to Start'}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-2">
                      {isBreathingActive ? 'Tap bubble to pause' : 'Bilateral acoustic rhythm'}
                    </span>
                  </div>
                </motion.button>
              </div>

              <div className="text-center max-w-md">
                <h4 className="text-base font-semibold text-white mb-1">{currentPatternConfig.name}</h4>
                <p className="text-xs text-slate-400">{currentPatternConfig.subtitle}</p>
              </div>
            </div>

            {/* Right: Actual Breathe Screen Mockup with Vertical Scroll Tilt */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/breathe-orb.jpeg"
                alt="inStill Breathe Liquid Glass Bubble Screen"
                orientation="vertical"
                tiltDirection="right"
                glowColor="rgba(143, 175, 155, 0.45)"
                badge="BreatheScreen.kt"
                hotspots={[
                  {
                    x: 50,
                    y: 52,
                    label: 'Liquid Meniscus Bubble',
                    detail: 'Dynamic harmonic wave oscillations synchronizing lungs with parasympathetic tone.',
                  },
                  {
                    x: 50,
                    y: 26,
                    label: 'Protocol Switcher',
                    detail: 'Box Breathing, 4-7-8 Relaxing, and HRV resonance protocols.',
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Heal Mode (Bilateral Audio & Nature Mixer) */}
        {activeMode === 'heal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-500">
            {/* Left: 5-Channel Nature Mixer & Bilateral Player */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-card-dark rounded-3xl p-6 sm:p-7 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-serif font-medium text-white">5-Channel Acoustic Nature Mixer</h3>
                    <p className="text-xs text-slate-400">Synthesized spatial nature ambiences for deep autonomic calm</p>
                  </div>
                  <button
                    onClick={() => soundEngine.playWaterPour()}
                    data-cursor="pointer"
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Test Acoustics</span>
                  </button>
                </div>

                {/* 5 Channels */}
                <div className="space-y-4">
                  {Object.entries(mixerLevels).map(([name, level]) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-200 font-medium">{name}</span>
                        <span className="font-mono text-purple-300">{level}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={level}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setMixerLevels((prev) => ({ ...prev, [name]: val }));
                          soundEngine.playScrubTick();
                        }}
                        className="w-full accent-purple-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bilateral & EMDR Audio Tracks Showcase */}
              <div className="glass-card-dark rounded-3xl p-6 border border-white/10 space-y-3">
                <h4 className="text-sm font-semibold text-white mb-2">Bilateral & EMDR Track Library</h4>
                {[
                  { title: 'Bilateral Tranquility Variation 1', time: '10 min', note: 'Alternating acoustic panning' },
                  { title: 'Bilateral Harp Harmonic', time: '7 min', note: 'Solfeggio 432 Hz tuning' },
                  { title: 'Bilateral Eternal Dream', time: '9 min', note: 'Delta brainwave entrainment' },
                ].map((track, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => soundEngine.playKalimba(i * 2)}
                        data-cursor="pointer"
                        className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </button>
                      <div>
                        <div className="text-xs font-semibold text-white">{track.title}</div>
                        <div className="text-[11px] text-slate-400">{track.note}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{track.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Actual Heal Screen Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/heal-music.jpeg"
                alt="inStill Heal Bilateral Music Screen"
                orientation="vertical"
                tiltDirection="left"
                glowColor="rgba(195, 177, 225, 0.45)"
                badge="Heal Mode: EMDR Audio"
                hotspots={[
                  {
                    x: 50,
                    y: 38,
                    label: 'Bilateral Panning',
                    detail: 'Left-to-right alternating tones proven in clinical studies to alleviate hyper-arousal.',
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Sleep Mode (Atmospheres & Art Showcase) */}
        {activeMode === 'sleep' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-500">
            {/* Left: Sleep Scene Selector & Narrative */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="glass-card-dark rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-serif text-white mb-2">Restorative Sleep Landscapes</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Select an ambient dreamscape crafted with rich vector art and binaural nighttime audio
                  to effortlessly slip into deep REM sleep.
                </p>

                <div className="space-y-3">
                  {sleepScenes.map((scene, idx) => {
                    const Icon = scene.icon;
                    return (
                      <button
                        key={scene.id}
                        onClick={() => {
                          setSelectedSleepScene(idx);
                          soundEngine.playGong();
                        }}
                        data-cursor="pointer"
                        className={`w-full p-4 rounded-2xl text-left transition-all flex items-start gap-4 ${
                          selectedSleepScene === idx
                            ? 'bg-blue-500/20 border-2 border-blue-400/50 shadow-lg'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 mt-0.5">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{scene.name}</div>
                          <div className="text-xs text-slate-400 leading-relaxed mt-0.5">{scene.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Selected Sleep Scene Art with Scroll Tilt */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <AdaptiveScreenshotFrame
                src={sleepScenes[selectedSleepScene].img}
                alt={sleepScenes[selectedSleepScene].name}
                orientation="vertical"
                tiltDirection="right"
                glowColor={sleepScenes[selectedSleepScene].ambientColor}
                badge={sleepScenes[selectedSleepScene].name}
              />
              <p className="mt-4 text-xs font-mono text-slate-400 text-center">
                Original vector artwork designed for inStill’s restorative sleep immersion.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
