import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/api/auth', '/login', '/_next', '/favicon.ico', '/manifest.json', '/sw.js', '/icons', '/workbox-'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next();
  const token = req.cookies.get('bba_auth')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', req.url));
  try {
    const secret = new TextEncoder().encode(process.env.BOOKING_BOARD_AUTH_SECRET ?? '');
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
