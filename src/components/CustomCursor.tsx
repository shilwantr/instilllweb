import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configurations for smooth organic follow
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'visualizer' | 'active'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setCursorState('active');
    };

    const handleMouseUp = () => {
      setCursorState('default');
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="visualizer"]') || target.closest('canvas')) {
        setCursorState('visualizer');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input[type="range"]') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Trailing Soft Ambient Aura */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorState === 'hover' ? 1.45 : cursorState === 'visualizer' ? 1.8 : 1,
          opacity: cursorState === 'active' ? 0.35 : 0.65,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className={`absolute rounded-full transition-colors duration-500 ${
          cursorState === 'hover'
            ? 'w-16 h-16 bg-emerald-300/35 blur-md'
            : cursorState === 'visualizer'
            ? 'w-20 h-20 bg-teal-200/40 blur-lg animate-pulse-slow'
            : 'w-12 h-12 bg-still-celadonSage/25 blur-sm'
        }`}
      />

      {/* Translucent Frosted Hourglass Core */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: cursorState === 'hover' ? 180 : 0,
          scale: cursorState === 'active' ? 0.85 : cursorState === 'hover' ? 1.15 : cursorState === 'visualizer' ? 1.25 : 1,
        }}
        transition={{ type: 'spring', damping: 18, stiffness: 240 }}
        className="absolute flex items-center justify-center p-2 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/20 shadow-lg"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-still-slatePrimary dark:text-slate-200"
          >
            <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
          </svg>

          {/* Rhythmic sand trickle animation */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="w-1 h-1 bg-amber-400/80 rounded-full animate-sand-flow" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
