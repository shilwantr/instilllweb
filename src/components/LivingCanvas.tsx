import React, { useEffect, useRef } from 'react';

export type LivingTheme = 'FW' | 'CW' | 'MS' | 'TP' | 'CD' | 'ZR' | 'OA' | 'HW' | 'TD' | 'LT' | 'RT';

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

    // Optimization: Pause rendering completely when offscreen
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

      // Throttle mini cards to 20 FPS to keep GPU load ultra-lightweight
      if (isMini) {
        miniFrameCount++;
        if (miniFrameCount % 3 !== 0) return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      time += delta * 1.2;

      const dpr = isMini ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      // Render thematic waves / particles based on theme
      switch (theme) {
        case 'CW': {
          // Clean White: Soft porcelain sage waves
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, '#F5F7F6');
          grad.addColorStop(1, '#E9F0EC');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          ctx.fillStyle = 'rgba(143, 175, 155, 0.12)';
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 15) {
            const y = Math.sin(x * 0.005 + time) * 25 + Math.cos(x * 0.002 - time * 0.5) * 15 + height * 0.65;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = 'rgba(197, 216, 164, 0.15)';
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 15) {
            const y = Math.cos(x * 0.004 - time * 0.8) * 20 + Math.sin(x * 0.003 + time) * 12 + height * 0.75;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();
          break;
        }

        case 'MS': {
          // Midnight Sage: Deep eucalyptus slate + floating star motes
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, '#091210');
          grad.addColorStop(1, '#050A08');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Deep emerald harmonic glow
          const rad = ctx.createRadialGradient(width * 0.5, height * 0.4, 20, width * 0.5, height * 0.4, width * 0.6);
          rad.addColorStop(0, 'rgba(31, 92, 63, 0.35)');
          rad.addColorStop(1, 'rgba(9, 18, 16, 0)');
          ctx.fillStyle = rad;
          ctx.fillRect(0, 0, width, height);

          // Star motes
          const starCount = isMini ? 6 : 16;
          for (let i = 0; i < starCount; i++) {
            const x = (Math.sin(i * 99 + time * 0.2) * 0.5 + 0.5) * width;
            const y = (Math.cos(i * 33 + time * 0.15) * 0.5 + 0.5) * height;
            const alpha = Math.sin(time + i) * 0.3 + 0.5;
            ctx.fillStyle = `rgba(180, 220, 200, ${alpha * 0.6})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }

        case 'CD': {
          // Cosmic Dusk: Plum, violet & amber waves
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, '#100818');
          grad.addColorStop(0.6, '#1A0C22');
          grad.addColorStop(1, '#0D0614');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          const rad1 = ctx.createRadialGradient(width * 0.3, height * 0.3, 10, width * 0.3, height * 0.3, width * 0.45);
          rad1.addColorStop(0, 'rgba(216, 70, 95, 0.25)');
          rad1.addColorStop(1, 'rgba(16, 8, 24, 0)');
          ctx.fillStyle = rad1;
          ctx.fillRect(0, 0, width, height);
          break;
        }

        case 'OA': {
          // Ocean Abyss: Deep oceanic cyan dawn
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, '#040B12');
          grad.addColorStop(1, '#081726');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 15) {
            const y = Math.sin(x * 0.008 + time * 1.2) * 20 + height * 0.7;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.fill();
          break;
        }

        case 'FW':
        default: {
          // Ferris Wheel: Celestial glowing bubbles & ambient pastel clouds
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, '#0D1412');
          grad.addColorStop(0.5, '#131F1B');
          grad.addColorStop(1, '#0A0F0D');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Flowing organic harmonic waves (2 layers for lighter GPU footprint)
          for (let layer = 0; layer < 2; layer++) {
            const opacity = 0.08 + layer * 0.05;
            ctx.fillStyle = layer === 0 ? `rgba(143, 175, 155, ${opacity})` : `rgba(213, 166, 189, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(0, height);
            const speed = 0.5 + layer * 0.3;
            const freq = 0.003 + layer * 0.002;
            const amp = 28 + layer * 12;
            const offset = height * (0.65 + layer * 0.1);

            for (let x = 0; x <= width; x += 20) {
              const mouseDist = Math.hypot(x - mouseX, offset - mouseY);
              const mousePush = !isMini && mouseDist < 160 ? Math.sin(mouseDist / 25) * 8 : 0;
              const y = Math.sin(x * freq + time * speed) * amp + Math.cos(x * 0.002 - time * 0.4) * 16 + offset + mousePush;
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fill();
          }

          // Floating soft bubbles
          const bubbleCount = isMini ? 5 : 10;
          for (let i = 0; i < bubbleCount; i++) {
            const seed = i * 42.1;
            const bx = (Math.sin(seed + time * 0.22) * 0.45 + 0.5) * width;
            const by = (Math.cos(seed * 0.7 + time * 0.16) * 0.45 + 0.5) * height;
            const radius = 18 + (i % 4) * 14;

            const radGrad = ctx.createRadialGradient(bx, by, 2, bx, by, radius);
            const isPink = i % 2 === 0;
            radGrad.addColorStop(0, isPink ? 'rgba(213, 166, 189, 0.25)' : 'rgba(197, 216, 164, 0.22)');
            radGrad.addColorStop(0.7, isPink ? 'rgba(213, 166, 189, 0.06)' : 'rgba(197, 216, 164, 0.05)');
            radGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = radGrad;
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

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
};
