import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mpnwebsite-apitest.vercel.app"),
  title: {
    default: "MaTTeRPixel Network | Free Modded Minecraft Servers",
    template: "%s | MaTTeRPixel Network",
  },
  description: "Join the MaTTeRPixel Network (MPN) — premier lag-free modded Minecraft servers. Explore All The Mods 10 (ATM10), Deceasedcraft, Makeshift SMP, and more with live player tracking and zero lag.",
  keywords: ["Minecraft", "Modded Minecraft", "ATM10", "All The Mods 10", "Deceasedcraft", "Makeshift SMP", "Minecraft Server List", "Modpack Servers", "MPN", "MaTTeRPixel Network"],
  authors: [{ name: "MaTTeRPixel Team" }],
  creator: "MaTTeRPixel Network",
  publisher: "MaTTeRPixel Network",
  openGraph: {
    title: "MaTTeRPixel Network | Free Modded Minecraft Servers",
    description: "Join the MaTTeRPixel Network (MPN) — premier lag-free modded Minecraft servers. Explore expert modpacks, kitchen sinks, and long-term community worlds.",
    url: "https://mpnwebsite-apitest.vercel.app",
    siteName: "MaTTeRPixel Network",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "MaTTeRPixel Network Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MaTTeRPixel Network | Free Modded Minecraft Servers",
    description: "Join the MaTTeRPixel Network (MPN) — premier lag-free modded Minecraft servers with zero lag and vibrant community.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation */}
        <nav className="glass" style={{ margin: '1.5rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1.5rem', zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Logo Placeholder */}
            <div style={{ 
              width: '45px', 
              height: '45px', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img src="/logo.png" alt="MP Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <a href="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1', textDecoration: 'none', color: 'inherit' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>MaTTeR<span style={{ color: 'var(--primary)' }}>Pixel</span></span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--text-muted)', fontWeight: 'bold' }}>Network</span>
            </a>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-muted)' }}>
            <a href="/" className="nav-link" style={{ transition: 'color 0.2s' }}>Home</a>
            <a href="/servers" className="nav-link" style={{ transition: 'color 0.2s' }}>Servers</a>
            <a href="/leaderboard" className="nav-link" style={{ transition: 'color 0.2s' }}>Leaderboard</a>
            <a href="/guide" className="nav-link" style={{ transition: 'color 0.2s' }}>Guide</a>
            <a href="/faq" className="nav-link" style={{ transition: 'color 0.2s' }}>FAQ</a>
          </div>
          
          <div>
            <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Join Discord</button>
          </div>
        </nav>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--border-light)', padding: '4rem 2rem', marginTop: 'auto', background: 'var(--bg-base)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>MaTTeR<span style={{ color: 'var(--primary)' }}>Pixel</span></span>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--text-muted)', fontWeight: 'bold' }}>Network</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Free modded Minecraft servers built around community, creativity, and automation. Expert packs, kitchen sinks, and long-term worlds.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Network</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servers" style={{ color: 'inherit', textDecoration: 'none' }}>Servers</a></li>
                <li><a href="/leaderboard" style={{ color: 'inherit', textDecoration: 'none' }}>Leaderboard</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Support</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="/guide" style={{ color: 'inherit', textDecoration: 'none' }}>Guides</a></li>
                <li><a href="/faq" style={{ color: 'inherit', textDecoration: 'none' }}>FAQ</a></li>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Discord</a></li>
              </ul>
            </div>
          </div>
          <div style={{ maxWidth: '1200px', margin: '2rem auto 0', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div>Session: 00:00:00 | Servers: 8 Active / 0 Offline | Global Players: 154</div>
            <div>MPN v2.0.0</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
