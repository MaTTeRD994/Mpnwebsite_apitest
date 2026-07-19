"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ServerCard from "../components/ServerCard";

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
          // Show top 3 featured servers or first 3
          const featured = data.filter((s: any) => s.featured);
          setFeaturedServers(featured.length >= 3 ? featured.slice(0, 3) : data.slice(0, 3));
          
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
      {/* 1. HERO SECTION */}
      <section style={{ 
        minHeight: '92vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        padding: '5rem 1.5rem 4rem',
        position: 'relative'
      }}>
        {/* Semi-transparent background herobg.png covering full viewport */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/herobg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.18,
          filter: 'blur(3px) brightness(0.7) contrast(0.85)',
          zIndex: 0
        }} />
        
        {/* Smooth gradient fades at top/bottom */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--bg-base) 0%, transparent 20%, transparent 75%, var(--bg-base) 100%)',
          zIndex: 1
        }} />

        {/* Ambient radial glow */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
          {/* Logo above Title */}
          <div style={{ marginBottom: '1.5rem', animation: 'float 6s ease-in-out infinite' }}>
            <Image 
              src="/logo.png" 
              alt="MaTTeRPxiel Network Logo" 
              width={200} 
              height={100} 
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 10px 25px rgba(139, 92, 246, 0.4))' }}
              priority
            />
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.25rem)', 
            fontWeight: '900', 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em',
            color: '#fff', 
            margin: '0 0 1.25rem 0',
            textShadow: '0 10px 30px rgba(0,0,0,0.6)'
          }}>
            Your Next Modded Adventure <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 50%, #8b5cf6 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              Starts Here
            </span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', 
            color: 'var(--text-muted)', 
            maxWidth: '680px', 
            margin: '0 0 2.5rem 0', 
            lineHeight: 1.6 
          }}>
            A hand-picked collection of modded Minecraft servers — from kitchen sinks to expert packs. Join thousands of players and find your perfect pack today.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyItems: 'center', justifyContent: 'center', marginBottom: '3.5rem' }}>
            <Link 
              href="/servers"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                fontWeight: 'bold',
                padding: '0.9rem 2.2rem',
                borderRadius: '0.75rem',
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              className="hover-scale"
            >
              <span>☰</span> Browse Servers
            </Link>
            
            <Link 
              href="/discord"
              style={{
                background: 'rgba(88, 101, 242, 0.85)',
                border: '1px solid rgba(165, 180, 252, 0.3)',
                color: '#fff',
                fontWeight: 'bold',
                padding: '0.9rem 2.2rem',
                borderRadius: '0.75rem',
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '0 10px 25px -5px rgba(88, 101, 242, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.2s, background-color 0.2s'
              }}
              className="hover-scale"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
              </svg>
              Join Discord
            </Link>
          </div>

          {/* Stats Bar Card (3 Columns) */}
          <div style={{
            width: '100%',
            maxWidth: '750px',
            background: 'rgba(18, 18, 24, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '1.25rem',
            padding: '1.5rem 1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#4ade80' }}>👥</span> {loading ? '...' : totalPlayers}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Players Online Now</div>
            </div>

            <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#60a5fa' }}>🖥️</span> {loading ? '...' : totalOnline} <span style={{ fontSize: '1.1rem', opacity: 0.6 }}>/ {totalServersCount}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Servers Online</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#fbbf24' }}>🕒</span> 24/7
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Always Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECENTLY ADDED / LATEST SERVERS */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1250px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              RECENTLY ADDED
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 'bold', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
              Latest Servers
            </h2>
          </div>
          <Link href="/servers" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }} className="hover-text-primary">
            View all →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              Loading latest server data...
            </div>
          ) : featuredServers.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No servers available right now.
            </div>
          ) : (
            featuredServers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))
          )}
        </div>
      </section>

      {/* 3. GETTING STARTED ("Join in 3 Simple Steps") */}
      <section style={{ padding: '6rem 1.5rem 5rem', maxWidth: '1250px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ color: '#c084fc', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            GETTING STARTED
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.75rem 0', letterSpacing: '-0.02em' }}>
            Join in 3 Simple Steps
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto' }}>
            No complicated setup — get into a modded world in minutes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginTop: '1rem' }}>
          {/* Step 1 */}
          <div style={{
            background: 'rgba(18, 18, 24, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '1.25rem',
            padding: '2.75rem 2rem 2.25rem',
            position: 'relative',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: '-18px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
              color: '#fff',
              fontWeight: '900',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.5)',
              border: '2px solid var(--bg-base)'
            }}>
              1
            </div>
            <div style={{ width: '56px', height: '56px', borderRadius: '1rem', background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.25)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.25rem', color: '#c084fc' }}>
              📥
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.75rem 0' }}>
              Download the Modpack
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
              Install the modpack of your choice via CurseForge or the Modrinth App. All our packs feature simple one-click installs with zero manual mod configuration needed.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{
            background: 'rgba(18, 18, 24, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '1.25rem',
            padding: '2.75rem 2rem 2.25rem',
            position: 'relative',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: '-18px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
              color: '#fff',
              fontWeight: '900',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(56, 189, 248, 0.5)',
              border: '2px solid var(--bg-base)'
            }}>
              2
            </div>
            <div style={{ width: '56px', height: '56px', borderRadius: '1rem', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.25)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.25rem', color: '#38bdf8' }}>
              🖥️
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.75rem 0' }}>
              Connect to the Server
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
              Copy the server IP address from our Servers page or directly from the cards above and add it to your multiplayer server list in Minecraft.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{
            background: 'rgba(18, 18, 24, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '1.25rem',
            padding: '2.75rem 2rem 2.25rem',
            position: 'relative',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: '-18px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              fontWeight: '900',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.5)',
              border: '2px solid var(--bg-base)'
            }}>
              3
            </div>
            <div style={{ width: '56px', height: '56px', borderRadius: '1rem', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1.25rem', color: '#4ade80' }}>
              ⚡
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.75rem 0' }}>
              Play & Progress
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
              Earn automatic playtime milestones, vote for helpful rewards, and track your gameplay statistics across all MaTTeRPxiel Network servers.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHY MATTERPXIEL NETWORK? ("Everything You Need") */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1250px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            WHY MATTERPXIEL NETWORK?
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 'bold', color: '#fff', margin: '0', letterSpacing: '-0.02em' }}>
            Everything You Need
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {/* Feature 1 */}
          <div style={{ background: 'rgba(18, 18, 24, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              🖥️
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.4rem 0' }}>
                9+ Modded Servers
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                Kitchen sinks, expert packs, and everything in between across both Forge and Fabric ecosystems.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div style={{ background: 'rgba(18, 18, 24, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              🎁
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.4rem 0' }}>
                Vote Rewards
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                Support the network by voting daily and unlock exclusive perks, helpful item packages, and progression tiers.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div style={{ background: 'rgba(18, 18, 24, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              🏆
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.4rem 0' }}>
                Playtime Ranks
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                Network-wide synced ranks — play across any server to unlock claim blocks, force-loaded chunks, and sethomes.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div style={{ background: 'rgba(18, 18, 24, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              💾
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.4rem 0' }}>
                Hourly Backups
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                All servers are backed up continuously to secure offsite storage so your builds and world progress are always safe.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div style={{ background: 'rgba(18, 18, 24, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              ⚡
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.4rem 0' }}>
                24/7 Uptime & TPS
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                Hosted on enterprise high-frequency hardware ensuring ultra-low latency, stable 20 TPS, and zero lag.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div style={{ background: 'rgba(18, 18, 24, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
              💬
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.4rem 0' }}>
                Active Community
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                Join our welcoming Discord to chat, find teammates, get instant support from friendly staff, and share your creations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MODPACK MARQUEE STRIP */}
      <section style={{ padding: '3.5rem 0 4.5rem', overflow: 'hidden', opacity: 0.18, userSelect: 'none', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', justifyContent: 'center', flexWrap: 'wrap', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em' }}>
          <span>GregTech New Horizons</span>
          <span>•</span>
          <span>All The Mods 10</span>
          <span>•</span>
          <span>ATM 10 To The Sky</span>
          <span>•</span>
          <span>All The Mons</span>
          <span>•</span>
          <span>ThaSMP</span>
          <span>•</span>
          <span>Deceased Craft</span>
        </div>
      </section>

      {/* 6. JOIN THE COMMUNITY CTA CARD */}
      <section style={{ padding: '0 1.5rem 6rem', maxWidth: '1250px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 46, 0.85) 0%, rgba(18, 18, 24, 0.95) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          borderRadius: '1.5rem',
          padding: '3.25rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(88, 101, 242, 0.2)', border: '1px solid rgba(88, 101, 242, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a5b4fc' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
                </svg>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                Join the Community
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: '0 0 0 4rem', maxWidth: '500px', lineHeight: 1.5 }}>
              Got questions? Want to find teammates or share your creations? Our Discord is the heart of the network. Come say hi!
            </p>
          </div>

          <Link
            href="/discord"
            style={{
              background: '#5865F2',
              color: '#fff',
              padding: '1rem 2.2rem',
              borderRadius: '0.75rem',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
              boxShadow: '0 10px 25px -5px rgba(88, 101, 242, 0.4)',
              transition: 'transform 0.2s, background-color 0.2s'
            }}
            className="hover-scale"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z"/>
            </svg>
            Join Discord
          </Link>
        </div>
      </section>
    </main>
  );
}
