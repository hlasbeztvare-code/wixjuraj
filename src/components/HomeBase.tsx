'use client';

import React, { useState, useEffect, useRef } from "react";
import SatinLayer from "./SatinLayer";
import BelianskyMovingMaster from "./BelianskyMovingMaster";
import OwnerVault from './OwnerVault';
import AmbientEngine from './AmbientEngine';
import { Lang } from "@/lib/translations";
import { ArchitecturalPattern } from "./ArchitecturalPattern";
import { useSecurity } from "@/kernel/SecurityKernel";

// -----------------------------------------------------------
// PRISMATIC SILK CORE v8.1 - ASCII_RECOVERY_MODE
// L-CODE GUARDIAN - "300% or NOTHING."
// -----------------------------------------------------------

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
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleS);
      clearInterval(interval);
      clearInterval(stepCycle);
      clearInterval(testimonialCycle);
    };
  }, [t.testimonials]);

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

  // NUCLEAR OPTION: React.createElement for the outer wrapper
  return React.createElement(
    'div',
    { 
      className: "relative min-h-screen bg-white font-sans text-beliansky-navy overflow-x-hidden selection:bg-prismatic selection:text-white elite-frame" 
    },
    [
      loading && React.createElement('div', {
        key: 'loader',
        className: `fixed inset-0 z-[20000] bg-white flex flex-col items-center justify-center transition-all duration-1000 ${loadProgress >= 100 ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`
      }, [
        React.createElement('div', { key: 'l-wrap', className: "relative w-64 md:w-96" }, [
          React.createElement('div', { key: 'l-bar', className: "h-[2px] w-full bg-beliansky-navy/05 relative overflow-hidden" }, [
            React.createElement('div', { 
              key: 'l-fill',
              className: "absolute top-0 left-0 h-full bg-prismatic transition-all duration-300",
              style: { width: `${loadProgress}%` }
            })
          ]),
          React.createElement('div', { key: 'l-text', className: "flex justify-between items-end mt-4 text-beliansky-navy font-black" }, [
            React.createElement('div', { key: 'l-status', className: "text-[10px] tracking-widest" }, loadProgress < 100 ? 'SYSTEM_LOADING' : 'READY'),
            React.createElement('div', { key: 'l-perc', className: "text-4xl tabular-nums" }, `${loadProgress}%`)
          ]),
          canEnter && React.createElement('button', {
            key: 'l-btn',
            onClick: handleEnter,
            className: "mt-12 w-full py-6 bg-beliansky-navy text-white rounded-full font-black text-[12px] tracking-widest hover:bg-prismatic transition-all animate-fade-in"
          }, "INITIALIZE_SYSTEM_v8.1")
        ])
      ]),

      <div key="main-page" className="bg-white text-beliansky-navy cursor-default uppercase relative min-h-screen">
        <nav className={`fixed top-0 left-0 right-0 z-[11000] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl' : ''}`}>
          <img src="/logo.avif" alt="BELIANSKY" className="h-8 md:h-12 w-auto cursor-pointer" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} />
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map(n => (
              <button key={n.key} onClick={() => goto(n.id)} className="text-[16px] font-black tracking-widest hover:text-prismatic transition-colors">
                {t.nav[n.key][lang]}
              </button>
            ))}
            <div className="flex gap-2">
              {langs.map(l => (
                <button key={l.code} onClick={() => setLang(l.code)} className={`text-[12px] font-black w-8 h-8 rounded-full ${lang===l.code ? 'bg-beliansky-navy text-white' : 'text-beliansky-navy/30'}`}>{l.label}</button>
              ))}
            </div>
            <OwnerVault />
          </div>
        </nav>

        <section className="relative min-h-screen flex flex-col justify-center pt-20 px-8 md:px-24">
          <ArchitecturalPattern />
          <div className="max-w-[140rem] mx-auto w-full relative z-20">
            <h1 className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter text-beliansky-navy uppercase">
              <span className="text-prismatic">{t.hero.title_part1[lang]}</span><br/>
              <span className="text-outline-thin">{t.hero.title_part2[lang]}</span><br/>
              <span className="text-prismatic italic">{t.hero.title_part3[lang]}</span>
            </h1>
            <p className="mt-12 text-xl md:text-2xl text-beliansky-navy/60 font-bold max-w-xl uppercase">{t.hero.subtitle[lang]}</p>
            <button onClick={() => goto('contact')} className="mt-12 px-12 py-7 bg-beliansky-navy text-white rounded-full font-black text-[14px] tracking-widest shadow-2xl hover:bg-prismatic transition-all">
              {t.cta.project[lang]}
            </button>
            <div className="absolute right-0 bottom-0 w-[40%] opacity-40 pointer-events-none hidden lg:block">
              <img src="/juraj.png" alt="" className="w-full grayscale" />
            </div>
          </div>
        </section>

        <section id="services" className="py-32 px-8 md:px-24">
          <h2 className="text-6xl md:text-8xl font-black mb-24 uppercase">{t.services.title[lang]}<span className="text-prismatic">.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.services.items.map((s: any, i: number) => (
              <div key={i} className="p-12 rounded-[3.5rem] border border-beliansky-navy/05 bg-white shadow-xl hover:scale-[1.02] transition-transform">
                <div className="text-4xl font-black text-prismatic mb-8">{s.price}</div>
                <h3 className="text-3xl font-black mb-6 uppercase leading-none">{s[lang]}</h3>
                <p className="text-lg text-beliansky-navy/60 font-bold mb-10 uppercase">{s.desc[lang]}</p>
                <ul className="space-y-4 mb-12 opacity-50">
                   {s.bullets.map((b: any, j: number) => <li key={j} className="text-sm font-black tracking-widest uppercase flex gap-3"><span className="w-1.5 h-1.5 bg-prismatic rounded-full mt-1.5" />{b}</li>)}
                </ul>
                <button onClick={() => goto('contact')} className="w-full py-6 border-2 border-beliansky-navy/10 rounded-full font-black text-sm tracking-widest hover:bg-beliansky-navy hover:text-white transition-all uppercase">KONTAKT</button>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="py-40 px-8 md:px-24 bg-beliansky-navy/[0.01]">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="w-full lg:w-5/12">
               <div className="rounded-[4rem] overflow-hidden bg-white shadow-2xl h-[600px] flex items-end">
                  <img src="/juraj.png" alt="Juraj" className="w-[120%] max-w-none grayscale -ml-[10%]" />
               </div>
            </div>
            <div className="w-full lg:w-7/12">
              <h2 className="text-6xl md:text-8xl font-black mb-12 uppercase">{t.about.title[lang]}</h2>
              <p className="text-xl md:text-2xl font-bold leading-relaxed text-beliansky-navy/70 uppercase">{t.about.description[lang]}</p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-8 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-6xl font-black mb-12 uppercase">{t.contact.title[lang]}</h2>
              <a href="tel:+421949830185" className="text-4xl font-black text-prismatic hover:underline">+421 949 830 185</a>
            </div>
            <form onSubmit={handleSubmit} className="p-12 rounded-[3.5rem] border border-beliansky-navy/05 shadow-2xl">
              {['name', 'email', 'note'].map(f => (
                <div key={f} className="mb-8">
                  <label className="text-[12px] font-black tracking-widest mb-2 block uppercase">{f}</label>
                  <input required={f!=='note'} className="w-full bg-transparent border-b border-beliansky-navy/10 py-3 font-black text-lg focus:border-prismatic outline-none transition-colors" />
                </div>
              ))}
              <button disabled={formSent} className={`w-full py-6 rounded-full font-black text-white transition-all ${formSent ? 'bg-green-500' : 'bg-beliansky-navy hover:bg-prismatic'}`}>
                {formSent ? 'SENT' : 'INITIALIZE_CONTACT'}
              </button>
            </form>
          </div>
        </section>

        <footer className="py-12 px-8 border-t border-beliansky-navy/05 text-center">
           <div className="text-[10px] font-black tracking-[1em] text-beliansky-navy/20">{t.footer.copyright}</div>
        </footer>

        <AmbientEngine />
        <SatinLayer />
        <BelianskyMovingMaster />
      </div>
    ]
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN v8.1
