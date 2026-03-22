import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password?: string };
  if (!password || password !== process.env.BOOKING_BOARD_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const secret = new TextEncoder().encode(process.env.BOOKING_BOARD_AUTH_SECRET ?? '');
  const token = await new SignJWT({ sub: 'bba' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set('bba_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
  return res;
}
