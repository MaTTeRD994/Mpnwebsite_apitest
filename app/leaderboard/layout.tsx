import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Leaderboard & Playtime Stats",
  description: "Explore the live community leaderboard on MaTTeRPixel Network. Track player playtime ranks, hours played, mob kills, top votes, and online statuses across all modpacks.",
  openGraph: {
    title: "Community Leaderboard | MaTTeRPixel Network",
    description: "Check top players, playtime rankings, and live network statistics across MaTTeRPixel Network.",
  },
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
