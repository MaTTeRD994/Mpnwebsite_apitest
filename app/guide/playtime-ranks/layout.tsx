import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playtime Ranks, Tiers & Rewards",
  description: "View all progression playtime ranks on the MaTTeRPixel Network. Earn hours played to unlock claim blocks, chunk loaders, multiple homes, and special Discord VIP access.",
  openGraph: {
    title: "Playtime Ranks & Progression | MaTTeRPixel Network",
    description: "Unlock more claims, force loaded chunks, and special Discord access as you play.",
  },
};

export default function PlaytimeRanksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
