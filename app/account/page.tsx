"use client";
import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";

export default function AccountPage() {
  const { user, loading, refreshUser } = useAuth();
  const [linkCode, setLinkCode] = useState("");
  const [linkStatus, setLinkStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [linking, setLinking] = useState(false);

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
        <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading...</div>
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
            Sign in with your Discord account to access your profile, link your Minecraft account, and more.
          </p>
          <a
            href="/api/auth/login"
            style={{
              background: 'rgba(88, 101, 242, 0.85)',
              border: '1px solid rgba(165, 180, 252, 0.3)',
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

  return (
    <main style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ color: '#a855f7', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            MY PROFILE
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold', color: '#fff', margin: 0 }}>
            Account Settings
          </h1>
        </div>

        {/* Discord Profile Card */}
        <div style={{
          background: 'rgba(18, 18, 24, 0.85)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1.25rem',
          padding: '2rem',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <img
              src={avatarUrl}
              alt={user.discord_username}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: '3px solid rgba(88, 101, 242, 0.5)',
                boxShadow: '0 8px 24px rgba(88, 101, 242, 0.2)',
              }}
            />
            <div>
              <h2 style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>
                {user.discord_username}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#5865f2">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Discord Connected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Minecraft Link Card */}
        <div style={{
          background: 'rgba(18, 18, 24, 0.85)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1.25rem',
          padding: '2rem',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>⛏️</span> Minecraft Account
          </h3>

          {user.minecraft_uuid ? (
            /* LINKED STATE */
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.25rem',
                background: 'rgba(74, 222, 128, 0.06)',
                border: '1px solid rgba(74, 222, 128, 0.2)',
                borderRadius: '1rem',
                flexWrap: 'wrap',
              }}>
                <img
                  src={`https://mc-heads.net/avatar/${user.minecraft_uuid}/64`}
                  alt={user.minecraft_name || 'Minecraft'}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '0.75rem',
                    border: '2px solid rgba(74, 222, 128, 0.3)',
                    background: 'rgba(0,0,0,0.4)',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 'bold' }}>
                      {user.minecraft_name}
                    </span>
                    <span style={{
                      background: 'rgba(74, 222, 128, 0.15)',
                      color: '#4ade80',
                      padding: '0.15rem 0.6rem',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      letterSpacing: '0.05em',
                    }}>
                      ✓ LINKED
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    {user.minecraft_uuid}
                  </div>
                </div>
                <a
                  href={`/player/${user.minecraft_uuid}`}
                  style={{
                    background: 'rgba(168, 85, 247, 0.15)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    color: '#a855f7',
                    padding: '0.55rem 1.1rem',
                    borderRadius: '0.6rem',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  View Profile →
                </a>
              </div>
            </div>
          ) : (
            /* UNLINKED STATE */
            <div>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  <strong style={{ color: '#fff' }}>How to link your Minecraft account:</strong><br/>
                  1. Join any MPN server<br/>
                  2. Type <code style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>/link</code> in-game<br/>
                  3. Enter the code below
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    value={linkCode}
                    onChange={(e) => setLinkCode(e.target.value.toUpperCase().slice(0, 6))}
                    placeholder="ABC123"
                    maxLength={6}
                    style={{
                      width: '160px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '2px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontSize: '1.5rem',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      letterSpacing: '0.3em',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
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
                      padding: '0.85rem 1.5rem',
                      borderRadius: '0.75rem',
                      fontSize: '0.95rem',
                      cursor: linkCode.length < 6 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: linkCode.length >= 6 ? '0 8px 20px rgba(16, 185, 129, 0.3)' : 'none',
                    }}
                  >
                    {linking ? 'Linking...' : 'Link Account'}
                  </button>
                </div>

                {linkStatus && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.6rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    background: linkStatus.type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${linkStatus.type === 'success' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    color: linkStatus.type === 'success' ? '#4ade80' : '#ef4444',
                  }}>
                    {linkStatus.message}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
