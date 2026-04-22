'use client';

import React, { useState, useEffect, useRef } from "react";
import SatinLayer from "./SatinLayer";
import BelianskyMovingMaster from "./BelianskyMovingMaster";
import { OwnerVault } from './OwnerVault';
import AmbientEngine from './AmbientEngine';
import { Lang } from "@/lib/translations";
import { ArchitecturalPattern } from "./ArchitecturalPattern";
import { useSecurity } from "@/kernel/SecurityKernel";

// ═══════════════════════════════════════════════════
// PRISMATIC SILK INTERFACE v8.0 — SOVEREIGN VERSION
// L-CODE GUARDIAN — "300% or NOTHING."
// ═══════════════════════════════════════════════════

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
        const h = document.documentElement.scrollHeight || document.body.scrollHeight;
        window.parent.postMessage({
          type: 'LCODE_HEIGHT_SYNC',
          height: h,
          version: '8.0_RESTORATION'
        }, '*');
      };

      const obs = new ResizeObserver(sendHeight);
      obs.observe(document.body);
      window.addEventListener('resize', sendHeight);
      
      const timer = setInterval(sendHeight, 1000);
      setTimeout(() => clearInterval(timer), 10000);

      return () => {
        obs.disconnect();
        window.removeEventListener('resize', sendHeight);
        clearInterval(timer);
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
      if (t.testimonials) setCurrTestimonial(p => (p + 1) % t.testimonials.length);
    }, 5000);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(stepCycle);
      clearInterval(testimonialCycle);
    };
  }, [t.testimonials, scrolled]);

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
      console.error("L-CODE FORM ERROR: Odeslání dat selhalo. *smrk*", error);
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
  const langs: {code: Lang; label: string}[] = [
    {code:'SK',label:'SK'}, {code:'EN',label:'EN'}, {code:'GA',label:'IRL'}
  ];

  if (!isAuthorized) return null;

  return (
    <main className="relative min-h-screen bg-white font-sans text-beliansky-navy overflow-x-hidden selection:bg-prismatic selection:text-white elite-frame-unlocked">
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

            <div className={`mt-12 transition-all duration-1000 ${canEnter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              <button 
                onClick={handleEnter}
                className="magnetic group relative px-16 py-5 bg-white/10 backdrop-blur-3xl border border-beliansky-navy/10 text-beliansky-navy rounded-full font-black text-[12px] tracking-[1em] overflow-hidden hover:bg-beliansky-navy hover:text-white transition-all duration-700 shadow-xl"
              >
                <span className="relative z-10 transition-colors uppercase">VSTÚPIŤ</span>
                <div className="absolute inset-0 bg-beliansky-navy translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              </button>
            </div>
          </div>
          
          <div className="absolute top-12 left-12 text-[9px] font-black text-prismatic tracking-[1em] uppercase">Beliansky_Sovereign_v2.0</div>
          <div className="absolute bottom-12 right-12 text-[9px] font-black text-beliansky-navy/20 tracking-[1em] uppercase">L-CODE_DYNAMICS_INTERNAL</div>
        </div>
      )}

      <div className="bg-white text-beliansky-navy cursor-default uppercase relative min-h-screen"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F8F0FF 100%)' }}>
      
      <div className="fixed inset-0 border border-beliansky-purple/15 pointer-events-none z-[99999]" />

      <div className="bg-light-beam" style={{ animationDelay: '0s' }} />
      <div className="bg-light-beam" style={{ animationDelay: '7s', width: '20%', left: '30%' }} />
      <div className="bg-light-beam" style={{ animationDelay: '14s', width: '30%', left: '60%' }} />

      <div className="fixed left-4 top-0 h-screen flex items-center justify-center -rotate-180 [writing-mode:vertical-lr] text-[12px] font-black tracking-[2.5em] text-beliansky-navy/70 z-[100] pointer-events-none uppercase whitespace-nowrap hidden sm:flex">
        BELIANSKY — DIGITAL ARCHITECT — BELIANSKY — DIGITAL ARCHITECT — BELIANSKY — DIGITAL ARCHITECT
      </div>
      <div className="fixed right-4 top-0 h-screen flex items-center justify-center [writing-mode:vertical-lr] text-[12px] font-black tracking-[2.5em] text-beliansky-navy/70 z-[100] pointer-events-none uppercase whitespace-nowrap hidden sm:flex">
        ARCHITECTURE BY L-CODE DYNAMICS — ARCHITECTURE BY L-CODE DYNAMICS — ARCHITECTURE BY L-CODE DYNAMICS
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; height: auto !important; overflow: visible !important; }
        body { overscroll-behavior-y: auto !important; height: auto !important; overflow: visible !important; -webkit-overflow-scrolling: touch; }
        .elite-frame-unlocked { position: relative; }
        .prism-card, .stagger, section, h1, h2 { transform: translateZ(0); }
        .reveal-section { opacity: 1; transform: translateY(0); transition: 0.8s cubic-bezier(0.23,1,0.32,1); }
        .reveal-from-left { opacity: 1; transform: translateX(0); transition: 0.8s cubic-bezier(0.23,1,0.32,1); }
        .reveal-from-right { opacity: 1; transform: translateX(0); transition: 0.8s cubic-bezier(0.23,1,0.32,1); }
        .stagger { opacity: 1; transform: translateY(0); transition: 0.8s cubic-bezier(0.23,1,0.32,1); }
        .prism-card { background: #FFFFFF; border: 1px solid rgba(158, 63, 253, 0.15); box-shadow: 0 4px 20px rgba(22, 22, 63, 0.04); }
        .prism-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 30px 60px -15px rgba(158, 63, 253, 0.15); border-color: rgba(158, 63, 253, 0.4); }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .bg-light-beam { position: fixed; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(158, 63, 253, 0.08), transparent); pointer-events: none; z-index: 1; animation: beam-slow 20s linear infinite; }
        @keyframes beam-slow { 0% { transform: translate3d(-150%, 0, 0) skewX(-45deg); opacity: 0; } 20% { opacity: 0.1; } 100% { transform: translate3d(250%, 0, 0) skewX(-45deg); opacity: 0; } }
        .grid-static { background-size: 80px 80px; background-image: linear-gradient(to right, rgba(22,22,63,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,22,63,0.09) 1px, transparent 1px); }
        .grid-dynamic { background-size: 100px 100px; background-image: linear-gradient(to right, rgba(158,63,253,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.14) 1px, transparent 1px); animation: grid-twist 20s ease-in-out infinite; }
        @keyframes grid-twist { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(2%,2%,0); } }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-30%] grid-static opacity-70" />
        <div className="absolute inset-[-30%] grid-dynamic opacity-60" />
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-[11000] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl shadow-sm' : ''}`}>
        <button onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
          <img src="/logo.avif" alt="BELIANSKY" className="h-8 md:h-12 lg:h-14 w-auto" />
        </button>
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map(n => (
            <button key={n.key} onClick={() => goto(n.id)} className="text-[16px] font-black tracking-[0.4em] text-beliansky-navy hover:text-prismatic transition-all">
              {t.nav[n.key][lang]}
            </button>
          ))}
          <OwnerVault />
        </div>
      </nav>

      <div id="sovereign-scroller" className="relative z-10 pt-32">
        <section className="relative min-h-[80vh] flex flex-col justify-center pb-20">
          <ArchitecturalPattern />
          <div className="max-w-[140rem] mx-auto w-full px-8 md:px-24 relative z-20">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-8/12">
                <h1 className="hero-title relative flex flex-col">
                  <div className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-[-0.04em] text-beliansky-navy py-2">
                    <span className="text-prismatic uppercase">{t.hero.title_part1[lang]}</span>
                  </div>
                  <div className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-[-0.04em] text-[#16163F22] ml-[5vw] uppercase py-2">
                     {t.hero.title_part2[lang]}
                  </div>
                  <div className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-[-0.04em] text-beliansky-navy italic py-2">
                    <span className="text-prismatic uppercase">{t.hero.title_part3[lang]}</span>
                  </div>
                </h1>
              </div>
              <div className="w-full lg:w-4/12 flex flex-col items-start lg:pt-20">
                <p className="text-md md:text-xl text-beliansky-navy/60 font-bold tracking-tight mb-10 max-w-sm uppercase">
                  {t.hero.subtitle[lang]}
                </p>
                <div className="flex flex-col md:flex-row gap-6 w-full relative">
                  <button onClick={() => goto('contact')} className="magnetic group relative px-12 py-7 rounded-full bg-beliansky-navy text-white font-black text-[14px] tracking-[0.5em] overflow-hidden shadow-xl z-20">
                    <span className="relative z-10 uppercase">{t.cta.project[lang]}</span>
                  </button>
                  <div className="absolute right-[-10%] bottom-[-50%] w-[250px] opacity-40 pointer-events-none z-10">
                    <img src="/juraj.png" alt="" className="w-full h-auto grayscale contrast-125" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="relative py-28 px-8 md:px-24 reveal-section">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-20 text-beliansky-navy">
              {t.services.title[lang]}<span className="text-prismatic">.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {t.services.items.map((s: any, i: number) => (
                <div key={i} className="prism-card p-12 rounded-[4rem] flex flex-col bg-white">
                  <div className="text-4xl font-black text-prismatic mb-10">{s.price}</div>
                  <h3 className="text-2xl md:text-4xl font-black mb-10 uppercase text-beliansky-navy">{s[lang]}</h3>
                  <p className="text-[18px] text-beliansky-navy/70 mb-10 font-bold uppercase">{s.desc[lang]}</p>
                  <button onClick={() => goto('contact')} className="mt-auto w-full py-8 rounded-[2.5rem] text-[15px] font-black tracking-[0.5em] border-2 border-beliansky-navy/[0.1] text-beliansky-navy uppercase hover:bg-beliansky-navy hover:text-white transition-all">
                    {t.contact.cta[lang]}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative py-40 px-8 md:px-24 reveal-section">
          <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
            <div className="w-full lg:w-5/12 relative">
               <div className="prism-card p-0 rounded-[3.5rem] relative overflow-hidden h-[500px] flex items-end">
                <img src="/juraj.png" alt="Juraj" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] grayscale contrast-125 z-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-beliansky-navy via-transparent to-transparent z-10" />
               </div>
            </div>
            <div className="w-full lg:w-7/12">
              <h2 className="text-5xl md:text-8xl font-black mb-16 uppercase text-beliansky-navy leading-none tracking-tighter">
                {t.about.title[lang]}<span className="text-prismatic">.</span>
              </h2>
              <p className="text-[20px] md:text-[22px] font-bold text-beliansky-navy/80 leading-[1.7] uppercase tracking-wide">
                {t.about.description[lang]}
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-32 px-8 md:px-24 reveal-section">
          <div className="max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-7xl font-black tracking-tight mb-8 uppercase text-beliansky-navy">{t.contact.title[lang]}<span className="text-prismatic">!</span></h2>
              <p className="text-[14px] text-beliansky-navy/55 font-bold tracking-[0.15em] mb-20 uppercase">{t.contact.subtitle[lang]}</p>
              <div className="flex flex-col gap-6 text-2xl font-black text-beliansky-navy">
                <a href="tel:+421949830185">+421 949 830 185</a>
                <a href="mailto:laura.koordinator@gmail.com">LAURA.KOORDINATOR@GMAIL.COM</a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="prism-card p-14 rounded-[3rem]">
              <input placeholder="MENO" className="w-full bg-transparent border-b border-beliansky-navy/10 py-6 mb-8 outline-none font-black" />
              <input placeholder="EMAIL" className="w-full bg-transparent border-b border-beliansky-navy/10 py-6 mb-8 outline-none font-black" />
              <button type="submit" className="w-full py-8 bg-beliansky-navy text-white font-black tracking-[0.5em] rounded-full uppercase">
                {formSent ? 'SENT' : t.contact.cta[lang]}
              </button>
            </form>
          </div>
        </section>

        <footer className="py-10 px-8 border-t border-beliansky-navy/05 text-center text-[11px] font-black tracking-[0.5em] text-beliansky-navy/20 uppercase">
          {t.footer.copyright} // {t.footer.tagline}
        </footer>
      </div>

      <AmbientEngine />
      </div>
    </main>
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN v8.0 — "300% or NOTHING." smrk