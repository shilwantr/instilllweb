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

  // EMO Robot State
  const [emoExpr, setEmoExpr] = useState<EmoExpression>('happy');

  // Reflex Game State
  const [reflexState, setReflexState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  // Bubble Pop State
  const [bubbles, setBubbles] = useState([true, true, true, true, true, true, true, true]);

  const handleCatPet = () => {
    soundEngine.playCatPurr();
    setCatAffection((prev) => Math.min(100, prev + 5));
    setCatAction('Purring softly with warmth and contentment ✨');
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
    <section id="companions" className="py-24 px-4 sm:px-8 relative bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-coral text-white border border-slate-900/15 shadow-cartoon-sm mb-4">
            <span>🐾 Section 07</span>
            <span>•</span>
            <span>PlaygroundScreen.kt</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            Play & Sensory Companions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Nurture digital mindfulness companions and engage with micro sensory distractions
            designed to dissolve mental fatigue.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 p-1.5 rounded-3xl sm:rounded-full bg-white border-2 border-slate-900/10 mt-8 shadow-cartoon-sm">
            <button
              onClick={() => {
                setTab('mewmew');
                soundEngine.playScrubTick();
              }}
              data-cursor="pointer"
              className={`px-3.5 xs:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                tab === 'mewmew'
                  ? 'bg-pop-coral text-white border border-rose-400 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
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
              className={`px-3.5 xs:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                tab === 'emo'
                  ? 'bg-pop-yellow text-slate-900 border border-amber-400 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
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
              className={`px-3.5 xs:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                tab === 'games'
                  ? 'bg-pop-lime text-pop-forest border border-pop-forest shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
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
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-900/10 shadow-cartoon-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Cat className="w-5 h-5 text-pop-coral" />
                      <span>Mew Mew — Your Calming Desk Feline</span>
                    </h3>
                    <p className="text-xs text-slate-500">Click cat to pet & listen to relaxing purrs</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-pop-coral px-3 py-1 rounded-full bg-rose-50 border border-rose-200">
                    {catAffection}% Affection
                  </span>
                </div>

                {/* Affection Progress Bar */}
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden mb-6 border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-pop-coral to-pop-yellow rounded-full transition-all duration-500"
                    style={{ width: `${catAffection}%` }}
                  />
                </div>

                {/* Interactive Cartoon Cat Stage */}
                <div
                  onClick={handleCatPet}
                  data-cursor="pointer"
                  className="relative h-64 rounded-3xl bg-gradient-to-b from-rose-50 to-amber-50 border-2 border-slate-900/10 flex flex-col items-center justify-center cursor-pointer group shadow-inner cartoon-sticker"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-28 h-28 rounded-full bg-white border-4 border-slate-900 flex items-center justify-center shadow-cartoon mb-3 relative">
                      <span className="text-5xl select-none animate-bounce">🐱</span>
                      <span className="absolute -top-2 -right-2 text-xl">💖</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 px-4 py-1 rounded-full bg-white border border-slate-300 shadow-sm">
                      Tap to Pet & Purr
                    </span>
                    <span className="text-xs text-slate-600 font-mono mt-2 text-center px-4 font-semibold">{catAction}</span>
                  </motion.div>
                </div>

                {/* Cartoon Action Buttons */}
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
                      className="px-4 py-2 rounded-2xl text-xs font-mono font-bold bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-pop-coral border border-slate-200 transition-all cartoon-sticker"
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/play-emo-robot.jpeg"
                alt="inStill Companion Screen"
                orientation="vertical"
                tiltDirection="right"
                glowColor="rgba(250, 123, 96, 0.45)"
                badge="PlaygroundScreen.kt"
              />
            </div>
          </div>
        )}

        {/* Tab 2: EMO Robot */}
        {tab === 'emo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-in fade-in duration-500">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-900/10 shadow-cartoon-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-amber-500" />
                  <span>EMO Desktop AI OLED Robot</span>
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Interactive companion with bio-mimetic glowing eye expressions and playful circus routines.
                </p>

                {/* OLED Screen Box */}
                <div className="relative h-60 rounded-3xl bg-slate-950 border-4 border-slate-800 p-6 flex flex-col items-center justify-center shadow-cartoon overflow-hidden mb-6">
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

                  <span className="text-xs font-mono font-bold text-amber-300 mt-6 tracking-widest uppercase">
                    EMO Expression: {emoExpr}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['normal', 'happy', 'sleepy', 'curious', 'wink', 'surprised', 'heart'] as EmoExpression[]).map((exp) => (
                    <button
                      key={exp}
                      onClick={() => {
                        setEmoExpr(exp);
                        soundEngine.playKalimba(1);
                      }}
                      data-cursor="pointer"
                      className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold uppercase transition-all cartoon-sticker ${
                        emoExpr === exp
                          ? 'bg-pop-yellow text-slate-900 border-2 border-slate-900 shadow-cartoon-sm'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/play-emo-robot.jpeg"
                alt="EMO Robot Screen"
                orientation="vertical"
                tiltDirection="left"
                glowColor="rgba(254, 214, 104, 0.45)"
                badge="Circus Mode Activated"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Games */}
        {tab === 'games' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-500">
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Playable Reflex Core */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-900/10 shadow-cartoon-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Playable: Reflex Core</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-pop-forest px-3 py-1 rounded-full bg-pop-lime">
                    {reactionTime !== null ? `${reactionTime} ms` : 'Tap to Test'}
                  </span>
                </div>

                <div
                  onClick={reflexState === 'ready' ? handleReflexTap : startReflexTest}
                  data-cursor="pointer"
                  className={`h-40 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 cartoon-sticker ${
                    reflexState === 'waiting'
                      ? 'bg-amber-100 border-4 border-amber-500 text-amber-900'
                      : reflexState === 'ready'
                      ? 'bg-pop-lime border-4 border-pop-forest text-pop-forest scale-102 shadow-cartoon animate-pulse'
                      : 'bg-slate-50 border-2 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {reflexState === 'idle' && (
                    <span className="text-sm font-bold text-slate-800">Click Here to Start Reaction Test</span>
                  )}
                  {reflexState === 'waiting' && (
                    <span className="text-sm font-bold text-amber-800">Wait for Green...</span>
                  )}
                  {reflexState === 'ready' && (
                    <span className="text-2xl font-black font-mono tracking-wider uppercase text-pop-forest">
                      TAP NOW!
                    </span>
                  )}
                  {reflexState === 'result' && (
                    <div className="text-center">
                      <div className="text-3xl font-mono font-extrabold text-pop-forest">{reactionTime} ms</div>
                      <div className="text-xs text-slate-600 mt-1 font-semibold">Great speed! Click to retry.</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Playable Bubble Pop */}
              <div className="bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-cartoon-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-slate-900">Spatial Bubble Pop</h4>
                  <button
                    onClick={resetBubbles}
                    data-cursor="pointer"
                    className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
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
                      className={`h-14 rounded-2xl transition-all duration-200 flex items-center justify-center cartoon-sticker ${
                        active
                          ? 'bg-pop-lime/40 border-2 border-pop-forest shadow-cartoon-sm hover:scale-110 active:scale-95'
                          : 'bg-slate-100 border border-slate-200 opacity-25'
                      }`}
                    >
                      {active ? <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" /> : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Side-by-side Screenshots */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/play-game-2048.jpeg"
                alt="Tile Shift 2048 Game"
                orientation="vertical"
                tiltDirection="left"
                glowColor="rgba(250, 123, 96, 0.4)"
                badge="Tile Shift 2048"
              />
              <AdaptiveScreenshotFrame
                src="./assets/screenshots/play-game-reflex.jpeg"
                alt="Reflex Core Frost Game"
                orientation="vertical"
                tiltDirection="right"
                glowColor="rgba(254, 214, 104, 0.4)"
                badge="Reflex Core"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
