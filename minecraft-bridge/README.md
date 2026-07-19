# MaTTeRPxiel Network (MPN) - Real-Time Minecraft Mod Bridge

This folder contains the server-side bridge scripts and templates to push real-time character vitals (`Health`, `Level`, `Dimension`, `Coordinates`, `Equipped Armor`, `Main Hand Weapon`) and online status to your MaTTeRPxiel Network website (`/api/minecraft/event`).

---

## 🚀 Option 1: KubeJS Server Script (Recommended for ATM10, ATM9, and Modern Packs)
If your server runs **KubeJS** (included by default in All the Mods 10 and almost all modern modpacks):

1. Copy the file `kubejs/mpn_live_sync.js` into your server's `kubejs/server_scripts/` folder:
   ```
   /server/kubejs/server_scripts/mpn_live_sync.js
   ```
2. Open `mpn_live_sync.js` and edit the configuration at the top:
   ```javascript
   const MPN_API_URL = "https://matterpixel.com/api/minecraft/event"; // Or your website domain
   const MPN_API_SECRET = "YOUR_SECRET_HERE"; // Must match LEADERBOARD_SYNC_SECRET in your .env.local
   const SERVER_ID = "atm10"; // Server ID (e.g., "atm10", "gtnh", "thasmp")
   ```
3. Run `/reload` in-game or restart your server. The script will automatically trigger on `PLAYER_JOIN`, `PLAYER_LEAVE`, and every 5 minutes in the background (`PERIODIC_SYNC`) using a separate Java background thread so it **never lags your server**!

---

## ☕ Option 2: Standalone Java Mod / Plugin (For older packs like GTNH 1.7.10 or non-KubeJS servers)
For servers that do not run KubeJS (such as GregTech New Horizons on 1.7.10 or vanilla/plugin servers), you can send JSON `POST` requests directly via any standard HTTP request tool, ServerTick bridge, or Bukkit/Spigot/Forge event listener.

### Required HTTP Request Format
* **Method**: `POST`
* **URL**: `https://yourdomain.com/api/minecraft/event`
* **Headers**:
  ```http
  Authorization: Bearer YOUR_LEADERBOARD_SYNC_SECRET
  Content-Type: application/json
  ```
* **Payload Schema**:
  ```json
  {
    "uuid": "63514ed4-62d2-413f-aeaf-a29d204d757b",
    "name": "Vallith",
    "server_id": "gtnh",
    "event_type": "PLAYER_JOIN",
    "is_online": true,
    "health": 20.0,
    "max_health": 20.0,
    "level": 45,
    "dimension": "minecraft:overworld",
    "coordinates": { "x": 100, "y": 64, "z": -250 },
    "armor": [
      { "slot": "helmet", "item": "gregtech:gt.metaarmor.nano.head", "name": "Nano Helmet" },
      { "slot": "chestplate", "item": "gregtech:gt.metaarmor.nano.chest", "name": "Nano Chestplate" },
      { "slot": "leggings", "item": "gregtech:gt.metaarmor.nano.legs", "name": "Nano Leggings" },
      { "slot": "boots", "item": "gregtech:gt.metaarmor.nano.boots", "name": "Nano Boots" }
    ],
    "main_hand": { "item": "gregtech:gt.metatool.01.diamond_sword", "name": "Diamond Sword" }
  }
  ```

### Standalone Java Example (`HttpURLConnection` snippet)
```java
public static void pushLiveStatus(UUID playerUuid, String playerName, String serverId, boolean isOnline, double health, double maxHealth, int level, String dimension, int x, int y, int z) {
    new Thread(() -> {
        try {
            URL url = new URL("https://yourdomain.com/api/minecraft/event");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Authorization", "Bearer YOUR_SECRET_HERE");
            conn.setDoOutput(true);

            String json = String.format(
                "{\"uuid\":\"%s\",\"name\":\"%s\",\"server_id\":\"%s\",\"is_online\":%b,\"health\":%.1f,\"max_health\":%.1f,\"level\":%d,\"dimension\":\"%s\",\"coordinates\":{\"x\":%d,\"y\":%d,\"z\":%d}}",
                playerUuid.toString(), playerName, serverId, isOnline, health, maxHealth, level, dimension, x, y, z
            );

            OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
            writer.write(json);
            writer.flush();
            writer.close();
            conn.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }).start();
}
```
