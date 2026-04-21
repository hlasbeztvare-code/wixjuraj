'use client';

export function SovereignLogo() {
  return (
    <div className="flex flex-col items-start gap-1 p-8">
      {/* 300% Minimalist Sovereign branding */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#16163F" />
        <path d="M10 10H30V30H10V10Z" stroke="#9E3FFD" strokeWidth="4" />
        <circle cx="20" cy="20" r="4" fill="#00BCD4" />
      </svg>
      <div className="text-[10px] font-black uppercase tracking-[0.6em] text-[#16163F]/40 leading-none mt-2">
        SOVEREIGN<br />PROTOCOL.
      </div>
    </div>
  );
}
