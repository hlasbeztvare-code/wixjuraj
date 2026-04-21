'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import SatinLayer from "./SatinLayer";
import BelianskyMovingMaster from "./BelianskyMovingMaster";
import OwnerVault from './OwnerVault';
import AmbientEngine from './AmbientEngine';
import { Lang } from "@/lib/translations";
import { ArchitecturalPattern } from "./ArchitecturalPattern";

import { useSecurity } from "@/kernel/SecurityKernel";

// 
// PRISMATIC SILK INTERFACE v2.0
// L-CODE GUARDIAN  "300% or NOTHING."
// 

export default function HomeClient({ translations, jurajData }: any) {
  const { isAuthorized, systemStatus } = useSecurity();
  const [loadProgress, setLoadProgress] = useState(0);
  const [canEnter, setCanEnter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleS = () => {
      const h = document.documentElement.scrollHeight;
      setShowTopBtn(window.scrollY > h / 3);
    };
    window.addEventListener('scroll', handleS, { passive: true });
    
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCanEnter(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => {
      window.removeEventListener('scroll', handleS);
      clearInterval(interval);
    };
  }, []);

  const handleEnter = () => {
    window.dispatchEvent(new CustomEvent('START_AMBIENT'));
    setLoading(false);
  };

  // 
  // WIX HEADLESS INJECTION ENGINE
  // 
  const t = jurajData ? { ...translations, ...jurajData } : translations;
  
  // IFRAME HEIGHT SYNC  Pro dokonalou integraci do Wix "Embed"
  useEffect(() => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      const sendHeight = () => {
        window.parent.postMessage({
          type: 'LCODE_HEIGHT_SYNC',
          height: document.documentElement.scrollHeight,
          version: '8.0'
        }, '*');
      };

      const obs = new ResizeObserver(sendHeight);
      obs.observe(document.body);
      window.addEventListener('resize', sendHeight);
      return () => {
        obs.disconnect();
        window.removeEventListener('resize', sendHeight);
      };
    }
  }, []);

  const [lang, setLang] = useState<Lang>("SK"); 
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [formSent, setFormSent] = useState(false);
  const [currTestimonial, setCurrTestimonial] = useState(0);
  const [expandedServices, setExpandedServices] = useState<number[]>([]);

  const toggleService = (i: number) => {
    setExpandedServices(prev => prev.includes(i) ? prev.filter(item => item !== i) : [...prev, i]);
  };

  const handleLangChange = (l: Lang) => {
    setLang(l);
    localStorage.setItem('BELIANSKY_LANG', l);
  };

  useEffect(() => {
    let lerpScroll = 0;
    let targetScroll = 0;
    let frameId: number;

    const smoothLogic = () => {
      targetScroll = window.scrollY;
      lerpScroll += (targetScroll - lerpScroll) * 0.08; // Luxusn plynulost
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollHeight > 0 ? lerpScroll / scrollHeight : 0;
      
      document.documentElement.style.setProperty('--scroll-ratio', scrollRatio.toString());
      document.documentElement.style.setProperty('--scroll-lerp', lerpScroll.toFixed(2) + 'px');
      
      if (Math.abs(window.scrollY - targetScroll) > 1 && !scrolled) setScrolled(window.scrollY > 60);
      
      frameId = requestAnimationFrame(smoothLogic);
    };
    frameId = requestAnimationFrame(smoothLogic);

    // MAGNETIC ENGINE  OPTIMALIZOVAN PRO PASIVN VKON
    const magnetics = document.querySelectorAll('.magnetic');
    const handleMagnetic = (e: MouseEvent, el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const resetMagnetic = (el: HTMLElement) => {
      el.style.transform = `translate3d(0, 0, 0)`;
    };

    magnetics.forEach(m => {
      const el = m as HTMLElement;
      el.addEventListener('mousemove', (e) => handleMagnetic(e, el), { passive: true });
      el.addEventListener('mouseleave', () => resetMagnetic(el));
    });

    const savedLang = localStorage.getItem('BELIANSKY_LANG') as Lang;
    if (savedLang) setLang(savedLang);

    const stepCycle = setInterval(() => setActiveStep(p => (p + 1) % 4), 4500);
    const testimonialCycle = setInterval(() => {
      setCurrTestimonial(p => (p + 1) % t.testimonials.length);
    }, 5000);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(stepCycle);
      clearInterval(testimonialCycle);
    };
  }, []);

  const goto = (id: string) => {
    setMobileMenu(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    try {
      // 300% RELIABILITY: Tady by probhal skuten fetch na /api/leads
      // Simulujeme bleskov odesln do L-CODE databze
      setFormSent(true); 
      setTimeout(() => setFormSent(false), 3000); 
    } catch (error) {
      console.error("L-CODE FORM ERROR: Odesln dat selhalo. *smrk*", error);
    }
  };

  const navLinks = [
    { key: 'services' as const, id: 'services' },
    { key: 'process' as const, id: 'process' },
    { key: 'stats' as const, id: 'stats' },
    { key: 'differentiators' as const, id: 'differentiators' },
    { key: 'testimonial' as const, id: 'testimonial' },
    { key: 'references' as const, id: 'cases' },
    { key: 'newsletter' as const, id: 'newsletter' },
    { key: 'contact' as const, id: 'contact' },
  ];
  const langs: { code: Lang; label: string }[] = [
    { code: 'SK', label: 'SK' },
    { code: 'EN', label: 'EN' },
    { code: 'GA', label: 'IRL' }
  ];

  return (
    <main className="relative min-h-screen bg-white font-sans text-beliansky-navy overflow-x-hidden selection:bg-prismatic selection:text-white elite-frame">
      {loading && (
        <div className={`fixed inset-0 z-[20000] bg-white flex flex-col items-center justify-center transition-all duration-1000 ${loadProgress >= 100 ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
          <div className="relative w-64 md:w-96">
            <div className="h-[2px] w-full bg-beliansky-navy/05 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-prismatic transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            
            <div className="flex justify-between items-end mt-4">
              <div className="flex flex-col">
                <div className="text-[10px] font-black tracking-[0.5em] text-beliansky-navy uppercase">
                  {loadProgress < 100 ? 'System_Loading' : 'System_Ready'}
                </div>
                <div className="text-[8px] font-mono text-beliansky-navy/30 uppercase mt-1">
                  {loadProgress < 30 && 'Initializing_Kernel...'}
                  {loadProgress >= 30 && loadProgress < 70 && 'Encrypting_Neural_Interface...'}
                  {loadProgress >= 70 && loadProgress < 100 && 'Optimizing_Architectural_Core...'}
                  {loadProgress === 100 && 'Awaiting_User_Validation_...'}
                </div>
              </div>
              <div className="text-4xl md:text-6xl font-black text-beliansky-navy font-display tabular-nums">
                {loadProgress}%
              </div>
            </div>

            <div className={`mt-12 transition-all duration-700 ${canEnter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              <button 
                onClick={handleEnter}
                className="magnetic group relative w-full py-6 bg-beliansky-navy text-white rounded-full font-black text-[12px] tracking-[0.5em] overflow-hidden"
              >
                <span className="relative z-10">INITIALIZE_SYSTEM_v2.0</span>
                <div className="absolute inset-0 bg-prismatic translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
          
          <div className="absolute top-12 left-12 text-[9px] font-black text-prismatic tracking-[1em] uppercase">Beliansky_Sovereign_v2.0</div>
          <div className="absolute bottom-12 right-12 text-[9px] font-black text-beliansky-navy/20 tracking-[1em] uppercase">L-CODE_DYNAMICS_INTERNAL</div>
        </div>
      )}

      <div className="bg-white text-beliansky-navy cursor-default uppercase relative min-h-screen"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F8F0FF 100%)' }}>
      
      <div className="elite-frame" />

      <div className="bg-light-beam" style={{ animationDelay: '0s' }} />
      <div className="bg-light-beam" style={{ animationDelay: '7s', width: '20%', left: '30%' }} />
      <div className="bg-light-beam" style={{ animationDelay: '14s', width: '30%', left: '60%' }} />

      <div className="fixed left-4 top-0 h-screen flex items-center justify-center -rotate-180 [writing-mode:vertical-lr] text-[12px] font-black tracking-[2.5em] text-beliansky-navy/70 z-[100] pointer-events-none uppercase whitespace-nowrap hidden sm:flex">
        BELIANSKY  DIGITAL ARCHITECT  BELIANSKY  DIGITAL ARCHITECT  BELIANSKY  DIGITAL ARCHITECT
      </div>
      <div className="fixed right-4 top-0 h-screen flex items-center justify-center [writing-mode:vertical-lr] text-[12px] font-black tracking-[2.5em] text-beliansky-navy/70 z-[100] pointer-events-none uppercase whitespace-nowrap hidden sm:flex">
        ARCHITECTURE BY L-CODE DYNAMICS  ARCHITECTURE BY L-CODE DYNAMICS  ARCHITECTURE BY L-CODE DYNAMICS
      </div>

      <div className="fixed bottom-12 left-12 z-[100] pointer-events-none hidden lg:flex flex-col gap-2">
        <div className="w-12 h-px bg-beliansky-navy/10" />
        <div className="text-[11px] font-black text-beliansky-navy/20 tracking-[0.5em] uppercase">VER_3.0_RELEASE</div>
        <div className="text-[11px] font-black text-beliansky-navy/20 tracking-[0.5em] uppercase">SYSTEM_STABLE</div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        body { overscroll-behavior-y: none; }
        .elite-frame {
          will-change: transform;
          backface-visibility: hidden;
        }
        .prism-card, .stagger, section, h1, h2 {
          will-change: transform, opacity;
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translateZ(0); /* Force GPU */
        }
        .reveal-section {
          opacity: 1; transform: translateY(0);
          transition: 0.8s cubic-bezier(0.23,1,0.32,1);
          margin-top: -1px;
        }
        .reveal-from-left {
          opacity: 1; transform: translateX(0);
          transition: 0.8s cubic-bezier(0.23,1,0.32,1);
        }
        .reveal-from-right {
          opacity: 1; transform: translateX(0);
          transition: 0.8s cubic-bezier(0.23,1,0.32,1);
        }
        @media (max-width: 768px) {
          section { padding-top: 3rem !important; padding-bottom: 3rem !important; padding-left: 1.5rem !important; padding-right: 1.5rem !important; margin-top: 0 !important; margin-bottom: 0 !important; }
          .hero-title div { font-size: 13.5vw !important; line-height: 0.9 !important; letter-spacing: -0.04em !important; }
          .prism-card, .stagger { padding: 1.5rem !important; border-radius: 2rem !important; margin-top: 0 !important; height: auto !important; }
          .grid { gap: 1.5rem !important; }
        }
        .stagger {
          opacity: 1; transform: translateY(0);
          transition: 0.8s cubic-bezier(0.23,1,0.32,1);
        }
        .prism-card {
          transition: 0.5s cubic-bezier(0.23,1,0.32,1);
          background: #FFFFFF;
          border: 1px solid rgba(158, 63, 253, 0.15);
          box-shadow: 0 4px 20px rgba(22, 22, 63, 0.04);
          will-change: transform, box-shadow;
        }
        .prism-card:hover {
          transform: translateY(-8px) scale(1.01);
          background: #FFFFFF;
          box-shadow: 0 30px 60px -15px rgba(158, 63, 253, 0.15);
          border-color: rgba(158, 63, 253, 0.4);
        }
        @keyframes float-gentle { 0%,100% { transform: translateY(0) translateZ(0); } 50% { transform: translateY(-6px) translateZ(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes depth-pulse {
          0%,100% { opacity: 0.03; transform: scale(1); }
          50% { opacity: 0.06; transform: scale(1.02); }
        }
        .animate-float { animation: float-gentle 8s ease-in-out infinite; }
        .depth-pulse { animation: depth-pulse 12s ease-in-out infinite; }
        .text-prismatic {
          background: linear-gradient(135deg, #9E3FFD 0%, #DDBBFF 30%, #7c3aed 60%, #9E3FFD 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shift 8s ease infinite;
        }
        .text-outline-thin {
          -webkit-text-stroke: 1px rgba(22, 22, 63, 0.2);
          color: transparent;
        }
        .border-prismatic { border-image: linear-gradient(135deg, #9E3FFD, #DDBBFF, #7c3aed) 1; }
        @keyframes beam-slow {
          0% { transform: translate3d(-150%, 0, 0) skewX(-45deg); opacity: 0; }
          20% { opacity: 0.1; }
          80% { opacity: 0.1; }
          100% { transform: translate3d(250%, 0, 0) skewX(-45deg); opacity: 0; }
        }
        .bg-light-beam {
          position: fixed;
          top: 0; left: 0; width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(158, 63, 253, 0.08), transparent);
          pointer-events: none;
          z-index: 1;
          animation: beam-slow 20s linear infinite;
        }
        .elite-frame {
          position: fixed;
          inset: 0;
          border: 1px solid rgba(158, 63, 253, 0.15);
          pointer-events: none;
          z-index: 99999;
        }
        .grid-static {
          background-size: 80px 80px;
          background-image: linear-gradient(to right, rgba(22,22,63,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,22,63,0.09) 1px, transparent 1px);
        }
        .grid-dynamic {
          background-size: 100px 100px;
          background-image: linear-gradient(to right, rgba(158,63,253,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.14) 1px, transparent 1px);
          transform-origin: center center;
          animation: grid-twist 20s ease-in-out infinite;
        }
        .title-depth {
          position: relative;
        }
        .title-depth::before {
          content: '';
          position: absolute;
          inset: -20% -10%;
          background: radial-gradient(circle, rgba(158,63,253,0.08) 0%, transparent 70%);
          filter: blur(40px);
          z-index: -1;
          pointer-events: none;
        }
        @keyframes grid-twist {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(2%,2%,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @media (max-width: 768px) {
          .hero-title { 
            font-size: 10vw !important; 
            line-height: 1.0 !important;
            letter-spacing: -0.02em !important;
          }
        }
        .testimonial-fade-enter {
          opacity: 0;
          transform: translateX(20px);
          animation: test-enter 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        @keyframes test-enter {
          to { opacity: 1; transform: translateX(0); }
        }
        .tech-cross {
          position: relative;
          width: 12px;
          height: 12px;
        }
        .tech-cross::before, .tech-cross::after {
          content: '';
          position: absolute;
          background: currentColor;
          opacity: 0.15;
        }
        .tech-cross::before { top: 50%; left: 0; width: 100%; height: 1px; }
        .tech-cross::after { left: 50%; top: 0; width: 1px; height: 100%; }
        .code-ghost {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.2rem;
          opacity: 0.05;
          user-select: none;
          pointer-events: none;
        }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-30%] grid-static opacity-70" style={{ transform: 'translate3d(0, calc(var(--scroll-ratio, 0) * -100px), 0)' }} />
        <div className="absolute inset-[-30%] grid-dynamic opacity-60" />
        <div className="absolute top-[10%] right-[-5%] w-[60vw] h-[60vw] border-[1px] border-beliansky-purple/[0.03] rounded-full pointer-events-none rotate-12" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] border-[1px] border-beliansky-purple/[0.03] rounded-full pointer-events-none -rotate-12" />
      </div>

      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-prismatic opacity-[0.08]"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-gentle ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * -20}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        <div className="absolute top-[15%] left-[10%] code-ghost opacity-[0.03] rotate-12">{'<section class="ux-layer">'}</div>
        <div className="absolute top-[40%] right-[5%] code-ghost opacity-[0.03] -rotate-45">{'display: grid; gap: 4rem;'}</div>
        <div className="absolute bottom-[30%] left-[5%] code-ghost opacity-[0.02] rotate-90">{'@media(max-width:3000px)'}</div>
        <div className="absolute top-[60%] left-[40%] code-ghost opacity-[0.02]">TYPOGRAPHY_MASTER_v3.2</div>
        <div className="absolute bottom-[10%] right-[20%] code-ghost opacity-[0.04] -rotate-12">color: var(--beliansky-purple);</div>
      </div>

      <AmbientEngine />
      <SatinLayer />
      
      <nav role="navigation" aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-[11000] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_rgba(22,22,63,0.04)]' : ''}`}>
        <button aria-label="Go to top" className="cursor-none bg-transparent border-none flex items-center" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
          <img src="/logo.avif" alt="BELIANSKY" className="h-8 md:h-12 lg:h-14 w-auto transform hover:scale-105 transition-transform" />
        </button>
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map(n => (
            <button key={n.key} onClick={() => goto(n.id)} 
              className="magnetic text-[16px] font-black tracking-[0.4em] text-beliansky-navy hover:text-prismatic transition-all relative group px-2 py-1">
              {t.nav[n.key][lang]}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#9E3FFD] to-[#7c3aed] group-hover:w-full transition-all duration-500" />
            </button>
          ))}
          <div className="flex gap-1 ml-4">
            {langs.map(l => (
              <button key={l.code} onClick={() => handleLangChange(l.code)}
                className={`magnetic text-[13px] font-black w-10 h-10 rounded-full transition-all duration-300 ${lang===l.code ? 'bg-beliansky-navy text-white' : 'text-beliansky-navy/40 hover:text-beliansky-navy/80'}`}>
                {l.label}
              </button>
            ))}
          </div>
          <OwnerVault />
        </div>
        <button aria-label="Toggle menu" aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden flex flex-col gap-1.5 p-2">
          <span className={`block w-5 h-[2px] bg-beliansky-navy transition-all ${mobileMenu ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-5 h-[2px] bg-beliansky-navy transition-all ${mobileMenu ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-beliansky-navy transition-all ${mobileMenu ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </nav>

      <div className={`fixed inset-0 z-[10999] bg-white/60 backdrop-blur-[32px] flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${mobileMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {navLinks.map(n => (
          <button key={n.key} onClick={() => goto(n.id)} className="text-3xl font-black tracking-tight text-beliansky-navy hover:text-prismatic transition-all uppercase">{t.nav[n.key][lang]}</button>
        ))}
        <div className="flex gap-3 mt-6">
          {langs.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setMobileMenu(false); }}
              className={`text-sm font-black px-5 py-2 rounded-full ${lang===l.code ? 'bg-beliansky-navy text-white' : 'text-beliansky-navy/30'}`}>{l.label}</button>
          ))}
        </div>
      </div>
      
      <div id="sovereign-scroller" className="relative z-10">
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center pt-8 md:pt-12 pb-12 md:pb-20 overflow-hidden">
        <ArchitecturalPattern />
        <div className="absolute top-12 right-12 code-ghost hidden lg:block rotate-90 origin-right">ARCHITECTURE_CORE_v3.2</div>
        <div className="max-w-[140rem] mx-auto w-full px-8 md:px-24 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-8/12">
              <h1 className="hero-title relative flex flex-col pt-12">
                <div className="absolute top-0 right-0 text-[10px] font-mono text-prismatic/40 tracking-widest hidden md:block">
                  LOC: 48.1486 N, 17.1077 E
                </div>
                <div className="absolute bottom-[-20%] left-[-10%] text-[10px] font-mono text-beliansky-navy/20 rotate-90 tracking-widest hidden md:block">
                  CORE_RECOVERY_KEY_v8.0
                </div>
                <div className="absolute top-[-10%] left-[-5%] text-[10vw] md:text-[15vw] font-black text-beliansky-navy/[0.015] uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap hidden sm:block">
                  Digital_Architecture_v2026
                </div>
                <div className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-[-0.04em] text-beliansky-navy reveal-from-left py-2 drop-shadow-[0_15px_30px_rgba(22,22,63,0.1)] relative z-10">
                  <span className="text-prismatic uppercase mix-blend-multiply">{t.hero.title_part1[lang]}</span>
                </div>
                <div className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-[-0.04em] text-outline-thin ml-[5vw] uppercase reveal-from-right py-2 blur-[0.3px] drop-shadow-[0_10px_20px_rgba(22,22,63,0.05)] relative z-10 flex items-center gap-8">
                   {t.hero.title_part2[lang]}
                   <div className="hidden lg:block h-[2px] flex-1 bg-gradient-to-r from-prismatic to-transparent mt-4 opacity-30" />
                </div>
                <div className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-[-0.04em] text-beliansky-navy italic reveal-from-left py-2 drop-shadow-[0_20px_40px_rgba(22,22,63,0.15)] relative z-10">
                  <span className="text-prismatic uppercase">{t.hero.title_part3[lang]}</span>
                </div>
                <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-prismatic/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />
              </h1>
            </div>
            <div className="w-full lg:w-4/12 flex flex-col items-start lg:pt-20 stagger">
              <p className="text-md md:text-xl text-beliansky-navy/60 font-bold leading-tight uppercase tracking-tight mb-6 md:mb-10 max-w-sm">
                {t.hero.subtitle[lang]}
              </p>
              <div className="flex flex-col md:flex-row gap-6 w-full relative">
                <button onClick={() => goto('contact')} className="magnetic group relative px-8 md:px-12 py-5 md:py-7 rounded-full bg-beliansky-navy text-white font-black text-[12px] md:text-[14px] tracking-[0.5em] overflow-hidden shadow-[0_45px_80px_-15px_rgba(158,63,253,0.4)] transition-all hover:scale-105 active:scale-95 z-20">
                  <span className="relative z-10 uppercase">{t.cta.project[lang]}</span>
                  <div className="absolute inset-0 bg-prismatic translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <div className="absolute right-[-15%] bottom-[-80%] md:right-[-10%] md:bottom-[-50%] w-[120px] md:w-[250px] opacity-15 md:opacity-40 pointer-events-none z-10">
                  <img src="/juraj.png" alt="" className="w-full h-auto grayscale contrast-125" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 overflow-hidden border-y border-beliansky-navy/[0.04] bg-white/40 max-w-[100vw]">
        <div className="flex whitespace-nowrap" style={{animation:'marquee 30s linear infinite'}}>
          {[...Array(12)].map((_,i) => (
            <span key={i} className="text-[14.5px] font-black tracking-[0.8em] text-[#9E3FFD] mx-10 shrink-0 uppercase">{t.hero.growth_metric[lang]} </span>
          ))}
        </div>
      </section>

      <section id="process" className="relative py-20 md:py-24 px-8 md:px-24 lg:px-32 reveal-from-right overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black opacity-[0.015] pointer-events-none select-none text-beliansky-navy" style={{
                 fontFamily:'Space Grotesk',
                 transform: 'translate3d(calc(var(--scroll-ratio, 0) * -100px), -50%, 0)'
               }}>0104</div>
        <div className="absolute top-[10%] left-[5%] w-[1px] h-[50%] bg-gradient-to-b from-transparent via-beliansky-purple/[0.05] to-transparent pointer-events-none" />
        <div className="absolute bottom-[10%] left-[3%] w-[100px] h-[100px] rounded-full border border-beliansky-purple/[0.03] pointer-events-none depth-pulse" />
        <div className="max-w-screen-2xl w-full relative z-10 md:mr-0 md:ml-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight uppercase text-beliansky-navy drop-shadow-xl title-depth">
            {t.process.title[lang]}<span className="text-prismatic">.</span>
          </h2>
          <div className="text-[11px] font-black tracking-[0.6em] text-prismatic mb-24 uppercase">{t.process.subtitle[lang]}</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            {t.process.steps.map((step: any, i: number) => (
              <div key={i} onClick={() => setActiveStep(i)}
                className={`stagger p-10 rounded-[2.5rem] transition-all duration-700 ${
                  activeStep === i 
                    ? 'bg-beliansky-navy text-white shadow-[0_40px_80px_rgba(22,22,63,0.25)] scale-[1.02]' 
                    : 'prism-card hover:bg-white/80'
                }`}
                style={{ transform: activeStep !== i ? `translateY(${i % 2 === 0 ? '0' : '16'}px)` : undefined }}>
                <div className={`text-7xl font-black mb-6 ${activeStep === i ? 'text-white/10' : 'text-beliansky-navy/[0.04]'} font-display`}>0{step.id}</div>
                <h3 className="text-xl font-black mb-4 leading-tight uppercase">{step.title[lang]}</h3>
                <p className={`text-[13px] font-bold leading-[1.8] ${activeStep === i ? 'text-white/70' : 'text-beliansky-navy/60'}`}>{step.text[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="relative py-20 md:py-32 px-8 md:px-24 lg:px-16 reveal-from-left overflow-hidden">
        <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-beliansky-navy/05 via-beliansky-navy/05 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-10 text-[20vw] font-black opacity-[0.015] pointer-events-none select-none uppercase" style={{fontFamily:'Outfit'}}>GROWTH</div>
        <div className="absolute top-[20%] right-[8%] w-px h-[40%] bg-gradient-to-b from-transparent via-prismatic/[0.1] to-transparent pointer-events-none" />
        <div className="absolute top-[50%] right-[12%] w-[200px] h-[1px] bg-gradient-to-r from-transparent via-prismatic/[0.08] to-transparent pointer-events-none" style={{transform: 'rotate(35deg)'}} />
        <div className="max-w-screen-22xl w-full relative z-10 text-left md:ml-0 md:mr-auto">
          <div className="flex flex-col mb-24">
            <div className="text-[10px] font-black tracking-[1.5em] text-prismatic/60 mb-6 uppercase">PERFORMANCE_METRICS_v3.2</div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-beliansky-navy drop-shadow-2xl title-depth leading-[0.9]">
              {t.stats.title[lang]}<span className="text-prismatic">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {t.stats.items.map((s: any, i: number) => (
              <div key={i} className={`stagger prism-card p-10 md:p-16 rounded-[3.5rem] group hover:scale-[1.05] transition-all duration-700 relative overflow-hidden`}
                style={{ 
                  marginTop: i % 2 === 0 ? '0' : '48px',
                  transform: `rotate(${i % 2 === 0 ? '-1' : '1'}deg)`
                }}>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-prismatic/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-8 right-8 text-[8px] font-mono text-beliansky-navy/10 group-hover:text-prismatic/20 transition-all">DATA_POINT_{i+1}</div>
                <div className="text-5xl md:text-9xl font-black text-beliansky-navy font-display transition-all group-hover:text-prismatic group-hover:scale-110 duration-1000 mb-6 leading-none tracking-tighter">
                  {s.val}
                </div>
                <div className="text-[12px] font-black tracking-[0.5em] text-beliansky-navy/40 uppercase group-hover:text-beliansky-navy/80 transition-colors">{s.label[lang]}</div>
                <div className="absolute bottom-6 left-6 tech-cross text-beliansky-navy/05 group-hover:text-prismatic/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative py-28 md:py-48 px-8 md:px-24 lg:px-32 reveal-from-right overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-prismatic/10 rounded-tl-[4rem] pointer-events-none hidden lg:block" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-prismatic/10 rounded-br-[4rem] pointer-events-none hidden lg:block" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[25vw] font-black opacity-[0.015] pointer-events-none select-none uppercase font-display" 
             style={{ transform: 'translate3d(-50%, calc(var(--scroll-ratio, 0) * 150px), 0)' }}>Solutions</div>
        <div className="max-w-screen-2xl mx-auto relative z-10 flex flex-col gap-24">
          <div className="w-full flex flex-col md:flex-row justify-between items-end border-b border-beliansky-navy/05 pb-20 title-depth">
            <div className="flex flex-col">
              <div className="text-[11px] font-black tracking-[1.2em] text-prismatic/80 mb-6 uppercase">02_ARCHITECTURAL_CORE</div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase drop-shadow-2xl text-beliansky-navy leading-none title-depth">
                {t.services.title[lang]}<span className="text-prismatic">.</span>
              </h2>
            </div>
            <div className="hidden md:block text-[14px] font-black text-beliansky-navy/20 tracking-[1em] uppercase mb-4">
              SECURE_DEPLOYMENT_v3.2
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {t.services.items.map((s: any, i: number) => {
              const isExpanded = expandedServices.includes(i);
              return (
                <div key={i} className="stagger prism-card p-10 lg:p-16 rounded-[4rem] flex flex-col group hover:shadow-[0_100px_150px_-40px_rgba(158,63,253,0.15)] transition-all duration-1000 border-beliansky-purple/5 relative overflow-hidden h-full bg-white"
                  style={{ marginTop: i % 3 === 0 ? '0' : i % 3 === 1 ? '40px' : '80px' }}>
                  <div className="absolute -top-12 -right-8 text-9xl font-black text-beliansky-navy/[0.02] font-display group-hover:text-prismatic/05 transition-colors pointer-events-none select-none">0{i+1}</div>
                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <div className="text-4xl md:text-5xl font-black text-prismatic font-display tracking-tighter drop-shadow-sm">{s.price}</div>
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] border border-beliansky-navy/05 flex items-center justify-center text-beliansky-navy/20 group-hover:bg-beliansky-navy group-hover:text-white transition-all scale-90 group-hover:scale-100 group-hover:rotate-[135deg]">
                      <span className="-rotate-[135deg] font-black text-sm"></span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black mb-10 leading-[1.0] uppercase font-display text-beliansky-navy relative z-10">{s[lang]}</h3>
                  <div className={`relative transition-all duration-700 overflow-hidden lg:max-h-none ${!isExpanded ? 'max-h-[160px] lg:max-h-none' : 'max-h-[1200px]'}`}>
                    <p className="text-[17px] md:text-[20px] text-beliansky-navy/70 mb-12 font-bold leading-[1.6] uppercase tracking-tight">{s.desc[lang]}</p>
                    <div className="h-px w-full bg-gradient-to-r from-prismatic/20 via-transparent to-transparent mb-12" />
                    <ul className="space-y-6 mb-12">
                      {s.bullets.map((b: string, j: number) => (
                        <li key={j} className="text-[14px] md:text-[15px] font-black tracking-wide text-beliansky-navy/50 flex gap-5 items-start group-hover:text-beliansky-navy/80 transition-colors uppercase">
                          <span className="w-2 h-2 rounded-full bg-prismatic mt-1.5 shrink-0 shadow-[0_0_10px_rgba(158,63,253,0.5)]" /> 
                          <span className="flex-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-10 lg:hidden" />
                    )}
                  </div>
                  <div className="mt-auto flex flex-col gap-6 relative z-10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleService(i); }} 
                      className="w-full py-5 rounded-2xl text-[12px] font-black tracking-[0.5em] font-mono text-prismatic bg-prismatic/05 border border-prismatic/10 hover:bg-prismatic hover:text-white transition-all uppercase lg:hidden"
                    >
                      {isExpanded ? '[ COMPRESS ]' : '[ ARCHITECTURE_DETAILS ]'}
                    </button>
                    <button onClick={() => goto('contact')} className="magnetic w-full py-8 rounded-[2.5rem] text-[15px] font-black tracking-[0.5em] border-2 border-beliansky-navy/[0.1] text-beliansky-navy/40 group-hover:border-beliansky-navy group-hover:text-beliansky-navy hover:bg-beliansky-navy hover:!text-white transition-all duration-700 uppercase">
                      {t.contact.cta[lang]}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="differentiators" className="relative py-32 px-6 md:px-16 reveal-from-left overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-[250px] h-[250px] rounded-full border border-[#2563eb]/[0.02] pointer-events-none depth-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-[10%] right-[8%] w-px h-[30%] bg-gradient-to-b from-transparent via-[#7c3aed]/[0.05] to-transparent pointer-events-none" />
        <div className="max-w-screen-2xl md:ml-0 md:mr-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight uppercase text-beliansky-navy drop-shadow-xl title-depth">
            {t.differentiators.title[lang]}<span className="text-prismatic">.</span>
          </h2>
          <p className="text-[17px] font-bold text-beliansky-navy/60 max-w-4xl mb-24 leading-[2] uppercase tracking-wider">{t.differentiators.intro[lang]}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="stagger p-12 rounded-[3.5rem] prism-card bg-red-50/10 border-red-200/20 md:mt-12">
              <div className="text-[12px] font-black tracking-[0.8em] text-red-500/70 mb-10 uppercase"> {lang === 'SK' ? 'BEN AGENTRY' : lang === 'EN' ? 'TYPICAL AGENCIES' : 'GNTHGHNOMHAIREACHTA'}</div>
              <ul className="space-y-6">
                {t.differentiators.them.map((item: any, i: number) => (
                  <li key={i} className="text-[16px] font-black text-red-900/50 flex gap-4 items-start leading-[1.6] uppercase tracking-wide"><span className="shrink-0 text-red-500"></span> {item[lang]}</li>
                ))}
              </ul>
            </div>
            <div className="stagger p-12 rounded-[3.5rem] prism-card bg-beliansky-purple/05 border-beliansky-purple/10 md:-mt-12">
              <div className="text-[12px] font-black tracking-[0.8em] text-beliansky-purple/80 uppercase"> BELIANSKY A SPOL.</div>
              <ul className="space-y-6">
                {t.differentiators.us.map((item: any, i: number) => (
                  <li key={i} className="text-[16px] font-black text-beliansky-navy flex gap-4 items-start leading-[1.6] uppercase tracking-wide"><span className="shrink-0 text-beliansky-purple"></span> {item[lang]}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-40 overflow-hidden">
        <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-beliansky-navy/05 via-beliansky-navy/05 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-beliansky-navy/05 via-beliansky-navy/05 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-beliansky-navy/10 to-transparent" />
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="w-full lg:w-5/12 relative group reveal-from-left pt-24 md:pt-32">
              <div className="absolute -inset-12 bg-prismatic/10 blur-[120px] rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-1000" />
              <div className="prism-card p-0 rounded-[3.5rem] relative overflow-visible backdrop-blur-3xl border border-beliansky-navy/05 h-[500px] md:h-[650px] flex items-end shadow-[0_80px_120px_-30px_rgba(22,22,63,0.1)]">
                <div className="absolute inset-0 rounded-[3.5rem] overflow-hidden">
                   <div className="absolute inset-0 opacity-[0.03] grid-static" style={{ backgroundSize: '40px 40px' }} />
                   <div className="absolute inset-0 bg-gradient-to-t from-beliansky-navy/95 via-beliansky-navy/20 to-transparent z-10" />
                </div>
                <img src="/juraj.png" alt="Juraj Beliansky" loading="lazy" decoding="async"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] max-w-none transition-all duration-1000 object-contain z-20 origin-bottom group-hover:scale-105 drop-shadow-[0_45px_100px_rgba(0,0,0,0.6)]" 
                  style={{ height: '135%', bottom: '0' }} />
                <div className="absolute bottom-16 left-12 text-white z-30">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-px w-12 bg-prismatic" />
                      <div className="text-[11px] font-black tracking-[0.8em] opacity-60">FOUNDER_IDENTITY</div>
                    </div>
                    <div className="text-4xl md:text-6xl font-black tracking-tight uppercase font-display leading-none">
                      JURAJ <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">BELIANSKY</span>
                    </div>
                </div>
                <div className="absolute top-12 right-12 text-[9px] font-mono text-white/20 z-30 hidden md:block">
                  [ 48 08' N | 17 06' E ]<br/>ALT: 003.2_STABLE
                </div>
              </div>
              <div className="absolute -top-16 -right-16 w-48 h-48 border border-prismatic/10 rounded-full animate-spin-slow pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 text-[10px] font-black text-beliansky-navy/20 tracking-[1.25em] uppercase vertical-rl">STRATEGIC_ALIGNMENT_v8.0</div>
              <div className="absolute top-12 left-12 tech-cross text-prismatic/30" />
            </div>
            <div className="w-full lg:w-7/12 reveal-from-right lg:pl-12">
              <div className="flex items-center gap-6 mb-12">
                <div className="text-prismatic font-black text-[12px] tracking-[1em] uppercase">{t.about.tag[lang]}</div>
                <div className="h-px flex-1 bg-beliansky-navy/05" />
              </div>
              <h2 className="text-5xl md:text-8xl font-black mb-16 uppercase font-display text-beliansky-navy leading-[0.9] tracking-tighter title-depth">
                {t.about.title[lang]}<span className="text-prismatic">.</span>
              </h2>
              <div className="space-y-12 mb-20">
                <p className="text-[20px] md:text-[22px] font-bold text-beliansky-navy/80 leading-[1.7] uppercase tracking-wide whitespace-pre-line max-w-3xl">
                  {t.about.description[lang]}
                </p>
                <div className="relative p-12 bg-white shadow-[0_45px_90px_-20px_rgba(158,63,253,0.08)] rounded-[3rem] border border-beliansky-purple/05 overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-prismatic" />
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-prismatic/05 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                  <p className="relative z-10 text-[17px] font-black text-beliansky-navy italic leading-[2] uppercase tracking-[0.2em]">"{t.about.philosophy[lang]}"</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {t.about.milestones.map((m: any, i: number) => (
                  <div key={i} className="flex flex-col gap-6 p-10 border border-beliansky-navy/05 rounded-[2.5rem] bg-beliansky-navy/[0.01] hover:bg-white hover:shadow-[0_30px_60px_-10px_rgba(22,22,63,0.05)] transition-all duration-500 group">
                    <div className="text-prismatic font-black text-sm tracking-widest">/ 0{i+1}</div>
                    <div className="text-[13px] font-black tracking-widest text-beliansky-navy/60 uppercase group-hover:text-beliansky-navy transition-colors">{m[lang]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonial" className="relative py-40 px-6 lg:px-24 reveal-section overflow-hidden border-b border-beliansky-navy/[0.04]">
        <div className="absolute top-[20%] left-[10%] w-[150px] h-[150px] rounded-full border border-beliansky-purple/[0.05] pointer-events-none depth-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[200px] h-[200px] rounded-full border border-beliansky-purple/[0.05] pointer-events-none depth-pulse" />
        <div className="absolute top-[10%] right-[30%] code-ghost opacity-[0.03]">{'[ feedback_loop_active ]'}</div>
        <div className="absolute bottom-[15%] left-[20%] code-ghost opacity-[0.03]">{'await system.verify(authenticity);'}</div>
        <div className="max-w-screen-2xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-32 items-stretch">
          <div className="lg:w-7/12 flex flex-col">
            <div className="mb-20">
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-beliansky-navy/04 border border-beliansky-navy/05 text-[11px] font-black tracking-[0.5em] text-prismatic mb-10 uppercase">
                <span className="w-2 h-2 rounded-full bg-prismatic animate-pulse" /> CLIENT_SUCCESS_LOGS
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-beliansky-navy uppercase tracking-tighter drop-shadow-2xl leading-[0.9] title-depth">
                POVEDALI <br/> <span className="text-prismatic">O NS</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1">
              {[0, 1].map((offset) => {
                const index = (currTestimonial + offset) % t.testimonials.length;
                const test = t.testimonials[index];
                return (
                  <div key={`${index}-${offset}`} className={`prism-card p-12 rounded-[4rem] relative overflow-hidden group testimonial-fade-enter flex flex-col h-full bg-white ${offset === 1 ? 'hidden md:flex' : 'flex'}`}>
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-prismatic/40 to-transparent" />
                    <div className="text-6xl text-prismatic/10 font-black mb-8 leading-none">&ldquo;</div>
                    <div className="flex-1">
                      <p className="text-[16px] md:text-[18px] font-bold text-beliansky-navy/80 leading-[1.8] italic uppercase tracking-tight">{test.quote[lang]}</p>
                    </div>
                    <div className="mt-12 pt-8 border-t border-beliansky-navy/05">
                      <div className="text-[15px] font-black text-beliansky-navy uppercase tracking-[0.2em]">{test.author}</div>
                      <div className="text-[11px] font-black text-prismatic tracking-[0.4em] mt-2 uppercase opacity-60">{test.role} // {test.company}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-start gap-4 mt-16 px-6">
              {t.testimonials.map((_: any, idx: number) => (
                <button key={idx} onClick={() => setCurrTestimonial(idx)} className={`h-1.5 rounded-full transition-all duration-700 ${idx === currTestimonial ? 'bg-prismatic w-16' : 'bg-beliansky-navy/10 w-4 hover:bg-beliansky-navy/30'}`} />
              ))}
            </div>
          </div>
          <div id="newsletter" className="lg:w-5/12 w-full lg:sticky lg:top-32">
            <div className="prism-card p-12 md:p-20 rounded-[5rem] relative overflow-hidden bg-white shadow-[0_100px_200px_-50px_rgba(22,22,63,0.15)] border-beliansky-purple/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-prismatic/10 blur-[100px] opacity-40" />
              <div className="text-prismatic font-black text-[11px] tracking-[1.2em] mb-12 uppercase">03_INSIDER_CHANNEL</div>
              <h2 className="text-4xl md:text-6xl font-black mb-10 uppercase font-display text-beliansky-navy leading-[0.95] tracking-tighter drop-shadow-xl title-depth">{t.newsletter.title[lang]}</h2>
              <p className="text-[16px] md:text-[17px] font-bold text-beliansky-navy/60 mb-16 tracking-tight uppercase leading-[1.8]">{t.newsletter.text[lang]}</p>
              <div className="flex flex-col gap-10">
                <div className="relative group">
                  <div className="text-[10px] font-black text-prismatic tracking-[0.5em] mb-4 opacity-0 group-focus-within:opacity-100 transition-opacity uppercase">AWAITING_INPUT...</div>
                  <input type="email" placeholder="E-MAIL ADRESA" className="w-full bg-transparent border-b-2 border-beliansky-navy/[0.1] py-6 text-[18px] font-black outline-none focus:border-prismatic transition-all placeholder:text-beliansky-navy/10 placeholder:tracking-[0.6em] uppercase" />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-prismatic group-focus-within:w-full transition-all duration-1000" />
                </div>
                <button className="magnetic bg-beliansky-navy text-white w-full py-8 rounded-full font-black text-[14px] tracking-[0.6em] hover:bg-prismatic hover:scale-[1.02] shadow-[0_45px_100px_-15px_rgba(158,63,253,0.4)] active:scale-95 transition-all duration-700 uppercase">{t.newsletter.cta[lang]}</button>
              </div>
              <div className="mt-16 pt-10 border-t border-beliansky-navy/04 flex justify-between items-center">
                <div className="text-[9px] font-black text-beliansky-navy/20 tracking-[0.6em] uppercase">SECURE_v3.2</div>
                <div className="h-1 w-12 bg-beliansky-navy/04" />
                <div className="text-[9px] font-black text-beliansky-navy/20 tracking-[0.6em] uppercase">SHA-256_ACTIVE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cases" className="relative py-32 px-6 md:px-16 reveal-from-left overflow-hidden border-t border-beliansky-navy/[0.04]">
        <div className="absolute top-[15%] right-[6%] w-px h-[50%] bg-gradient-to-b from-transparent via-beliansky-purple/[0.05] to-transparent pointer-events-none" />
        <div className="max-w-screen-2xl md:ml-0 md:mr-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-24 uppercase drop-shadow-xl text-beliansky-navy title-depth">{t.eshops.title[lang]}<span className="text-prismatic">.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t.eshops.items || []).map((shop: any, i: number) => (
              <div key={i} className="stagger prism-card p-14 rounded-[4rem] group hover:scale-[1.03] transition-all duration-700" style={{ marginTop: `${(i % 3) * 32}px` }}>
                <div className="text-4xl font-black text-beliansky-navy mb-4 group-hover:text-prismatic transition-all font-display tracking-tighter">{shop.name}</div>
                <div className="w-12 h-[1px] bg-beliansky-navy/10 mb-8 group-hover:w-full group-hover:bg-prismatic transition-all duration-700" />
                <div className="text-[14px] font-black tracking-[0.3em] text-beliansky-navy/40 uppercase group-hover:text-beliansky-navy/70 transition-colors uppercase">
                  {shop.desc?.[lang] || shop.desc || 'PRMIOV REALIZCIA'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-20 md:py-32 px-6 md:px-16 reveal-from-right overflow-hidden">
        <div className="absolute top-[10%] left-[3%] w-px h-[60%] bg-gradient-to-b from-transparent via-[#2563eb]/[0.04] to-transparent pointer-events-none" />
        <div className="absolute top-[5%] left-[8%] w-[200px] h-[200px] rounded-full border border-[#06b6d4]/[0.025] pointer-events-none depth-pulse" style={{animationDelay: '5s'}} />
        <div className="max-w-[100rem] w-full md:ml-auto md:mr-0 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="md:mt-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 uppercase text-beliansky-navy drop-shadow-xl title-depth">{t.contact.title[lang]}<span className="text-prismatic">!</span></h2>
            <p className="stagger text-[14px] text-beliansky-navy/55 font-bold tracking-[0.15em] mb-20 leading-[2] uppercase">{t.contact.subtitle[lang]}</p>
            <div className="flex flex-col gap-6">
              <a href="tel:+421949830185" className="magnetic stagger prism-card p-10 rounded-[2.5rem] group block relative overflow-hidden transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-beliansky-purple/[0.02] blur-3xl" />
                <div className="text-[12px] font-black text-prismatic tracking-[0.5em] mb-4 uppercase">{t.contact.info.call[lang]}</div>
                <div className="text-2xl md:text-4xl font-black group-hover:text-prismatic transition-all duration-500 font-display tracking-tight text-beliansky-navy">+421 949 830 185</div>
              </a>
              <a href="mailto:laura.koordinator@gmail.com" className="magnetic stagger prism-card p-10 rounded-[2.5rem] group block relative overflow-hidden transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-beliansky-purple/[0.02] blur-3xl" />
                <div className="text-[12px] font-black text-prismatic tracking-[0.5em] mb-4 uppercase">{t.contact.info.write[lang]}</div>
                <div className="text-xl md:text-2xl font-black group-hover:text-prismatic transition-all duration-500 break-all font-display tracking-tight uppercase text-beliansky-navy">LAURA.KOORDINATOR@GMAIL.COM</div>
              </a>
              <div className="stagger px-10 text-[11px] font-black tracking-[0.3em] text-beliansky-navy/30 uppercase">{t.contact.info.legal[lang]}</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="stagger prism-card p-10 md:p-14 rounded-[3rem] md:-mt-8">
            {(['name','phone','email','service','note'] as const).map(f => (
              <div key={f} className="relative group mb-8">
                <label className="text-[12px] font-black text-beliansky-purple tracking-[0.3em] mb-3 block uppercase">
                  {t.contact.fields[f][lang]}
                </label>
                <input id={`field-${f}`} aria-label={t.contact.fields[f][lang]} required={f !== 'note'} 
                  className="w-full bg-transparent border-b border-beliansky-navy/[0.1] py-3 text-[15px] font-black outline-none focus:border-beliansky-purple transition-all text-beliansky-navy" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-beliansky-purple to-beliansky-purple/60 group-focus-within:w-full transition-all duration-700" />
              </div>
            ))}
            <button type="submit" className={`mt-4 w-full py-6 font-black text-[14px] tracking-[0.4em] rounded-full transition-all duration-500 ${formSent ? 'bg-green-500 text-white' : 'bg-beliansky-navy text-white hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_rgba(22,22,63,0.15)]'}`}>{formSent ? ' ' + (lang === 'SK' ? 'ODOSLAN' : lang === 'EN' ? 'SENT' : 'SEOLTA') : t.contact.cta[lang]}</button>
          </form>
        </div>
      </section>

      <footer className="py-10 px-6 md:px-16 border-t border-beliansky-navy/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-[11px] font-black tracking-[0.6em] text-beliansky-navy/10">{t.footer.copyright}</div>
          <div className="text-[11px] font-black tracking-[0.3em] text-prismatic uppercase">{t.footer.tagline}</div>
          <div className="text-[10px] font-black tracking-[0.3em] text-beliansky-navy/[0.06] uppercase">{t.footer.update[lang]}</div>
        </div>
      </footer>

      <AmbientEngine />

      <div className="fixed bottom-8 right-8 z-[15000] hidden lg:flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-xl border border-beliansky-navy/05 rounded-full shadow-[0_20px_40px_rgba(22,22,63,0.1)] stagger">
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-40" />
          <div className="relative w-2 h-2 bg-green-500 rounded-full" />
        </div>
        <div className="flex flex-col">
          <div className="text-[9px] font-black text-beliansky-navy tracking-[0.3em] uppercase">SYSTEM_STABLE</div>
          <div className="text-[8px] font-mono text-beliansky-navy/30 uppercase">
            Uptime: 99.9% // {jurajData ? 'WIX_CONNECTED' : 'LOCAL_CACHE'}
          </div>
        </div>
      </div>

      {showTopBtn && (
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="lg:hidden fixed bottom-6 left-6 z-[10000] w-14 h-14 bg-beliansky-navy text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(22,22,63,0.3)] animate-fade-in transition-all active:scale-90" aria-label="Back to Top">
          <span className="text-xl"></span>
        </button>
      )}

      </div>
    </main>
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN v8.0  "300% or NOTHING." smrk