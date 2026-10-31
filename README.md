# inStill — Showcase & Marketing Landing Website

> *"Mindful Presence & Daily Balance"*

A production-grade, sensory-rich showcase and marketing website for **inStill** (*STILL*), a luxury digital wellness, telehealth, and sensory ecosystem engineered with 60 FPS liquid canvas shaders, bio-responsive breathwork, and clinical telehealth.

---

## ✨ Features & Architecture

### 1. Living Canvas Ambient Backgrounds (60 FPS)
- Interactive HTML5 canvas simulating fluid harmonic waves, starlight motes, and celestial bubbles.
- 11 switchable themes:
  - **FW**: Ferris Wheel (Celestial bubbles, dynamic sun/moon)
  - **CW**: Clean White (Porcelain canvas, muted sage waves)
  - **MS**: Midnight Sage (Deep slate `#091210`, eucalyptus, starlight motes)
  - **TP**: Liquid Topography (Marble contours)
  - **CD**: Cosmic Dusk (Plum & crimson horizon waves)
  - **ZR**: Zen Sand Ripples (Concentric Seigaiha wave medallions)
  - **OA**: Ocean Abyss (Deep cyan dawn horizon)
  - **HW**: Halftone Silk Wave (3D undulating dot-matrix)
  - **TD**: Time Dynamic (Circadian lighting synchronized to local hour)
  - **LT**: Looping Trios (Kinetic rotating triangles)
  - **RT**: Resonance Tunnel (Infinite ribbed obsidian vortex)

### 2. Bespoke Translucent Hourglass Cursor
- Vector frosted hourglass core (`backdrop-blur-md`, `bg-white/20`, border `border-white/40`) with animated trickle of golden sand grains.
- Trailing ambient aura with spring lag physics (`damping: 24, stiffness: 220`).
- 180° rotation on interactive buttons/links; organic expansion over visualizers and canvas; scale-down click feedback.
- Automatically disabled on touch/mobile devices (`hidden md:block`).

### 3. Adaptive Horizontal vs. Vertical Screenshot Presentation
- **Vertical Screenshots (Portrait Mobile 9:20)**:
  - Card tilt on scroll (`rotateY` inward/outward based on scroll depth).
  - Parallax vertical offset, scale dampening, and gentle opacity fade.
  - Interactive 3D mouse hover physics.
  - Frosted glass bezel, dynamic island pill, specular sheen, and colored ambient under-glow (`blur-2xl`).
- **Horizontal Screenshots (Landscape StandBy 2.14:1)**:
  - Panoramic horizon perspective tilt (`rotateX` pitch as user scrolls through the section).
  - MagSafe landscape stand styling with depth expansion.
  - Interactive hotspot detail pins with connecting tooltip cards.

### 4. Interactive Feature Suites
- **Today Dashboard**:
  - Daily Reflection quote card with favorite heart & quote re-roll.
  - 5-State mood check-in bar (Happy, Okay, Low, Anxious, Tired) with spring bounce & chime feedback.
  - Hydration intake tracker (2.5L target) with `+150ml`, `+250ml`, `+500ml` and instant undo.
  - Real-time walking activity telemetry (step counter, active calories, km walked).
  - 7-Day mood trend Bezier curve with draggable scrubber and microscopic glass tick audio.
- **Practice (Breathe, Heal & Sleep)**:
  - *Breathe*: Liquid glass bubble orb with fluid meniscus level, phase countdown timer, and 4 breathing patterns (*Box 4-4-4-4*, *4-7-8 Relaxing*, *Slow 4-6 Calm*, *Equal Calm 5-5*).
  - *Heal*: 5-Channel acoustic nature mixer (*Forest Rain*, *Ocean Waves*, *Mountain Stream*, *Night Crickets*, *White Noise*) and Bilateral EMDR track library.
  - *Sleep*: Restorative vector landscapes (*Rain on Window*, *Lotus Pond Bridge*, *Summer Breeze Meadow*).
- **Journal & Analytics**:
  - Interactive Reflections Composer modal.
  - Hermite cubic spline chart with time-interval and metric selectors.
- **Clinical Telehealth (Agora RTC)**:
  - Client vs Therapist dual-role portal.
  - Certified doctor profiles and frosted video consult interface mockup.
- **Play & Companions**:
  - Mew Mew interactive virtual cat with purrs, heart particles, and action buttons.
  - EMO AI desktop OLED robot with 7 animated eye expressions.
  - Playable Reflex Core reaction test (ms precision) and Bubble Pop.
- **Focus Desk Clock & StandBy Mode**:
  - StandBy landscape clock simulator with live system time.
  - 4 selectable typography styles (*Bubble Overlap*, *Editorial Serif*, *Minimal Mono*, *Geometric Lite*).
  - 270° circular battery gauge with live arc, decimal percentage (81.59%), 0W wattage, and 40°C temperature telemetry.
  - 4 pastel palettes (*Lite Olive & Lavender*, *Soft Lavender Mist*, *Matcha & Pastel Peach*, *Moonlit Rose & Lilac*).
  - Fullscreen StandBy Display modal.
- **DoomScroll Breaker**:
  - Continuous scroll threshold slider and app monitor toggles.
  - Full-screen Break Intervention screen demonstration with deep singing bowl gong chime.
- **Sensory Acoustics Soundboard**:
  - Pure Web Audio API synthesis for `BREATHE_BELL`, `WATER_POUR`, `TILE_PENTATONIC`, `STEP_CLICK`, `GRAPH_TICK`, and `SCROLL_GONG`.
- **Privacy & 24/7 Crisis Lifeline**:
  - 1-tap direct dialer for the **988 Suicide & Crisis Lifeline**.

---

## 🛠️ Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS + Glassmorphism surfaces
- **Motion**: Framer Motion 11+ with spring physics and scroll tracking
- **Icons**: Lucide React
- **Audio**: Web Audio API (real-time hardware synthesis)
- **Canvas**: HTML5 Canvas (60 FPS procedural shaders)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
git clone https://github.com/instilll/instilllweb.git
cd instilllweb
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
