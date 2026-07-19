import { NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get('uuid');

  if (!uuid) return NextResponse.json({ error: 'Missing uuid' });

  const { data, error } = await supabase
    .from("network_leaderboard")
    .select("*")
    .eq("uuid", uuid)
    .single();

  const { data: allData } = await supabase.from("network_leaderboard").select("uuid").limit(5);

  return NextResponse.json({
    requestedUuid: uuid,
    foundData: data,
    error: error,
    sampleUuids: allData
  });
}
