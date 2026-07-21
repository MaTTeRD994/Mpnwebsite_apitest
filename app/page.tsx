"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ServerCard from "../components/ServerCard";
import { Users, Server, Zap } from "lucide-react";

export default function Home() {
  const [featuredServers, setFeaturedServers] = useState<any[]>([]);
  const [totalOnline, setTotalOnline] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalServersCount, setTotalServersCount] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/servers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTotalServersCount(data.length);
          // Show top 6 servers on the clean landing page
          const featured = data.filter((s: any) => s.featured);
          setFeaturedServers(featured.length >= 3 ? featured.slice(0, 6) : data.slice(0, 6));
          
          let onlineCount = 0;
          let playersCount = 0;
          data.forEach((s: any) => {
            if (s.status === "Online") {
              onlineCount++;
              playersCount += s.players || 0;
            }
          });
          setTotalOnline(onlineCount);
          setTotalPlayers(playersCount);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch servers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ background: 'var(--bg-base)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION — brand tokens, 8pt spacing rhythm, retro/dotted accents */}
      <section style={{
        minHeight: '82vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '4rem',
        paddingBottom: '5rem',
        paddingInline: 'clamp(1.5rem, 6.7vw, 6rem)', /* 24px at mobile, scaling to the 96px margin right around the 1440px desktop cap */
        position: 'relative'
      }}>
        {/* Mobile-only override: when the stats grid below collapses from 3 columns to 1 (auto-fit's
            responsive fallback, avoids cramping instead of squeezing columns), swap the vertical
            column-dividers for horizontal ones so no stray border floats on a full-width row.
            Scoped to this page only — doesn't touch globals.css or the existing 768px/420px breakpoints. */}
        <style>{`
          @media (max-width: 480px) {
            .hero-stat-divider {
              border-right: none !important;
              border-bottom: 1px solid var(--border-light);
              padding-bottom: 0.75rem;
            }
          }
        `}</style>

        {/* Subtle ambient glow, toned down to match brand.md's "Zero Neon Hype" rule — tokenized via color-mix */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '640px',
          height: '420px',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent) 0%, color-mix(in srgb, var(--diamond) 4%, transparent) 55%, transparent 72%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '850px', margin: '0 auto', width: '100%' }}>

          {/* Top Pill Badge — Roboto Medium eyebrow label. Uses --secondary (the lighter
              red step) for the text/dot, not --primary: --primary is a solid-fill red
              tuned for backgrounds+white text, and doesn't clear small-text contrast
              on its own against the dark page background. */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)',
            color: 'var(--secondary)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: '0.12em',
            padding: '0.5rem 1.25rem',
            borderRadius: '9999px',
            marginBottom: '1.5rem'
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--secondary)' }} />
            <span>PREMIER MODDED MINECRAFT NETWORK</span>
          </div>

          {/* Clean Hero Title — min bound lowered to 2.5rem so "MORE THAN SERVERS." reliably fits 2 lines at ~375px without an awkward 3rd wrap */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4.75rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            margin: '0 0 1.25rem 0'
          }}>
            MORE THAN SERVERS. <br/>
            <span style={{ color: 'var(--primary)' }}>
              A HOME.
            </span>
          </h1>

          {/* Clean Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '640px',
            margin: '0 0 2.5rem 0',
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            Free modded Minecraft servers built around community, creativity, automation, and long-term world stability. Jump into our worlds with zero hassle.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
            <Link
              href="/servers"
              style={{
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: 800,
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 8px 25px var(--primary-glow)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s'
              }}
              className="hover-scale"
            >
              <span>Explore Servers</span>
              <span>→</span>
            </Link>

            <Link
              href="/discord"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontSize: '1.05rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              className="hover-scale"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#5865F2' }}>
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
              </svg>
              Join Discord
            </Link>
          </div>

          {/* Sleek Stats Bar — faint dotted-pattern strip nods to the mockup's spotlight-card texture */}
          <div style={{
            width: '100%',
            maxWidth: '720px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: '20px',
            padding: '1.5rem 1rem',
            position: 'relative',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.35)'
          }}>
            <div className="dotted-pattern" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '32px', opacity: 0.12, pointerEvents: 'none' }} />

            <div className="hero-stat-divider" style={{ textAlign: 'center', borderRight: '1px solid var(--border-light)', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Users size={22} strokeWidth={2} color="var(--signal)" /> {loading ? <span className="skeleton-bar" /> : totalPlayers}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>Players Online Now</div>
            </div>

            <div className="hero-stat-divider" style={{ textAlign: 'center', borderRight: '1px solid var(--border-light)', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Server size={22} strokeWidth={2} color="var(--diamond)" /> {loading ? <span className="skeleton-bar" /> : totalOnline} <span style={{ fontSize: '1.1rem', opacity: 0.6 }}>/ {totalServersCount}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>Servers Online</div>
            </div>

            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Zap size={22} strokeWidth={2} color="var(--gold)" /> 20 TPS
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>Stable 24/7 Uptime</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. COUPLE SERVER CARDS GRID */}
      <section style={{ padding: '1rem 1.5rem 6rem', maxWidth: '1250px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              CHOOSE YOUR ADVENTURE
            </div>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
              Featured Servers & Modpacks
            </h2>
          </div>
          <Link href="/servers" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }} className="hover-scale">
            View all {totalServersCount} servers →
          </Link>
        </div>

        {/* Clean Server Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.75rem' }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-surface)', borderRadius: '26px', border: '1px solid var(--border-light)' }}>
              Loading servers...
            </div>
          ) : featuredServers.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-surface)', borderRadius: '26px' }}>
              No live servers found right now.
            </div>
          ) : (
            featuredServers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))
          )}
        </div>
      </section>

    </main>
  );
}
