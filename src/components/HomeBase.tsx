'use client';

import React, { useState, useEffect, useRef, useCallback } from "react";
import SatinLayer from "./SatinLayer";
import BelianskyMovingMaster from "./BelianskyMovingMaster";
import OwnerVault from './OwnerVault';
import AmbientEngine from './AmbientEngine';
import { Lang } from "@/lib/translations";
import { ArchitecturalPattern } from "./ArchitecturalPattern";
import { useSecurity } from "@/kernel/SecurityKernel";

// ═══════════════════════════════════════════════════
// PRISMATIC SILK INTERFACE v8.0 — STABLE_CORE
// L-CODE GUARDIAN — "300% or NOTHING."
// ═══════════════════════════════════════════════════

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

export default function HomeBase({ translations, jurajData }: any) {
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

  const t = jurajData ? { ...translations, ...jurajData } : translations;
  
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
      lerpScroll += (targetScroll - lerpScroll) * 0.08;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollHeight > 0 ? lerpScroll / scrollHeight : 0;
      
      document.documentElement.style.setProperty('--scroll-ratio', scrollRatio.toString());
      document.documentElement.style.setProperty('--scroll-lerp', lerpScroll.toFixed(2) + 'px');
      
      if (Math.abs(window.scrollY - targetScroll) > 1 && !scrolled) setScrolled(window.scrollY > 60);
      
      frameId = requestAnimationFrame(smoothLogic);
    };
    frameId = requestAnimationFrame(smoothLogic);

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
  }, [t.testimonials.length]);

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
      setFormSent(true); 
      setTimeout(() => setFormSent(false), 3000); 
    } catch (error) {
      console.error("L-CODE FORM ERROR: Odeslan dat selhalo. *smrk*", error);
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="relative min-h-screen bg-white font-sans text-beliansky-navy overflow-x-hidden selection:bg-prismatic selection:text-white elite-frame">
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
                <span className="relative z-10">INITIALIZE_SYSTEM_v8.0</span>
                <div className="absolute inset-0 bg-prismatic translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
          
          <div className="absolute top-12 left-12 text-[9px] font-black text-prismatic tracking-[1em] uppercase">Beliansky_Sovereign_v8.0</div>
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
        <div className="text-[11px] font-black text-beliansky-navy/20 tracking-[0.5em] uppercase">VER_8.0_STABLE</div>
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
          transform: translateZ(0);
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
      </div>

      <SatinLayer />
      <BelianskyMovingMaster />
      
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
        <button aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden flex flex-col gap-1.5 p-2">
          <span className={`block w-5 h-[2px] bg-beliansky-navy transition-all ${mobileMenu ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-5 h-[2px] bg-beliansky-navy transition-all ${mobileMenu ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-beliansky-navy transition-all ${mobileMenu ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </nav>

      <div className={`fixed inset-0 z-[10999] bg-white/60 backdrop-blur-[32px] flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${mobileMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {navLinks.map(n => (
          <button key={n.key} onClick={() => goto(n.id)} className="text-3xl font-black tracking-tight text-beliansky-navy hover:text-prismatic transition-all uppercase">{t.nav[n.key][lang]}</button>
        ))}
      </div>
      
      <div id="sovereign-scroller" className="relative z-10">
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center pt-8 md:pt-12 pb-12 md:pb-20 overflow-hidden">
        <ArchitecturalPattern />
        <div className="max-w-[140rem] mx-auto w-full px-8 md:px-24 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-8/12">
              <div className="hero-title relative flex flex-col pt-12">
                <div className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-[-0.04em] text-beliansky-navy reveal-from-left py-2 drop-shadow-xl">
                  <span className="text-prismatic uppercase">{t.hero.title_part1[lang]}</span>
                </div>
                <div className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-[-0.04em] text-outline-thin ml-[5vw] uppercase reveal-from-right py-2">
                   {t.hero.title_part2[lang]}
                </div>
                <div className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-[-0.04em] text-beliansky-navy italic reveal-from-left py-2">
                  <span className="text-prismatic uppercase">{t.hero.title_part3[lang]}</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-4/12 flex flex-col items-start lg:pt-20 stagger">
              <p className="text-md md:text-xl text-beliansky-navy/60 font-bold leading-tight uppercase tracking-tight mb-6 md:mb-10 max-w-sm">
                {t.hero.subtitle[lang]}
              </p>
              <div className="flex flex-col md:flex-row gap-6 w-full relative">
                <button onClick={() => goto('contact')} className="magnetic group relative px-8 md:px-12 py-5 md:py-7 rounded-full bg-beliansky-navy text-white font-black text-[12px] md:text-[14px] tracking-[0.5em] overflow-hidden shadow-2xl z-20">
                  <span className="relative z-10 uppercase">{t.cta.project[lang]}</span>
                  <div className="absolute inset-0 bg-prismatic translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <div className="absolute right-[-15%] bottom-[-80%] md:right-[-10%] md:bottom-[-50%] w-[120px] md:w-[250px] opacity-15 md:opacity-40 pointer-events-none z-10">
                  <img src="/juraj.png" alt="" className="w-full h-auto grayscale" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 overflow-hidden border-y border-beliansky-navy/[0.04] bg-white/40">
        <div className="flex whitespace-nowrap" style={{animation:'marquee 30s linear infinite'}}>
          {[...Array(12)].map((_,i) => (
            <span key={i} className="text-[14.5px] font-black tracking-[0.8em] text-[#9E3FFD] mx-10 shrink-0 uppercase">{t.hero.growth_metric[lang]} </span>
          ))}
        </div>
      </section>

      <section id="process" className="relative py-20 px-8 md:px-24 reveal-from-right overflow-hidden">
        <div className="max-w-screen-2xl w-full relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 uppercase text-beliansky-navy title-depth">
            {t.process.title[lang]}<span className="text-prismatic">.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {t.process.steps.map((step: any, i: number) => (
              <div key={i} className={`stagger p-10 rounded-[2.5rem] transition-all duration-700 prism-card`}>
                <div className={`text-7xl font-black mb-6 text-beliansky-navy/[0.04]`}>0{step.id}</div>
                <h3 className="text-xl font-black mb-4 uppercase">{step.title[lang]}</h3>
                <p className={`text-[13px] font-bold text-beliansky-navy/60`}>{step.text[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="relative py-20 px-8 reveal-from-left overflow-hidden">
        <div className="max-w-screen-2xl w-full relative z-10">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-beliansky-navy title-depth leading-[0.9] mb-24">
            {t.stats.title[lang]}<span className="text-prismatic">.</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.stats.items.map((s: any, i: number) => (
              <div key={i} className={`stagger prism-card p-10 md:p-16 rounded-[3.5rem] hover:scale-105 transition-all duration-700`}>
                <div className="text-5xl md:text-9xl font-black text-beliansky-navy font-display mb-6">
                  {s.val}
                </div>
                <div className="text-[12px] font-black tracking-[0.5em] text-beliansky-navy/40 uppercase">{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative py-28 px-8 reveal-from-right overflow-hidden">
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="w-full flex justify-between items-end border-b border-beliansky-navy/05 pb-20 mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-beliansky-navy leading-none title-depth">
              {t.services.title[lang]}<span className="text-prismatic">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {t.services.items.map((s: any, i: number) => (
              <div key={i} className="stagger prism-card p-10 lg:p-16 rounded-[4rem] group transition-all duration-700">
                <div className="text-4xl md:text-5xl font-black text-prismatic font-display tracking-tighter mb-12">{s.price}</div>
                <h3 className="text-2xl md:text-4xl font-black mb-10 leading-none uppercase text-beliansky-navy">{s[lang]}</h3>
                <p className="text-[17px] text-beliansky-navy/70 mb-12 font-bold uppercase">{s.desc[lang]}</p>
                <ul className="space-y-6 mb-12">
                  {s.bullets.map((b: string, j: number) => (
                    <li key={j} className="text-[14px] font-black text-beliansky-navy/50 flex gap-5 items-start uppercase">
                      <span className="w-2 h-2 rounded-full bg-prismatic mt-1.5" /> 
                      <span className="flex-1">{b}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => goto('contact')} className="magnetic w-full py-8 rounded-[2.5rem] text-[15px] font-black tracking-[0.5em] border-2 border-beliansky-navy/[0.1] text-beliansky-navy hover:bg-beliansky-navy hover:text-white transition-all uppercase">
                  {t.contact.cta[lang]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative py-40 overflow-hidden px-8">
        <div className="max-w-screen-2xl mx-auto relative z-10 flex flex-col lg:flex-row gap-24 items-center">
            <div className="w-full lg:w-5/12 relative">
              <div className="prism-card p-0 rounded-[3.5rem] relative overflow-hidden h-[500px] md:h-[650px] flex items-end">
                <img src="/juraj.png" alt="Juraj Beliansky" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] max-w-none object-contain h-[135%]" />
              </div>
            </div>
            <div className="w-full lg:w-7/12 reveal-from-right">
              <h2 className="text-5xl md:text-8xl font-black mb-16 uppercase text-beliansky-navy leading-[0.9] title-depth">
                {t.about.title[lang]}<span className="text-prismatic">.</span>
              </h2>
              <p className="text-[20px] font-bold text-beliansky-navy/80 leading-[1.7] uppercase tracking-wide whitespace-pre-line mb-12">
                {t.about.description[lang]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {t.about.milestones.map((m: any, i: number) => (
                  <div key={i} className="p-10 border border-beliansky-navy/05 rounded-[2.5rem] bg-beliansky-navy/[0.01]">
                    <div className="text-prismatic font-black text-sm tracking-widest mb-4">0{i+1}</div>
                    <div className="text-[13px] font-black text-beliansky-navy/60 uppercase">{m[lang]}</div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </section>

      <section id="contact" className="relative py-20 px-8 reveal-from-right overflow-hidden">
        <div className="max-w-screen-2xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase text-beliansky-navy title-depth">{t.contact.title[lang]}<span className="text-prismatic">!</span></h2>
            <p className="text-[14px] text-beliansky-navy/55 font-bold tracking-[0.15em] mb-20 uppercase">{t.contact.subtitle[lang]}</p>
            <div className="flex flex-col gap-6">
              <a href="tel:+421949830185" className="prism-card p-10 rounded-[2.5rem] group block">
                <div className="text-[12px] font-black text-prismatic tracking-[0.5em] mb-4 uppercase">{t.contact.info.call[lang]}</div>
                <div className="text-2xl md:text-4xl font-black text-beliansky-navy uppercase">+421 949 830 185</div>
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="prism-card p-10 md:p-14 rounded-[3rem]">
            {['name','phone','email','service','note'].map(f => (
              <div key={f} className="mb-8">
                <label className="text-[12px] font-black text-beliansky-purple tracking-[0.3em] mb-3 block uppercase">
                  {t.contact.fields[f as keyof typeof t.contact.fields][lang]}
                </label>
                <input required={f !== 'note'} className="w-full bg-transparent border-b border-beliansky-navy/[0.1] py-3 text-[15px] font-black outline-none focus:border-beliansky-purple transition-all text-beliansky-navy" />
              </div>
            ))}
            <button type="submit" className={`w-full py-6 font-black text-[14px] tracking-[0.4em] rounded-full transition-all duration-500 ${formSent ? 'bg-green-500 text-white' : 'bg-beliansky-navy text-white hover:scale-[1.02]'}`}>
              {formSent ? 'SENT' : t.contact.cta[lang]}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-10 px-8 border-t border-beliansky-navy/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div className="text-[11px] font-black tracking-[0.6em] text-beliansky-navy/10">{t.footer.copyright}</div>
          <div className="text-[11px] font-black tracking-[0.3em] text-prismatic uppercase">{t.footer.tagline}</div>
        </div>
      </footer>

      <AmbientEngine />

      <div className="fixed bottom-8 right-8 z-[15000] hidden lg:flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-xl border border-beliansky-navy/05 rounded-full shadow-2xl">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <div className="text-[9px] font-black text-beliansky-navy tracking-[0.3em] uppercase">SYSTEM_STABLE</div>
      </div>

      </div>
    </div>
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN v8.0  "300% or NOTHING." smrk
