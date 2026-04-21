"use client";
import { useState } from "react";

// ═══════════════════════════════════════════════════
// OWNER VAULT v3.0 — PRISMATIC INTERFACE
// L-CODE GUARDIAN — Access to Encrypted Leads
// ═══════════════════════════════════════════════════

export function OwnerVault() {
  const [isOpen, setIsOpen] = useState(false);
  const [ghostKey, setGhostKey] = useState("");
  const [vaultLeads, setVaultLeads] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnlock = async () => {
    if (!ghostKey) return;
    setIsLoading(true);
    setError(null);

    try {
      // ═══ L-CODE GUARDIAN: SECURE FETCH ═══
      // Post the key to a secure endpoint that decrypts server-side
      const res = await fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerKey: ghostKey })
      });

      const data = await res.json();

      if (res.ok && data.status === 'OK') {
        setVaultLeads(data.leads);
        // NO KEY PERSISTENCE — Immediately wipe from local state
        setGhostKey(""); 
      } else {
        setError(data.message || "ACCESS DENIED");
        setGhostKey("");
      }
    } catch (err) {
      setError("COMMUNICATION BREACH");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        aria-label="Open Owner Vault"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-[#0a0a0a]/20 hover:text-prismatic transition-all py-2"
      >
        <span className={`w-2 h-2 rounded-full ${vaultLeads ? 'bg-green-500 animate-pulse' : 'bg-prismatic opacity-40'}`}></span>
        VAULT
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 w-[400px] max-h-[600px] overflow-y-auto prism-card rounded-[2rem] p-8 shadow-2xl z-[12000] border-prismatic animate-float">
          <div className="flex justify-between items-center mb-8">
            <div className="text-[10px] font-black tracking-[0.6em] text-prismatic">L-CODE GUARDIAN v3.1</div>
            <button onClick={() => setIsOpen(false)} className="text-[#0a0a0a]/20 hover:text-red-500 font-black">✕</button>
          </div>

          {!vaultLeads ? (
            <div className="space-y-6">
              <p className="text-[11px] font-bold text-[#0a0a0a]/30 leading-relaxed">
                ENTER THE GHOST KEY TO DECRYPT SOVEREIGN DATA. NO DATA IS PERSISTED LOCALLY.
              </p>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="GHOST KEY..."
                  value={ghostKey}
                  onChange={(e) => setGhostKey(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-[#0a0a0a]/5 border-b border-[#0a0a0a]/10 py-4 px-1 text-sm font-black outline-none focus:border-prismatic transition-all placeholder:text-[#0a0a0a]/10"
                />
              </div>
              {error && (
                <div className="text-[10px] font-black text-red-500 tracking-widest">{error}</div>
              )}
              <button
                onClick={handleUnlock}
                disabled={isLoading || !ghostKey}
                className="w-full bg-[#0a0a0a] text-white rounded-full py-5 text-[11px] font-black tracking-[0.5em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
              >
                {isLoading ? 'DECRYPTING...' : 'ACCESS VAULT'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-green-500/5 border border-green-500/10 rounded-2xl p-4">
                <div className="text-[10px] font-black text-green-600 tracking-widest">DECRYPTED LEADS: {vaultLeads.length}</div>
                <button onClick={() => setVaultLeads(null)} className="text-[9px] font-black text-red-600 tracking-widest hover:underline">FLUSH RAM</button>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {vaultLeads.length === 0 ? (
                  <div className="text-[11px] text-[#0a0a0a]/20 font-bold py-10 text-center">NO DATA IN VAULT.</div>
                ) : (
                  vaultLeads.map((lead, i) => (
                    <div key={lead.id || i} className="p-5 border border-[#0a0a0a]/5 rounded-2xl space-y-2 hover:bg-[#0a0a0a]/[0.02] transition-all">
                      <div className="flex justify-between items-center text-[10px] font-black text-[#0a0a0a]/40">
                        <span>{new Date(lead.timestamp).toLocaleString()}</span>
                        <span className="text-prismatic">{lead.service}</span>
                      </div>
                      <div className="text-sm font-black text-[#0a0a0a]">{lead.name}</div>
                      <div className="text-[11px] font-bold text-[#0a0a0a]/50">{lead.email} | {lead.phone}</div>
                      {lead.note && <div className="text-[11px] italic text-[#0a0a0a]/30 pt-2 border-t border-[#0a0a0a]/5">{lead.note}</div>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN