import { NextResponse } from 'next/server';
import { supabase } from '../../../../utils/supabase';

// Secret used by server mods, KubeJS scripts, or Pterodactyl bridge scripts
const API_SECRET = process.env.MINECRAFT_API_SECRET || process.env.LEADERBOARD_SYNC_SECRET || 'changeme_to_a_secure_password';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')?.replace('Bearer ', '') || request.headers.get('x-api-secret');
    if (authHeader !== API_SECRET) {
      return NextResponse.json({ error: 'Unauthorized: Invalid X-API-Secret or Authorization header' }, { status: 401 });
    }

    const data = await request.json();

    if (!data.uuid) {
      return NextResponse.json({ error: 'Missing required field: uuid' }, { status: 400 });
    }

    const serverId = data.server_id || data.server || 'unknown';
    const name = data.name || 'Unknown Player';
    const isOnline = data.is_online !== undefined ? data.is_online : (data.event_type !== 'PLAYER_LEAVE' && data.event_type !== 'PLAYER_QUIT');

    // 1. Prepare live status payload for player_live_status table
    const livePayload = {
      uuid: data.uuid,
      server_id: serverId,
      name: name,
      is_online: isOnline,
      health: data.health !== undefined ? data.health : null,
      max_health: data.max_health !== undefined ? data.max_health : null,
      level: data.level !== undefined ? data.level : null,
      dimension: data.dimension || null,
      coordinates: data.coordinates || null,
      armor: data.armor || null,
      main_hand: data.main_hand || null,
      event_type: data.event_type || 'UPDATE',
      updated_at: new Date().toISOString()
    };

    // Upsert into player_live_status table
    const { error: liveError } = await supabase
      .from('player_live_status')
      .upsert(livePayload, { onConflict: 'uuid' });

    if (liveError) {
      console.error("Supabase player_live_status Upsert Error:", liveError);
      // Note: If table does not exist yet, we log error but continue if stats update is present
    }

    // 2. If statistical data (playtime, deaths, mob_kills, blocks_mined) is included in the live event, also sync to `players` table
    let statsSynced = false;
    if (data.playtime !== undefined || data.deaths !== undefined || data.mob_kills !== undefined || data.blocks_mined !== undefined) {
      // Fetch existing player record for this server if we need partial merge, or upsert provided values
      const { data: existingPlayer } = await supabase
        .from('players')
        .select('*')
        .eq('uuid', data.uuid)
        .eq('server_id', serverId)
        .maybeSingle();

      const statsPayload = {
        uuid: data.uuid,
        server_id: serverId,
        name: name,
        playtime: data.playtime !== undefined ? data.playtime : (existingPlayer?.playtime || 0),
        votes: data.votes !== undefined ? data.votes : (existingPlayer?.votes || 0),
        deaths: data.deaths !== undefined ? data.deaths : (existingPlayer?.deaths || 0),
        mob_kills: data.mob_kills !== undefined ? data.mob_kills : (existingPlayer?.mob_kills || 0),
        blocks_mined: data.blocks_mined !== undefined ? data.blocks_mined : (existingPlayer?.blocks_mined || 0),
        role: data.role || existingPlayer?.role || 'Player',
        color: data.color || existingPlayer?.color || '#ffffff',
        updated_at: new Date().toISOString()
      };

      const { error: statsError } = await supabase
        .from('players')
        .upsert(statsPayload, { onConflict: 'uuid, server_id' });

      if (statsError) {
        console.error("Supabase players stats Upsert Error:", statsError);
      } else {
        statsSynced = true;
      }
    }

    return NextResponse.json({ 
      success: true, 
      live_status_updated: !liveError, 
      stats_updated: statsSynced,
      uuid: data.uuid,
      event: data.event_type || 'UPDATE'
    });
  } catch (err: any) {
    console.error("Minecraft Event Gateway Error:", err);
    return NextResponse.json({ error: 'Internal Server Error', details: err?.message || String(err) }, { status: 500 });
  }
}
