import { NextResponse } from 'next/server';
import { supabase } from '../../../../utils/supabase';
import { staticServers } from '../../../../config/servers';

// Maximum time Vercel allows for Serverless Functions is generally 10-60s on hobby/pro tiers.
// We will iterate and try to finish as fast as possible.
// Because pulling individual JSON files is extremely slow, we might hit limits.

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  // Optional security: Ensure only Vercel Cron or authorized users trigger this
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const panelUrl = process.env.PTERODACTYL_PANEL_URL;
  const apiKey = process.env.PTERODACTYL_CLIENT_API_KEY;

  if (!panelUrl || !apiKey) {
    return NextResponse.json({ error: 'Missing Pterodactyl configuration' }, { status: 500 });
  }

  const results: any[] = [];
  const errors: any[] = [];

  // Iterate over each static server sequentially to avoid rate limiting
  for (const server of staticServers) {
    if (!server.pterodactyl_id) continue;
    // Skip GTNH as it uses binary `.dat` stats, not readable via HTTP API easily.
    if (server.id === 'gtnh') continue; 

    try {
      const pteroId = server.pterodactyl_id;
      
      // 1. Fetch usercache.json
      const cacheRes = await fetch(`${panelUrl}/api/client/servers/${pteroId}/files/contents?file=usercache.json`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        }
      });
      
      let usercache: Record<string, string> = {};
      if (cacheRes.ok) {
        try {
          const cacheData = await cacheRes.json(); // usercache is an array of objects
          if (Array.isArray(cacheData)) {
            for (const user of cacheData) {
              if (user.uuid && user.name) {
                usercache[user.uuid] = user.name;
              }
            }
          }
        } catch(e) {
          console.error(`Could not parse usercache.json for ${server.id}`, e);
        }
      }

      // 2. Fetch the list of files checking multiple common stats directories (e.g. world/stats, world/players/stats)
      let files: any[] = [];
      let statsDir = 'world/stats';
      const possibleDirs = ['world/stats', 'world/players/stats', 'stats'];

      for (const dir of possibleDirs) {
        try {
          const listRes = await fetch(`${panelUrl}/api/client/servers/${pteroId}/files/list?directory=${encodeURIComponent(dir)}`, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Accept': 'application/json'
            }
          });
          if (listRes.ok) {
            const listData = await listRes.json();
            const foundFiles = listData.data || [];
            if (foundFiles.some((f: any) => f.attributes?.name?.endsWith('.json'))) {
              files = foundFiles;
              statsDir = dir;
              break;
            }
          }
        } catch (e) {
          // Continue to next directory candidate
        }
      }

      if (files.length === 0) {
        // No stats files found for this server, skip cleanly
        continue;
      }

      // 3. For every .json file, fetch its contents
      const upsertData: any[] = [];
      
      // Process files sequentially with a small delay to avoid Pterodactyl 429 Rate Limits
      for (let i = 0; i < files.length; i++) {
        const fileObj = files[i];
        const filename = fileObj.attributes.name;
        if (!filename.endsWith('.json')) continue;

        const uuid = filename.replace('.json', '');
        const playerName = usercache[uuid] || "Unknown Player";

        try {
          const statRes = await fetch(`${panelUrl}/api/client/servers/${pteroId}/files/contents?file=${statsDir}/${filename}`, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Accept': 'application/json'
            }
          });

          if (statRes.ok) {
            const statJson = await statRes.json();
            
            // Extract deep statistics
            const customStats = statJson?.stats?.["minecraft:custom"] || {};
            const minedStats = statJson?.stats?.["minecraft:mined"] || {};
            
            // Playtime
            const ticks = customStats["minecraft:play_time"] || 0;
            const hours = Math.round(ticks / 72000); // 20 ticks/sec * 60 * 60 = 72000 ticks/hour
            
            // Deaths and Kills
            const deaths = customStats["minecraft:deaths"] || 0;
            const mobKills = customStats["minecraft:mob_kills"] || 0;
            
            // Calculate total blocks mined by summing all values in minecraft:mined
            let blocksMined = 0;
            for (const key in minedStats) {
              blocksMined += minedStats[key];
            }
            
            upsertData.push({
              uuid: uuid,
              server_id: server.id,
              name: playerName,
              playtime: hours,
              votes: 0,
              deaths: deaths,
              mob_kills: mobKills,
              blocks_mined: blocksMined,
              role: 'Player',
              color: '#4ade80',
              updated_at: new Date().toISOString()
            });
          }
          
          // Sleep for 100ms between requests to avoid rate-limiting
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch(e) {
           console.error(`Failed to read stats file ${filename} on ${server.id}`);
        }
      }

      // 4. Upsert into Supabase
      if (upsertData.length > 0) {
        const { error: sbError } = await supabase
          .from('players')
          .upsert(upsertData, { onConflict: 'uuid, server_id' });

        if (sbError) throw sbError;
      }
      
      results.push({ server: server.id, players_synced: upsertData.length });

    } catch (err: any) {
      console.error(`Error pulling stats for ${server.id}:`, err);
      errors.push({ server: server.id, error: err.message });
    }
  }

  return NextResponse.json({
    success: true,
    results,
    errors
  });
}
