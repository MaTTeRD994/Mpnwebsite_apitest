import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJwt } from '../../../../utils/jwt';
import { supabase } from '../../../../utils/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('mpn_session')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Fetch full user from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('discord_id, discord_username, discord_avatar, minecraft_uuid, minecraft_name, linked_at, created_at')
      .eq('discord_id', payload.discord_id)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('Auth me error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
