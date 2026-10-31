import React, { useEffect, useRef } from 'react';

export type LivingTheme = 'CW' | 'FW' | 'MS' | 'TP' | 'CD' | 'ZR' | 'OA' | 'HW' | 'TD' | 'LT' | 'RT';

interface LivingCanvasProps {
  theme: LivingTheme;
  className?: string;
  isMini?: boolean;
}

export const LivingCanvas: React.FC<LivingCanvasProps> = ({ theme, className = '', isMini = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let lastTime = performance.now();
    let isVisible = true;
    let mouseX = -1000;
    let mouseY = -1000;
    let miniFrameCount = 0;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = isMini ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    if (!isMini) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      if (isMini) {
        miniFrameCount++;
        if (miniFrameCount % 3 !== 0) return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      time += delta * 1.1;

      const dpr = isMini ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      // Light Porcelain & Playful Pastel Background by default
      switch (theme) {
        case 'MS': {
          // Midnight Sage (Dark accent)
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, '#0E1714');
          grad.addColorStop(1, '#070C0A');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          ctx.fillStyle = 'rgba(210, 245, 108, 0.12)';
          ctx.beginPath();
          ctx.arc(width * 0.7, height * 0.3, 80, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case 'CD': {
          // Cosmic Dusk
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, '#F5EDFD');
          grad.addColorStop(1, '#E9DEF7');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          ctx.fillStyle = 'rgba(203, 180, 245, 0.35)';
          ctx.beginPath();
          ctx.arc(width * 0.5, height * 0.4, 120, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case 'FW':
        case 'CW':
        default: {
          // Clean White / Cheerful Wix-style pastel canvas
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, '#FAFBF8');
          grad.addColorStop(0.5, '#F7F9F5');
          grad.addColorStop(1, '#F2F6F0');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Flowing Lime Green Harmonic Wave
          ctx.fillStyle = 'rgba(210, 245, 108, 0.22)';
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 20) {
            const y = Math.sin(x * 0.003 + time * 0.6) * 24 + Math.cos(x * 0.001 - time * 0.3) * 14 + height * 0.72;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();

          // Flowing Periwinkle Wave
          ctx.fillStyle = 'rgba(143, 168, 255, 0.18)';
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 20) {
            const y = Math.cos(x * 0.003 - time * 0.5) * 20 + Math.sin(x * 0.002 + time * 0.4) * 12 + height * 0.8;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();

          // Sunny Warm Yellow Horizon Aura
          ctx.fillStyle = 'rgba(254, 214, 104, 0.16)';
          ctx.beginPath();
          ctx.arc(width * 0.85, height * 0.25, 110, 0, Math.PI * 2);
          ctx.fill();

          // Soft Coral Aura
          ctx.fillStyle = 'rgba(250, 123, 96, 0.12)';
          ctx.beginPath();
          ctx.arc(width * 0.12, height * 0.6, 90, 0, Math.PI * 2);
          ctx.fill();

          // Playful Floating Cartoon Bubbles
          const bubbleCount = isMini ? 4 : 8;
          for (let i = 0; i < bubbleCount; i++) {
            const seed = i * 55.3;
            const bx = (Math.sin(seed + time * 0.2) * 0.42 + 0.5) * width;
            const by = (Math.cos(seed * 0.8 + time * 0.15) * 0.42 + 0.5) * height;
            const radius = 16 + (i % 3) * 12;

            const isLime = i % 3 === 0;
            const isBlue = i % 3 === 1;

            ctx.fillStyle = isLime
              ? 'rgba(210, 245, 108, 0.28)'
              : isBlue
              ? 'rgba(143, 168, 255, 0.24)'
              : 'rgba(254, 214, 104, 0.24)';
            ctx.beginPath();
            ctx.arc(bx, by, radius, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (!isMini) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      observer.disconnect();
    };
  }, [theme, isMini]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`w-full h-full block ${className}`} />;
};
