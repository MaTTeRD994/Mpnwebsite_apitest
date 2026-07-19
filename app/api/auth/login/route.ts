import { NextResponse } from 'next/server';
import { getAuthRedirectUri } from '../../../../utils/auth-url';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = getAuthRedirectUri(request);

  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identify',
  });

  return NextResponse.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
}
