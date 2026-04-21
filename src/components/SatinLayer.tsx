"use client";
import { useEffect, useRef } from 'react';

// BELIANSKY FLUID SPAGHETTI ENGINE — L-CODE GUARDIAN v8.0
// Description: Strands are no longer bound to a single static point.
// They flow organically across the screen like unraveled spaghetti in a stream.
export default function SatinLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;
    let time = 0;
    let animId: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, w, h);

      // MOUSE REACTIVITY DISABLED
      const mx = 0;
      const my = 0;

      // LAYER 1 REMOVED FOR PERFORMANCE (Mac Mini 2014)

      // ═══ LAYER 2: FLUID SPAGHETTI STREAMS ═══
      // These flow from one side to another, not from a single point
      const numStrands = 2;
      
      for (let i = 0; i < numStrands; i++) {
        const strandOffset = i * (w / numStrands);
        const mouseReact = mx * 200 * (i / numStrands);
        
        ctx.beginPath();
        // Start from top-ish
        const startX = strandOffset + mouseReact + Math.sin(time + i) * 50;
        const startY = -100;
        ctx.moveTo(startX, startY);

        for (let step = 0; step <= 6; step++) {
          const t = step / 6;
          const py = t * (h + 200) - 100;
          
          // The "Spaghetti" wave: sinuous, organic, overlapping
          const waveX = Math.sin(time * 0.5 + t * 3.0 + i * 0.7) * 120;
          const twistX = Math.cos(time * 0.3 + t * 2.0 + i * 0.4) * 60;
          const px = strandOffset + mouseReact + waveX + twistX;

          if (step === 0) ctx.moveTo(px, py);
          else ctx.bezierCurveTo(px, py - 50, px, py - 50, px, py);
        }

        const alpha = 0.08 + Math.sin(time + i) * 0.04;
        ctx.strokeStyle = `rgba(158, 63, 253, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        // Traveling pulses along the fluid streams
        const pProgress = (time * 0.1 + (i * 0.05)) % 1.0;
        const pY = pProgress * (h + 200) - 100;
        const pWaveX = Math.sin(time * 0.5 + pProgress * 3.0 + i * 0.7) * 120;
        const pTwistX = Math.cos(time * 0.3 + pProgress * 2.0 + i * 0.4) * 60;
        const pX = strandOffset + mouseReact + pWaveX + pTwistX;
        
        ctx.fillStyle = `rgba(158, 63, 253, ${0.3 * (1.0 - Math.abs(pProgress - 0.5) * 2)})`;
        ctx.beginPath();
        ctx.arc(pX, pY, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // FOG REMOVED FOR PERFORMANCE (Mac Mini 2014)

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none mix-blend-multiply opacity-90">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN