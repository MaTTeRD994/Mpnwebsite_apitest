import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signJwt } from '../../../../utils/jwt';
import { supabase } from '../../../../utils/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback`;

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      console.error('Discord token error:', await tokenRes.text());
      return NextResponse.redirect(new URL('/?error=token_failed', request.url));
    }

    const tokenData = await tokenRes.json();

    // Fetch user profile from Discord
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userRes.ok) {
      console.error('Discord user error:', await userRes.text());
      return NextResponse.redirect(new URL('/?error=user_failed', request.url));
    }

    const discordUser = await userRes.json();

    // Upsert user into Supabase
    const { error: upsertError } = await supabase
      .from('users')
      .upsert({
        discord_id: discordUser.id,
        discord_username: discordUser.username,
        discord_avatar: discordUser.avatar,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'discord_id',
      });

    if (upsertError) {
      console.error('Supabase upsert error:', upsertError);
    }

    // Create JWT (7 day expiry)
    const jwt = signJwt({
      discord_id: discordUser.id,
      discord_username: discordUser.username,
      discord_avatar: discordUser.avatar,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    });

    // Set cookie and redirect
    const cookieStore = await cookies();
    cookieStore.set('mpn_session', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return NextResponse.redirect(new URL('/account', request.url));
  } catch (err) {
    console.error('Auth callback error:', err);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
