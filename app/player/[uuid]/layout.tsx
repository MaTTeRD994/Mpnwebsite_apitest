import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Player Profile & Network Statistics",
  description: "View live Minecraft player profile, 3D character skin, playtime hours, playtime rank, mob kills, and global network statistics across MaTTeRPixel Network.",
  openGraph: {
    title: "Player Profile Statistics | MaTTeRPixel Network",
    description: "Check out this player's live statistics, playtime rank, and 3D skin on MaTTeRPixel Network.",
  },
};

export default function PlayerProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
