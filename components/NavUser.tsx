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
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          border: '1px solid rgba(248, 113, 113, 0.4)',
          color: '#fff',
          fontWeight: 'bold',
          padding: '0.55rem 1.15rem',
          borderRadius: '0.75rem',
          fontSize: '0.85rem',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.2s',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
        Login
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
