"use client";
import { useState } from "react";

export default function ServerCard({ server }: { server: any }) {
  const [copied, setCopied] = useState(false);
  const [showGtnhModal, setShowGtnhModal] = useState(false);
  const [copiedArg, setCopiedArg] = useState(false);

  const isPrivate = server.isPrivate || server.status === 'Private' || server.address === 'Private';
  const isComingSoon = server.isComingSoon || server.status === 'Coming Soon' || server.address === 'Coming Soon';
  const isOnline = server.status === 'Online';
  const isGtnh = server.id === 'gtnh' || server.name?.toLowerCase().includes('gregtech');

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (server.address && !isPrivate && !isComingSoon) {
      navigator.clipboard.writeText(server.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="glass server-card" 
      style={{ 
        background: 'rgba(18, 18, 24, 0.75)',
        border: isGtnh ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%' 
      }}
    >
      {/* Image Banner Header */}
      <div 
        onClick={() => { if (isGtnh) setShowGtnhModal(true); }}
        style={{ height: '170px', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden', cursor: isGtnh ? 'pointer' : 'default' }}
      >
        <img 
          src={server.imgUrl || "https://media.forgecdn.net/avatars/1182/438/638755918649288941.png"} 
          alt={server.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          className="card-banner-img"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18, 18, 24, 0.95) 0%, rgba(18, 18, 24, 0.3) 50%, transparent 100%)' }} />

        {/* Featured Corner Ribbon */}
        {(server.featured || server.id === 'gtnh' || server.id === 'atm10') && (
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
            color: '#000',
            fontSize: '0.65rem',
            fontWeight: '900',
            padding: '0.25rem 0.65rem',
            borderRadius: '0.35rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            ★ FEATURED
          </div>
        )}

        {/* Status Pill Bottom Left */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '0.75rem',
          background: isPrivate ? 'rgba(168, 85, 247, 0.85)' : isComingSoon ? 'rgba(234, 179, 8, 0.85)' : isOnline ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          padding: '0.25rem 0.65rem',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 6px #fff' }} />
          {isPrivate ? 'Private' : isComingSoon ? 'Coming Soon' : isOnline ? 'Online' : 'Offline'}
        </div>

        {/* Players Count Pill Bottom Right */}
        {!isComingSoon && (
          <div style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '0.75rem',
            background: 'rgba(0, 0, 0, 0.65)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            {isPrivate ? '🔒 Whitelist' : `👥 ${server.players || 0} / 32`}
          </div>
        )}
      </div>
      
      {/* Card Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h3 
              onClick={() => { if (isGtnh) setShowGtnhModal(true); }}
              style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.35rem 0', lineHeight: 1.3, cursor: isGtnh ? 'pointer' : 'default' }}
            >
              {server.name}
            </h3>
            {isGtnh && (
              <span 
                onClick={() => setShowGtnhModal(true)}
                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '0.15rem 0.55rem', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 900, cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                ⚙️ Setup Guide
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            {server.version} • MC {server.mc}
          </p>
        </div>

        {/* Actions Row */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          {isGtnh ? (
            <button
              onClick={() => setShowGtnhModal(true)}
              style={{
                flex: 1.2,
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                color: '#fff',
                fontSize: '0.82rem',
                fontWeight: '900',
                padding: '0.65rem 0.8rem',
                borderRadius: '0.6rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
              className="hover-bg-light"
            >
              <span>Install FAQs</span>
              <span>⚙️</span>
            </button>
          ) : (
            <a
              href={server.packUrl || `/servers`}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                padding: '0.65rem 1rem',
                borderRadius: '0.6rem',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="hover-bg-light"
            >
              Learn More
            </a>
          )}
          {isPrivate || isComingSoon ? (
            <div
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                padding: '0.65rem 1rem',
                borderRadius: '0.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                cursor: 'not-allowed'
              }}
            >
              {isPrivate ? '🔒 Private' : '⏳ Coming Soon'}
            </div>
          ) : (
            <button
              onClick={handleCopy}
              style={{
                flex: 1,
                background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${copied ? '#10b981' : 'rgba(255, 255, 255, 0.1)'}`,
                color: copied ? '#4ade80' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                padding: '0.65rem 1rem',
                borderRadius: '0.6rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              {copied ? '✓ Copied IP' : 'Copy IP'}
            </button>
          )}
        </div>
      </div>

      {/* GTNH Setup & FAQ Modal */}
      {showGtnhModal && isGtnh && (
        <div
          onClick={() => setShowGtnhModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(25, 25, 35, 0.98) 0%, rgba(15, 15, 20, 0.99) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.45)',
              borderRadius: '1.5rem',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '88vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(239, 68, 68, 0.2)',
              position: 'relative',
              color: '#fff',
              padding: '2.5rem',
              textAlign: 'left'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowGtnhModal(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              ×
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1.25rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: '100px', marginBottom: '0.6rem' }}>
                <span>⚙️ SETUP GUIDE & TROUBLESHOOTING</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 900, margin: '0 0 0.5rem 0', color: '#fff' }}>
                GregTech New Horizons - Install/Setup FAQs
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                See thread below for several fixes to common issues and performance improvements.
              </p>
            </div>

            {/* Modal Body Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Point 1: Java 8 */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>☕</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#fbbf24' }}>GTNH Requires Java 8</h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                  GregTech New Horizons runs strictly on <strong>Java 8</strong>. Newer Java versions (like Java 17 or 21) will cause crash loops when launching the modpack.
                </p>
                <a
                  href="https://www.java.com/en/download/manual.jsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(251, 191, 36, 0.15)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    color: '#fbbf24',
                    padding: '0.6rem 1.1rem',
                    borderRadius: '0.65rem',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>Download Java 8 Manual Installer</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Point 2: 6GB RAM & -d64 */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '1rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>🚀</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#60a5fa' }}>Allocating More Than 6GB RAM</h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                  If you want to allocate more than <strong>6GB of RAM</strong>, you MUST install 64-bit Java and force the instance to run as 64-bit by adding the <code style={{ color: '#93c5fd', background: 'rgba(96, 165, 250, 0.15)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>-d64</code> argument to your JVM arguments.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <code style={{ background: 'rgba(0, 0, 0, 0.6)', border: '1px solid rgba(255,255,255,0.15)', padding: '0.5rem 1rem', borderRadius: '0.5rem', color: '#93c5fd', fontWeight: 'bold', fontSize: '0.95rem' }}>
                    -d64
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('-d64');
                      setCopiedArg(true);
                      setTimeout(() => setCopiedArg(false), 2000);
                    }}
                    style={{
                      background: copiedArg ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      border: `1px solid ${copiedArg ? '#10b981' : 'rgba(255, 255, 255, 0.2)'}`,
                      color: copiedArg ? '#4ade80' : '#fff',
                      padding: '0.5rem 0.9rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {copiedArg ? '✓ Copied' : 'Copy Argument'}
                  </button>
                </div>
              </div>

              {/* Point 3: CurseForge Instance & Ore Excavation */}
              <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '1rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>⛏️</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#f87171' }}>CurseForge Instance & Ore Excavation Fix</h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', margin: '0 0 0.85rem 0', lineHeight: 1.6 }}>
                  The CurseForge Instance will not function by default, but you can get access to the server right now by adding <strong>Ore Excavation</strong> to your <code style={{ color: '#fca5a5', background: 'rgba(239,68,68,0.2)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>/mods/</code> folder in the instance (this is a lightweight vein miner required on our network profile).
                </p>
                <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderLeft: '3px solid #f87171', padding: '0.85rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#fca5a5', lineHeight: 1.5 }}>
                  💡 <strong>Quick Tip:</strong> You can also simply make the instance editable within CurseForge and add the <strong>"Ore Excavation"</strong> mod directly through the CurseForge interface!
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={() => setShowGtnhModal(false)}
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  border: '1px solid #ef4444',
                  color: '#fff',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(239, 68, 68, 0.4)',
                  transition: 'all 0.2s'
                }}
              >
                Got It, Let's Play!
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
