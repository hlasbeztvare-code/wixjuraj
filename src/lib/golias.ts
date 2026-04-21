// ═══════════════════════════════════════════════════
// GOLIÁŠ ENCRYPTION ENGINE v3.1 — L-CODE GUARDIAN
// L-CODE DYNAMICS — Owner-Only Mandate
// ═══════════════════════════════════════════════════
// Upgraded for 300% standard:
// - NIST Standard 12-byte IV for optimized GCM
// - scrypt N-factor increased to 32768
// - Environment-based salt injection
// - Strict Server-Side logic

import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const INTERNAL_SALT = 'L-CODE-GOLIAS-SALT-2026-SOVEREIGN-ULTRA';
const KEY_LENGTH = 32;
const IV_LENGTH = 12; // NIST Standard for GCM
const TAG_LENGTH = 16;

/**
 * Derives a 256-bit key using scrypt with high cost factor
 */
function deriveKey(ownerKey: string): Buffer {
  // Use environment SALT if available, fallback to internal
  const salt = process.env.GOLIAS_SALT || INTERNAL_SALT;
  
  return scryptSync(ownerKey, salt, KEY_LENGTH, {
    N: 32768,  // 300% Cost factor
    r: 8,
    p: 1,
  });
}

/**
 * Encrypts plaintext data with Goliáš AES-256-GCM
 */
export function goliasEncrypt(plaintext: string, ownerKey: string): string {
  const key = deriveKey(ownerKey);
  const iv = randomBytes(IV_LENGTH);
  
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Pack: [IV 12B][AuthTag 16B][Ciphertext]
  const packed = Buffer.concat([iv, authTag, encrypted]);
  return packed.toString('base64');
}

/**
 * Decrypts Goliáš-encrypted data
 */
export function goliasDecrypt(encrypted: string, ownerKey: string): string | null {
  try {
    const key = deriveKey(ownerKey);
    const packed = Buffer.from(encrypted, 'base64');

    const iv = packed.subarray(0, IV_LENGTH);
    const authTag = packed.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
    const ciphertext = packed.subarray(IV_LENGTH + TAG_LENGTH);

    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  } catch {
    // L-CODE GUARDIAN: Integrity breach or invalid key
    return null;
  }
}

/**
 * One-way hash for lead deduplication
 */
export function goliasHash(data: string): string {
  const salt = process.env.GOLIAS_HASH_SALT || 'GOLIAS-HASH-ULTRA-PEPPER';
  const key = scryptSync(data, salt, 32, { N: 16384, r: 8, p: 1 });
  return key.toString('hex');
}

// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN
