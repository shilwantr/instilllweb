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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let isVisible = true;
    let mouseX = 0;
    let mouseY = 0;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    if (!isMini) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Optimization: Pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

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
          for (let x = 0; x <= width; x += 10) {
            const y = Math.sin(x * 0.005 + time) * 30 + Math.cos(x * 0.002 - time * 0.5) * 20 + height * 0.65;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = 'rgba(197, 216, 164, 0.15)';
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 10) {
            const y = Math.cos(x * 0.004 - time * 0.8) * 25 + Math.sin(x * 0.003 + time) * 15 + height * 0.75;
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
          for (let i = 0; i < 20; i++) {
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

          // Crimson/violet nebula
          const rad1 = ctx.createRadialGradient(width * 0.3, height * 0.3, 10, width * 0.3, height * 0.3, width * 0.45);
          rad1.addColorStop(0, 'rgba(216, 70, 95, 0.25)');
          rad1.addColorStop(1, 'rgba(16, 8, 24, 0)');
          ctx.fillStyle = rad1;
          ctx.fillRect(0, 0, width, height);

          const rad2 = ctx.createRadialGradient(width * 0.7, height * 0.7, 10, width * 0.7, height * 0.7, width * 0.45);
          rad2.addColorStop(0, 'rgba(150, 70, 180, 0.2)');
          rad2.addColorStop(1, 'rgba(16, 8, 24, 0)');
          ctx.fillStyle = rad2;
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
          // Ferris Wheel (Default): Celestial glowing bubbles & ambient pastel clouds
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, '#0D1412');
          grad.addColorStop(0.5, '#131F1B');
          grad.addColorStop(1, '#0A0F0D');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Flowing organic harmonic waves
          for (let layer = 0; layer < 3; layer++) {
            const opacity = 0.07 + layer * 0.04;
            ctx.fillStyle = layer % 2 === 0 ? `rgba(143, 175, 155, ${opacity})` : `rgba(213, 166, 189, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(0, height);
            const speed = 0.6 + layer * 0.3;
            const freq = 0.003 + layer * 0.002;
            const amp = 35 + layer * 15;
            const offset = height * (0.6 + layer * 0.1);

            for (let x = 0; x <= width; x += 15) {
              const mouseDist = Math.hypot(x - mouseX, offset - mouseY);
              const mousePush = !isMini && mouseDist < 180 ? Math.sin(mouseDist / 25) * 12 : 0;
              const y = Math.sin(x * freq + time * speed) * amp + Math.cos(x * 0.002 - time * 0.4) * 20 + offset + mousePush;
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fill();
          }

          // Floating soft bubbles
          const bubbleCount = isMini ? 6 : 14;
          for (let i = 0; i < bubbleCount; i++) {
            const seed = i * 42.1;
            const bx = (Math.sin(seed + time * 0.25) * 0.45 + 0.5) * width;
            const by = (Math.cos(seed * 0.7 + time * 0.18) * 0.45 + 0.5) * height;
            const radius = 20 + (i % 5) * 16;

            const radGrad = ctx.createRadialGradient(bx, by, 2, bx, by, radius);
            const isPink = i % 3 === 0;
            radGrad.addColorStop(0, isPink ? 'rgba(213, 166, 189, 0.3)' : 'rgba(197, 216, 164, 0.25)');
            radGrad.addColorStop(0.7, isPink ? 'rgba(213, 166, 189, 0.08)' : 'rgba(197, 216, 164, 0.06)');
            radGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = radGrad;
            ctx.beginPath();
            ctx.arc(bx, by, radius, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

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
