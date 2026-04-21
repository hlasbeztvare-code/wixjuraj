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
// PRISMATIC SILK INTERFACE v8.4 — 100% ABSOLUTE RESTORE
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
  const { isAuthorized } = useSecurity();
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
    }, 6000);

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

  if (!isAuthorized) return null;

  return React.createElement(
    'div', { className: "relative min-h-screen bg-white font-sans text-beliansky-navy overflow-x-hidden selection:bg-prismatic selection:text-white elite-frame" }, [
      loading && React.createElement('div', { key: 'loader', className: `fixed inset-0 z-[20000] bg-white flex flex-col items-center justify-center transition-all duration-1000 ${loadProgress >= 100 ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}` }, [
        React.createElement('div', { key: 'l-wrap', className: "relative w-64 md:w-96 text-beliansky-navy" }, [
          React.createElement('div', { key: 'l-bar', className: "h-[2px] w-full bg-beliansky-navy/05 relative overflow-hidden" }, [
            React.createElement('div', { key: 'l-fill', className: "absolute top-0 left-0 h-full bg-prismatic transition-all duration-300", style: { width: `${loadProgress}%` }})
          ]),
          React.createElement('div', { key: 'l-text', className: "flex justify-between items-end mt-4 font-black" }, [
            React.createElement('div', { key: 's-meta' }, [
              React.createElement('div', { key: 's-st', className: "text-[10px] tracking-[0.5em] uppercase" }, loadProgress < 100 ? 'SYSTEM_LOADING' : 'READY_v8.4'),
              React.createElement('div', { key: 's-sb', className: "text-[8px] font-mono opacity-30 uppercase mt-1" }, loadProgress < 100 ? 'Restoring_Visual_Identity...' : 'Validation_Confirmed.')
            ]),
            React.createElement('div', { key: 's-perc', className: "text-5xl md:text-7xl tabular-nums" }, `${loadProgress}%`)
          ]),
          canEnter && React.createElement('button', { key: 'l-btn', onClick: handleEnter, className: "mt-12 w-full py-6 bg-beliansky-navy text-white rounded-full font-black text-[12px] tracking-[0.6em] hover:bg-prismatic transition-all shadow-3xl" }, "INITIALIZE_IDENTITY")
        ])
      ]),

      <div key="page-content" className="bg-white text-beliansky-navy cursor-default uppercase relative min-h-screen" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F5EBFF 100%)' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes float-gentle { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .text-prismatic { background: linear-gradient(135deg, #9E3FFD 0%, #DDBBFF 30%, #7c3aed 60%, #9E3FFD 100%); background-size: 300% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradient-shift 8s ease infinite; }
          .text-outline-thin { -webkit-text-stroke: 1px rgba(22, 22, 63, 0.25); color: transparent; }
          .prism-card { background: #FFFFFF; border: 1px solid rgba(158, 63, 253, 0.15); box-shadow: 0 4px 20px rgba(22, 22, 63, 0.04); transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1); }
          .prism-card:hover { transform: translateY(-12px); box-shadow: 0 45px 90px rgba(158, 63, 253, 0.15); border-color: rgba(158, 63, 253, 0.45); }
          .grid-static { background-size: 100px 100px; background-image: linear-gradient(to right, rgba(22,22,63,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,22,63,0.06) 1px, transparent 1px); }
          .code-ghost { font-family: monospace; font-size: 10px; opacity: 0.05; pointer-events: none; letter-spacing: 0.4em; }
          .elite-frame { position: fixed; inset: 0; border: 1px solid rgba(158, 63, 253, 0.12); pointer-events: none; z-index: 99999; }
          @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          .title-depth { text-shadow: 0 20px 40px rgba(158, 63, 253, 0.1); }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-thumb { background: #9E3FFD; border-radius: 10px; }
        `}} />

        <div className="fixed inset-0 grid-static z-0 pointer-events-none" />
        <div className="elite-frame" />

        <nav className={`fixed top-0 left-0 right-0 z-[11000] px-8 md:px-16 py-8 flex justify-between items-center transition-all duration-700 ${scrolled ? 'bg-white/80 backdrop-blur-3xl border-b border-beliansky-navy/05' : ''}`}>
          <img src="/logo.avif" alt="LOGO" className="h-12 md:h-16 cursor-pointer hover:scale-110 transition-transform duration-500" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} />
          <div className="hidden lg:flex gap-12 items-center">
            {navLinks.map(n => <button key={n.key} onClick={() => goto(n.id)} className="text-[14px] font-black tracking-[0.5em] hover:text-prismatic transition-all">{t.nav[n.key][lang]}</button>)}
            <div className="flex gap-2 ml-6">
              {langs.map(l => <button key={l.code} onClick={() => setLang(l.code)} className={`w-10 h-10 rounded-full text-[12px] font-black transition-all ${lang===l.code ? 'bg-beliansky-navy text-white shadow-xl' : 'text-beliansky-navy/30 hover:text-beliansky-navy/60'}`}>{l.label}</button>)}
            </div>
            <div className="ml-6"><OwnerVault /></div>
          </div>
        </nav>

        <section id="home" className="relative min-h-screen flex flex-col justify-center pt-32 px-10 md:px-32">
          <ArchitecturalPattern />
          <div className="max-w-[140rem] mx-auto w-full relative z-20">
            <h1 className="flex flex-col">
              <div className="text-[13vw] lg:text-[10vw] font-black leading-[0.8] text-beliansky-navy uppercase tracking-tighter title-depth">
                <span className="text-prismatic">{t.hero.title_part1[lang]}</span>
              </div>
              <div className="text-[13vw] lg:text-[10vw] font-black leading-[0.8] text-outline-thin ml-[12vw] uppercase tracking-tighter">
                {t.hero.title_part2[lang]}
              </div>
              <div className="text-[13vw] lg:text-[10vw] font-black leading-[0.8] text-beliansky-navy italic uppercase tracking-tighter">
                <span className="text-prismatic">{t.hero.title_part3[lang]}</span>
              </div>
            </h1>
            <div className="mt-20 flex flex-col lg:flex-row gap-24 items-end justify-between">
              <p className="text-[20px] md:text-[26px] font-bold text-beliansky-navy/60 max-w-2xl leading-tight uppercase tracking-tight">{t.hero.subtitle[lang]}</p>
              <button onClick={() => goto('contact')} className="magnetic px-20 py-10 bg-beliansky-navy text-white rounded-full font-black text-[15px] tracking-[0.7em] hover:bg-prismatic shadow-[0_50px_100px_rgba(158,63,253,0.4)] transition-all transform hover:scale-110 active:scale-95 uppercase">
                {t.cta.project[lang]}
              </button>
            </div>
          </div>
          <div className="absolute right-[-10%] bottom-0 w-[55%] opacity-40 pointer-events-none hidden lg:block">
            <img src="/juraj.png" alt="Juraj" className="grayscale w-full" />
          </div>
        </section>

        <section className="py-14 border-y border-beliansky-navy/05 bg-white/50 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{animation: 'marquee 40s linear infinite'}}>
            {[...Array(12)].map((_,i) => <span key={i} className="text-[15px] font-black tracking-[1.2em] text-prismatic mx-32 uppercase">{t.hero.growth_metric[lang]}</span>)}
          </div>
        </section>

        <section id="process" className="py-40 px-10 md:px-32">
          <h2 className="text-6xl md:text-9xl font-black mb-32 tracking-tighter uppercase">{t.process.title[lang]}<span className="text-prismatic">.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {t.process.steps.map((s: any, i: number) => (
              <div key={i} className="prism-card p-14 rounded-[4rem] group" style={{ marginTop: `${i * 30}px` }}>
                <div className="text-8xl font-black text-beliansky-navy/05 mb-10 group-hover:text-prismatic/10 transition-colors">0{s.id}</div>
                <h3 className="text-2xl md:text-3xl font-black mb-8 uppercase leading-none">{s.title[lang]}</h3>
                <p className="text-[16px] text-beliansky-navy/55 font-bold leading-relaxed uppercase">{s.text[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="stats" className="py-32 px-10 md:px-32 relative">
          <div className="absolute top-0 left-[20%] code-ghost opacity-10">SOVEREIGN_SYSTEM_METRICS</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.stats.items.map((s: any, i: number) => (
              <div key={i} className="prism-card p-14 md:p-20 rounded-[5rem] flex flex-col items-center">
                 <div className="text-6xl md:text-9xl font-black text-beliansky-navy tabular-nums mb-8 leading-none tracking-tighter">{s.val}</div>
                 <div className="text-[12px] font-black tracking-[0.6em] text-prismatic uppercase text-center">{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="py-48 px-10 md:px-32 relative">
          <div className="max-w-[120rem] mx-auto relative z-10">
            <h2 className="text-8xl md:text-[12rem] font-black mb-40 uppercase tracking-tighter leading-none">{t.services.title[lang]}<span className="text-prismatic">.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
               {t.services.items.map((s: any, i: number) => (
                 <div key={i} className="prism-card p-16 lg:p-20 rounded-[5rem] group flex flex-col justify-between" style={{ marginTop: `${(i % 3) * 80}px` }}>
                   <div>
                     <div className="text-6xl font-black text-prismatic mb-16 font-display leading-none">{s.price}</div>
                     <h3 className="text-4xl md:text-5xl font-black mb-12 leading-[0.85] uppercase">{s[lang]}</h3>
                     <p className="text-[20px] text-beliansky-navy/60 font-bold mb-16 leading-relaxed uppercase">{s.desc[lang]}</p>
                     <ul className="space-y-7 mb-20 opacity-30 group-hover:opacity-100 transition-all duration-500">
                       {s.bullets.map((b: any, j: number) => <li key={j} className="text-[14px] font-black tracking-widest flex gap-6 uppercase"><span className="w-2.5 h-2.5 bg-prismatic rounded-full mt-1.5" />{b}</li>)}
                     </ul>
                   </div>
                   <button onClick={() => goto('contact')} className="w-full py-10 border-2 border-beliansky-navy/10 rounded-full font-black text-[15px] tracking-[0.7em] hover:bg-beliansky-navy hover:text-white transition-all transform hover:scale-105 uppercase">INITIALIZE_LEAD</button>
                 </div>
               ))}
            </div>
          </div>
        </section>

        <section id="differentiators" className="py-40 px-10 md:px-32 bg-beliansky-navy/[0.02]">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-6xl md:text-8xl font-black mb-16 uppercase tracking-tighter">{t.differentiators.title[lang]}</h2>
              <p className="text-xl md:text-2xl font-bold text-beliansky-navy/60 mb-24 max-w-4xl uppercase">{t.differentiators.intro[lang]}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                 <div className="prism-card p-16 rounded-[4rem]">
                    <div className="text-[12px] font-black text-red-500 tracking-[0.5em] mb-10 uppercase">THE_OLD_AGENCY_MODEL</div>
                    <ul className="space-y-8">
                       {t.differentiators.them.map((item: any, i: number) => (
                         <li key={i} className="flex gap-6 items-center text-[15px] font-black text-beliansky-navy/30 uppercase">
                            <span className="text-2xl">✕</span> {item[lang]}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="prism-card p-16 rounded-[4rem] border-prismatic bg-beliansky-navy text-white">
                    <div className="text-[12px] font-black text-prismatic tracking-[0.5em] mb-10 uppercase">L_CODE_DYNAMICS_MODEL</div>
                    <ul className="space-y-8">
                       {t.differentiators.us.map((item: any, i: number) => (
                         <li key={i} className="flex gap-6 items-center text-[15px] font-black uppercase text-white/90">
                            <span className="text-2xl text-prismatic">✓</span> {item[lang]}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </section>

        <section id="about" className="py-56 px-10 md:px-32 relative overflow-hidden">
           <div className="absolute top-[20%] left-[-5%] code-ghost rotate-90 opacity-10">STRATEGY_FOUNDATION_v2.0</div>
           <div className="max-w-[140rem] mx-auto flex flex-col lg:flex-row gap-40 items-center">
              <div className="w-full lg:w-5/12 relative group">
                <div className="prism-card p-0 rounded-[5rem] overflow-hidden h-[750px] flex items-end">
                   <img src="/juraj.png" alt="Juraj" className="w-[150%] max-w-none grayscale -ml-[25%] group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-prismatic/20 hidden lg:block">
                   <div className="text-5xl font-black text-prismatic leading-none">150+</div>
                   <div className="text-[10px] font-black tracking-widest mt-2 uppercase text-beliansky-navy/30">COMPANIES_SERVED</div>
                </div>
              </div>
              <div className="w-full lg:w-7/12">
                <div className="text-prismatic font-black text-[13px] tracking-[1.2em] mb-16 uppercase">{t.about.tag[lang]}</div>
                <h2 className="text-7xl md:text-[9rem] font-black mb-20 leading-[0.9] uppercase tracking-tighter">{t.about.title[lang]}</h2>
                <p className="text-[22px] md:text-[28px] font-bold text-beliansky-navy/70 leading-relaxed uppercase whitespace-pre-line mb-24">{t.about.description[lang]}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                   {t.about.milestones.map((m: any, i: number) => (
                     <div key={i} className="p-14 border border-beliansky-navy/05 rounded-[3.5rem] bg-white shadow-xl hover:bg-beliansky-navy/[0.01] transition-all">
                        <div className="text-prismatic font-black text-[12px] mb-6 tracking-[0.4em]">MILESTONE_0{i+1}</div>
                        <div className="text-[14px] font-black text-beliansky-navy/50 uppercase tracking-widest leading-tight">{m[lang]}</div>
                     </div>
                   ))}
                </div>
              </div>
           </div>
        </section>

        <section id="testimonial" className="py-40 bg-white/40 px-10">
           <div className="max-w-6xl mx-auto text-center relative">
              <div className="text-prismatic text-[10rem] font-black font-serif leading-none absolute -top-20 left-1/2 -translate-x-1/2 opacity-10">"</div>
              <div className="text-3xl md:text-[3.5rem] font-black text-beliansky-navy italic uppercase leading-[1.1] transition-all duration-800 tracking-tighter">
                {t.testimonials[currTestimonial]?.quote[lang]}
              </div>
              <div className="mt-20 text-[15px] font-black tracking-[0.8em] text-prismatic uppercase">
                {t.testimonials[currTestimonial]?.author} <span className="opacity-20 text-beliansky-navy mx-4">|</span> {t.testimonials[currTestimonial]?.role[lang]} <span className="opacity-20 text-beliansky-navy mx-4">|</span> {t.testimonials[currTestimonial]?.company}
              </div>
           </div>
        </section>

        <section id="cases" className="py-40 px-10 md:px-32 bg-beliansky-navy/[0.01]">
          <h2 className="text-6xl md:text-8xl font-black mb-24 uppercase tracking-tighter">{t.eshops.title[lang]}<span className="text-prismatic">.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {t.eshops.items.map((item: any, i: number) => (
              <div key={i} className="prism-card p-14 rounded-[4rem] group cursor-pointer overflow-hidden relative">
                 <div className="absolute inset-0 bg-prismatic/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                 <div className="relative z-10">
                    <div className="text-3xl font-black mb-4 uppercase tracking-tighter">{item.name}</div>
                    <div className="text-[12px] font-black tracking-[0.5em] text-beliansky-navy/30 group-hover:text-prismatic transition-colors uppercase">{item.desc[lang]}</div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        <section id="newsletter" className="py-40 px-10">
           <div className="max-w-5xl mx-auto prism-card p-16 md:p-24 rounded-[5rem] bg-beliansky-navy text-white text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter">{t.newsletter.title[lang]}</h2>
              <p className="text-xl font-bold text-white/50 mb-16 uppercase tracking-tight max-w-2xl mx-auto">{t.newsletter.text[lang]}</p>
              <form className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
                 <input className="flex-1 bg-white/05 border-b-2 border-white/20 py-5 px-6 font-black text-lg outline-none focus:border-prismatic transition-all uppercase placeholder:text-white/10" placeholder="ENTER_EMAIL..." />
                 <button className="px-12 py-6 bg-prismatic text-white rounded-full font-black text-[13px] tracking-[0.5em] hover:scale-105 transition-all shadow-xl">SUBSCRIBE</button>
              </form>
           </div>
        </section>

        <section id="contact" className="py-48 px-10 relative overflow-hidden">
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-40">
              <div className="flex flex-col justify-center">
                 <h2 className="text-8xl md:text-[11rem] font-black uppercase mb-16 tracking-tighter leading-none">{t.contact.title[lang]}<span className="text-prismatic">!</span></h2>
                 <p className="text-[20px] font-bold text-beliansky-navy/50 uppercase tracking-[0.2em] mb-24 leading-snug">{t.contact.subtitle[lang]}</p>
                 <div className="space-y-8">
                    <a href="tel:+421949830185" className="prism-card p-14 rounded-[3rem] block group">
                       <div className="text-[11px] font-black text-prismatic tracking-[0.8em] mb-6 uppercase">SECURE_CALL_HUB_v8.4</div>
                       <div className="text-4xl md:text-6xl font-black text-beliansky-navy group-hover:text-prismatic transition-all tabular-nums">+421 949 830 185</div>
                    </a>
                 </div>
              </div>
              <form onSubmit={handleSubmit} className="prism-card p-20 md:p-24 rounded-[6rem] relative">
                 {['name', 'phone', 'email', 'note'].map(f => (
                   <div key={f} className="mb-14">
                      <label className="text-[12px] font-black tracking-[0.6em] mb-5 block text-beliansky-navy/30 uppercase">{t.contact.fields[f as keyof typeof t.contact.fields][lang]}</label>
                      <input required={f!=='note'} className="w-full bg-transparent border-b-2 border-beliansky-navy/05 py-5 font-black text-3xl focus:border-prismatic outline-none transition-all placeholder:text-beliansky-navy/05 uppercase" placeholder={`INPUT_${f}...`} />
                   </div>
                 ))}
                 <button className={`w-full py-12 rounded-full font-black text-[16px] tracking-[0.8em] transition-all transform hover:scale-[1.03] active:scale-95 shadow-3xl ${formSent ? 'bg-green-500 text-white':'bg-beliansky-navy text-white hover:bg-prismatic'}`}>
                    {formSent ? 'SYSTEM_TRANSMITTED' : 'INITIALIZE_PROJECT'}
                 </button>
              </form>
           </div>
        </section>

        <footer className="py-32 px-10 border-t border-beliansky-navy/05 bg-white/40">
           <div className="max-w-[140rem] mx-auto flex flex-col lg:flex-row justify-between items-center gap-16">
              <div className="text-[12px] font-black tracking-[1.2em] text-beliansky-navy/15 uppercase">{t.footer.copyright}</div>
              <div className="text-[14px] font-black tracking-[0.6em] text-prismatic uppercase text-center">{t.footer.tagline}</div>
              <div className="text-[12px] font-black tracking-[0.5em] text-beliansky-navy/15 uppercase">{t.footer.update[lang]}</div>
           </div>
        </footer>

        <AmbientEngine />
        <SatinLayer />
        <BelianskyMovingMaster />
      </div>
    ]
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN v8.4 — 100% ABSOLUTE IDENTITY RESTORED smrk
