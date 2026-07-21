"use client";
import { useState } from "react";
import Link from "next/link";
import { mpnPacks } from "../../config/packs";

export default function PacksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLoader, setFilterLoader] = useState("All");

  const filteredPacks = mpnPacks.filter(pack => {
    const matchesSearch = pack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pack.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pack.specs.focus.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLoader = filterLoader === "All" || pack.modloader === filterLoader;
    return matchesSearch && matchesLoader;
  });

  return (
    <main style={{ background: 'var(--bg-base)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HERO HEADER SECTION */}
      <section style={{ 
        padding: '6rem 2rem 4.5rem', 
        borderBottom: '1px solid var(--border-light)', 
        background: 'radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--primary) 15%, transparent) 0%, var(--bg-base) 70%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative glowing circles */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '20%',
          width: '400px',
          height: '400px',
          background: 'var(--primary)',
          borderRadius: '50%',
          filter: 'blur(160px)',
          opacity: 0.1,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '20%',
          width: '350px',
          height: '350px',
          background: 'var(--diamond)',
          borderRadius: '50%',
          filter: 'blur(160px)',
          opacity: 0.08,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)',
            color: 'var(--secondary)',
            fontSize: '0.75rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            padding: '0.4rem 1.1rem',
            borderRadius: '9999px',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 15px var(--primary-glow)'
          }}>
            ✦ MODRINTH MODPACK STUDIO ✦
          </div>

          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '-0.03em', 
            marginBottom: '1.25rem', 
            color: '#fff',
            lineHeight: 1.1
          }}>
            Handcrafted <span style={{ color: 'var(--primary)' }}>Modpacks</span>
          </h1>

          <p style={{ 
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', 
            color: 'var(--text-muted)', 
            lineHeight: 1.6, 
            maxWidth: '680px', 
            margin: '0 auto 2.5rem'
          }}>
            Engineered from the ground up by the MaTTeRPixel Network team. Whether you crave kinetic Create Mod automation or cozy Vanilla+ survival, our packs deliver peak performance and immersive gameplay.
          </p>

          {/* Quick Stats Pills */}
          <div style={{ display: 'flex', gap: '1rem', justifyItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600' }}>
              📦 2 Featured Modpacks
            </span>
            <span style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600' }}>
              ⚙️ Create Mod & Vanilla+
            </span>
            <span style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600' }}>
              ⚡ 60+ FPS Pre-Tuned
            </span>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER SECTION */}
      <section style={{ padding: '2.5rem 2rem 1rem', maxWidth: '1250px', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search modpacks by name or theme..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: '1 1 320px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            color: '#fff',
            fontSize: '1rem',
            borderRadius: '0.75rem',
            padding: '0.9rem 1.4rem',
            outline: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        />

        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.35rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          {["All", "Fabric", "NeoForge"].map((loader) => (
            <button
              key={loader}
              onClick={() => setFilterLoader(loader)}
              style={{
                background: filterLoader === loader ? 'var(--primary)' : 'transparent',
                color: filterLoader === loader ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '0.5rem 1.1rem',
                borderRadius: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {loader}
            </button>
          ))}
        </div>
      </section>

      {/* 3. MODPACK DIRECTORY GRID */}
      <section style={{ padding: '2rem 2rem 5rem', maxWidth: '1250px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
          {filteredPacks.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              No official modpacks match your search criteria.
            </div>
          ) : (
            filteredPacks.map((pack) => {
              return (
                <div 
                  key={pack.id}
                  className="glass hover-scale"
                  style={{
                    background: 'rgba(18, 18, 24, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative'
                  }}
                >
                  {/* Banner Header with Gradient Overlay */}
                  <div style={{ height: '170px', position: 'relative', background: 'var(--bg-base)', overflow: 'hidden' }}>
                    <img 
                      src={pack.bannerUrl} 
                      alt={`${pack.name} banner`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18, 18, 24, 1) 0%, rgba(18, 18, 24, 0.3) 60%, transparent 100%)' }} />

                    {/* Status Badge Top Right */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'var(--gold)',
                      color: 'var(--bg-base)',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      backdropFilter: 'blur(6px)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--bg-base)', boxShadow: '0 0 6px var(--bg-base)' }} />
                      {pack.status}
                    </div>

                    {/* MC Version Badge Top Left */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(0, 0, 0, 0.65)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '0.5rem',
                      backdropFilter: 'blur(6px)'
                    }}>
                      MC {pack.mcVersion}
                    </div>

                    {/* Floating Pack Icon Overlapping Bottom */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-20px',
                      left: '1.5rem',
                      width: '74px',
                      height: '74px',
                      borderRadius: '1.1rem',
                      background: 'var(--bg-surface)',
                      border: `2px solid ${pack.color}`,
                      padding: '4px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      zIndex: 5
                    }}>
                      <img src={pack.iconUrl} alt={pack.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '0.8rem' }} />
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div style={{ padding: '2.2rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
                        {pack.name}
                      </h3>
                      <span style={{ 
                        background: 'rgba(255,255,255,0.06)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        color: 'var(--text-light)', 
                        fontSize: '0.75rem', 
                        fontWeight: '600', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '0.4rem' 
                      }}>
                        {pack.modloader}
                      </span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                      {pack.tagline}
                    </p>

                    {/* Specs Pill Bar */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--diamond)', background: 'color-mix(in srgb, var(--diamond) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--diamond) 25%, transparent)', padding: '0.3rem 0.65rem', borderRadius: '0.4rem', fontWeight: 'bold' }}>
                        🎯 {pack.specs.focus}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '0.3rem 0.65rem', borderRadius: '0.4rem' }}>
                        🧩 {pack.specs.totalMods}
                      </span>
                    </div>

                    {/* Dual Action Buttons Bar */}
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <Link
                        href={`/packs/${pack.id}`}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, var(--primary) 0%, var(--redstone) 100%)',
                          color: '#fff',
                          fontWeight: 'bold',
                          padding: '0.75rem 1rem',
                          borderRadius: '0.65rem',
                          fontSize: '0.9rem',
                          textDecoration: 'none',
                          textAlign: 'center',
                          boxShadow: '0 8px 20px -4px var(--primary-glow)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <span>View Details</span>
                        <span>→</span>
                      </Link>

                      <a
                        href={pack.modrinthUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'color-mix(in srgb, var(--signal) 15%, transparent)',
                          border: '1px solid color-mix(in srgb, var(--signal) 30%, transparent)',
                          color: 'var(--signal)',
                          fontWeight: 'bold',
                          padding: '0.75rem 1.1rem',
                          borderRadius: '0.65rem',
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          transition: 'background-color 0.2s'
                        }}
                        className="hover-bg-surface"
                      >
                        <span>Modrinth</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 4. WHY PLAY OFFICIAL MPN PACKS? (STUDIO STANDARD) */}
      <section style={{ padding: '5rem 2rem 6rem', maxWidth: '1250px', margin: '0 auto', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            STUDIO STANDARD
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
            Why Play Our Modpacks?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0.75rem auto 0' }}>
            Every modpack is hand-tuned with the exact same rigor as our high-performance network infrastructure.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
          {/* Box 1 */}
          <div style={{ background: 'rgba(18, 18, 24, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1.25rem', padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'color-mix(in srgb, var(--diamond) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--diamond) 25%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: 'var(--diamond)', flexShrink: 0 }}>
              🚀
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.5rem 0' }}>
                Pre-Tuned Memory & JVM Flags
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                Every mod conflict is resolved before release. We package Sodium, Lithium, and custom memory configs directly so you get 60+ FPS on any modern PC out of the box.
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div style={{ background: 'rgba(18, 18, 24, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1.25rem', padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'color-mix(in srgb, var(--signal) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--signal) 25%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: 'var(--signal)', flexShrink: 0 }}>
              🛡️
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.5rem 0' }}>
                Curated & Zero Bloatware
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                No filler mods added just to pad total mod counts. We hand-select and balance every item and recipe to ensure cohesive, rewarding progression.
              </p>
            </div>
          </div>

          {/* Box 3 */}
          <div style={{ background: 'rgba(18, 18, 24, 0.65)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1.25rem', padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'color-mix(in srgb, var(--gold) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--gold) 25%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: 'var(--gold)', flexShrink: 0 }}>
              🤝
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.5rem 0' }}>
                Multiplayer & Proximity Ready
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                Includes Simple Voice Chat and server-side synchronization utilities out of the box, perfect for solo survival, co-op with friends, or community servers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
