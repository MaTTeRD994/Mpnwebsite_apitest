import { NextResponse } from 'next/server';
import { staticServers } from '../../../config/servers';
import { supabase } from '../../../utils/supabase';

export const revalidate = 30; // Revalidate the cache every 30 seconds

export async function GET() {
  const panelUrl = process.env.PTERODACTYL_PANEL_URL;
  const apiKey = process.env.PTERODACTYL_CLIENT_API_KEY;

  if (!panelUrl || !apiKey) {
    console.error("Missing Pterodactyl environment variables");
    // Fallback: return static servers with 'Unknown' status
    return NextResponse.json(
      staticServers.map(s => ({ ...s, status: 'Unknown' }))
    );
  }

  try {
    // Fetch historical joined player counts from Supabase
    const { data: dbPlayers } = await supabase.from('players').select('server_id');
    const joinedCounts: Record<string, number> = {};
    if (dbPlayers) {
      dbPlayers.forEach((p: any) => {
        joinedCounts[p.server_id] = (joinedCounts[p.server_id] || 0) + 1;
      });
    }

    // We will attempt to fetch the resource status for servers that have a pterodactyl_id mapped.
    // Right now, we only know "makeshiftsmp" maps to "b691e0da", but we'll try to fetch all if we have an ID.
    // For servers without an ID, we'll try to fetch the full client list first to match them by name.

    const clientRes = await fetch(`${panelUrl}/api/client`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      next: { revalidate: 30 }
    });

    if (!clientRes.ok) {
      throw new Error(`Pterodactyl API error: ${clientRes.status}`);
    }

    const clientData = await clientRes.json();
    const pteroServers = clientData.data || [];

    // Map pterodactyl identifiers to static servers based on name matching or explicit pterodactyl_id
    const updatedServers = await Promise.all(staticServers.map(async (staticServer) => {
      let pteroIdentifier = staticServer.pterodactyl_id;

      // If we didn't hardcode an ID, try to find a partial name match from the Pterodactyl list
      if (!pteroIdentifier) {
        const match = pteroServers.find((ps: any) => 
          ps.attributes.name.toLowerCase().includes(staticServer.name.toLowerCase()) ||
          staticServer.name.toLowerCase().includes(ps.attributes.name.toLowerCase())
        );
        if (match) {
          pteroIdentifier = match.attributes.identifier;
        }
      }

      let status = staticServer.isPrivate ? "Private" : staticServer.isComingSoon ? "Coming Soon" : "Offline";
      let playersCount = 0;

      if (!staticServer.isPrivate && !staticServer.isComingSoon) {
        if (pteroIdentifier) {
          try {
            // Fetch the live resource status
            const resRes = await fetch(`${panelUrl}/api/client/servers/${pteroIdentifier}/resources`, {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
              },
              next: { revalidate: 30 }
            });
            
            if (resRes.ok) {
              const resData = await resRes.json();
              const state = resData.attributes?.current_state; // running, offline, starting, stopping
              
              if (state === "running") status = "Online";
              else if (state === "starting") status = "Starting";
              else if (state === "stopping") status = "Stopping";
              else status = "Offline";
            }
          } catch (e) {
            console.error(`Failed to fetch status for ${pteroIdentifier}`, e);
          }
        } else {
           // If we don't have a pterodactyl server match yet, just default to Offline
           status = "Offline";
        }
      }

      // If the server is Online or Starting, fetch the live player count using mcsrvstat API
      if (status === "Online" || status === "Starting") {
        try {
          // api.mcsrvstat.us provides a free, fast way to get player counts without pinging natively in node
          const mcStatRes = await fetch(`https://api.mcsrvstat.us/3/${staticServer.address}`, { next: { revalidate: 30 } });
          if (mcStatRes.ok) {
            const mcData = await mcStatRes.json();
            if (mcData.online && mcData.players) {
              playersCount = mcData.players.online || 0;
            }
          }
        } catch (e) {
          console.error(`Failed to fetch player count for ${staticServer.address}`, e);
        }
      }

      return {
        ...staticServer,
        status,
        players: playersCount,
        joinedPlayers: joinedCounts[staticServer.id] || 0,
        pterodactyl_id: pteroIdentifier // Expose if found, for debugging
      };
    }));

    return NextResponse.json(updatedServers);
  } catch (error) {
    console.error("Error fetching from Pterodactyl:", error);
    return NextResponse.json(
      staticServers.map(s => ({ ...s, status: 'Error' })),
      { status: 500 }
    );
  }
}
