// Web Audio API Synthesizer for inStill Wellness App

class SoundEngine {
  private ctx: AudioContext | null = null;
  private natureNodes: { [key: string]: { source: AudioNode; gain: GainNode } } = {};

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Tibetan Tingsha Chime Bell
  playBreatheBell() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Two slightly detuned high frequencies for authentic bell shimmer
      const freqs = [1568, 1572, 3136];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const initialVol = idx === 2 ? 0.08 : 0.15;
        gain.gain.setValueAtTime(initialVol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.3);
      });
    } catch {
      // Audio not permitted yet
    }
  }

  // Deep Singing Bowl Mindfulness Gong
  playGong() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Deep rich fundamental + calming harmonics (174Hz Solfeggio Foundation)
      const harmonics = [
        { f: 174, vol: 0.35, decay: 4.5 },
        { f: 348, vol: 0.2, decay: 3.5 },
        { f: 522, vol: 0.1, decay: 2.8 },
        { f: 1044, vol: 0.04, decay: 1.8 }
      ];

      harmonics.forEach(({ f, vol, decay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decay + 0.1);
      });
    } catch {
      // Audio not permitted yet
    }
  }

  // Soothing Water Pour / Drop
  playWaterPour() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + i * 0.09;
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + i * 140, startTime);
        osc.frequency.exponentialRampToValueAtTime(350 + i * 50, startTime + 0.18);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.2);
      }
    } catch {
      // audio error ignore
    }
  }

  // Pentatonic Kalimba / Tile Merge Note
  playKalimba(noteIndex = 0) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
      const freq = scale[noteIndex % scale.length];

      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc2.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 1.3);
      osc2.stop(now + 1.3);
    } catch {
      // ignore
    }
  }

  // Step Click
  playStepClick() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.025);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // ignore
    }
  }

  // Graph Scrub Tick (Glass micro-tick)
  playScrubTick() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(4200, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // ignore
    }
  }

  // Bubble Pop
  playBubblePop() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // ignore
    }
  }

  // Cat Purr sound
  playCatPurr() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Low frequency vibration with gentle amplitude modulation
      const osc = ctx.createOscillator();
      const mod = ctx.createOscillator();
      const modGain = ctx.createGain();
      const masterGain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(26, now); // Low purr fundamental

      mod.type = 'sine';
      mod.frequency.setValueAtTime(24, now); // Purr rate ~24Hz
      modGain.gain.setValueAtTime(15, now);

      mod.connect(modGain);
      modGain.connect(osc.frequency);

      masterGain.gain.setValueAtTime(0.12, now);
      masterGain.gain.linearRampToValueAtTime(0.15, now + 0.4);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(masterGain);
      masterGain.connect(ctx.destination);

      mod.start(now);
      osc.start(now);
      mod.stop(now + 1.25);
      osc.stop(now + 1.25);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new SoundEngine();
