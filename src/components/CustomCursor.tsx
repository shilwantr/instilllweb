import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Soft, organic springs for fluid motion without stutter
  const hourglassSpringConfig = { damping: 30, stiffness: 350, mass: 0.25 };
  const auraSpringConfig = { damping: 26, stiffness: 160, mass: 0.6 };

  const smoothHourglassX = useSpring(cursorX, hourglassSpringConfig);
  const smoothHourglassY = useSpring(cursorY, hourglassSpringConfig);

  const smoothAuraX = useSpring(cursorX, auraSpringConfig);
  const smoothAuraY = useSpring(cursorY, auraSpringConfig);

  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'visualizer' | 'active'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const stateRef = useRef(cursorState);
  stateRef.current = cursorState;

  useEffect(() => {
    // Only enable on desktop pointer devices
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

    let checkTimeout: number;
    const handleMouseOver = (e: MouseEvent) => {
      // Throttle/debounce element inspection to avoid unnecessary state updates
      cancelAnimationFrame(checkTimeout);
      checkTimeout = requestAnimationFrame(() => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        let newState: 'default' | 'hover' | 'visualizer' = 'default';
        if (target.closest('[data-cursor="visualizer"]') || target.closest('canvas')) {
          newState = 'visualizer';
        } else if (
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input[type="range"]') ||
          target.closest('[role="button"]') ||
          target.closest('[data-cursor="pointer"]')
        ) {
          newState = 'hover';
        }

        if (stateRef.current !== newState && stateRef.current !== 'active') {
          setCursorState(newState);
        }
      });
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(checkTimeout);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Trailing Soft Ambient Aura */}
      <motion.div
        style={{
          x: smoothAuraX,
          y: smoothAuraY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          scale: cursorState === 'hover' ? 1.4 : cursorState === 'visualizer' ? 1.7 : 1,
          opacity: cursorState === 'active' ? 0.3 : 0.6,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`absolute rounded-full transition-colors duration-500 ${
          cursorState === 'hover'
            ? 'w-14 h-14 bg-emerald-300/30 blur-md'
            : cursorState === 'visualizer'
            ? 'w-18 h-18 bg-teal-200/35 blur-lg'
            : 'w-10 h-10 bg-still-celadonSage/25 blur-sm'
        }`}
      />

      {/* Translucent Frosted Hourglass Core */}
      <motion.div
        style={{
          x: smoothHourglassX,
          y: smoothHourglassY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          rotate: cursorState === 'hover' ? 180 : 0,
          scale: cursorState === 'active' ? 0.88 : cursorState === 'hover' ? 1.12 : cursorState === 'visualizer' ? 1.2 : 1,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 220 }}
        className="absolute flex items-center justify-center p-2 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/20 shadow-md"
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          <svg
            width="18"
            height="18"
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

          {/* Micro sand trickle */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="w-1 h-1 bg-amber-400/80 rounded-full animate-sand-flow" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
