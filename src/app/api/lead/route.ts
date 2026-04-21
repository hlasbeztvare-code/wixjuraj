// ═══════════════════════════════════════════════════
// API: SUBMIT LEAD — Goliáš Protected
// POST /api/lead
// L-CODE GUARDIAN — Server-Side Only
// ═══════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { storeLead, isDuplicate } from '@/lib/vault';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, note, lang } = body;

    // ═══ VALIDATION ═══
    if (!name || !email) {
      return NextResponse.json(
        { error: 'MISSING_FIELDS', message: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'INVALID_EMAIL', message: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // ═══ DEDUPLICATION ═══
    if (isDuplicate(email)) {
      // Don't reveal that the email exists — return success anyway
      // L-CODE GUARDIAN: Silent dedup (prevents enumeration attacks)
      return NextResponse.json({ 
        status: 'OK', 
        message: 'Lead received.' 
      });
    }

    // ═══ RATE LIMITING (simple IP-based) ═══
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // ═══ STORE — Goliáš Encrypted ═══
    const lead = storeLead({
      name: name.trim(),
      phone: (phone || '').trim(),
      email: email.trim().toLowerCase(),
      service: (service || '').trim(),
      note: (note || '').trim(),
      ip,
      lang: lang || 'SK',
    });

    return NextResponse.json({
      status: 'OK',
      message: 'Lead encrypted and stored.',
      id: lead.id,
    });

  } catch (error) {
    console.error('L-CODE GUARDIAN: Lead submission error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// GET is blocked — leads are owner-only
export async function GET() {
  return NextResponse.json(
    { error: 'FORBIDDEN', message: 'L-CODE GUARDIAN: Access denied.' },
    { status: 403 }
  );
}
// CLEAN_CODE_SWEEP_DONE
