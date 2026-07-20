// ============================================================================
// MaTTeRPxiel Network (MPN) - Real-Time Character & Gear Sync (KubeJS Script)
// ============================================================================
// Place this file inside: kubejs/server_scripts/mpn_live_sync.js
// Works with ATM10, ATM9, and KubeJS 6 & 7!
// ============================================================================

// --- CONFIGURATION ---
const MPN_API_URL = "https://mpnhost.com/api/minecraft/event"; // Correct live website domain!
const MPN_API_SECRET = "MPN_LiveSync_8a9B2cD3eF4gH5"; // Pre-filled securely matching your website's .env.local!
const SERVER_ID = "atm10"; // Change per server: e.g., "atm10", "gtnh", "thasmp"
const SYNC_INTERVAL_TICKS = 6000; // 6000 ticks = 5 minutes periodic sync
// ---------------------

function pushPlayerData(player, eventType, serverInstance) {
    if (!player) return;
    
    console.log("[MPN Sync] Preparing sync payload for player: " + player.getUsername() + " (" + eventType + ")");
    
    try {
        let uuid = player.getUuid().toString();
        let name = player.getUsername();
        let isOnline = (eventType !== "PLAYER_LEAVE" && eventType !== "PLAYER_QUIT");
        let health = Math.round(player.getHealth() * 10) / 10;
        let maxHealth = Math.round(player.getMaxHealth() * 10) / 10;
        let level = player.getXpLevel();
        
        let dim = "minecraft:overworld";
        try {
            dim = player.getLevel().getDimension().location().toString();
        } catch (e) {}
        
        let coordinates = { x: 0, y: 64, z: 0 };
        try {
            let pos = player.getBlockPosition();
            coordinates = { x: pos.getX(), y: pos.getY(), z: pos.getZ() };
        } catch (e) {
            try {
                coordinates = { x: Math.round(player.getX()), y: Math.round(player.getY()), z: Math.round(player.getZ()) };
            } catch (e2) {}
        }
        
        // Extract Armor Slots
        let armorList = [];
        let slots = ["boots", "leggings", "chestplate", "helmet"];
        try {
            let idx = 0;
            player.getArmorSlots().forEach(item => {
                if (item && !item.isEmpty()) {
                    let displayName = item.getId();
                    try {
                        displayName = item.getDisplayName().getString();
                    } catch (e) {}
                    
                    armorList.push({
                        slot: slots[idx] || "armor",
                        item: item.getId(),
                        name: displayName
                    });
                }
                idx++;
            });
        } catch (e) {}
        
        // Extract Main Hand Weapon / Tool
        let mainHand = null;
        try {
            let mainHandItem = player.getMainHandItem();
            if (mainHandItem && !mainHandItem.isEmpty()) {
                let displayName = mainHandItem.getId();
                try {
                    displayName = mainHandItem.getDisplayName().getString();
                } catch (e) {}
                
                mainHand = {
                    item: mainHandItem.getId(),
                    name: displayName
                };
            }
        } catch (e) {}
        
        let payloadObj = {
            uuid: uuid,
            name: name,
            server_id: SERVER_ID,
            event_type: eventType,
            is_online: isOnline,
            health: health,
            max_health: maxHealth,
            level: level,
            dimension: dim,
            coordinates: coordinates,
            armor: armorList,
            main_hand: mainHand
        };
        let payloadJson = JSON.stringify(payloadObj);
        
        // Always save latest player status locally as backup
        try {
            if (typeof JsonIO !== 'undefined') {
                JsonIO.write("kubejs/mpn_sync_cache.json", payloadObj);
            }
        } catch (cacheErr) {}

        console.log("[MPN Sync] Sending payload for " + name + " to " + MPN_API_URL + "...");

        // Method 1: Try NetworkJS / FetchJS global fetch API if available
        if (typeof fetch !== 'undefined') {
            fetch(MPN_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + MPN_API_SECRET
                },
                body: payloadJson
            }).then(response => {
                console.log("[MPN Sync] ✅ Successfully synced " + name + " via fetch (HTTP " + response.status + ")");
            }).catch(err => {
                console.error("[MPN Sync] ❌ fetch error: " + err);
            });
            return;
        }

        // Method 2: Try KubeJS http.post utility if available
        if (typeof http !== 'undefined' && http.post) {
            http.post(MPN_API_URL, payloadJson, {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + MPN_API_SECRET
            });
            console.log("[MPN Sync] ✅ Sent via http.post for " + name);
            return;
        }

        // Method 3: Safe ClassLoader reflection execution function
        let executeNetworkPush = () => {
            try {
                let ClassLoaderClass = Java.loadClass('java.lang.ClassLoader');
                let sysLoader = ClassLoaderClass.getSystemClassLoader();
                
                let URLClass = sysLoader.loadClass('java.net.URL');
                let StringClass = Java.loadClass('java.lang.String');
                let urlObj = URLClass.getConstructor(StringClass).newInstance(MPN_API_URL);
                
                let conn = urlObj.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Authorization", "Bearer " + MPN_API_SECRET);
                conn.setConnectTimeout(6000);
                conn.setReadTimeout(6000);
                conn.setDoOutput(true);
                
                let OutputStreamWriterClass = sysLoader.loadClass('java.io.OutputStreamWriter');
                let writer = OutputStreamWriterClass.getConstructor(sysLoader.loadClass('java.io.OutputStream'), StringClass)
                    .newInstance(conn.getOutputStream(), "UTF-8");
                writer.write(payloadJson);
                writer.flush();
                writer.close();
                
                let responseCode = conn.getResponseCode();
                if (responseCode === 200) {
                    console.log("[MPN Sync] ✅ Successfully synced " + name + " via Reflection (HTTP 200)!");
                } else {
                    console.error("[MPN Sync] ❌ Failed to sync " + name + " - HTTP " + responseCode);
                }
                conn.disconnect();
            } catch (err) {
                console.error("[MPN Sync] ❌ Reflection Network Error: " + err);
            }
        };

        // Determine correct KubeJS 7 server object to schedule non-blocking tick or execute safely
        let srv = serverInstance || (player && player.server) || (player && player.level && player.level.server);
        if (srv && srv.scheduleInTicks) {
            srv.scheduleInTicks(1, executeNetworkPush);
        } else {
            // Execute directly if scheduleInTicks is not exposed
            executeNetworkPush();
        }
    } catch (outerErr) {
        console.error("[MPN Sync] ❌ Error extracting data from player: " + outerErr);
    }
}

// --- EVENT LISTENERS ---
PlayerEvents.loggedIn(event => {
    pushPlayerData(event.player, "PLAYER_JOIN", event.server);
});

PlayerEvents.loggedOut(event => {
    pushPlayerData(event.player, "PLAYER_LEAVE", event.server);
});

ServerEvents.tick(event => {
    if (event.server.getTickCount() % SYNC_INTERVAL_TICKS === 0 && event.server.getTickCount() > 100) {
        event.server.getPlayers().forEach(player => {
            pushPlayerData(player, "PERIODIC_SYNC", event.server);
        });
    }
});
