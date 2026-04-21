import HomeBase from '@/components/HomeBase';
import { translations } from '@/lib/translations';
import { WixBridge } from '@/lib/WixBridge';

// ═══════════════════════════════════════════════════
// L-CODE GUARDIAN: SERVER COMPONENT — DATA ORCHESTRATOR
// ═══════════════════════════════════════════════════

export default async function Page() {
  /**
   * 300% RELIABILITY: Server-Side Fetching.
   */
  const jurajData = await WixBridge.fetchMyData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BELIANSKY | Digital Architect",
    "image": "https://beliansky.eu/og-image.png",
    "description": "Premium software architecture and high-performance web systems by Juraj Beliansky.",
    "url": "https://beliansky.eu",
    "telephone": "+421949830185",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bratislava",
      "addressCountry": "SK"
    },
    "sameAs": [
      "https://www.linkedin.com/in/jurajbeliansky/",
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeBase translations={translations} jurajData={jurajData} />
    </>
  );
}

// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN
