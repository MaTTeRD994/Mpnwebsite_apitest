# 🔮 MaTTeRPixel Network 

![MaTTeRPixel Banner](https://raw.githubusercontent.com/MaTTeRD994/Mpnwebsite_apitest/main/public/logo.png)

Welcome to the official repository for the **MaTTeRPixel Network Website**, a premium, automated web platform built for high-performance Minecraft server networks.

## ✨ Features
* **Dynamic Server Status:** Real-time pinging of game servers through the Pterodactyl Panel API and `mcsrvstat.us` to display live player counts and online/offline statuses.
* **Automated Leaderboards:** A serverless Next.js cron job that automatically scrapes `usercache.json` and `world/stats/` from game nodes, calculates precise playtime, and pushes it to a Supabase Postgres database.
* **Premium Dark Mode UI:** Built with pure CSS glassmorphism, glowing accents, and smooth micro-animations.
* **Fully Responsive:** Beautifully designed for desktop and mobile alike.

## 🚀 Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Database:** Supabase (PostgreSQL)
* **Hosting:** Vercel

## ⚙️ Setup & Deployment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaTTeRD994/Mpnwebsite_apitest.git
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   PTERODACTYL_PANEL_URL=https://console.yourhost.com
   PTERODACTYL_CLIENT_API_KEY=your_client_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

---
*Built with ❤️ for the MaTTeRPixel Community.*
