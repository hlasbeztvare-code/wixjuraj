'use client';

import { useState, useRef, useEffect } from 'react';

interface AmbientMusicProps {
  youtubeId: string;
}

export default function AmbientMusic({ youtubeId }: AmbientMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const togglePlay = () => {
    setMuted(!muted);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[12000] flex items-center gap-4">
      {/* VISUALIZER - Animated Bars */}
      <div className="flex gap-[2px] items-end h-4 w-6">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className={`w-[3px] bg-prismatic rounded-full transition-all duration-300 ${!muted ? 'animate-music-bar' : 'h-1'}`}
            style={{ animationDelay: `${i * 0.1}s`, height: !muted ? '100%' : '2px' }}
          />
        ))}
      </div>

      <button 
        onClick={togglePlay}
        className="magnetic prism-card px-6 py-3 rounded-full text-[9px] font-black tracking-[0.3em] flex items-center gap-3 group overflow-hidden"
      >
        <span className="relative z-10 uppercase transition-colors group-hover:text-white">
          {muted ? 'PLAY_AMBIENT' : 'PAUSE_AUDIO'}
        </span>
        <div className={`absolute inset-0 bg-beliansky-navy transition-transform duration-500 translate-y-full group-hover:translate-y-0`} />
      </button>

      {/* HIDDEN YOUTUBE ENGINE */}
      <div className="hidden">
        <iframe
          ref={iframeRef}
          width="100"
          height="100"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&controls=0&mute=${muted ? 1 : 0}`}
          allow="autoplay"
        ></iframe>
      </div>

      <style jsx>{`
        @keyframes music-bar {
          0%, 100% { height: 2px; }
          50% { height: 16px; }
        }
        .animate-music-bar {
          animation: music-bar 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
