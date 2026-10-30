import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Shield, Bell, HeartHandshake, CheckCircle2, User, Key, ExternalLink } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const ProfileLifelineSection: React.FC = () => {
  const [reminders, setReminders] = useState({
    hydration: true,
    windDown: true,
    breatheBreak: true,
    weeklyReport: false,
  });

  const toggleReminder = (key: keyof typeof reminders) => {
    soundEngine.playStepClick();
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="safety" className="py-24 px-4 sm:px-8 relative bg-still-darkBg/95 text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/20 mb-4">
            <span>Section 11</span>
            <span>•</span>
            <span>ProfileScreen.kt & Safety</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">
            Privacy, Identity & 24/7 Crisis Lifeline
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Your sanctuary is safeguarded with end-to-end device encryption, zero ad telemetry,
            and immediate access to professional compassionate crisis intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dedicated 24/7 Crisis Lifeline Card */}
          <div className="lg:col-span-6 glass-card-dark rounded-3xl p-6 sm:p-8 border-2 border-rose-500/30 shadow-[0_0_60px_rgba(244,63,94,0.15)] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-300">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                  Immediate Emergency Care
                </span>
                <h3 className="text-xl font-serif text-white">988 Suicide & Crisis Lifeline</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              If you or a loved one is navigating overwhelming emotional distress, thoughts of self-harm, or need someone to listen, confidential support is available 24/7/365. Free, caring, and immediate.
            </p>

            {/* Direct 1-Tap Dialer Button */}
            <a
              href="tel:988"
              onClick={() => soundEngine.playBreatheBell()}
              data-cursor="pointer"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white font-bold text-sm tracking-wide shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-3 group"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Tap to Call 988 Lifeline (Free & Confidential)</span>
            </a>

            <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-4 border-t border-white/5 font-mono">
              <span>Text or Call: 988</span>
              <span>Available in English & Spanish</span>
              <span>Deaf / Hard of Hearing: TTY</span>
            </div>
          </div>

          {/* Right Column: Account, Reminders & Security */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Identity & Encryption */}
            <div className="glass-card-dark rounded-3xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm border border-emerald-400/30">
                    RS
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Roy S.</div>
                    <div className="text-xs text-slate-400 font-mono">royshilwant@gmail.com</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono">
                  Verified Identity
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Firebase Auth & Firestore Vault
                </span>
                <span className="text-slate-400 font-mono">Zero Cloud Telemetry</span>
              </div>
            </div>

            {/* Push Reminders Settings */}
            <div className="glass-card-dark rounded-3xl p-6 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-300" />
                <span>Gentle Push Micro-Reminders</span>
              </h4>

              <div className="space-y-3">
                {[
                  { key: 'hydration' as const, label: 'Hydration Chime', desc: 'Subtle water drop chime every 90 minutes' },
                  { key: 'windDown' as const, label: 'Evening Wind-Down', desc: 'Prompts StandBy Desk Clock at 22:00' },
                  { key: 'breatheBreak' as const, label: 'Vagal Breathwork Reminder', desc: 'Midday 4-4-4-4 nervous system recharge' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div>
                      <div className="text-xs font-semibold text-white">{item.label}</div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => toggleReminder(item.key)}
                      data-cursor="pointer"
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        reminders[item.key] ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          reminders[item.key] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
