# MPN Link Mod

A server-side Minecraft mod that adds a `/link` command for linking Minecraft accounts to Discord on the MaTTeRPixel Network website.

## How It Works

1. Player types `/link` in-game
2. Mod generates a random 6-character code (e.g. `A3X9K2`)
3. Code is sent to your Supabase `link_codes` table via REST API
4. Player sees the code in chat with instructions to enter it on the website
5. Code expires after 10 minutes

## Configuration

All versions read from a config file at `config/mpn-link.json`:

```json
{
  "supabaseUrl": "https://yagbveusufnarnibdisr.supabase.co",
  "supabaseKey": "sb_publishable_gdJw6BKFq2icTJgc9G3V5g_7vLjVegL",
  "websiteUrl": "https://mpnwebsite-apitest.vercel.app"
}
```

**Create this file on every server** before starting with the mod installed.

## Versions

| File | Mod Loader | MC Versions |
|------|-----------|-------------|
| `LinkMod-Forge.java` | Forge | 1.20.1 |
| `LinkMod-NeoForge.java` | NeoForge | 1.21.x |
| `LinkMod-Fabric.java` | Fabric | 1.20.1+ |

## Building

Each file is a single-class mod. To build:

1. Create a new mod project for your loader (use the official MDK/template)
2. Replace the main mod class with the provided source
3. Update `mods.toml` / `fabric.mod.json` with mod id `mpnlink`
4. Build with `./gradlew build`

The mod has **zero dependencies** beyond the mod loader API itself — it uses Java's built-in `HttpURLConnection` for the Supabase REST API call.
