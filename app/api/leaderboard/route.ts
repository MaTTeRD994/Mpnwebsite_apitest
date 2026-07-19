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

    return NextResponse.json(players);
  } catch (err) {
    console.error("Leaderboard GET Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
