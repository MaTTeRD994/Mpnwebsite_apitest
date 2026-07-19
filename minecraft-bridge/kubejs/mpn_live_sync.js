// ============================================================================
// MaTTeRPxiel Network (MPN) - Real-Time Character & Gear Sync (KubeJS Script)
// ============================================================================
// Place this file inside: kubejs/server_scripts/mpn_live_sync.js
// Works with ATM10, ATM9, and most KubeJS 1.18+ / 1.20+ / 1.21 modpacks!
// ============================================================================

// --- CONFIGURATION ---
const MPN_API_URL = "https://matterpixel.com/api/minecraft/event"; // Replace with your exact website domain if different
const MPN_API_SECRET = "YOUR_MINECRAFT_API_SECRET"; // Set this to match LEADERBOARD_SYNC_SECRET in your website .env.local
const SERVER_ID = "atm10"; // Change per server: e.g., "atm10", "gtnh", "thasmp"
const SYNC_INTERVAL_TICKS = 6000; // 6000 ticks = 5 minutes periodic sync
// ---------------------

const URL = Java.loadClass('java.net.URL');
const HttpURLConnection = Java.loadClass('java.net.HttpURLConnection');
const OutputStreamWriter = Java.loadClass('java.io.OutputStreamWriter');

function pushPlayerData(player, eventType) {
    if (!player || player.isFake()) return;
    
    // Extract vitals
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
    
    let pos = player.getBlockPosition();
    let coordinates = { x: pos.getX(), y: pos.getY(), z: pos.getZ() };
    
    // Extract Armor Slots (Index order: 0: Boots, 1: Leggings, 2: Chestplate, 3: Helmet)
    let armorList = [];
    let slots = ["boots", "leggings", "chestplate", "helmet"];
    let idx = 0;
    try {
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
    
    // Construct payload
    let payloadJson = JSON.stringify({
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
    });
    
    // Execute async in background so Minecraft server tick thread NEVER lags!
    new java.lang.Thread(() => {
        try {
            let url = new URL(MPN_API_URL);
            let conn = url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Authorization", "Bearer " + MPN_API_SECRET);
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            conn.setDoOutput(true);
            
            let writer = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
            writer.write(payloadJson);
            writer.flush();
            writer.close();
            
            let responseCode = conn.getResponseCode();
            if (responseCode !== 200) {
                console.error("[MPN Sync] Failed to sync player " + name + " - HTTP " + responseCode);
            }
            conn.disconnect();
        } catch (err) {
            console.error("[MPN Sync] Network error while syncing player " + name + ": " + err);
        }
    }).start();
}

// --- EVENT LISTENERS ---
PlayerEvents.loggedIn(event => {
    pushPlayerData(event.player, "PLAYER_JOIN");
});

PlayerEvents.loggedOut(event => {
    pushPlayerData(event.player, "PLAYER_LEAVE");
});

// Periodic background sync every 5 minutes while players are online
ServerEvents.tick(event => {
    if (event.server.getTickCount() % SYNC_INTERVAL_TICKS === 0) {
        event.server.getPlayers().forEach(player => {
            pushPlayerData(player, "PERIODIC_SYNC");
        });
    }
});
