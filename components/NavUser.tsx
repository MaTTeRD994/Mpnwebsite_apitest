"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthProvider";

export default function NavUser() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (loading) {
    return (
      <div style={{
        width: '120px',
        height: '40px',
        borderRadius: '0.75rem',
        background: 'rgba(255,255,255,0.05)',
        animation: 'pulse 2s infinite',
      }} />
    );
  }

  if (!user) {
    return (
      <a
        href="/api/auth/login"
        style={{
          background: 'rgba(88, 101, 242, 0.85)',
          border: '1px solid rgba(165, 180, 252, 0.3)',
          color: '#fff',
          fontWeight: 'bold',
          padding: '0.6rem 1.25rem',
          borderRadius: '0.75rem',
          fontSize: '0.85rem',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Login with Discord
      </a>
    );
  }

  const avatarUrl = user.discord_avatar
    ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.discord_avatar}.png?size=64`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discord_id) % 5}.png`;

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '0.75rem',
          padding: '0.4rem 0.9rem 0.4rem 0.4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          cursor: 'pointer',
          color: '#fff',
          transition: 'all 0.2s',
        }}
      >
        <img
          src={avatarUrl}
          alt={user.discord_username}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid rgba(88, 101, 242, 0.5)',
          }}
        />
        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
          {user.discord_username}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          style={{
            opacity: 0.5,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          right: 0,
          minWidth: '200px',
          background: 'rgba(18, 18, 24, 0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '0.85rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          padding: '0.5rem',
          zIndex: 100,
          animation: 'fadeIn 0.15s ease-out',
        }}>
          <a
            href="/account"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.7rem 0.85rem',
              borderRadius: '0.5rem',
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'background 0.15s',
            }}
            className="hover-row"
          >
            <span style={{ fontSize: '1rem' }}>👤</span> Account
          </a>
          <a
            href="/leaderboard"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.7rem 0.85rem',
              borderRadius: '0.5rem',
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'background 0.15s',
            }}
            className="hover-row"
          >
            <span style={{ fontSize: '1rem' }}>🏆</span> Leaderboard
          </a>

          <div style={{
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            margin: '0.35rem 0.5rem',
          }} />

          <a
            href="/api/auth/logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.7rem 0.85rem',
              borderRadius: '0.5rem',
              color: '#ef4444',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'background 0.15s',
            }}
            className="hover-row"
          >
            <span style={{ fontSize: '1rem' }}>🚪</span> Logout
          </a>
        </div>
      )}
    </div>
  );
}
