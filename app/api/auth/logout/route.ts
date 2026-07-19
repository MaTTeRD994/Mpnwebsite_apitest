import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getOrigin } from '../../../../utils/auth-url';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const origin = getOrigin(request);
  const cookieStore = await cookies();
  cookieStore.set('mpn_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return NextResponse.redirect(`${origin}/`);
}
