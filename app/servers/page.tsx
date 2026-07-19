"use client";
import { useState, useEffect } from "react";
import ServerCard from "../../components/ServerCard";

export default function Servers() {
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/servers')
      .then(res => res.json())
      .then(data => {
        setServers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch servers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <section style={{ 
        padding: '5rem 2rem', 
        borderBottom: '1px solid var(--border-light)', 
        background: 'var(--bg-base)', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative glow */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '500px',
          height: '500px',
          background: 'var(--primary)',
          borderRadius: '50%',
          filter: 'blur(150px)',
          opacity: 0.05,
          pointerEvents: 'none'
        }} />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '1rem', display: 'block' }}>
            Server Directory
          </span>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '1rem', color: '#fff' }}>
            Active Servers
          </h1>
          <p style={{ fontSize: '0.875rem', opacity: 0.6, lineHeight: 1.6, color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
            Live statistics and connection information for all active MaTTeRPixel servers. Our infrastructure is powered by high-end dedicated hardware for the smoothest modded experience.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
               Syncing live data from Pterodactyl...
            </div>
          ) : (
            servers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

