/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        still: {
          lightBg: '#F2F5F7',
          lightCard: '#F8FAFC',
          darkBg: '#0B1310',
          darkCard: '#182621',
          slatePrimary: '#0F172A',
          slateSecondary: '#334155',
          forestSage: '#1F5C3F',
          celadonSage: '#8FAF9B',
          buttonLight: '#2D5A47',
          buttonDark: '#6B9E88',
        },
        // The 4 Curated Pastel Theme Palettes:
        pastelOlive: {
          gauge: '#C5D8A4',
          dustyPink: '#D5A6BD',
          mutedMauve: '#C996B6',
          butterOchre: '#DFD38E',
          softLavender: '#B4A7D6',
        },
        pastelLavender: {
          gauge: '#C3B1E1',
          periwinkle: '#B4C5E4',
          orchid: '#D8B4E2',
          softCream: '#F4E8C1',
          celadonMint: '#A8D8B9',
        },
        pastelMatcha: {
          gauge: '#BFD8B8',
          apricot: '#F7C59F',
          warmBlush: '#E8A598',
          softPear: '#D4E09B',
          wisteria: '#C9B6E4',
        },
        pastelRose: {
          gauge: '#D8C3E8',
          roseQuartz: '#F2BAC9',
          softSand: '#E8DAB2',
          sage: '#B8D8BA',
          dustySky: '#A3C4DC',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'sand-flow': 'sand 1.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sand: {
          '0%': { transform: 'translateY(-2px) scale(0.8)', opacity: '0.4' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(6px) scale(0.4)', opacity: '0.2' },
        },
      },
    },
  },
  plugins: [],
};
