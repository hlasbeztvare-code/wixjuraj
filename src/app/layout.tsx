import React from 'react';
import { SecurityKernel } from '@/kernel/SecurityKernel';
import { Viewport } from 'next';
import Preloader from '@/components/Preloader';
import './globals.css';

// ═══════════════════════════════════════════════════
// L-CODE GUARDIAN: Hardened Typography — OXYGEN (MINIMAL LOGO STYLE)
// ═══════════════════════════════════════════════════

export const metadata = {
  title: 'BELIANSKY — Digital Architect & Premium Growth Partner',
  description: 'Expertise, not anonymity. Juraj Beliansky & Co. provides premium web systems, high-performance E-commerce, and data-driven marketing for growth-focused brands.',
  keywords: 'digital architect, next.js development, premium web systems, juraj beliansky, e-commerce growth, marketing strategy, L-CODE dynamics',
  robots: 'index, follow',
  metadataBase: new URL('https://beliansky.eu'),
  alternates: {
    canonical: 'https://beliansky.eu',
  },
  openGraph: {
    title: 'BELIANSKY | Digital Architect — Premium Web & Systems',
    description: 'Bespoke high-performance systems for modern businesses. 80% of our clients stay for 3+ years.',
    url: 'https://beliansky.eu',
    siteName: 'Beliansky',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Beliansky | Digital Architect',
      },
    ],
    locale: 'sk_SK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BELIANSKY | Digital Architect',
    description: 'Extreme performance, absolute security, and premium design for high-growth brands.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-beliansky-navy selection:bg-beliansky-purple selection:text-white">
        <SecurityKernel>
          <Preloader />
          <main id="main-content" role="main">
            {children}
          </main>
        </SecurityKernel>
      </body>
    </html>
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN
