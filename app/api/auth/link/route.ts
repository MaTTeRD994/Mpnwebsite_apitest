import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJwt } from '../../../../utils/jwt';
import { supabase } from '../../../../utils/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
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

    const { code } = await request.json();
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const normalizedCode = code.trim().toUpperCase().replace(/-/g, '');

    // Look up the code
    const { data: linkCode, error: lookupError } = await supabase
      .from('link_codes')
      .select('*')
      .eq('code', normalizedCode)
      .single();

    if (lookupError || !linkCode) {
      return NextResponse.json({ error: 'Invalid link code. Check the code and try again.' }, { status: 404 });
    }

    if (linkCode.used) {
      return NextResponse.json({ error: 'This code has already been used.' }, { status: 400 });
    }

    if (new Date(linkCode.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This code has expired. Generate a new one with /link in-game.' }, { status: 400 });
    }

    // Check if this Minecraft account is already linked to another Discord account
    const { data: existingLink } = await supabase
      .from('users')
      .select('discord_id, discord_username')
      .eq('minecraft_uuid', linkCode.minecraft_uuid)
      .single();

    if (existingLink && existingLink.discord_id !== payload.discord_id) {
      return NextResponse.json({ 
        error: `This Minecraft account is already linked to Discord user "${existingLink.discord_username}".` 
      }, { status: 409 });
    }

    // Link the accounts
    const { error: updateError } = await supabase
      .from('users')
      .update({
        minecraft_uuid: linkCode.minecraft_uuid,
        minecraft_name: linkCode.minecraft_name,
        linked_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('discord_id', payload.discord_id);

    if (updateError) {
      console.error('Link update error:', updateError);
      return NextResponse.json({ error: 'Failed to link accounts.' }, { status: 500 });
    }

    // Mark code as used
    await supabase
      .from('link_codes')
      .update({ used: true })
      .eq('id', linkCode.id);

    return NextResponse.json({ 
      success: true, 
      minecraft_name: linkCode.minecraft_name,
      minecraft_uuid: linkCode.minecraft_uuid 
    });
  } catch (err) {
    console.error('Link error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
