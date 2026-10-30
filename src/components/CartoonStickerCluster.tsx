import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Search, Globe, MousePointer, Sparkles, Heart, Smile } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const CartoonStickerCluster: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto py-8 flex items-center justify-center select-none">
      {/* 1. Dark Forest Green Rounded Square with Padlock (Top Left) */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => soundEngine.playStepClick()}
        data-cursor="pointer"
        className="absolute -top-4 right-1/4 sm:right-1/3 z-20 w-16 h-16 sm:w-20 sm:h-20 bg-pop-forest rounded-3xl p-3 flex items-center justify-center text-pop-lime shadow-cartoon transform rotate-[-8deg] cursor-pointer"
        title="100% Encrypted & Local"
      >
        <Lock className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
      </motion.div>

      {/* 2. Soft Periwinkle Scalloped Cloud / Flower with Search (Center Left) */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 6 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => soundEngine.playKalimba(2)}
        data-cursor="pointer"
        className="absolute top-12 left-6 sm:left-12 z-20 w-20 h-20 sm:w-24 sm:h-24 bg-pop-periwinkle rounded-[32px] flex items-center justify-center text-white shadow-cartoon transform rotate-[-12deg] cursor-pointer"
        title="Find Quiet Sanctuary"
      >
        {/* Scalloped decorative border */}
        <div className="relative flex items-center justify-center">
          <Search className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 text-xs">✨</span>
        </div>
      </motion.div>

      {/* 3. Sunny Warm Yellow Tilted Square with Globe / Mindful Sphere (Center Right) */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -6 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => soundEngine.playKalimba(4)}
        data-cursor="pointer"
        className="absolute top-8 right-4 sm:right-10 z-10 w-20 h-20 sm:w-24 sm:h-24 bg-pop-yellow rounded-2xl flex items-center justify-center text-pop-coral shadow-cartoon transform rotate-[14deg] cursor-pointer"
        title="Global Clinical Telehealth"
      >
        <Globe className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
      </motion.div>

      {/* 4. The Centerpiece Big Lime Pill: '✦ INSTILL.ZEN' (Inspired by WWW.DOMAIN) */}
      <motion.div
        whileHover={{ scale: 1.04, rotate: 1 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => soundEngine.playBreatheBell()}
        data-cursor="pointer"
        className="relative z-30 w-full sm:w-[92%] py-3.5 sm:py-5 px-6 sm:px-8 bg-pop-lime border-2 border-pop-forest rounded-full flex items-center justify-between shadow-cartoon-lime transform rotate-[-3deg] cursor-pointer my-12"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-pop-forest shadow-sm">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          </div>
          <span className="font-mono font-bold tracking-wider text-xl sm:text-3xl text-pop-forest uppercase">
            INSTILL.APP
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-pop-forest text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Active</span>
        </div>
      </motion.div>

      {/* 5. Coral Circular Badge with Cartoon Cursor Pointer (Bottom Right) */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => soundEngine.playWaterPour()}
        data-cursor="pointer"
        className="absolute -bottom-4 right-1/4 sm:right-1/3 z-40 w-18 h-18 sm:w-22 sm:h-22 bg-pop-coral rounded-full flex items-center justify-center text-pop-yellow shadow-cartoon transform rotate-[8deg] cursor-pointer p-3"
        title="Click for Pure Presence"
      >
        <MousePointer className="w-9 h-9 sm:w-10 sm:h-10 fill-current stroke-pop-forest stroke-[1.5]" />
      </motion.div>

      {/* 6. Cartoon Character: Mew Mew Cat Head Sticker (Bottom Left) */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 8 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => soundEngine.playCatPurr()}
        data-cursor="pointer"
        className="absolute -bottom-6 left-8 sm:left-14 z-40 w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 border-pop-forest rounded-full flex flex-col items-center justify-center shadow-cartoon transform rotate-[-8deg] cursor-pointer"
        title="Pet Mew Mew!"
      >
        <span className="text-2xl sm:text-3xl select-none">🐱</span>
        <span className="text-[9px] font-bold text-pop-forest tracking-tighter -mt-1">PURR ME</span>
      </motion.div>
    </div>
  );
};
