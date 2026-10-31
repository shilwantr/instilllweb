import React, { useState } from 'react';
import { Phone, Shield, Bell, HeartHandshake } from 'lucide-react';
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
    <section id="safety" className="py-24 px-4 sm:px-8 relative bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-lime text-pop-forest border border-pop-forest/20 shadow-cartoon-sm mb-4">
            <span>🔒 Section 11</span>
            <span>•</span>
            <span>ProfileScreen.kt & Safety</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            Privacy, Identity & 24/7 Crisis Lifeline
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Your sanctuary is safeguarded with end-to-end device encryption, zero ad telemetry,
            and immediate access to professional compassionate crisis intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 988 Suicide & Crisis Lifeline Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-4 border-rose-400 shadow-cartoon relative overflow-hidden">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-3.5 rounded-2xl bg-rose-100 text-rose-700 border-2 border-slate-900 shadow-cartoon-sm">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                  Immediate Emergency Care
                </span>
                <h3 className="text-2xl font-sans font-extrabold text-slate-900">988 Suicide & Crisis Lifeline</h3>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
              If you or a loved one is navigating overwhelming emotional distress, thoughts of self-harm, or need someone to listen, confidential support is available 24/7/365. Free, caring, and immediate.
            </p>

            <a
              href="tel:988"
              onClick={() => soundEngine.playBreatheBell()}
              data-cursor="pointer"
              className="w-full py-3.5 sm:py-4 px-4 rounded-full bg-slate-950 text-white font-bold text-xs sm:text-sm tracking-wide shadow-cartoon hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5 sm:gap-3 group transform hover:-translate-y-0.5 text-center"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform text-pop-lime flex-shrink-0" />
              <span>Tap to Call 988 Lifeline (Free & Confidential)</span>
            </a>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mt-5 pt-4 border-t border-slate-100 font-mono font-bold">
              <span>Text or Call: 988</span>
              <span>English & Spanish</span>
              <span>TTY Capable</span>
            </div>
          </div>

          {/* Account, Reminders & Security */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-cartoon-sm">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-pop-lime text-pop-forest border-2 border-pop-forest flex items-center justify-center font-bold text-sm shadow-cartoon-sm flex-shrink-0">
                    RS
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Roy S.</div>
                    <div className="text-xs text-slate-500 font-mono truncate max-w-[200px] sm:max-w-none">royshilwant@gmail.com</div>
                  </div>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-pop-lime text-pop-forest text-xs font-mono font-bold border border-pop-forest/20 self-start xs:self-auto">
                  Verified Identity
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" /> Firebase Auth & Firestore Vault
                </span>
                <span className="text-slate-500 font-mono">Zero Cloud Telemetry</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-cartoon-sm">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Gentle Push Micro-Reminders</span>
              </h4>

              <div className="space-y-3">
                {[
                  { key: 'hydration' as const, label: 'Hydration Chime', desc: 'Subtle water drop chime every 90 minutes' },
                  { key: 'windDown' as const, label: 'Evening Wind-Down', desc: 'Prompts StandBy Desk Clock at 22:00' },
                  { key: 'breatheBreak' as const, label: 'Vagal Breathwork Reminder', desc: 'Midday 4-4-4-4 nervous system recharge' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.label}</div>
                      <div className="text-[11px] text-slate-500">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => toggleReminder(item.key)}
                      data-cursor="pointer"
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 border-2 border-slate-900 ${
                        reminders[item.key] ? 'bg-pop-lime' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full bg-slate-900 transition-transform ${
                          reminders[item.key] ? 'translate-x-6' : 'translate-x-0'
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
