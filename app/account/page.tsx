"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthProvider";
import { supabase } from "../../utils/supabase";
import { getPlaytimeRank, PLAYTIME_RANKS } from "../../utils/ranks";

export default function AccountPage() {
  const { user, loading, refreshUser } = useAuth();
  const [linkCode, setLinkCode] = useState("");
  const [linkStatus, setLinkStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [linking, setLinking] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'perks' | 'settings'>('overview');

  useEffect(() => {
    if (!user?.minecraft_uuid) return;
    setLoadingStats(true);
    supabase
      .from("network_leaderboard")
      .select("*")
      .eq("uuid", user.minecraft_uuid)
      .single()
      .then(({ data }) => {
        setStats(data || { playtime: 0, mob_kills: 0, blocks_mined: 0, deaths: 0, servers_played: 0 });
        setLoadingStats(false);
      });
  }, [user?.minecraft_uuid]);

  const handleLink = async () => {
    if (!linkCode.trim()) return;
    setLinking(true);
    setLinkStatus(null);

    try {
      const res = await fetch("/api/auth/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: linkCode.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setLinkStatus({ type: 'success', message: `Successfully linked to ${data.minecraft_name}!` });
        setLinkCode("");
        await refreshUser();
      } else {
        setLinkStatus({ type: 'error', message: data.error || 'Failed to link account.' });
      }
    } catch {
      setLinkStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLinking(false);
    }
  };

  const handleUnlink = async () => {
    if (!confirm('Are you sure you want to unlink your Minecraft account?')) return;
    try {
      const res = await fetch("/api/auth/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'unlink' }),
      });
      if (res.ok) {
        await refreshUser();
      }
    } catch {
      // silently fail
    }
  };

  if (loading) {
    return (
      <main style={{ background: 'var(--bg-base)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading account data...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main style={{ background: 'var(--bg-base)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{
          background: 'rgba(18, 18, 24, 0.85)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1.25rem',
          padding: '3.5rem 3rem',
          textAlign: 'center',
          maxWidth: '420px',
          width: '100%',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.75rem 0' }}>
            Login Required
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 2rem 0' }}>
            Sign in with your Discord account to access your player dashboard, link your Minecraft character, and track your rank progression.
          </p>
          <a
            href="/api/auth/login"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              border: '1px solid rgba(248, 113, 113, 0.4)',
              color: '#fff',
              fontWeight: 'bold',
              padding: '0.85rem 2rem',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              transition: 'all 0.2s',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Login with Discord
          </a>
        </div>
      </main>
    );
  }

  const avatarUrl = user.discord_avatar
    ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.discord_avatar}.png?size=128`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discord_id) % 5}.png`;

  const playtimeHours = stats?.playtime || 0;
  const currentRank = getPlaytimeRank(playtimeHours, user.minecraft_name || "");

  // Calculate next rank progress
  const getNextRankProgress = () => {
    if (user.minecraft_name?.toLowerCase() === 'thamatter') {
      return { next: null, percent: 100, remaining: 0 };
    }
    let currentIdx = 0;
    for (let i = PLAYTIME_RANKS.length - 1; i >= 0; i--) {
      if (playtimeHours >= PLAYTIME_RANKS[i].hours) {
        currentIdx = i;
        break;
      }
    }
    const next = currentIdx + 1 < PLAYTIME_RANKS.length ? PLAYTIME_RANKS[currentIdx + 1] : null;
    if (!next) {
      return { next: null, percent: 100, remaining: 0 };
    }
    const current = PLAYTIME_RANKS[currentIdx];
    const progressInRange = playtimeHours - current.hours;
    const rangeTotal = next.hours - current.hours;
    const percent = Math.min(Math.max(Math.round((progressInRange / rangeTotal) * 100), 0), 100);
    const remaining = Math.max(next.hours - playtimeHours, 0);
    return { next, percent, remaining };
  };

  const rankProgress = getNextRankProgress();

  return (
    <main style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '3rem 1.5rem 6rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Page Title */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            PLAYER COMMAND CENTER
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
            Account Dashboard
          </h1>
        </div>

        {/* 🌟 UNIFIED 3D HERO BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(18, 18, 24, 0.95) 0%, rgba(26, 26, 38, 0.85) 100%)',
          border: `1px solid ${user.minecraft_uuid ? currentRank.color + '66' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '1.5rem',
          padding: '2.25rem',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.6), 0 0 40px -10px ${user.minecraft_uuid ? currentRank.color + '33' : 'transparent'}`,
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Ambient Background Glow */}
          {user.minecraft_uuid && (
            <div style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '400px',
              height: '400px',
              background: currentRank.color,
              filter: 'blur(130px)',
              opacity: 0.12,
              pointerEvents: 'none'
            }} />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
            
            {/* Left Column: Avatars / 3D Character Preview */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
              {user.minecraft_uuid ? (
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* 3D Minecraft Body Render */}
                  <div style={{
                    width: '84px',
                    height: '110px',
                    background: 'rgba(0,0,0,0.5)',
                    border: `2px solid ${currentRank.color}`,
                    borderRadius: '1rem',
                    padding: '0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 10px 25px rgba(0,0,0,0.5), inset 0 0 15px ${currentRank.color + '22'}`
                  }}>
                    <img
                      src={`https://mc-heads.net/body/${user.minecraft_uuid}/right`}
                      alt={user.minecraft_name || 'Minecraft Player'}
                      style={{ height: '95px', objectFit: 'contain' }}
                    />
                  </div>
                  {/* Connected Discord Avatar Badge */}
                  <img
                    src={avatarUrl}
                    alt={user.discord_username}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '2px solid #5865f2',
                      boxShadow: '0 4px 12px rgba(88, 101, 242, 0.4)',
                      position: 'absolute',
                      bottom: '-6px',
                      right: '-12px',
                      background: '#121218'
                    }}
                  />
                </div>
              ) : (
                <img
                  src={avatarUrl}
                  alt={user.discord_username}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    border: '3px solid #5865f2',
                    boxShadow: '0 8px 24px rgba(88, 101, 242, 0.3)',
                  }}
                />
              )}
            </div>

            {/* Center Column: Player Identification & Rank Level Up Bar */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                  {user.minecraft_uuid ? user.minecraft_name : user.discord_username}
                </h2>
                {user.minecraft_uuid ? (
                  <span style={{
                    background: currentRank.color + '22',
                    color: currentRank.color,
                    border: `1px solid ${currentRank.color + '66'}`,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {currentRank.name}
                  </span>
                ) : (
                  <span style={{
                    background: 'rgba(234, 179, 8, 0.15)',
                    color: '#facc15',
                    border: '1px solid rgba(234, 179, 8, 0.4)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    ⚠️ Minecraft Unlinked
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#a5b4fc' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  {user.discord_username}
                </span>
                {user.minecraft_uuid && (
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
                )}
                {user.minecraft_uuid && (
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', opacity: 0.7 }}>
                    UUID: {user.minecraft_uuid.slice(0, 8)}...{user.minecraft_uuid.slice(-4)}
                  </span>
                )}
              </div>

              {/* Level Up Progress Bar */}
              {user.minecraft_uuid && rankProgress.next ? (
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                    <span style={{ color: currentRank.color }}>{currentRank.name} ({playtimeHours}h)</span>
                    <span style={{ color: rankProgress.next.color }}>Next: {rankProgress.next.name} ({rankProgress.next.hours}h)</span>
                  </div>
                  <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      height: '100%',
                      width: `${rankProgress.percent}%`,
                      background: `linear-gradient(90deg, ${currentRank.color}, ${rankProgress.next.color})`,
                      borderRadius: '999px',
                      transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    <span>Progress to next rank: <strong style={{ color: '#fff' }}>{rankProgress.percent}%</strong></span>
                    <span><strong style={{ color: '#fff' }}>{rankProgress.remaining} hours</strong> remaining</span>
                  </div>
                </div>
              ) : user.minecraft_uuid ? (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem 1rem', borderRadius: '0.75rem', color: '#fca5a5', fontSize: '0.85rem', fontWeight: 600 }}>
                  🌟 You have achieved our maximum rank milestone (`{currentRank.name}`) or special Admin privileges!
                </div>
              ) : null}
            </div>

            {/* Right Column: Profile Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {user.minecraft_uuid ? (
                <a
                  href={`/player/${user.minecraft_uuid}`}
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                    color: '#fff',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxShadow: '0 8px 20px rgba(168, 85, 247, 0.3)',
                    transition: 'transform 0.2s'
                  }}
                >
                  View Public Profile →
                </a>
              ) : (
                <button
                  onClick={() => setActiveTab('settings')}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    color: '#fff',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  Connect Minecraft →
                </button>
              )}
            </div>

          </div>
        </div>

        {/* 📑 INTERACTIVE DASHBOARD TABS */}
        <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              background: activeTab === 'overview' ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: `1px solid ${activeTab === 'overview' ? 'rgba(255,255,255,0.2)' : 'transparent'}`,
              color: activeTab === 'overview' ? '#fff' : 'var(--text-muted)',
              padding: '0.7rem 1.5rem',
              borderRadius: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <span>📊</span> Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('perks')}
            style={{
              background: activeTab === 'perks' ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: `1px solid ${activeTab === 'perks' ? 'rgba(255,255,255,0.2)' : 'transparent'}`,
              color: activeTab === 'perks' ? '#fff' : 'var(--text-muted)',
              padding: '0.7rem 1.5rem',
              borderRadius: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <span>🏆</span> Rank & Perks ({PLAYTIME_RANKS.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              background: activeTab === 'settings' ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: `1px solid ${activeTab === 'settings' ? 'rgba(255,255,255,0.2)' : 'transparent'}`,
              color: activeTab === 'settings' ? '#fff' : 'var(--text-muted)',
              padding: '0.7rem 1.5rem',
              borderRadius: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <span>⚙️</span> Account Settings & Link
          </button>
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'overview' && (
          <div>
            {user.minecraft_uuid ? (
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  YOUR LIVE NETWORK PERFORMANCE
                </div>
                {loadingStats ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(18,18,24,0.7)', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                    Fetching real-time stats across all MPN servers...
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(74, 222, 128, 0.2)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>⏱️</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#4ade80' }}>{stats?.playtime || 0}h</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginTop: '0.2rem' }}>Total Playtime</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(251, 146, 60, 0.2)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>⚡</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fb923c' }}>{(stats?.mob_kills || 0).toLocaleString()}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginTop: '0.2rem' }}>Mob Kills</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(234, 179, 8, 0.2)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>⛏️</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#eab308' }}>{(stats?.blocks_mined || 0).toLocaleString()}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginTop: '0.2rem' }}>Blocks Mined</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(248, 113, 113, 0.2)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>💀</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f87171' }}>{(stats?.deaths || 0).toLocaleString()}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginTop: '0.2rem' }}>Total Deaths</div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(96, 165, 250, 0.2)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>📦</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#60a5fa' }}>{stats?.servers_played || 0}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginTop: '0.2rem' }}>Modpacks Played</div>
                    </div>
                  </div>
                )}

                {/* Personal Milestones Checkbox Grid */}
                <div style={{ fontSize: '0.75rem', color: '#a855f7', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  PERSONAL MILESTONES & BADGES
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div className="glass" style={{ padding: '1.25rem', borderRadius: '14px', border: `1px solid ${(stats?.blocks_mined || 0) >= 10000 ? '#4ade80' : 'rgba(255,255,255,0.06)'}`, opacity: (stats?.blocks_mined || 0) >= 10000 ? 1 : 0.6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 800, color: '#fff' }}>🪵 Lumberjack</span>
                      <span>{(stats?.blocks_mined || 0) >= 10000 ? '✅' : '🔒'}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mine over 10,000 blocks across the network.</div>
                  </div>
                  <div className="glass" style={{ padding: '1.25rem', borderRadius: '14px', border: `1px solid ${(stats?.mob_kills || 0) >= 1000 ? '#4ade80' : 'rgba(255,255,255,0.06)'}`, opacity: (stats?.mob_kills || 0) >= 1000 ? 1 : 0.6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 800, color: '#fff' }}>⚔️ Monster Hunter</span>
                      <span>{(stats?.mob_kills || 0) >= 1000 ? '✅' : '🔒'}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Slay over 1,000 hostile mobs.</div>
                  </div>
                  <div className="glass" style={{ padding: '1.25rem', borderRadius: '14px', border: `1px solid ${(stats?.playtime || 0) >= 50 ? '#4ade80' : 'rgba(255,255,255,0.06)'}`, opacity: (stats?.playtime || 0) >= 50 ? 1 : 0.6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 800, color: '#fff' }}>⏳ Vanguard Veteran</span>
                      <span>{(stats?.playtime || 0) >= 50 ? '✅' : '🔒'}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reach 50 hours of total network playtime.</div>
                  </div>
                  <div className="glass" style={{ padding: '1.25rem', borderRadius: '14px', border: '1px solid #4ade80', opacity: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 800, color: '#fff' }}>🤝 Bridge Builder</span>
                      <span>✅</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Successfully link your Discord & Minecraft accounts.</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass" style={{ padding: '3rem 2rem', borderRadius: '1.25rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📌</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
                  No Minecraft Account Connected
                </h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
                  Link your Minecraft account in the <strong style={{ color: '#fff' }}>Settings</strong> tab to start tracking live playtime, mob kills, and rank progression across all MaTTeRPixel modpacks.
                </p>
                <button
                  onClick={() => setActiveTab('settings')}
                  style={{
                    background: 'var(--primary)',
                    color: '#fff',
                    padding: '0.75rem 1.75rem',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Link Account Now →
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RANK & PERKS */}
        {activeTab === 'perks' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '0 0 0.4rem 0' }}>
                Playtime Ranks & Rewards
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                As you play across any MaTTeRPixel Network server, your hours automatically accumulate toward higher ranks and permanent perks.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
              {PLAYTIME_RANKS.map((rank) => {
                const isCurrent = currentRank.name === rank.name;
                const isUnlocked = playtimeHours >= rank.hours || isCurrent;

                return (
                  <div
                    key={rank.name}
                    className="glass"
                    style={{
                      padding: '1.75rem',
                      borderRadius: '16px',
                      border: isCurrent
                        ? `2px solid ${rank.color}`
                        : isUnlocked
                        ? `1px solid ${rank.color + '66'}`
                        : '1px solid rgba(255,255,255,0.06)',
                      background: isCurrent
                        ? `linear-gradient(135deg, rgba(18,18,24,0.9) 0%, ${rank.color + '18'} 100%)`
                        : 'rgba(18,18,24,0.7)',
                      position: 'relative',
                      opacity: isUnlocked ? 1 : 0.65,
                      transition: 'transform 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: rank.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          TIER {rank.hours} HOURS
                        </span>
                        <h4 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0 0 0' }}>
                          {rank.name}
                        </h4>
                      </div>
                      {isCurrent ? (
                        <span style={{ background: rank.color, color: '#000', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 900 }}>
                          ★ CURRENT
                        </span>
                      ) : isUnlocked ? (
                        <span style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                          ✓ UNLOCKED
                        </span>
                      ) : (
                        <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                          🔒 {rank.hours - playtimeHours}h LEFT
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', fontSize: '0.88rem', color: 'var(--text-light)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>FTB Claim Chunks:</span>
                        <strong style={{ color: '#fff' }}>{rank.claims} Chunks</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Force Loaded Chunks:</span>
                        <strong style={{ color: '#fff' }}>{rank.forceLoaded} Chunks</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Max /homes:</span>
                        <strong style={{ color: '#fff' }}>{rank.homes} {rank.homes === 1 ? 'Home' : 'Homes'}</strong>
                      </div>
                      {rank.specialDiscord && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a855f7', fontWeight: 700, marginTop: '0.3rem', fontSize: '0.82rem' }}>
                          <span>💬</span> Special Discord Role & Color
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ACCOUNT SETTINGS & LINKING */}
        {activeTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Left Box: Minecraft Linking State */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span>⛏️</span> Minecraft Account Link
              </h3>

              {user.minecraft_uuid ? (
                <div>
                  <div style={{ padding: '1.25rem', background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      Connected IGN
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', marginBottom: '0.25rem' }}>
                      {user.minecraft_name}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {user.minecraft_uuid}
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Your Minecraft account is actively synced with Discord. You earn playtime across all servers under this identity. Unlinking will disconnect your website profile from your in-game stats.
                  </p>

                  <button
                    onClick={handleUnlink}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#ef4444',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    className="hover-bg-surface"
                  >
                    Unlink Minecraft Account
                  </button>
                </div>
              ) : (
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Connect your Minecraft character to sync playtime ranks, claim special Discord roles, and unlock your web dashboard.
                  </p>

                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>How to connect right now:</strong>
                    <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: '0.5rem 0 0 0' }}>
                      <li>Join any MaTTeRPixel server in Minecraft</li>
                      <li>Type <code style={{ color: '#a855f7', background: 'rgba(168,85,247,0.15)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 'bold' }}>/link</code> in your game chat</li>
                      <li>Copy the 6-character code given by the bot and enter it below</li>
                    </ol>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      value={linkCode}
                      onChange={(e) => setLinkCode(e.target.value.toUpperCase().slice(0, 6))}
                      placeholder="ABC123"
                      maxLength={6}
                      style={{
                        flex: 1,
                        minWidth: '140px',
                        background: 'rgba(0,0,0,0.4)',
                        border: '2px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontSize: '1.25rem',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        letterSpacing: '0.25em',
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        outline: 'none',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />
                    <button
                      onClick={handleLink}
                      disabled={linkCode.length < 6 || linking}
                      style={{
                        background: linkCode.length < 6 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        border: 'none',
                        color: linkCode.length < 6 ? 'rgba(255,255,255,0.3)' : '#fff',
                        fontWeight: 'bold',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        fontSize: '0.95rem',
                        cursor: linkCode.length < 6 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: linkCode.length >= 6 ? '0 8px 20px rgba(16, 185, 129, 0.3)' : 'none',
                      }}
                    >
                      {linking ? 'Verifying...' : 'Connect →'}
                    </button>
                  </div>

                  {linkStatus && (
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '0.6rem',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      background: linkStatus.type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      border: `1px solid ${linkStatus.type === 'success' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                      color: linkStatus.type === 'success' ? '#4ade80' : '#ef4444',
                    }}>
                      {linkStatus.message}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Box: Discord Account Profile & Logout */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span>💬</span> Discord Account Identity
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'rgba(88, 101, 242, 0.08)', border: '1px solid rgba(88, 101, 242, 0.25)', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                  <img
                    src={avatarUrl}
                    alt={user.discord_username}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #5865f2' }}
                  />
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff' }}>
                      {user.discord_username}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 600 }}>
                      Discord OAuth Verified
                    </div>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Your website login is managed via Discord OAuth2. We do not store any passwords. To switch Discord accounts or end your session on this device, click logout below.
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                <a
                  href="/api/auth/logout"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#ef4444',
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  🚪 Logout Session
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
