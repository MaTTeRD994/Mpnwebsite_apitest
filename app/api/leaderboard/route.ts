import { NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabase';

export const revalidate = 60; // Cache leaderboard for 60 seconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '1000');

    // Fetch players from the aggregated view, sorted by playtime descending
    const { data: players, error } = await supabase
      .from('network_leaderboard')
      .select('*')
      .order('playtime', { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
    }

    // Also fetch the most recent server for each player uuid
    const { data: recentServers } = await supabase
      .from('players')
      .select('uuid, server_id, updated_at')
      .order('updated_at', { ascending: false });

    // Map each player to include their latest server_id and last seen time
    const serverMap = new Map();
    if (recentServers) {
      for (const row of recentServers) {
        if (!serverMap.has(row.uuid)) {
          serverMap.set(row.uuid, { server_id: row.server_id, updated_at: row.updated_at });
        }
      }
    }

    // Fetch users to see who has linked their Discord
    const { data: linkedUsers } = await supabase
      .from('users')
      .select('minecraft_uuid, discord_id')
      .not('minecraft_uuid', 'is', null);

    const linkedUuids = new Set(linkedUsers?.map(u => u.minecraft_uuid));

    const enrichedPlayers = players?.map(p => ({
      ...p,
      last_server: serverMap.get(p.uuid)?.server_id || 'Unknown',
      updated_at: serverMap.get(p.uuid)?.updated_at || p.updated_at,
      discord: linkedUuids.has(p.uuid)
    })) || [];

    return NextResponse.json(enrichedPlayers);
  } catch (err) {
    console.error("Leaderboard GET Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
