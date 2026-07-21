# LuckPerms Group Setup — Global Rank Ladder

Groundwork for Phase 2 (automated in-game rank push, not built yet). This doc gets the
LuckPerms side of each server ready by hand so Phase 2 has real groups to target.

Canonical ladder (source: `discord-bot/ranks.json`, mirrored on the website via `utils/ranks.ts`):

| # | Tier | Hours | Claims | Force-Loaded | Homes |
|---|------|-------|--------|--------------|-------|
| 1 | Neophyte | 0 | 16 | 1 | 1 |
| 2 | Ember | 4 | 32 | 4 | 1 |
| 3 | Astral | 24 | 64 | 8 | 2 |
| 4 | Vanguard | 50 | 100 | 16 | 2 |
| 5 | Warden | 75 | 120 | 24 | 3 |
| 6 | Luminar | 100 | 150 | 30 | 3 |
| 7 | Vesper | 200 | 200 | 40 | 4 |
| 8 | Zenith | 400 | 250 | 50 | 4 |
| 9 | Mythos | 700 | 300 | 64 | 5 |
| 10 | Eclipse | 1000 | 400 | 84 | 6 |

## 1. Create the groups (run on each server's console, or via `/lp` in-game as an op)

Group names are the lowercased tier name — keep this exact casing so Phase 2's
automated commands can assume it later.

```
/lp creategroup neophyte
/lp creategroup ember
/lp creategroup astral
/lp creategroup vanguard
/lp creategroup warden
/lp creategroup luminar
/lp creategroup vesper
/lp creategroup zenith
/lp creategroup mythos
/lp creategroup eclipse
```

## 2. Chain inheritance (each tier inherits the one below it)

This means granting `eclipse` also grants everything `mythos` and below already have —
you only need to add what's *new* at each tier.

```
/lp group ember parent add neophyte
/lp group astral parent add ember
/lp group vanguard parent add astral
/lp group warden parent add vanguard
/lp group luminar parent add warden
/lp group vesper parent add luminar
/lp group zenith parent add vesper
/lp group mythos parent add zenith
/lp group eclipse parent add mythos
```

## 3. FTB Chunks claim limits — needs verification, don't copy blindly

FTB Chunks reads claim-chunk and force-load limits from permission nodes, but the exact
node name/format depends on your installed FTB Chunks version and config
(`ftbchunks-common.toml` or in-game `/ftbchunks` admin commands). I don't have high
enough confidence in the exact syntax to hand you copy-paste commands for a production
server — getting a claim-limit permission wrong is the kind of thing worth checking
together against your actual server config rather than guessing here.

What to check on one server first:
1. Open `config/ftbchunks-common.toml` (or the equivalent per-modpack config) and look
   for how claim/force-load limits are exposed — either a flat per-player default, or a
   permission-node pattern.
2. If it's permission-node based, the pattern is typically something like
   `ftbchunks.max_chunks.<N>` or `ftbchunks.force_load.<N>` — confirm the exact node in
   your version's docs/config before wiring it into any group.
3. Once confirmed, add the matching `/lp group <tier> permission set <node> true` (or
   meta-set, if it's a numeric value rather than a boolean node) to each group above,
   using the Claims/Force-Loaded numbers from the table.

## 4. Homes

Same caveat as above — depends on which homes plugin you're running (FTB Ranks'
built-in homes vs. a separate plugin). Confirm the permission node pattern before wiring
per-group `homes` limits.

## Notes

- `specialDiscord` tiers (Mythos, Eclipse) don't need any LuckPerms setup — that flag
  only affects a website UI badge and (eventually) a Discord role, not in-game perms.
- Nothing here is executed automatically yet. Phase 2 will need a way to run commands
  on each server remotely (Pterodactyl's console websocket — not built, no existing
  precedent in this repo) before any of this can be pushed automatically.
