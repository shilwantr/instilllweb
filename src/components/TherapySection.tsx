import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, MicOff, VideoOff, Calendar, Clock, Star, ShieldCheck, PhoneCall, Volume2, UserCheck, Stethoscope } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const TherapySection: React.FC = () => {
  const [role, setRole] = useState<'client' | 'therapist'>('client');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callTimer, setCallTimer] = useState(384); // seconds (06:24)

  const therapists = [
    {
      name: 'Dr. Elena Vance, PsyD',
      title: 'Clinical Neuro-Psychologist',
      specialty: 'Trauma & Autonomic Regulation',
      rate: '$160 / 50 min',
      rating: '4.98 (124 reviews)',
      bio: 'Specializing in polyvagal autonomic stabilization, EMDR somatic therapy, and mindfulness-based cognitive healing.',
      avatarBg: 'from-emerald-600 to-teal-800',
    },
    {
      name: 'Marcus Sterling, LMFT',
      title: 'Licensed Somatic Therapist',
      specialty: 'High-Stress Anxiety & Burnout',
      rate: '$140 / 50 min',
      rating: '4.95 (98 reviews)',
      bio: 'Helping high-performance founders and creatives dismantle chronic tension and build sustainable mental presence.',
      avatarBg: 'from-purple-700 to-indigo-900',
    },
  ];

  return (
    <section id="telehealth" className="py-24 px-4 sm:px-8 relative bg-still-darkBg text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase glass-panel-dark text-emerald-300 border border-emerald-400/20 mb-4">
            <span>Section 06</span>
            <span>•</span>
            <span>Agora RTC Telehealth</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight mb-4">
            Clinical Telehealth & Somatic Therapy
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Encrypted HD video consultations with licensed clinicians, integrated directly with
            inStill biometric telemetry and bilateral audio protocols.
          </p>

          {/* Dual-Role Switcher */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full glass-card-dark border border-white/15 mt-8 shadow-xl">
            <button
              onClick={() => {
                setRole('client');
                soundEngine.playStepClick();
              }}
              data-cursor="pointer"
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
                role === 'client'
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Client View</span>
            </button>

            <button
              onClick={() => {
                setRole('therapist');
                soundEngine.playStepClick();
              }}
              data-cursor="pointer"
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 ${
                role === 'therapist'
                  ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Therapist View</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        {role === 'client' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Therapist Directory Cards */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <h3 className="text-xl font-serif text-white mb-2">Certified Clinical Directory</h3>
              {therapists.map((doc, idx) => (
                <div
                  key={idx}
                  className="glass-card-dark rounded-3xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${doc.avatarBg} flex items-center justify-center text-white font-serif font-bold text-lg shadow-md`}>
                        {doc.name[4]}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">{doc.name}</h4>
                        <div className="text-xs text-emerald-300 font-mono">{doc.specialty}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">{doc.rate}</div>
                      <div className="flex items-center gap-1 text-[11px] text-amber-300">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{doc.bio}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> HIPAA Compliant
                    </span>
                    <button
                      onClick={() => {
                        setIsCallActive(true);
                        soundEngine.playKalimba(3);
                      }}
                      data-cursor="pointer"
                      className="px-4 py-2 rounded-xl bg-still-buttonDark text-white text-xs font-medium hover:bg-emerald-600 transition-colors flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Start Video Consult</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Video Consultation Mockup Frame */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-md rounded-[36px] glass-card-dark p-4 border border-white/15 shadow-2xl relative overflow-hidden">
                {/* Simulated Call Viewport */}
                <div className="relative aspect-[9/14] sm:aspect-[9/13] rounded-[28px] overflow-hidden bg-slate-900 border border-white/10 flex flex-col justify-between p-4">
                  {/* Doctor Video Stream Simulation */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-black flex items-center justify-center">
                    <div className="flex flex-col items-center text-center p-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center text-3xl font-serif text-white shadow-2xl mb-3 border-2 border-emerald-400/40">
                        E
                      </div>
                      <span className="text-base font-semibold text-white">Dr. Elena Vance, PsyD</span>
                      <span className="text-xs text-emerald-400 font-mono mt-0.5">Speaking • EMDR Phase 2</span>
                    </div>
                  </div>

                  {/* Header overlay */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="px-3 py-1 rounded-full glass-panel-dark text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>06:24</span>
                    </div>
                    <div className="px-3 py-1 rounded-full glass-panel-dark text-[11px] font-mono text-slate-300">
                      Agora RTC HD 1080p
                    </div>
                  </div>

                  {/* Client PiP Mini Box */}
                  <div className="relative z-10 self-end w-24 h-32 rounded-2xl glass-card-dark border border-white/20 overflow-hidden shadow-lg flex items-center justify-center bg-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-mono">You (Self)</span>
                  </div>

                  {/* Frosted Call Control Dock */}
                  <div className="relative z-10 p-3 rounded-full glass-card-dark border border-white/20 flex items-center justify-center gap-4 mx-auto shadow-2xl">
                    <button
                      onClick={() => {
                        setIsMuted(!isMuted);
                        soundEngine.playStepClick();
                      }}
                      data-cursor="pointer"
                      className={`p-3 rounded-full transition-colors ${
                        isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        setIsVideoOff(!isVideoOff);
                        soundEngine.playStepClick();
                      }}
                      data-cursor="pointer"
                      className={`p-3 rounded-full transition-colors ${
                        isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        soundEngine.playBreatheBell();
                        setIsCallActive(false);
                      }}
                      data-cursor="pointer"
                      className="px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-lg"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>End Call</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Therapist View Mockup */
          <div className="max-w-4xl mx-auto glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-serif text-white">Practitioner Telehealth Portal</h3>
                <p className="text-xs text-slate-400">Upcoming clinical consultations and synchronized client telemetry</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono">
                Therapist Mode Active
              </span>
            </div>

            <div className="space-y-4">
              {[
                { client: 'Patient #9482 (Roy S.)', time: '14:00 PM EST', status: 'In Waiting Room', trend: 'Anxiety elevated (HRV: 42ms)' },
                { client: 'Patient #8120 (Clara M.)', time: '15:30 PM EST', status: 'Scheduled', trend: 'Mood stable • 7-day streak' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.client}</div>
                    <div className="text-xs text-slate-400 font-mono">{item.time} • {item.trend}</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsCallActive(true);
                      soundEngine.playBreatheBell();
                    }}
                    data-cursor="pointer"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold self-start sm:self-auto"
                  >
                    Admit to Video Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
