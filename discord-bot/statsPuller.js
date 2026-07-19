const fs = require('fs');
const path = require('path');
const tar = require('tar');

class StatsPuller {
  constructor(supabase, panelUrl, apiKey) {
    this.supabase = supabase;
    this.panelUrl = panelUrl;
    this.apiKey = apiKey;
  }

  async runSync() {
    console.log('[StatsSync] Starting global stats sync from Pterodactyl...');
    try {
      // 1. Get all servers
      const res = await fetch(`${this.panelUrl}/api/client`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Accept': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to fetch servers');
      const data = await res.json();
      
      const servers = data.data || []; // Adjust if meta.folders is used, but standard is data
      let allServers = servers;
      
      // If panel uses folders plugin (like the user's panel), extract servers from folders
      if (data.meta && data.meta.folders) {
        allServers = [];
        for (const folder of data.meta.folders.data) {
           if (folder.relationships && folder.relationships.servers) {
              allServers.push(...folder.relationships.servers.data);
           }
        }
      }

      for (const server of allServers) {
        await this.syncServer(server.attributes.identifier, server.attributes.name);
      }
      
      console.log('[StatsSync] Global stats sync completed successfully!');
    } catch (err) {
      console.error('[StatsSync] Error during sync:', err);
    }
  }

  async syncServer(serverId, serverName) {
    console.log(`[StatsSync] Syncing server: ${serverName} (${serverId})`);
    try {
      // Step 1: Request compression of the world/stats folder
      const compressRes = await fetch(`${this.panelUrl}/api/client/servers/${serverId}/files/compress`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ root: '/world', files: ['stats'] })
      });

      if (!compressRes.ok) {
        // Folder might not exist, skip
        console.log(`[StatsSync] Skipped ${serverName} (No world/stats found)`);
        return;
      }

      const compressData = await compressRes.json();
      const archiveName = compressData.attributes.name;

      // Wait a few seconds for Pterodactyl daemon to finish compressing
      await new Promise(r => setTimeout(r, 5000));

      // Step 2: Get download URL for the archive
      const downloadRes = await fetch(`${this.panelUrl}/api/client/servers/${serverId}/files/download?file=/world/${archiveName}`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Accept': 'application/json' }
      });
      
      if (!downloadRes.ok) throw new Error('Failed to get download URL');
      const downloadData = await downloadRes.json();
      const downloadUrl = downloadData.attributes.url;

      // Step 3: Download the archive
      const archivePath = path.join(__dirname, `${serverId}_stats.tar.gz`);
      const extractDir = path.join(__dirname, `${serverId}_stats_extracted`);
      
      const fileRes = await fetch(downloadUrl);
      const buffer = await fileRes.arrayBuffer();
      fs.writeFileSync(archivePath, Buffer.from(buffer));

      // Step 4: Extract the archive locally
      if (!fs.existsSync(extractDir)) fs.mkdirSync(extractDir);
      await tar.x({
        file: archivePath,
        cwd: extractDir
      });

      // Step 5: Parse JSON files
      const statsDir = path.join(extractDir, 'stats'); // Inside the archive it is stored as 'stats'
      if (fs.existsSync(statsDir)) {
        const files = fs.readdirSync(statsDir).filter(f => f.endsWith('.json'));
        console.log(`[StatsSync] Found ${files.length} player stat files in ${serverName}`);
        
        for (const file of files) {
          const uuid = file.replace('.json', '');
          const rawData = JSON.parse(fs.readFileSync(path.join(statsDir, file), 'utf8'));
          
          await this.processPlayerStats(uuid, rawData, serverId);
        }
      }

      // Step 6: Cleanup Local Files
      fs.rmSync(archivePath);
      fs.rmSync(extractDir, { recursive: true, force: true });

      // Step 7: Delete Archive from Pterodactyl
      await fetch(`${this.panelUrl}/api/client/servers/${serverId}/files/delete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ root: '/world', files: [archiveName] })
      });

    } catch (err) {
      console.error(`[StatsSync] Failed to sync server ${serverName}:`, err);
    }
  }

  async processPlayerStats(uuid, rawData, serverId) {
    try {
      let playtime = 0;
      let deaths = 0;
      let mobKills = 0;
      let blocksMined = 0;

      // Minecraft stats format mapping
      const stats = rawData.stats || {};
      
      // Playtime (ticks to hours)
      const custom = stats['minecraft:custom'] || {};
      const playOneMinute = custom['minecraft:play_time'] || custom['minecraft:play_one_minute'] || 0;
      playtime = Math.floor(playOneMinute / 20 / 60 / 60); // Ticks -> Seconds -> Minutes -> Hours

      deaths = custom['minecraft:deaths'] || 0;
      mobKills = custom['minecraft:mob_kills'] || 0;

      // Blocks mined
      const mined = stats['minecraft:mined'] || {};
      for (const count of Object.values(mined)) {
        blocksMined += count;
      }

      // Upsert into Supabase network_leaderboard
      // We use upsert with a fallback for name if it's a new player (you can add a Mojang API fetch here later)
      const { data: existingPlayer } = await this.supabase
        .from('network_leaderboard')
        .select('*')
        .eq('uuid', uuid)
        .maybeSingle();

      const newStats = {
        uuid: uuid,
        playtime: (existingPlayer?.playtime || 0) + playtime,
        deaths: (existingPlayer?.deaths || 0) + deaths,
        mob_kills: (existingPlayer?.mob_kills || 0) + mobKills,
        blocks_mined: (existingPlayer?.blocks_mined || 0) + blocksMined,
        name: existingPlayer?.name || 'Unknown Player',
        updated_at: new Date().toISOString()
      };

      await this.supabase.from('network_leaderboard').upsert(newStats);
      
    } catch (err) {
      console.error(`[StatsSync] Failed to process stats for ${uuid}:`, err);
    }
  }
}

module.exports = StatsPuller;
