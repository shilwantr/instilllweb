/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        still: {
          lightBg: '#FAFBF9',
          lightCard: '#FFFFFF',
          darkBg: '#0B1310',
          darkCard: '#182621',
          slatePrimary: '#111827',
          slateSecondary: '#4B5563',
          forestSage: '#154734',
          celadonSage: '#8FAF9B',
          buttonLight: '#154734',
          buttonDark: '#2D5A47',
        },
        // Wix Pop Cartoon Palette from Reference
        pop: {
          lime: '#D2F56C',
          forest: '#0A4839',
          periwinkle: '#8FA8FF',
          coral: '#FA7B60',
          yellow: '#FED668',
          lavender: '#CBB4F5',
          mint: '#A7F3D0',
          cream: '#FAFBF8',
        },
        // Pastel Themes
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
      boxShadow: {
        'cartoon': '4px 4px 0px 0px rgba(15, 23, 42, 0.9)',
        'cartoon-sm': '2px 2px 0px 0px rgba(15, 23, 42, 0.9)',
        'cartoon-lime': '4px 4px 0px 0px #0A4839',
        'soft-float': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.04)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'float-alt': 'floatAlt 6s ease-in-out infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'sand-flow': 'sand 1.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        floatAlt: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-1.5deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
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
