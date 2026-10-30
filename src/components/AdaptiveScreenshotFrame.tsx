import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

  // Mouse tilt tracking
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Scroll-driven animation tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Soft spring for buttery fluid physics
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 150,
  });

  // Distinctive Scroll Animations for VERTICAL vs HORIZONTAL
  // Vertical: Subtle vertical parallax, card Y-axis tilt based on tiltDirection, entry/exit fade & fold
  const initialRotateY = tiltDirection === 'left' ? -7 : tiltDirection === 'right' ? 7 : 0;
  const targetRotateY = tiltDirection === 'left' ? 4 : tiltDirection === 'right' ? -4 : 0;
  
  const verticalRotateY = useTransform(smoothProgress, [0, 0.5, 1], [initialRotateY, 0, targetRotateY]);
  const verticalY = useTransform(smoothProgress, [0, 0.5, 1], [45, 0, -40]);
  const verticalScale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.93, 1, 1, 0.94]);
  const verticalOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.65, 1, 1, 0.7]);

  // Horizontal: Horizon X-axis perspective pitch, panoramic depth expand, subtle stand elevation
  const horizontalRotateX = useTransform(smoothProgress, [0, 0.5, 1], [9, 0, -6]);
  const horizontalScale = useTransform(smoothProgress, [0, 0.5, 1], [0.94, 1.01, 0.95]);
  const horizontalY = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -25]);
  const horizontalOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.75, 1, 1, 0.75]);

  // Interactive mouse tilt values
  const hoverRotateX = mouseOffset.y * (orientation === 'horizontal' ? -12 : -10);
  const hoverRotateY = mouseOffset.x * 12;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Ambient Colored Under-Glow Spill */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none transition-opacity duration-700 blur-2xl -z-10"
        style={{
          background: glowColor,
          opacity: 0.55,
        }}
      />

      {/* Frame Container with Scroll Physics */}
      <motion.div
        style={
          orientation === 'horizontal'
            ? {
                rotateX: horizontalRotateX,
                scale: horizontalScale,
                y: horizontalY,
                opacity: horizontalOpacity,
                transformStyle: 'preserve-3d',
              }
            : {
                rotateY: verticalRotateY,
                y: verticalY,
                scale: verticalScale,
                opacity: verticalOpacity,
                transformStyle: 'preserve-3d',
              }
        }
        animate={{
          rotateX: hoverRotateX,
          rotateY: hoverRotateY,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 180,
        }}
        className={`group relative overflow-hidden transition-all duration-300 ${
          orientation === 'horizontal'
            ? 'landscape-frame max-w-4xl mx-auto shadow-2xl'
            : 'phone-frame-dark max-w-[320px] sm:max-w-[340px] mx-auto shadow-2xl'
        }`}
      >
        {/* Device Top Pill / Speaker Bar (Dynamic Island for vertical, subtle notch for horizontal) */}
        {orientation === 'vertical' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-24 h-5 bg-black/90 rounded-full flex items-center justify-between px-3 border border-white/10 shadow-sm pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-black border border-white/20" />
          </div>
        )}

        {/* Screenshot Image Wrapper */}
        <div
          className={`relative w-full overflow-hidden rounded-[32px] bg-still-darkBg ${
            enableFeather ? 'edge-feather' : ''
          }`}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-auto block select-none object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Frosted Specular Sheen Layer */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/15 opacity-60 mix-blend-overlay" />
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
              onClick={() => setActiveHotspot(activeHotspot === pin ? null : pin)}
              aria-label={`Inspect ${pin.label}`}
              data-cursor="pointer"
              className="relative -translate-x-1/2 -translate-y-1/2 group/pin flex items-center justify-center"
            >
              <span className="absolute w-6 h-6 rounded-full bg-emerald-400/30 animate-ping" />
              <span className="relative w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-white shadow-md transition-transform group-hover/pin:scale-125" />
            </button>

            {/* Hotspot Floating Tooltip Card */}
            {activeHotspot === pin && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute z-40 top-5 -left-20 w-48 p-3 rounded-2xl glass-card-dark text-left shadow-xl border border-white/20 text-xs"
              >
                <div className="font-semibold text-emerald-300 mb-1">{pin.label}</div>
                <div className="text-slate-300 leading-relaxed text-[11px]">{pin.detail}</div>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
