"use client";
import { AuthProvider } from "./AuthProvider";
import NavUser from "./NavUser";

export default function ClientNav({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <nav className="glass" style={{ margin: '1.5rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1.5rem', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            width: '45px', 
            height: '45px', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img src="/logo.webp" alt="MP Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
          <a href="/store" className="nav-link" style={{ transition: 'color 0.2s', color: '#f43f5e', fontWeight: 'bold' }}>Store 💎</a>
          <a href="/info" className="nav-link" style={{ transition: 'color 0.2s', color: 'var(--text-light)' }}>Info</a>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="/discord"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--text-light)',
              padding: '0.55rem 1.1rem',
              borderRadius: '0.75rem',
              fontSize: '0.85rem',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.2s',
            }}
            className="hover-bg-surface"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.7 }}>
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </a>
          <NavUser />
        </div>
      </nav>

      {children}
    </AuthProvider>
  );
}
