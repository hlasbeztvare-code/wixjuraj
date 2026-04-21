"use client";
import { useState, useRef, useEffect } from 'react';

// BELIANSKY AMBIENT ENGINE — L-CODE GUARDIAN v8.0
// Description: Strategic audio layer for immersive digital architecture.
// Source: https://www.youtube.com/watch?v=kbUnnO6pkIA (Interstellar - S.T.A.Y.)
// Note: Due to browser autoplay policies, user must interact to start.
export default function AmbientEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleStart = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(e => console.error("Auto-start audio failed:", e));
        setIsPlaying(true);
      }
    };
    window.addEventListener('START_AMBIENT', handleStart);
    return () => window.removeEventListener('START_AMBIENT', handleStart);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-8 right-8 z-[12000] flex items-center gap-4">
      <audio 
        ref={audioRef} 
        src="/ambient.mp3" // USER NEEDS TO PUT THE CONVERTED MP3 IN PUBLIC FOLDER
        loop
      />
      
      <button 
        onClick={toggle}
        className="magnetic group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-3xl border border-beliansky-navy/05 rounded-full hover:bg-beliansky-navy transition-all duration-500"
      >
        <div className="flex gap-1 items-center h-4">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className={`w-[2px] bg-prismatic transition-all duration-500 ${isPlaying ? 'animate-bounce' : 'h-1'}`}
              style={{ 
                height: isPlaying ? `${12 + Math.random() * 10}px` : '4px',
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
        
        <span className="text-[10px] font-black tracking-[0.3em] text-beliansky-navy group-hover:text-white uppercase">
          {isPlaying ? 'PAUSE_AMBIENT_v1.0' : 'PLAY_AMBIENT_v1.0'}
        </span>
      </button>

      {/* TECHNICAL INDICATOR */}
      <div className="hidden lg:block text-[8px] font-mono text-beliansky-navy/20 rotate-90 origin-left translate-x-2">
        STRATEGIC_AUDIO_PROTOCOL_ENGAGED
      </div>
    </div>
  );
}
