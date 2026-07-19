# 🛠️ MaTTeRPixel Network — Master Roadmap & TO-DO List

Welcome to your project command center! Keep this file open in your editor (`TODO.md`) or ask me at any time to check off items, add new ideas, or start working on the next task.

---

## 🚀 Immediate Priorities & Setup (Do This Next)

- [ ] **Verify Discord Bot & Pterodactyl Sync**
  - [ ] Check server `matter.6bb391de` (IP: `37.27.225.173:2022`).
  - [ ] Ensure `DiscordBot.zip` is unarchived and running (`node index.js`).
  - [ ] Verify console output shows `[StatsSync] Starting global stats sync...` and populates the `network_leaderboard` table in Supabase.
- [ ] **Review & Test New Pages**
  - [ ] Test `/discord` community hub page locally or on your preview URL.
  - [ ] Test the live Player Dashboard inside `/account` when logged in and linked (`/link`).

---

## 🗳️ Upcoming Features & Pages

### 1. Vote Section (`/vote`) — *Up Next!*
- [ ] **Create `/vote` Page (`app/vote/page.tsx`)**
  - Display server voting links (TopMinecraftServers, PlanetMinecraft, MinecraftServerList, etc.).
  - Show a **Top Voters Leaderboard** pulling right from `playerInfo.votes` in Supabase.
  - Highlight in-game voting rewards (Crate Keys, Claim Blocks, Special Titles, Playtime Rank boosts).
- [ ] **Add `Vote` Link to Navigation Bar**
  - Add `<a href="/vote">Vote</a>` inside `components/ClientNav.tsx`.

### 2. Real-Time Minecraft Mod Data Pusher (`/api/minecraft/event`)
- [ ] **Build Next.js Secure Gateway Endpoint (`app/api/minecraft/event/route.ts`)**
  - Authenticate incoming requests using an `X-Server-API-Key` secret header.
  - Handle event payloads (`PLAYER_JOIN`, `PLAYER_LEAVE`, `ADVANCEMENT`, `INVENTORY_UPDATE`).
- [ ] **Create Server-Side Mod / Script (Fabric/Forge/KubeJS)**
  - Track live online status (`is_online`, `current_server`, exact session timer).
  - Push current armor and inventory data on disconnect to showcase on `/player/[uuid]`.

### 3. Store / Support Page (`/store`)
- [ ] **Create `/store` Page (`app/store/page.tsx`)**
  - Showcase Patreon tiers, server hosting costs transparency, and exclusive VIP cosmetic perks.

---

## ✅ Completed Milestones

- [x] **Discord OAuth & Account Linking Engine (`/api/auth/...`)**
  - Built full JWT session handling (`utils/jwt.ts`).
  - Implemented `/login`, `/callback`, `/logout`, `/me`, and `/link` API endpoints.
- [x] **Frontend Authentication & Navigation UI**
  - Built `AuthProvider`, `NavUser` pill with live Discord avatars, and interactive login modals.
- [x] **High-Performance Image & Asset Optimization**
  - Converted heavy background banners (`herobg.png` -> 47KB `herobg.webp`) and `logo.webp`.
- [x] **Lighthouse SEO, Accessibility & Security Polish**
  - Fixed heading hierarchy (`<h1>`/`<h3>` order) and secured cross-origin links across `/info`.
- [x] **Dedicated Discord Hub Page (`/discord`)**
  - Built stunning community portal showcasing feature grids, role selection guides (`#channels-and-roles`), in-game chat bridge instructions, bot commands (`/lookup`, `/players`), and a 9-rule glassmorphic grid.
- [x] **Live Player Dashboard on Account Page (`/account`)**
  - Upgraded linked account view to dynamically fetch and display real-time network KPIs (`Playtime`, `Mob Kills`, `Blocks Mined`, `Deaths`, `Modpacks`) and synced Playtime Rank badges (`Acolyte` to `Apex`).
