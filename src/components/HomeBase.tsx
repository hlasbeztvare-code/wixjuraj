'use client';

import React, { useState, useEffect, useRef, useCallback } from "react";
import SatinLayer from "./SatinLayer";
import BelianskyMovingMaster from "./BelianskyMovingMaster";
import { OwnerVault } from './OwnerVault';
import AmbientEngine from './AmbientEngine';
import { Lang } from "@/lib/translations";
import { ArchitecturalPattern } from "./ArchitecturalPattern";
import { useSecurity } from "@/kernel/SecurityKernel";

// ═══════════════════════════════════════════════════
// PRISMATIC SILK INTERFACE v8.3 — 100% IDENTITY RESTORE
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
  const [lang, setLang] = useState<Lang>("SK"); 
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [currTestimonial, setCurrTestimonial] = useState(0);

  const t = jurajData ? { ...translations, ...jurajData } : translations;

  useEffect(() => {
    const handleS = () => {
      const h = document.documentElement.scrollHeight;
      setShowTopBtn(window.scrollY > h / 3);
      setScrolled(window.scrollY > 60);
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

    const stepCycle = setInterval(() => setActiveStep(p => (p + 1) % 4), 4500);
    const testimonialCycle = setInterval(() => {
      if (t.testimonials) setCurrTestimonial(p => (p + 1) % t.testimonials.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleS);
      clearInterval(interval);
      clearInterval(stepCycle);
      clearInterval(testimonialCycle);
    };
  }, [t.testimonials, scrolled]);

  const handleEnter = () => {
    window.dispatchEvent(new CustomEvent('START_AMBIENT'));
    setLoading(false);
  };

  const goto = (id: string) => {
    setMobileMenu(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setFormSent(true); 
    setTimeout(() => setFormSent(false), 3000); 
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
      frameId = requestAnimationFrame(smoothLogic);
    };
    frameId = requestAnimationFrame(smoothLogic);
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (!isAuthorized) return null;

  return React.createElement(
    'div', { className: "relative min-h-screen bg-white font-sans text-beliansky-navy overflow-x-hidden selection:bg-prismatic selection:text-white elite-frame" }, [
      loading && React.createElement('div', { key: 'loader', className: `fixed inset-0 z-[20000] bg-white flex flex-col items-center justify-center transition-all duration-1000 ${loadProgress >= 100 ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}` }, [
        React.createElement('div', { key: 'l-wrap', className: "relative w-64 md:w-96" }, [
          React.createElement('div', { key: 'l-bar', className: "h-[2px] w-full bg-beliansky-navy/05 relative overflow-hidden" }, [
            React.createElement('div', { key: 'l-fill', className: "absolute top-0 left-0 h-full bg-prismatic transition-all duration-300", style: { width: `${loadProgress}%` }})
          ]),
          React.createElement('div', { key: 'l-text', className: "flex justify-between items-end mt-4" }, [
            React.createElement('div', { key: 's-left' }, [
              React.createElement('div', { key: 'st', className: "text-[10px] font-black tracking-[0.5em] text-beliansky-navy uppercase" }, loadProgress < 100 ? 'System_Loading' : 'System_Ready'),
              React.createElement('div', { key: 'sb', className: "text-[8px] font-mono text-beliansky-navy/30 uppercase mt-1" }, loadProgress < 100 ? 'Encrypting_Neural_Interface...' : 'Awaiting_Validation...')
            ]),
            React.createElement('div', { key: 'sp', className: "text-4xl md:text-6xl font-black text-beliansky-navy font-display tabular-nums" }, `${loadProgress}%`)
          ]),
          canEnter && React.createElement('button', { key: 'l-btn', onClick: handleEnter, className: "mt-12 w-full py-6 bg-beliansky-navy text-white rounded-full font-black text-[12px] tracking-[0.5em] hover:bg-prismatic transition-all shadow-2xl" }, "INITIALIZE_SYSTEM_v8.3")
        ])
      ]),

      <div key="full-identity" className="bg-white text-beliansky-navy cursor-default uppercase relative min-h-screen" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F8F0FF 100%)' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes float-gentle { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .text-prismatic { background: linear-gradient(135deg, #9E3FFD 0%, #DDBBFF 30%, #7c3aed 60%, #9E3FFD 100%); background-size: 300% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradient-shift 8s ease infinite; }
          .text-outline-thin { -webkit-text-stroke: 1px rgba(22, 22, 63, 0.2); color: transparent; }
          .prism-card { background: #FFFFFF; border: 1px solid rgba(158, 63, 253, 0.15); box-shadow: 0 4px 20px rgba(22, 22, 63, 0.04); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
          .prism-card:hover { transform: translateY(-10px); box-shadow: 0 40px 80px rgba(158, 63, 253, 0.12); border-color: rgba(158, 63, 253, 0.4); }
          .grid-static { background-size: 80px 80px; background-image: linear-gradient(to right, rgba(22,22,63,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,22,63,0.06) 1px, transparent 1px); }
          .code-ghost { font-family: monospace; font-size: 10px; opacity: 0.05; pointer-events: none; letter-spacing: 0.3em; }
          .elite-frame { position: fixed; inset: 0; border: 1px solid rgba(158, 63, 253, 0.1); pointer-events: none; z-index: 99999; }
          @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        `}} />

        <div className="fixed inset-0 grid-static z-0 pointer-events-none" />
        <div className="elite-frame" />

        <nav className={`fixed top-0 left-0 right-0 z-[11000] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl shadow-sm' : ''}`}>
          <img src="/logo.avif" alt="LOGO" className="h-10 md:h-14 cursor-pointer hover:scale-105 transition-transform" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} />
          <div className="hidden lg:flex gap-10 items-center">
            {navLinks.map(n => <button key={n.key} onClick={() => goto(n.id)} className="text-[14px] font-black tracking-[0.4em] hover:text-prismatic transition-all">{t.nav[n.key][lang]}</button>)}
            <div className="flex gap-1 ml-4">
              {langs.map(l => <button key={l.code} onClick={() => setLang(l.code)} className={`w-9 h-9 rounded-full text-[11px] font-black ${lang===l.code ? 'bg-beliansky-navy text-white' : 'text-beliansky-navy/30'}`}>{l.label}</button>)}
            </div>
            <OwnerVault />
          </div>
        </nav>

        <section id="home" className="relative min-h-[90vh] flex flex-col justify-center pt-24 px-8 md:px-24">
          <ArchitecturalPattern />
          <div className="max-w-[130rem] mx-auto w-full relative z-20">
            <h1 className="flex flex-col">
              <div className="text-[12vw] lg:text-[8.5vw] font-black leading-[0.8] text-beliansky-navy uppercase tracking-tighter title-depth">
                <span className="text-prismatic">{t.hero.title_part1[lang]}</span>
              </div>
              <div className="text-[12vw] lg:text-[8.5vw] font-black leading-[0.8] text-outline-thin ml-[12vw] uppercase tracking-tighter">
                {t.hero.title_part2[lang]}
              </div>
              <div className="text-[12vw] lg:text-[8.5vw] font-black leading-[0.8] text-beliansky-navy italic uppercase tracking-tighter">
                <span className="text-prismatic">{t.hero.title_part3[lang]}</span>
              </div>
            </h1>
            <div className="mt-16 flex flex-col lg:flex-row gap-20 items-end justify-between">
              <p className="text-[18px] md:text-[22px] font-bold text-beliansky-navy/60 max-w-xl leading-tight uppercase tracking-tight">{t.hero.subtitle[lang]}</p>
              <button onClick={() => goto('contact')} className="magnetic px-16 py-8 bg-beliansky-navy text-white rounded-full font-black text-[14px] tracking-[0.6em] hover:bg-prismatic shadow-[0_40px_90px_rgba(158,63,253,0.35)] transition-all transform hover:scale-105 active:scale-95 uppercase">
                {t.cta.project[lang]}
              </button>
            </div>
            <div className="absolute right-[-10%] bottom-[-20%] w-[55%] opacity-40 pointer-events-none hidden lg:block">
              <img src="/juraj.png" alt="Juraj" className="grayscale w-full" />
            </div>
          </div>
        </section>

        <section className="py-12 border-y border-beliansky-navy/05 bg-white/40 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{animation: 'marquee 35s linear infinite'}}>
            {[...Array(10)].map((_,i) => <span key={i} className="text-[14px] font-black tracking-[1em] text-prismatic mx-24 uppercase">{t.hero.growth_metric[lang]}</span>)}
          </div>
        </section>

        <section id="process" className="py-32 px-8 md:px-24">
          <h2 className="text-5xl md:text-8xl font-black mb-24 tracking-tighter uppercase">{t.process.title[lang]}<span className="text-prismatic">.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {t.process.steps.map((s: any, i: number) => (
              <div key={i} className="prism-card p-12 rounded-[3.5rem] group">
                <div className="text-7xl font-black text-beliansky-navy/05 mb-8">0{s.id}</div>
                <h3 className="text-2xl font-black mb-6 uppercase">{s.title[lang]}</h3>
                <p className="text-[15px] text-beliansky-navy/50 font-bold leading-relaxed uppercase">{s.text[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="stats" className="py-32 px-8 md:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.stats.items.map((s: any, i: number) => (
              <div key={i} className="prism-card p-12 md:p-16 rounded-[4rem] flex flex-col items-center">
                 <div className="text-5xl md:text-8xl font-black text-beliansky-navy tabular-nums mb-6">{s.val}</div>
                 <div className="text-[11px] font-black tracking-[0.5em] text-prismatic uppercase">{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="py-40 px-8 md:px-24 relative">
          <div className="absolute top-0 right-[5%] code-ghost rotate-90">L_CODE_DYNAMICS_ARCHITECTURE</div>
          <div className="max-w-[110rem] mx-auto relative z-10">
            <h2 className="text-7xl md:text-9xl font-black mb-32 uppercase tracking-tighter">{t.services.title[lang]}<span className="text-prismatic">.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {t.services.items.map((s: any, i: number) => (
                 <div key={i} className="prism-card p-14 lg:p-16 rounded-[4.5rem] group flex flex-col justify-between" style={{ marginTop: `${(i % 3) * 70}px` }}>
                   <div>
                     <div className="text-5xl font-black text-prismatic mb-12 font-display">{s.price}</div>
                     <h3 className="text-3xl md:text-4xl font-black mb-10 leading-[0.9] uppercase">{s[lang]}</h3>
                     <p className="text-[18px] text-beliansky-navy/60 font-bold mb-14 leading-relaxed uppercase">{s.desc[lang]}</p>
                     <ul className="space-y-6 mb-16 opacity-40 group-hover:opacity-100 transition-opacity">
                       {s.bullets.map((b: any, j: number) => <li key={j} className="text-[13px] font-black tracking-widest flex gap-5 uppercase"><span className="w-2 h-2 bg-prismatic rounded-full mt-1.5" />{b}</li>)}
                     </ul>
                   </div>
                   <button onClick={() => goto('contact')} className="w-full py-8 border-2 border-beliansky-navy/10 rounded-full font-black text-[14px] tracking-[0.5em] hover:bg-beliansky-navy hover:text-white transition-all uppercase">INITIALIZE_LEAD</button>
                 </div>
               ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-48 px-8 md:px-24 bg-beliansky-navy/[0.02]">
           <div className="max-w-[130rem] mx-auto flex flex-col lg:flex-row gap-32 items-center">
              <div className="w-full lg:w-5/12 relative group">
                <div className="prism-card p-0 rounded-[4.5rem] overflow-hidden h-[650px] flex items-end">
                   <img src="/juraj.png" alt="Juraj" className="w-[145%] max-w-none grayscale -ml-[22%] group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
              <div className="w-full lg:w-7/12">
                <div className="text-prismatic font-black text-[12px] tracking-[1em] mb-12 uppercase">{t.about.tag[lang]}</div>
                <h2 className="text-6xl md:text-8xl font-black mb-16 leading-[0.95] uppercase tracking-tighter">{t.about.title[lang]}</h2>
                <p className="text-[20px] md:text-[25px] font-bold text-beliansky-navy/70 leading-relaxed uppercase whitespace-pre-line mb-20">{t.about.description[lang]}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {t.about.milestones.map((m: any, i: number) => (
                     <div key={i} className="p-12 border border-beliansky-navy/05 rounded-[3rem] bg-white shadow-sm">
                        <div className="text-prismatic font-black text-[11px] mb-4 tracking-widest">0{i+1}</div>
                        <div className="text-[13px] font-black text-beliansky-navy/40 uppercase tracking-widest leading-snug">{m[lang]}</div>
                     </div>
                   ))}
                </div>
              </div>
           </div>
        </section>

        <section id="testimonial" className="py-32 bg-white px-8">
           <div className="max-w-5xl mx-auto text-center">
              <div className="text-prismatic text-8xl font-serif mb-12">"</div>
              <div className="text-2xl md:text-4xl font-black text-beliansky-navy italic uppercase leading-tight transition-all duration-700">
                {t.testimonials[currTestimonial]?.text[lang]}
              </div>
              <div className="mt-12 text-[14px] font-black tracking-[0.5em] text-prismatic uppercase">
                {t.testimonials[currTestimonial]?.author} | {t.testimonials[currTestimonial]?.role[lang]}
              </div>
           </div>
        </section>

        <section id="contact" className="py-40 px-8 relative overflow-hidden">
           <div className="absolute bottom-[5%] left-[2%] code-ghost -rotate-90 opacity-[0.03]">ENCRYPTION_LAYER_ACTIVE</div>
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
              <div className="flex flex-col justify-center">
                 <h2 className="text-7xl md:text-9xl font-black uppercase mb-12 tracking-tighter">{t.contact.title[lang]}<span className="text-prismatic">!</span></h2>
                 <p className="text-[18px] font-bold text-beliansky-navy/50 uppercase tracking-[0.1em] mb-20">{t.contact.subtitle[lang]}</p>
                 <div className="space-y-6">
                    <a href="tel:+421949830185" className="prism-card p-12 rounded-[2.5rem] block group">
                       <div className="text-[10px] font-black text-prismatic tracking-[0.6em] mb-4 uppercase">SECURE_CALL_v3.2</div>
                       <div className="text-3xl md:text-5xl font-black text-beliansky-navy group-hover:text-prismatic transition-all tabular-nums">+421 949 830 185</div>
                    </a>
                 </div>
              </div>
              <form onSubmit={handleSubmit} className="prism-card p-16 md:p-20 rounded-[5rem]">
                 {['name', 'phone', 'email', 'note'].map(f => (
                   <div key={f} className="mb-12">
                      <label className="text-[11px] font-black tracking-[0.5em] mb-5 block text-beliansky-navy/40 uppercase">{t.contact.fields[f as keyof typeof t.contact.fields][lang]}</label>
                      <input required={f!=='note'} className="w-full bg-transparent border-b-2 border-beliansky-navy/05 py-4 font-black text-2xl focus:border-prismatic outline-none transition-all placeholder:text-beliansky-navy/10 uppercase" placeholder={`INPUT_${f}...`} />
                   </div>
                 ))}
                 <button className={`w-full py-10 rounded-full font-black text-[15px] tracking-[0.6em] transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl ${formSent ? 'bg-green-500 text-white':'bg-beliansky-navy text-white hover:bg-prismatic'}`}>
                    {formSent ? 'SYSTEM_TRANSMITTED' : 'INITIALIZE_PROJECT'}
                 </button>
              </form>
           </div>
        </section>

        <footer className="py-24 px-8 border-t border-beliansky-navy/05">
           <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="text-[11px] font-black tracking-[1em] text-beliansky-navy/20 uppercase">{t.footer.copyright}</div>
              <div className="text-[12px] font-black tracking-[0.5em] text-prismatic uppercase">{t.footer.tagline}</div>
              <div className="text-[11px] font-black tracking-[0.4em] text-beliansky-navy/20 uppercase">{t.footer.update[lang]}</div>
           </div>
        </footer>

        <AmbientEngine />
        <SatinLayer />
        <BelianskyMovingMaster />
      </div>
    ]
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN v8.3 — 100% IDENTITY RESTORED smrk
