import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ)",
  description: "Find answers to general and technical questions about MaTTeRPixel Network. Learn about server resets, RAM allocation, launcher setup, free servers, and our community support.",
  openGraph: {
    title: "Frequently Asked Questions | MaTTeRPixel Network",
    description: "Get quick answers to general and technical modded Minecraft questions.",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
