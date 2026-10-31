import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, Star, ShieldCheck, PhoneCall, UserCheck, Stethoscope } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const TherapySection: React.FC = () => {
  const [role, setRole] = useState<'client' | 'therapist'>('client');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const therapists = [
    {
      name: 'Dr. Elena Vance, PsyD',
      title: 'Clinical Neuro-Psychologist',
      specialty: 'Trauma & Autonomic Regulation',
      rate: '$160 / 50 min',
      rating: '4.98 (124 reviews)',
      bio: 'Specializing in polyvagal autonomic stabilization, EMDR somatic therapy, and mindfulness-based cognitive healing.',
      avatarBg: 'bg-pop-lime text-pop-forest border-pop-forest',
    },
    {
      name: 'Marcus Sterling, LMFT',
      title: 'Licensed Somatic Therapist',
      specialty: 'High-Stress Anxiety & Burnout',
      rate: '$140 / 50 min',
      rating: '4.95 (98 reviews)',
      bio: 'Helping high-performance founders and creatives dismantle chronic tension and build sustainable mental presence.',
      avatarBg: 'bg-pop-periwinkle text-slate-900 border-blue-400',
    },
  ];

  return (
    <section id="telehealth" className="py-24 px-4 sm:px-8 relative bg-pop-cream text-slate-900 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-pop-yellow text-slate-900 border border-slate-900/15 shadow-cartoon-sm mb-4">
            <span>🩺 Section 06</span>
            <span>•</span>
            <span>Agora RTC Telehealth</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight mb-4 text-slate-900">
            Clinical Telehealth & Somatic Therapy
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Encrypted HD video consultations with licensed clinicians, integrated directly with
            inStill biometric telemetry and bilateral audio protocols.
          </p>

          {/* Dual-Role Switcher */}
          <div className="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 p-1.5 rounded-3xl sm:rounded-full bg-white border-2 border-slate-900/10 mt-8 shadow-cartoon-sm">
            <button
              onClick={() => {
                setRole('client');
                soundEngine.playStepClick();
              }}
              data-cursor="pointer"
              className={`px-4 xs:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                role === 'client'
                  ? 'bg-pop-lime text-pop-forest border border-pop-forest shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
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
              className={`px-4 xs:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                role === 'therapist'
                  ? 'bg-pop-yellow text-slate-900 border border-amber-400 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
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
            {/* Therapist Directory */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Certified Clinical Directory</h3>
              {therapists.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-900/10 shadow-cartoon-sm hover:border-pop-forest transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-14 h-14 rounded-2xl ${doc.avatarBg} border-2 flex items-center justify-center font-bold text-xl shadow-cartoon-sm`}>
                        {doc.name[4]}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{doc.name}</h4>
                        <div className="text-xs text-pop-forest font-bold font-mono">{doc.specialty}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">{doc.rate}</div>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{doc.bio}</p>

                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> HIPAA Compliant
                    </span>
                    <button
                      onClick={() => {
                        setIsCallActive(true);
                        soundEngine.playKalimba(3);
                      }}
                      data-cursor="pointer"
                      className="px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-cartoon-sm w-full xs:w-auto"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Start Video Consult</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Video Consultation Mockup */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-md rounded-[40px] bg-white p-4 border-2 border-slate-900/15 shadow-cartoon relative overflow-hidden">
                <div className="relative aspect-[9/13] rounded-[30px] overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-between p-4">
                  {/* Doctor Video Stream */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-black flex items-center justify-center">
                    <div className="flex flex-col items-center text-center p-6">
                      <div className="w-24 h-24 rounded-full bg-pop-lime border-4 border-pop-forest flex items-center justify-center text-3xl font-bold text-pop-forest shadow-2xl mb-3">
                        E
                      </div>
                      <span className="text-base font-bold text-white">Dr. Elena Vance, PsyD</span>
                      <span className="text-xs text-pop-lime font-mono mt-0.5">Speaking • EMDR Phase 2</span>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-pop-lime flex items-center gap-1.5 border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-pop-lime animate-pulse" />
                      <span>06:24</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-white/10">
                      Agora RTC HD
                    </div>
                  </div>

                  {/* PiP */}
                  <div className="relative z-10 self-end w-24 h-32 rounded-2xl bg-slate-800 border-2 border-white/20 overflow-hidden shadow-lg flex items-center justify-center">
                    <span className="text-[10px] text-slate-300 font-mono">You (Self)</span>
                  </div>

                  {/* Controls */}
                  <div className="relative z-10 p-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center gap-3 mx-auto shadow-2xl">
                    <button
                      onClick={() => {
                        setIsMuted(!isMuted);
                        soundEngine.playStepClick();
                      }}
                      data-cursor="pointer"
                      className={`p-3 rounded-full transition-colors ${
                        isMuted ? 'bg-rose-500 text-white' : 'bg-white/15 text-white'
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
                        isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/15 text-white'
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
                      className="px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>End</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-900/10 shadow-cartoon-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Practitioner Telehealth Portal</h3>
                <p className="text-xs text-slate-500">Upcoming clinical consultations and synchronized client telemetry</p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-pop-yellow text-slate-900 text-xs font-mono font-bold">
                Therapist Mode Active
              </span>
            </div>

            <div className="space-y-4">
              {[
                { client: 'Client #9482 (Anonymous)', time: '14:00 PM EST', status: 'In Waiting Room', trend: 'Anxiety elevated (HRV: 42ms)' },
                { client: 'Client #8120 (Anonymous)', time: '15:30 PM EST', status: 'Scheduled', trend: 'Mood stable • 7-day streak' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{item.client}</div>
                    <div className="text-xs text-slate-500 font-mono">{item.time} • {item.trend}</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsCallActive(true);
                      soundEngine.playBreatheBell();
                    }}
                    data-cursor="pointer"
                    className="px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-bold shadow-cartoon-sm"
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
