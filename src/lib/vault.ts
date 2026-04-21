// ═══════════════════════════════════════════════════
// SOVEREIGN VAULT DATABASE — L-CODE GUARDIAN
// File-based encrypted lead storage
// Zero external dependencies — runs on any server
// ═══════════════════════════════════════════════════

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { goliasEncrypt, goliasDecrypt, goliasHash } from './golias';

const DB_DIR = join(process.cwd(), '.vault');
const DB_FILE = join(DB_DIR, 'leads.vault');
const VAULT_KEY = process.env.GOLIAS_VAULT_KEY || 'L-CODE-DEV-KEY-CHANGE-IN-PRODUCTION';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  note: string;
  emailHash: string;
  timestamp: string;
  ip?: string;
  lang?: string;
}

interface VaultData {
  version: string;
  leads: string[]; // Each lead is individually encrypted
}

function ensureVaultDir(): void {
  if (!existsSync(DB_DIR)) {
    mkdirSync(DB_DIR, { recursive: true });
  }
}

function readVault(): VaultData {
  ensureVaultDir();
  if (!existsSync(DB_FILE)) {
    return { version: 'golias-v3', leads: [] };
  }
  try {
    const raw = readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { version: 'golias-v3', leads: [] };
  }
}

function writeVault(data: VaultData): void {
  ensureVaultDir();
  writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Stores a new lead — encrypted with Goliáš before writing to disk
 */
export function storeLead(lead: Omit<Lead, 'id' | 'emailHash' | 'timestamp'>): Lead {
  const vault = readVault();
  
  const fullLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    emailHash: goliasHash(lead.email),
    timestamp: new Date().toISOString(),
  };

  // Each lead is individually encrypted — compromising one doesn't reveal others
  const encryptedLead = goliasEncrypt(JSON.stringify(fullLead), VAULT_KEY);
  vault.leads.push(encryptedLead);
  writeVault(vault);

  return fullLead;
}

/**
 * Retrieves all leads — requires owner key to decrypt
 * Returns empty array if key is wrong
 */
export function getAllLeads(ownerKey: string): Lead[] {
  const vault = readVault();
  const leads: Lead[] = [];

  for (const encrypted of vault.leads) {
    const decrypted = goliasDecrypt(encrypted, ownerKey);
    if (decrypted) {
      try {
        leads.push(JSON.parse(decrypted));
      } catch { /* corrupted entry, skip */ }
    }
  }

  return leads;
}

/**
 * Counts total leads without decrypting (for stats)
 */
export function getLeadCount(): number {
  const vault = readVault();
  return vault.leads.length;
}

/**
 * Checks if email already submitted (deduplication via hash)
 */
export function isDuplicate(email: string): boolean {
  const vault = readVault();
  const hash = goliasHash(email);
  
  for (const encrypted of vault.leads) {
    const decrypted = goliasDecrypt(encrypted, VAULT_KEY);
    if (decrypted) {
      try {
        const lead = JSON.parse(decrypted);
        if (lead.emailHash === hash) return true;
      } catch { /* skip */ }
    }
  }
  return false;
}

// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN
