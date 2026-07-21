"use client";
import { AuthProvider } from "./AuthProvider";
import NavUser from "./NavUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Server, Package, Trophy, Heart, User } from "lucide-react";

function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Explore", href: "/", icon: Compass },
    { label: "Servers", href: "/servers", icon: Server },
    { label: "Packs", href: "/packs", icon: Package },
    { label: "Ranks", href: "/leaderboard", icon: Trophy },
    { label: "Favorites", href: "/store", icon: Heart, badge: true },
    { label: "Profile", href: "/account", icon: User }
  ];

  return (
    <div className="mobile-only clean-pill-nav" style={{
      position: 'fixed',
      bottom: '1rem',
      left: '1rem',
      right: '1rem',
      zIndex: 100,
      padding: '0.45rem 0.75rem',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '30px',
      boxShadow: '0 16px 40px rgba(0,0,0,0.92)'
    }}>
      {navItems.map(item => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
        return (
          <Link key={item.href} href={item.href} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: '0.2rem 0',
            textDecoration: 'none',
            position: 'relative'
          }}>
            {isActive ? (
              <>
                <div className="nav-circle-green">
                  <item.icon size={19} strokeWidth={2} />
                </div>
                <span className="nav-dot-green"></span>
              </>
            ) : (
              <>
                <div style={{ padding: '0.35rem', position: 'relative', display: 'flex' }}>
                  <item.icon size={19} strokeWidth={1.75} color="rgba(255,255,255,0.6)" />
                  {item.badge && (
                    <span style={{
                      position: 'absolute',
                      top: '2px',
                      right: '0px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: 'var(--redstone)',
                      border: '1.5px solid #162030'
                    }} />
                  )}
                </div>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'transparent', marginTop: '4px' }} />
              </>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function ClientNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // "Explore"/Home dropped — the logo already links home, and having both was
  // redundant crowding right next to the wordmark. "Store" no longer gets a
  // permanent highlight color either; a nav item that's colored differently from
  // its siblings all the time (not just when active) reads as inconsistent rather
  // than intentional. Active/inactive is now the only state that changes appearance.
  const desktopLinks = [
    { label: "Servers", href: "/servers" },
    { label: "Modpacks", href: "/packs" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Store", href: "/store" },
    { label: "Guide", href: "/guide" }
  ];

  return (
    <AuthProvider>
      {/* Flush full-width sticky header (Modrinth/Laby-style) instead of a floating
          rounded "glass pill" — the floating-pill treatment read as decorative rather
          than functional, and buried a real layout bug (see site-header-inner below). */}
      <header className="site-header">
        <div
          className="site-header-inner"
          style={{ maxWidth: '1250px', margin: '0 auto', padding: '0.85rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit', flexShrink: 0 }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              background: 'rgba(229, 35, 27, 0.12)',
              border: '1px solid rgba(229, 35, 27, 0.28)',
              boxShadow: '0 4px 12px rgba(229, 35, 27, 0.15)'
            }}>
              <img src="/logo.webp" alt="MP Logo" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>
                MaTTeR<span style={{ color: 'var(--primary)' }}>Pixel</span>
              </span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--secondary)', fontWeight: 'bold' }}>
                Network
              </span>
            </div>
          </Link>

          <div className="desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {desktopLinks.map(item => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }} className="hover-text-primary">
                  <span>{item.label}</span>
                  {/* underline bar instead of the old circular dot — reads as a tab
                      indicator, which fits text links better than the icon-nav dot */}
                  <span style={{ width: '18px', height: '3px', borderRadius: '2px', marginTop: '6px', background: isActive ? 'var(--primary)' : 'transparent' }} />
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {/* Icon-only now — the old icon+text purple pill competed for attention
                with the Login CTA, which should be the one loud element on this side. */}
            <a
              href="/discord"
              title="Discord"
              aria-label="Discord"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-light)',
                color: '#8ea1e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              className="hover-scale desktop-only"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>

            <NavUser />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (`BottomNav`) */}
      <BottomNav />

      {children}
    </AuthProvider>
  );
}
