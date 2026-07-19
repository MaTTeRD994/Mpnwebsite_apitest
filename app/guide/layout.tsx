import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server Guides, Tutorials & Modpack Setup",
  description: "Learn how to get started on the MaTTeRPixel Network. Read installation tutorials for CurseForge and Prism Launcher, explore playtime ranks, and view helpful server commands.",
  openGraph: {
    title: "Server Guides & Tutorials | MaTTeRPixel Network",
    description: "Get started with modded Minecraft installation guides, server commands, and rank information.",
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
