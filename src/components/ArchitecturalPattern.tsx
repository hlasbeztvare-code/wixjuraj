"use client";
import React, { useEffect, useState } from 'react';

/**
 * L-CODE GUARDIAN: ARCHITECTURAL PATTERN ENGINE
 * Inspired by blueprint aesthetics and digital architecture.
 */
export const ArchitecturalPattern = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                    <pattern id="diag-lines" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="60" x2="60" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-beliansky-purple/30" />
                        <circle cx="0" cy="0" r="1" className="fill-beliansky-purple/20" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diag-lines)" />
                
                {/* MASSIVE STATIC BACKGROUND ELEMENTS */}
                <g className="opacity-[0.03] text-beliansky-navy select-none pointer-events-none">
                    <circle cx="10%" cy="10%" r="500" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="90%" cy="90%" r="600" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="20%" y="-10%" width="40%" height="120%" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="20 20" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.2" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="0.2" />
                </g>

                {/* LARGE TECHNICAL TEXT OVERLAYS */}
                <g className="opacity-[0.025] font-black text-beliansky-navy select-none pointer-events-none uppercase">
                    <text x="5%" y="45%" className="text-[12vw] leading-none">Webdesign</text>
                    <text x="50%" y="35%" className="text-[10vw] leading-none">Marketing</text>
                    <text x="55%" y="85%" className="text-[12vw] leading-none">Conversion</text>
                    <text x="10%" y="95%" className="text-[6vw] leading-none tracking-[1em]">Performance_Lead_Gen</text>
                </g>

                {/* COMMAND LINE FRAGMENTS */}
                <g className="opacity-[0.04] font-mono text-[10px] fill-beliansky-navy select-none pointer-events-none">
                    <text x="5%" y="15%">> yarn install --guardian</text>
                    <text x="5%" y="17%">> npm run build:production</text>
                    <text x="80%" y="15%">git commit -m "fixed_latency"</text>
                    <text x="80%" y="17%">docker-compose up -d</text>
                </g>

                {/* CORNER SCOPE MARKS */}
                <g className="opacity-20 stroke-beliansky-navy" fill="none">
                    <path d="M 2% 2% L 5% 2% M 2% 2% L 2% 5%" strokeWidth="1" />
                    <path d="M 98% 2% L 95% 2% M 98% 2% L 98% 5%" strokeWidth="1" />
                    <path d="M 2% 98% L 5% 98% M 2% 98% L 2% 95%" strokeWidth="1" />
                    <path d="M 98% 98% L 95% 98% M 98% 98% L 98% 95%" strokeWidth="1" />
                </g>
                
                {/* FLOATING CODE FRAGMENTS */}
                {[...Array(6)].map((_, i) => (
                    <g key={`code-${i}`} transform={`translate(${10 + i * 15}%, ${20 + (i % 3) * 25}%)`} className="opacity-[0.04] select-none pointer-events-none">
                        <text className="font-mono text-[9px] fill-beliansky-navy" style={{ transform: `rotate(${i % 2 === 0 ? '-10deg' : '10deg'})` }}>
                            {i === 0 && '<div className="guardian-v3.0">'}
                            {i === 1 && 'export default function App() {'}
                            {i === 2 && 'const [state, setState] = useState();'}
                            {i === 3 && '.glass-morphism { filter: blur(20px); }'}
                            {i === 4 && 'await Guardian.encrypt(data, key);'}
                            {i === 5 && 'grid-template-columns: repeat(12, 1fr);'}
                        </text>
                    </g>
                ))}

                {/* GRAPHIC DESIGN TERMINOLOGY */}
                {[...Array(5)].map((_, i) => (
                    <g key={`term-${i}`} transform={`translate(${5 + i * 22}%, ${70 + (i % 2) * 15}%)`} className="opacity-[0.06] select-none pointer-events-none">
                        <text className="font-black text-[11px] fill-prismatic tracking-[0.6em] uppercase">
                            {i === 0 && 'BRANDING_CORE_ENGINE'}
                            {i === 1 && 'SOCIAL_STRATEGY_v2'}
                            {i === 2 && 'PPC_ARCHITECTURE'}
                            {i === 3 && 'UI_UX_INTERACTION_LAB'}
                            {i === 4 && 'MARKETING_AUTOMATION'}
                        </text>
                    </g>
                ))}
                
                {/* TECHNICAL COORDINATE STREAMS */}
                <g className="opacity-20 text-[9px] font-black fill-beliansky-navy/40">
                   <text x="98%" y="10%" textAnchor="end" className="tracking-[1em]">SYSTEM_STABLE_v3.2</text>
                   <text x="98%" y="50%" textAnchor="end" className="tracking-[1em]">PLATFORM_ACTIVE_CORE</text>
                   <text x="98%" y="90%" textAnchor="end" className="tracking-[1em]">SECURE_PROTOCOL_L-CODE</text>
                </g>

                {/* SCHEMATIC ELEMENTS */}
                <g className="opacity-[0.05] stroke-beliansky-navy" fill="none">
                    <circle cx="80%" cy="20%" r="150" strokeWidth="0.5" strokeDasharray="15 8" />
                    <circle cx="80%" cy="20%" r="120" strokeWidth="0.8" />
                    <circle cx="20%" cy="80%" r="180" strokeWidth="0.4" strokeDasharray="5 5" />
                    <path d="M 10% 50% Q 50% 10% 90% 50%" strokeWidth="0.5" strokeDasharray="10 5" />
                </g>

                {/* COORDINATE STRIP */}
                <g className="opacity-15 text-[8px] font-mono fill-beliansky-navy/60">
                   {[...Array(20)].map((_, i) => (
                     <text key={i} x={`${i * 5}%`} y="2%" textAnchor="middle">+{i*100}ms</text>
                   ))}
                </g>

                {/* TECHNICAL NODES */}
                {[...Array(12)].map((_, i) => (
                    <g key={i} className="animate-float-gpu" style={{animationDelay: `${i * 1.5}s`, animationDuration: '35s'}}>
                        <circle cx={`${5 + i * 8}%`} cy={`${10 + (i % 4) * 20}%`} r="4" className="fill-prismatic/30" />
                        <line x1={`${5 + i * 8}%`} y1={`${10 + (i % 4) * 20}%`} x2={`${5 + i * 8 + 20}%`} y2={`${10 + (i % 4) * 20 + 20}%`} stroke="currentColor" strokeWidth="0.2" className="text-beliansky-navy/10" />
                        <text x={`${5 + i * 8 + 8}%`} y={`${10 + (i % 4) * 20 + 4}%`} className="text-[9px] font-black fill-beliansky-navy/20 uppercase tracking-[0.3em]">PTR_{i}</text>
                    </g>
                ))}
            </svg>
            
            <style jsx>{`
                @keyframes float-gpu {
                    0% { transform: translate3d(0, 0, 0) rotate(0deg); }
                    33% { transform: translate3d(10px, -15px, 0) rotate(1deg); }
                    66% { transform: translate3d(-5px, 10px, 0) rotate(-0.5deg); }
                    100% { transform: translate3d(0, 0, 0) rotate(0deg); }
                }
                .animate-float-gpu {
                    animation: float-gpu 25s ease-in-out infinite;
                }
            `}</style>
            
            <style jsx>{`
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(20px, -30px) rotate(2deg); }
                    66% { transform: translate(-10px, 15px) rotate(-1deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 0.5; }
                    90% { opacity: 0.5; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-float {
                    animation: float 25s ease-in-out infinite;
                }
                .animate-scan {
                    position: absolute;
                    animation: scan 8s linear infinite;
                }
            `}</style>
        </div>
    );
};
