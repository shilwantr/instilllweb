import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cat, Bot, Gamepad2, Heart, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { AdaptiveScreenshotFrame } from './AdaptiveScreenshotFrame';
import { soundEngine } from '../utils/audio';

type CompanionTab = 'mewmew' | 'emo' | 'games';

type EmoExpression = 'normal' | 'happy' | 'sleepy' | 'curious' | 'wink' | 'surprised' | 'heart';

export const PlayCompanionsSection: React.FC = () => {
  const [tab, setTab] = useState<CompanionTab>('mewmew');

  // Mew Mew State
  const [catAction, setCatAction] = useState('Sleeping peacefully on your desk 💤');
  const [catAffection, setCatAffection] = useState(72);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // EMO Robot State
  const [emoExpr, setEmoExpr] = useState<EmoExpression>('happy');

  // Reflex Game State
  const [reflexState, setReflexState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  // Bubble Pop State
  const [bubbles, setBubbles] = useState([true, true, true, true, true, true, true, true]);

  const handleCatPet = (e: React.MouseEvent) => {
    soundEngine.playCatPurr();
    setCatAffection((prev) => Math.min(100, prev + 4));
    setCatAction('Purring softly with warmth and contentment ✨');

    const newHeart = { id: Date.now(), x: e.clientX % 100, y: e.clientY % 100 };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  const startReflexTest = () => {
    setReflexState('waiting');
    setReactionTime(null);
    soundEngine.playStepClick();

    const delay = 1500 + Math.random() * 2500;
    setTimeout(() => {
      setReflexState('ready');
      setStartTime(Date.now());
    }, delay);
  };

  const handleReflexTap = () => {
    if (reflexState === 'ready') {
      const elapsed = Date.now() - startTime;
      setReactionTime(elapsed);
      setReflexState('result');
      soundEngine.playBreatheBell();
    } else if (reflexState === 'waiting') {
      // Too early
      setReflexState('idle');
      soundEngine.playStepClick();
    }
  };

  const popBubble = (idx: number) => {
    if (bubbles[idx]) {
      soundEngine.playBubblePop();
      const updated = [...bubbles];
      updated[idx] = false;
      setBubbles(updated);
    }
  };

  const resetBubbles = () => {
    soundEngine.playKalimba(4);
    setBubbles([true, true, true, true, true, true, true, true]);
  };

  return (
    <section id="companions" className="py-24 px-4 sm:px-8 relative bg-still-darkBg text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/20 mb-4">
            <span>Section 07</span>
            <span>•</span>
            <span>PlaygroundScreen.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">
            Play & Sensory Companions
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Nurture digital mindfulness companions and engage with micro sensory distractions
            designed to dissolve mental fatigue.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full glass-card-dark border border-white/15 mt-8 shadow-xl">
            <button
              onClick={() => {
                setTab('mewmew');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
                tab === 'mewmew'
                  ? 'bg-rose-500/30 text-rose-200 border border-rose-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cat className="w-3.5 h-3.5" />
              <span>Mew Mew Cat</span>
            </button>

            <button
              onClick={() => {
                setTab('emo');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
                tab === 'emo'
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>EMO Robot</span>
            </button>

            <button
              onClick={() => {
                setTab('games');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
                tab === 'games'
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Sensory Mini-Games</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Mew Mew Virtual Cat Companion */}
        {tab === 'mewmew' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-500">
            {/* Interactive Cat Playground Card */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-white flex items-center gap-2">
                      <Cat className="w-5 h-5 text-rose-300" />
                      <span>Mew Mew — Your Calming Desk Feline</span>
                    </h3>
                    <p className="text-xs text-slate-400">Click cat to pet & listen to relaxing purrs</p>
                  </div>
                  <span className="text-xs font-mono text-rose-300 font-semibold">{catAffection}% Affection</span>
                </div>

                {/* Affection Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-rose-400 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${catAffection}%` }}
                  />
                </div>

                {/* Interactive Cat Avatar Stage */}
                <div
                  onClick={handleCatPet}
                  data-cursor="pointer"
                  className="relative h-64 rounded-2xl bg-gradient-to-b from-white/5 to-white/10 border border-white/10 flex flex-col items-center justify-center cursor-pointer group shadow-inner"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-rose-400/40 via-amber-300/30 to-purple-400/30 flex items-center justify-center shadow-xl border border-white/30 mb-3 relative">
                      <span className="text-5xl select-none">🐱</span>
                      <span className="absolute -top-1 -right-1 text-base animate-bounce">💖</span>
                    </div>
                    <span className="text-sm font-semibold text-rose-200">Tap to Pet & Purr</span>
                    <span className="text-xs text-slate-300 font-mono mt-1 text-center px-4">{catAction}</span>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    { label: 'Walk ↔', desc: 'Mew Mew stretches their paws' },
                    { label: 'Jump 🚀', desc: 'Mew Mew pounces onto a soft cushion' },
                    { label: 'Spin 🌀', desc: 'Mew Mew chases their fluffy tail' },
                    { label: 'Juggle 🔮', desc: 'Mew Mew bats a sparkling yarn ball' },
                    { label: 'Peekaboo 🙈', desc: 'Mew Mew hides behind the desk clock' },
                  ].map((act) => (
                    <button
                      key={act.label}
                      onClick={() => {
                        setCatAction(act.desc);
                        soundEngine.playKalimba(2);
                      }}
                      data-cursor="pointer"
                      className="px-3.5 py-2 rounded-xl text-xs font-mono bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-200 border border-white/10 transition-colors"
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Companion Screenshot Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/play-emo-robot.jpeg"
                alt="inStill Companion Screen"
                orientation="vertical"
                tiltDirection="right"
                glowColor="rgba(242, 186, 201, 0.45)"
                badge="PlaygroundScreen.kt"
              />
            </div>
          </div>
        )}

        {/* Tab 2: EMO Robot Companion */}
        {tab === 'emo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-500">
            {/* EMO OLED Expression Simulator */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10">
                <h3 className="text-xl font-serif text-white mb-2 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-amber-300" />
                  <span>EMO Desktop AI OLED Robot</span>
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Interactive companion with bio-mimetic glowing eye expressions and playful circus routines.
                </p>

                {/* OLED Screen Box */}
                <div className="relative h-60 rounded-3xl bg-black border-2 border-slate-700/80 p-6 flex flex-col items-center justify-center shadow-2xl overflow-hidden mb-6">
                  {/* Glowing OLED Eyes */}
                  <div className="flex items-center gap-8">
                    {emoExpr === 'happy' && (
                      <>
                        <div className="w-14 h-8 border-t-4 border-amber-300 rounded-t-full shadow-[0_0_15px_rgba(252,211,77,0.8)] animate-pulse" />
                        <div className="w-14 h-8 border-t-4 border-amber-300 rounded-t-full shadow-[0_0_15px_rgba(252,211,77,0.8)] animate-pulse" />
                      </>
                    )}
                    {emoExpr === 'wink' && (
                      <>
                        <div className="w-12 h-12 rounded-full bg-amber-300 shadow-[0_0_20px_rgba(252,211,77,0.9)] flex items-center justify-center" />
                        <div className="w-12 h-2 bg-amber-300 shadow-[0_0_15px_rgba(252,211,77,0.8)]" />
                      </>
                    )}
                    {emoExpr === 'heart' && (
                      <>
                        <span className="text-4xl text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]">❤️</span>
                        <span className="text-4xl text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]">❤️</span>
                      </>
                    )}
                    {emoExpr === 'sleepy' && (
                      <>
                        <div className="w-12 h-2 bg-amber-300/60" />
                        <div className="w-12 h-2 bg-amber-300/60" />
                      </>
                    )}
                    {(emoExpr === 'normal' || emoExpr === 'curious' || emoExpr === 'surprised') && (
                      <>
                        <div className="w-12 h-14 rounded-full bg-amber-300 shadow-[0_0_20px_rgba(252,211,77,0.9)] flex items-center justify-center" />
                        <div className="w-12 h-14 rounded-full bg-amber-300 shadow-[0_0_20px_rgba(252,211,77,0.9)] flex items-center justify-center" />
                      </>
                    )}
                  </div>

                  <span className="text-xs font-mono text-amber-300/80 mt-6 tracking-widest uppercase">
                    EMO Expression: {emoExpr}
                  </span>
                </div>

                {/* Expression Selector Chips */}
                <div className="flex flex-wrap gap-2">
                  {(['normal', 'happy', 'sleepy', 'curious', 'wink', 'surprised', 'heart'] as EmoExpression[]).map((exp) => (
                    <button
                      key={exp}
                      onClick={() => {
                        setEmoExpr(exp);
                        soundEngine.playKalimba(1);
                      }}
                      data-cursor="pointer"
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase transition-all ${
                        emoExpr === exp
                          ? 'bg-amber-500/30 text-amber-200 border border-amber-400/50 shadow-sm'
                          : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real Screenshot */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/play-emo-robot.jpeg"
                alt="EMO Robot Screen"
                orientation="vertical"
                tiltDirection="left"
                glowColor="rgba(247, 197, 159, 0.45)"
                badge="Circus Mode Activated"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Sensory Mini-Games (Tile Shift, Reflex Core, Bubble Pop) */}
        {tab === 'games' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-500">
            {/* Left: Playable Reflex Core & Bubble Pop */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Playable Reflex Core */}
              <div className="glass-card-dark rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-serif text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Playable: Reflex Core</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-300">
                    {reactionTime !== null ? `${reactionTime} ms` : 'Tap to Test'}
                  </span>
                </div>

                <div
                  onClick={reflexState === 'ready' ? handleReflexTap : startReflexTest}
                  data-cursor="pointer"
                  className={`h-40 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    reflexState === 'waiting'
                      ? 'bg-amber-900/40 border-2 border-amber-500/50'
                      : reflexState === 'ready'
                      ? 'bg-emerald-600/60 border-2 border-emerald-400 scale-102 shadow-2xl animate-pulse'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {reflexState === 'idle' && (
                    <span className="text-sm font-semibold text-white">Click Here to Start Reaction Test</span>
                  )}
                  {reflexState === 'waiting' && (
                    <span className="text-sm font-semibold text-amber-300">Wait for Green...</span>
                  )}
                  {reflexState === 'ready' && (
                    <span className="text-xl font-bold font-mono tracking-wider uppercase text-emerald-200">
                      TAP NOW!
                    </span>
                  )}
                  {reflexState === 'result' && (
                    <div className="text-center">
                      <div className="text-2xl font-mono font-bold text-emerald-300">{reactionTime} ms</div>
                      <div className="text-xs text-slate-300 mt-1">Excellent speed! Click to retry.</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Playable Bubble Pop */}
              <div className="glass-card-dark rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">Spatial Bubble Pop</h4>
                  <button
                    onClick={resetBubbles}
                    data-cursor="pointer"
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300"
                    title="Reset Bubbles"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {bubbles.map((active, i) => (
                    <button
                      key={i}
                      disabled={!active}
                      onClick={() => popBubble(i)}
                      data-cursor="pointer"
                      className={`h-14 rounded-2xl transition-all duration-200 flex items-center justify-center ${
                        active
                          ? 'glass-card border border-white/40 shadow-md hover:scale-105 active:scale-90 bg-emerald-400/20'
                          : 'bg-white/5 border border-white/5 opacity-20'
                      }`}
                    >
                      {active ? <span className="w-3 h-3 rounded-full bg-white/40 blur-[1px]" /> : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Side-by-side Screenshots for Tile Shift & Reflex Core */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/play-game-2048.jpeg"
                alt="Tile Shift 2048 Game"
                orientation="vertical"
                tiltDirection="left"
                glowColor="rgba(216, 70, 95, 0.35)"
                badge="Tile Shift 2048"
              />
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/play-game-reflex.jpeg"
                alt="Reflex Core Frost Game"
                orientation="vertical"
                tiltDirection="right"
                glowColor="rgba(247, 197, 159, 0.35)"
                badge="Reflex Core"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
