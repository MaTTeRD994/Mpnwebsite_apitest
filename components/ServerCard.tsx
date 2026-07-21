"use client";
import { useState } from "react";
import { Lock, Users, Wrench, Hourglass, Coffee, Rocket, Pickaxe, Lightbulb, ExternalLink, Check } from "lucide-react";

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

  // Status pill tokens. Purple isn't a brand color, so "Private" borrows
  // diamond/steel (a "restricted access" read) instead of inventing a swatch.
  // Online uses --signal (status-only green) rather than --primary — --primary is
  // brand red now, and "online" reading as red would be backwards.
  const statusBg = isPrivate ? 'var(--diamond)' : isComingSoon ? 'var(--gold)' : isOnline ? 'var(--signal)' : 'var(--redstone)';
  const statusText = isPrivate ? '#fff' : isComingSoon ? 'var(--bg-base)' : isOnline ? 'var(--bg-base)' : '#fff';

  return (
    <div
      className="server-card"
      style={{
        border: `1px solid ${isGtnh ? 'rgba(196, 25, 18, 0.35)' : 'var(--border-light)'}`,
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
          alt={server.name ? `${server.name} Minecraft server banner artwork` : "Minecraft server banner artwork"}
          onError={(e) => {
            const img = e.currentTarget;
            const fallback = "https://media.forgecdn.net/avatars/1182/438/638755918649288941.png";
            if (img.src !== fallback) img.src = fallback;
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          className="card-banner-img"
        />

        {/* Subtle dotted texture accent — same brand motif as the mockup's spotlight cards */}
        <div
          className="dotted-pattern"
          style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', right: '0.75rem', height: '48px', opacity: 0.12, pointerEvents: 'none' }}
        />

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17, 24, 36, 0.95) 0%, rgba(17, 24, 36, 0.3) 50%, transparent 100%)' }} />

        {/* Featured Corner Chip — squared-off (radius-button) so it reads as a
            label distinct from the fully-rounded live-state pills below */}
        {(server.featured || server.id === 'gtnh' || server.id === 'atm10') && (
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            background: 'var(--gold)',
            color: 'var(--bg-base)',
            fontSize: '0.65rem',
            fontWeight: 900,
            padding: '0.25rem 0.65rem',
            borderRadius: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            whiteSpace: 'nowrap'
          }}>
            ★ FEATURED
          </div>
        )}

        {/* Status Pill Bottom Left */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '0.75rem',
          background: statusBg,
          color: statusText,
          fontSize: '0.75rem',
          fontWeight: 'bold',
          padding: '0.25rem 0.65rem',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100% - 1.5rem)'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusText, boxShadow: `0 0 6px ${statusText}`, flexShrink: 0 }} />
          {isPrivate ? 'Private' : isComingSoon ? 'Coming Soon' : isOnline ? 'Online' : 'Offline'}
        </div>

        {/* Players Count Pill Bottom Right */}
        {!isComingSoon && (
          <div style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '0.75rem',
            background: 'rgba(17, 24, 36, 0.75)',
            color: 'var(--text-primary)',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            border: '1px solid var(--border-strong)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            whiteSpace: 'nowrap'
          }}>
            {isPrivate ? (<><Lock size={12} strokeWidth={2} /> Whitelist</>) : (<><Users size={12} strokeWidth={2} /> {server.players || 0} / 32</>)}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3
              onClick={() => { if (isGtnh) setShowGtnhModal(true); }}
              style={{ fontSize: '1.35rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', lineHeight: 1.3, cursor: isGtnh ? 'pointer' : 'default', minWidth: 0, overflowWrap: 'anywhere', flex: '1 1 auto' }}
            >
              {server.name}
            </h3>
            {isGtnh && (
              <span
                onClick={() => setShowGtnhModal(true)}
                style={{ background: 'rgba(196, 25, 18, 0.15)', color: 'var(--redstone)', border: '1px solid rgba(196, 25, 18, 0.4)', padding: '0.15rem 0.55rem', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 900, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <Wrench size={11} strokeWidth={2.25} /> Setup Guide
              </span>
            )}
          </div>

          {/* Meta info as small tag chips (brand pill pattern) instead of a plain text line */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.15rem' }}>
            {server.version && (
              <span style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.55rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}>
                {server.version}
              </span>
            )}
            {server.mc && (
              <span style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.55rem', borderRadius: '9999px', whiteSpace: 'nowrap' }}>
                MC {server.mc}
              </span>
            )}
          </div>
        </div>

        {/* Actions Row — flex-basis + wrap lets buttons stack on narrow (~310px) cards
            instead of squeezing/overflowing */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {isGtnh ? (
            <button
              onClick={() => setShowGtnhModal(true)}
              style={{
                flex: '1.2 1 140px',
                background: 'rgba(196, 25, 18, 0.15)',
                border: '1px solid rgba(196, 25, 18, 0.4)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 900,
                padding: '0.65rem 0.8rem',
                borderRadius: '16px',
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
              <Wrench size={14} strokeWidth={2} />
            </button>
          ) : (
            <a
              href={server.packUrl || `/servers`}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: '1 1 120px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                padding: '0.65rem 1rem',
                borderRadius: '16px',
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
                flex: '1 1 120px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                padding: '0.65rem 1rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                cursor: 'not-allowed'
              }}
            >
              {isPrivate ? (<><Lock size={14} strokeWidth={2} /> Private</>) : (<><Hourglass size={14} strokeWidth={2} /> Coming Soon</>)}
            </div>
          ) : (
            <button
              onClick={handleCopy}
              style={{
                flex: '1 1 120px',
                background: copied ? 'rgba(53, 194, 103, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${copied ? 'var(--signal)' : 'var(--border-light)'}`,
                color: copied ? 'var(--signal)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                padding: '0.65rem 1rem',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              {copied ? (<><Check size={14} strokeWidth={2.5} /> Copied IP</>) : 'Copy IP'}
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
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-base) 100%)',
              border: '1px solid rgba(196, 25, 18, 0.4)',
              borderRadius: '26px',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '88vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(196, 25, 18, 0.2)',
              position: 'relative',
              color: 'var(--text-primary)',
              padding: '2rem clamp(1.25rem, 5vw, 2.5rem)',
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
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)',
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
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem', paddingRight: '2.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(196, 25, 18, 0.15)', color: 'var(--redstone)', fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: '9999px', marginBottom: '0.6rem' }}>
                <Wrench size={13} strokeWidth={2.25} />
                <span>SETUP GUIDE & TROUBLESHOOTING</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 900, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
                GregTech New Horizons - Install/Setup FAQs
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                See thread below for several fixes to common issues and performance improvements.
              </p>
            </div>

            {/* Modal Body Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Point 1: Java 8 (Gold = required prerequisite) */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <Coffee size={21} strokeWidth={1.75} color="var(--gold)" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--gold)' }}>GTNH Requires Java 8</h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
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
                    background: 'rgba(242, 169, 60, 0.15)',
                    border: '1px solid rgba(242, 169, 60, 0.4)',
                    color: 'var(--gold)',
                    padding: '0.6rem 1.1rem',
                    borderRadius: '16px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>Download Java 8 Manual Installer</span>
                  <ExternalLink size={14} strokeWidth={2} />
                </a>
              </div>

              {/* Point 2: 6GB RAM & -d64 (Diamond = technical config note) */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <Rocket size={21} strokeWidth={1.75} color="var(--diamond)" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--diamond)' }}>Allocating More Than 6GB RAM</h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
                  If you want to allocate more than <strong>6GB of RAM</strong>, you MUST install 64-bit Java and force the instance to run as 64-bit by adding the <code style={{ color: 'var(--diamond)', background: 'rgba(110, 140, 184, 0.15)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>-d64</code> argument to your JVM arguments.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <code style={{ background: 'rgba(17, 24, 36, 0.6)', border: '1px solid var(--border-strong)', padding: '0.5rem 1rem', borderRadius: '16px', color: 'var(--diamond)', fontWeight: 'bold', fontSize: '0.95rem' }}>
                    -d64
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('-d64');
                      setCopiedArg(true);
                      setTimeout(() => setCopiedArg(false), 2000);
                    }}
                    style={{
                      background: copiedArg ? 'rgba(53, 194, 103, 0.15)' : 'var(--bg-elevated)',
                      border: `1px solid ${copiedArg ? 'var(--signal)' : 'var(--border-strong)'}`,
                      color: copiedArg ? 'var(--signal)' : 'var(--text-primary)',
                      padding: '0.5rem 0.9rem',
                      borderRadius: '16px',
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

              {/* Point 3: CurseForge Instance & Ore Excavation (Redstone = alert/fix) */}
              <div style={{ background: 'rgba(196, 25, 18, 0.06)', border: '1px solid rgba(196, 25, 18, 0.25)', borderRadius: '20px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <Pickaxe size={21} strokeWidth={1.75} color="var(--redstone)" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--redstone)' }}>CurseForge Instance & Ore Excavation Fix</h4>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 0.85rem 0', lineHeight: 1.6 }}>
                  The CurseForge Instance will not function by default, but you can get access to the server right now by adding <strong>Ore Excavation</strong> to your <code style={{ color: 'var(--redstone)', background: 'rgba(196, 25, 18, 0.15)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>/mods/</code> folder in the instance (this is a lightweight vein miner required on our network profile).
                </p>
                <div style={{ background: 'rgba(17, 24, 36, 0.5)', borderLeft: '3px solid var(--redstone)', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, display: 'flex', gap: '0.5rem' }}>
                  <Lightbulb size={16} strokeWidth={1.75} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <span><strong style={{ color: 'var(--text-primary)' }}>Quick Tip:</strong> You can also simply make the instance editable within CurseForge and add the <strong style={{ color: 'var(--text-primary)' }}>&quot;Ore Excavation&quot;</strong> mod directly through the CurseForge interface!</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={() => setShowGtnhModal(false)}
                style={{
                  background: 'var(--redstone)',
                  border: '1px solid var(--redstone)',
                  color: '#fff',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '16px',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(196, 25, 18, 0.4)',
                  transition: 'all 0.2s'
                }}
              >
                Got It, Let&apos;s Play!
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
