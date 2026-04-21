import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. SECURITY KERNEL - Check for forbidden access patterns
  if (request.nextUrl.pathname.includes('.php') || request.nextUrl.pathname.includes('/wp-admin')) {
    return new NextResponse('ACCESS_DENIED // L-CODE GUARDIAN', { status: 403 });
  }

  // 2. LANGUAGE KERNEL - Server-side detection
  // In a real environment, we would use request.geo or headers
  const country = request.headers.get('cf-ipcountry') || 'SK';
  let lang = 'SK';
  
  if (['IE', 'GB', 'US'].includes(country)) lang = 'EN';
  if (country === 'GA') lang = 'GA'; // Specific Irish override

  // Add the detected language to headers for Server Components to pick up
  const response = NextResponse.next();
  response.headers.set('x-beliansky-lang', lang);
  
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
