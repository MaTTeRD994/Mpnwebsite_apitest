"use client";
import { useState } from "react";

export default function ServerCard({ server }: { server: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (server.address) {
      navigator.clipboard.writeText(server.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isOnline = server.status === 'Online';

  return (
    <div 
      className="glass server-card" 
      style={{ 
        background: 'rgba(18, 18, 24, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%' 
      }}
    >
      {/* Image Banner Header */}
      <div style={{ height: '170px', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
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
          background: isOnline ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)',
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
          {isOnline ? 'Online' : 'Offline'}
        </div>

        {/* Players Count Pill Bottom Right */}
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
          👥 {server.players || 0} / 32
        </div>
      </div>
      
      {/* Card Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.35rem 0', lineHeight: 1.3 }}>
            {server.name}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            {server.version} • MC {server.mc}
          </p>
        </div>

        {/* Actions Row */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
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
        </div>
      </div>
    </div>
  );
}
