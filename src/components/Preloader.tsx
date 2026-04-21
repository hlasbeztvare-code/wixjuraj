'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return p + Math.floor(Math.random() * 5) + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* 3D LOGO ENGINE — Authentic Beliansky Logo */}
      <div className="relative mb-20 group">
        <div className="absolute -inset-20 bg-beliansky-purple/10 blur-[100px] rounded-full animate-pulse" />
        <div className="relative z-10 w-48 md:w-64 select-none">
          <img src="/logo.avif" alt="BELIANSKY Logo" className="w-full h-auto drop-shadow-[0_0_30px_rgba(158,63,253,0.3)]" />
        </div>
      </div>

      {/* PROGRESS SYSTEM */}
      <div className="w-64 h-[1px] bg-beliansky-navy/05 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-prismatic transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="text-[10px] font-black tracking-[0.8em] text-beliansky-navy/20 uppercase ml-[0.8em]">
          INITIALIZING_CORE_v1.0
        </div>
        <div className="text-[14px] font-black font-mono text-beliansky-purple">
          {percent.toString().padStart(3, '0')}%
        </div>
      </div>

      {/* L-CODE DYNAMICS BRANDING */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="w-8 h-[1px] bg-beliansky-navy/10" />
        <div className="text-[9px] font-black tracking-[0.4em] text-beliansky-navy/30 uppercase">
          L-CODE GUARDIAN ARCHITECTURE
        </div>
        <div className="w-8 h-[1px] bg-beliansky-navy/10" />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
