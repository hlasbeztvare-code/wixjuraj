// ═══════════════════════════════════════════════════
// API: OWNER VAULT — L-CODE GUARDIAN
// POST /api/vault
// Secure decryption and retrieval of leads
// ═══════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { getAllLeads } from '@/lib/vault';

export async function POST(request: NextRequest) {
  try {
    const { ownerKey } = await request.json();

    if (!ownerKey) {
      return NextResponse.json(
        { error: 'KEY_REQUIRED', message: 'L-CODE GUARDIAN: Master key missing.' },
        { status: 401 }
      );
    }

    // ═══ L-CODE GUARDIAN: SERVER-SIDE DECRYPTION ═══
    // This calls Goliáš v3.1 internal methods
    const leads = getAllLeads(ownerKey);

    // If key is wrong, leads will be an empty array because decryption fail = skip entry
    // We can add a more explicit check if we want, but empty list is a safe fail.
    
    // Check if the key actually decrypted something (assuming at least one lead exists OR 
    // we use a special 'challenge' lead to verify the key). 
    // For now, if provided key results in valid leads, return them.
    
    return NextResponse.json({
      status: 'OK',
      leads: leads,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('L-CODE GUARDIAN: Vault access error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: 'Internal security error.' },
      { status: 500 }
    );
  }
}

// Block everything else
export async function GET() { return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 }); }
export async function PUT() { return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 }); }
export async function DELETE() { return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 }); }

// CLEAN_CODE_SWEEP_DONE
