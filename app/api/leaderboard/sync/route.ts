import { NextResponse } from 'next/server';
import { supabase } from '../../../../utils/supabase';

// Secure the endpoint so only your game servers can hit it
const SYNC_SECRET = process.env.LEADERBOARD_SYNC_SECRET || 'changeme_to_a_secure_password';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${SYNC_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Expecting an array of player objects: [{ uuid: "...", name: "Notch", playtime: 120, votes: 5, role: "admin", color: "#f00" }]
    const data = await request.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Payload must be an array of player objects' }, { status: 400 });
    }

    // Add updated_at timestamp to each record and require server_id
    const upsertData = data.map((player: any) => {
      if (!player.server_id) {
        throw new Error(`Missing server_id for player ${player.uuid}`);
      }
      return {
        uuid: player.uuid,
        server_id: player.server_id,
        name: player.name,
        playtime: player.playtime || 0,
        votes: player.votes || 0,
        deaths: player.deaths || 0,
        mob_kills: player.mob_kills || 0,
        blocks_mined: player.blocks_mined || 0,
        role: player.role || 'Player',
        color: player.color || '#ffffff',
        updated_at: new Date().toISOString()
      };
    });

    // Upsert into Supabase (Insert or Update based on UUID + SERVER_ID primary key constraint)
    const { error } = await supabase
      .from('players')
      .upsert(upsertData, { onConflict: 'uuid, server_id' });

    if (error) {
      console.error("Supabase Upsert Error:", error);
      return NextResponse.json({ error: 'Failed to sync data to database' }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: upsertData.length });
  } catch (err) {
    console.error("Leaderboard Sync Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
