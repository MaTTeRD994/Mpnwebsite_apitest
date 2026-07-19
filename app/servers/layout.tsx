import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Minecraft Servers & Modpacks",
  description: "Browse MaTTeRPixel Network's live modded Minecraft servers. View real-time player counts, uptime statistics, IP addresses, and modpack installation links for ATM10, Deceasedcraft, and more.",
  openGraph: {
    title: "Live Minecraft Servers | MaTTeRPixel Network",
    description: "Explore active modpacks and live server status across the MaTTeRPixel Network.",
  },
};

export default function ServersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
