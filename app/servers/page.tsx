"use client";
import { useState, useEffect } from "react";
import ServerCard from "../../components/ServerCard";

export default function Servers() {
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("players");

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

  const filteredAndSortedServers = servers
    .filter(server => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return server.name.toLowerCase().includes(q) || server.description?.toLowerCase().includes(q) || server.id.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === "players") {
        return (b.players || 0) - (a.players || 0);
      } else if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "status") {
        const order = { "Online": 1, "Starting": 2, "Offline": 3, "Error": 4 };
        return (order[a.status as keyof typeof order] || 5) - (order[b.status as keyof typeof order] || 5);
      }
      return 0;
    });

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

      <section style={{ padding: '2rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search servers..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: '1 1 300px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            color: '#fff',
            fontSize: '1rem',
            borderRadius: '8px',
            padding: '1rem 1.5rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            color: '#fff',
            fontSize: '1rem',
            borderRadius: '8px',
            padding: '1rem 1.5rem',
            outline: 'none',
            cursor: 'pointer',
            minWidth: '200px'
          }}
        >
          <option value="players">Sort by Players</option>
          <option value="alphabetical">Sort Alphabetical</option>
          <option value="status">Sort by Status</option>
        </select>
      </section>

      <section style={{ padding: '2rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
               Syncing live data from Pterodactyl...
            </div>
          ) : filteredAndSortedServers.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
               No servers match your search.
            </div>
          ) : (
            filteredAndSortedServers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

