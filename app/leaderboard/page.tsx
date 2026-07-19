"use client";
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        // If there is an error or data is empty, set empty array
        if (data.error || !Array.isArray(data)) {
          setPlayers([]);
        } else {
          setPlayers(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch leaderboard:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <div style={{ 
        background: 'var(--bg-surface)', 
        borderBottom: '1px solid var(--border-light)', 
        padding: '4rem 2rem', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.05), transparent)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
              Community Leaderboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '42rem' }}>
              See who's leading the charge across the network. All stats are live and synchronized from our active servers.
            </p>
          </div>
          <div style={{ position: 'relative', width: '100%', maxWidth: '24rem' }}>
            <input 
              type="text" 
              placeholder="Search player nickname..." 
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-light)',
                color: '#fff',
                fontSize: '0.875rem',
                borderRadius: '0.25rem',
                padding: '0.75rem 1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: '#121212', border: '1px solid var(--border-light)', borderRadius: '0.25rem', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem', width: '5rem', textAlign: 'center' }}>#</th>
                  <th style={{ padding: '1rem' }}>Player</th>
                  <th style={{ padding: '1rem', width: '10rem' }}>Playtime Rank</th>
                  <th style={{ padding: '1rem', width: '12rem' }}>Hours Played</th>
                  <th style={{ padding: '1rem', width: '12rem' }}>Top Votes</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.875rem' }}>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Loading leaderboard data...
                    </td>
                  </tr>
                ) : players.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No players found on the leaderboard yet.
                    </td>
                  </tr>
                ) : players.map((p, index) => (
                  <tr key={p.uuid} onClick={() => window.location.href = `/player/${p.uuid}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s', cursor: 'pointer' }} className="hover-row">
                    <td style={{ padding: '1rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                      {index + 1}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={`https://api.mcheads.org/head/${p.uuid}/256`} alt={p.name} style={{ width: '32px', height: '32px', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)' }} crossOrigin="anonymous" />
                        <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1rem' }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', letterSpacing: '0.025em', fontSize: '0.625rem', color: p.color || '#a855f7' }}>
                        {p.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.8)' }}>
                      {p.playtime} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'sans-serif', marginLeft: '0.25rem' }}>hrs</span>
                    </td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 'bold' }}>
                      {p.votes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
