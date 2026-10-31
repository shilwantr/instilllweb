import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export interface HotspotPin {
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  label: string;
  detail: string;
  tagColor?: string;
}

interface AdaptiveScreenshotFrameProps {
  src: string;
  alt: string;
  orientation?: 'vertical' | 'horizontal';
  tiltDirection?: 'left' | 'right' | 'center';
  glowColor?: string;
  enableFeather?: boolean;
  hotspots?: HotspotPin[];
  className?: string;
  badge?: string;
}

export const AdaptiveScreenshotFrame: React.FC<AdaptiveScreenshotFrameProps> = ({
  src,
  alt,
  orientation = 'vertical',
  tiltDirection = 'center',
  glowColor = 'rgba(143, 175, 155, 0.3)',
  enableFeather = false,
  hotspots = [],
  className = '',
  badge,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<HotspotPin | null>(null);

  // Smooth mouse tilt using MotionValues (ZERO React re-renders during cursor movement)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const hoverSpringConfig = { damping: 28, stiffness: 160, mass: 0.6 };
  const hoverRotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], orientation === 'horizontal' ? [7, -7] : [5, -5]),
    hoverSpringConfig
  );
  const hoverRotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], orientation === 'horizontal' ? [-6, 6] : [-7, 7]),
    hoverSpringConfig
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Scroll tracking with soft, fluid spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 110,
    mass: 0.7,
  });

  // Distinctive Scroll Animations for VERTICAL vs HORIZONTAL
  // Vertical: Subtle card tilt, gentle elevation, soft edge fade
  const initialRotateY = tiltDirection === 'left' ? -6 : tiltDirection === 'right' ? 6 : 0;
  const targetRotateY = tiltDirection === 'left' ? 4 : tiltDirection === 'right' ? -4 : 0;

  const scrollRotateY = useTransform(smoothScrollProgress, [0, 0.5, 1], [initialRotateY, 0, targetRotateY]);
  const scrollY = useTransform(smoothScrollProgress, [0, 0.5, 1], [35, 0, -30]);
  const scrollScale = useTransform(smoothScrollProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.96]);
  const scrollOpacity = useTransform(smoothScrollProgress, [0, 0.12, 0.88, 1], [0.8, 1, 1, 0.8]);

  // Horizontal (Panoramic Horizon Stand): Horizon pitch tilt on scroll
  const scrollRotateX = useTransform(smoothScrollProgress, [0, 0.5, 1], [7, 0, -5]);
  const horizontalScrollY = useTransform(smoothScrollProgress, [0, 0.5, 1], [25, 0, -20]);
  const horizontalScrollScale = useTransform(smoothScrollProgress, [0, 0.5, 1], [0.96, 1.01, 0.97]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Ambient Colored Under-Glow Spill */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none transition-opacity duration-700 blur-2xl -z-10"
        style={{
          background: glowColor,
          opacity: 0.5,
        }}
      />

      {/* Layer 1: Outer Scroll-Driven Motion Container */}
      <motion.div
        style={
          orientation === 'horizontal'
            ? {
                rotateX: scrollRotateX,
                scale: horizontalScrollScale,
                y: horizontalScrollY,
                opacity: scrollOpacity,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }
            : {
                rotateY: scrollRotateY,
                y: scrollY,
                scale: scrollScale,
                opacity: scrollOpacity,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }
        }
        className="w-full flex justify-center"
      >
        {/* Layer 2: Inner Mouse Hover Parallax Card (Completely decoupled from scroll transforms) */}
        <motion.div
          style={{
            rotateX: hoverRotateX,
            rotateY: hoverRotateY,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className={`group relative overflow-hidden transition-shadow duration-300 ${
            orientation === 'horizontal'
              ? 'landscape-frame max-w-4xl mx-auto shadow-2xl w-full p-2.5 sm:p-3.5'
              : 'phone-frame-dark max-w-[280px] xs:max-w-[310px] sm:max-w-[340px] mx-auto shadow-2xl w-full'
          }`}
        >
          {/* Device Top Dynamic Island (Vertical Mockup) */}
          {orientation === 'vertical' && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-24 h-5 bg-black/90 rounded-full flex items-center justify-between px-3 border border-white/10 shadow-sm pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              <span className="w-2.5 h-2.5 rounded-full bg-black border border-white/20" />
            </div>
          )}

          {/* Screenshot Image Viewport */}
          <div
            className={`relative w-full overflow-hidden rounded-[30px] bg-still-darkBg ${
              enableFeather ? 'edge-feather' : ''
            }`}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block select-none object-cover transform transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            />

            {/* Specular Ambient Sheen */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-50 mix-blend-overlay" />
          </div>

          {/* Optional floating badge */}
          {badge && (
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-medium tracking-wide glass-panel-dark text-emerald-300 border border-emerald-400/20 shadow-md">
              {badge}
            </div>
          )}

          {/* Interactive Hotspot Detail Pins */}
          {hotspots.map((pin, i) => (
            <div
              key={i}
              className="absolute z-30"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot === pin ? null : pin);
                }}
                aria-label={`Inspect ${pin.label}`}
                data-cursor="pointer"
                className="relative -translate-x-1/2 -translate-y-1/2 group/pin flex items-center justify-center p-1"
              >
                <span className="absolute w-5 h-5 rounded-full bg-emerald-400/30 animate-ping" />
                <span className="relative w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-white shadow-md transition-transform group-hover/pin:scale-125" />
              </button>

              {/* Hotspot Floating Tooltip Card */}
              {activeHotspot === pin && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="absolute z-40 top-6 -left-20 w-48 p-3 rounded-2xl glass-card-dark text-left shadow-2xl border border-white/20 text-xs pointer-events-auto"
                >
                  <div className="font-semibold text-emerald-300 mb-1">{pin.label}</div>
                  <div className="text-slate-300 leading-relaxed text-[11px]">{pin.detail}</div>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
