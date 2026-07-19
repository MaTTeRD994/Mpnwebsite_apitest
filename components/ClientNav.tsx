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
          <a href="/discord" className="nav-link" style={{ transition: 'color 0.2s' }}>Discord</a>
          <a href="/info" className="nav-link" style={{ transition: 'color 0.2s', color: 'var(--text-light)' }}>Info</a>
        </div>
        
        <NavUser />
      </nav>

      {children}
    </AuthProvider>
  );
}
