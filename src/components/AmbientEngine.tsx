"use client";
import React, { useState, useRef, useEffect } from 'react';

// BELIANSKY AMBIENT ENGINE — SOVEREIGN YOUTUBE EDITION v8.0
// Description: Strategic audio layer directly from YouTube.
// Song: Interstellar - S.T.A.Y. (kbUnnO6pkIA)

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function AmbientEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-ambient-player', {
        videoId: 'kbUnnO6pkIA',
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'loop': 1,
          'playlist': 'kbUnnO6pkIA',
          'modestbranding': 1,
          'showinfo': 0
        },
        events: {
          'onReady': () => setIsLoaded(true)
        }
      });
    };

    const handleStart = () => {
      if (playerRef.current && isLoaded) {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    };

    window.addEventListener('START_AMBIENT', handleStart);
    return () => window.removeEventListener('START_AMBIENT', handleStart);
  }, [isLoaded]);

  const toggle = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[12000] flex items-center gap-4">
      {/* HIDDEN PLAYER */}
      <div id="yt-ambient-player" className="hidden pointer-events-none opacity-0 invisible" />
      
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

      <div className="hidden lg:block text-[8px] font-mono text-beliansky-navy/20 rotate-90 origin-left translate-x-2">
        YOUTUBE_AUDIO_STREAM_ACTIVE
      </div>
    </div>
  );
}
