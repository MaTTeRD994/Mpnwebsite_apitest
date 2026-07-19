import { NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabase';

export const revalidate = 60; // Cache leaderboard for 60 seconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

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

    // Map each player to include their latest server_id
    const serverMap = new Map();
    if (recentServers) {
      for (const row of recentServers) {
        if (!serverMap.has(row.uuid)) {
          serverMap.set(row.uuid, row.server_id);
        }
      }
    }

    const enrichedPlayers = players?.map(p => ({
      ...p,
      last_server: serverMap.get(p.uuid) || 'Unknown'
    })) || [];

    return NextResponse.json(enrichedPlayers);
  } catch (err) {
    console.error("Leaderboard GET Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
