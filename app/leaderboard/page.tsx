"use client";
import { useState, useEffect } from "react";
import { getPlaytimeRank, getRankLevel } from "../../utils/ranks";

export default function Leaderboard() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<'player' | 'rank' | 'playtime' | 'last_server' | 'last_online' | 'votes' | 'discord'>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 50;

  useEffect(() => {
    fetch('/api/leaderboard?limit=1000')
      .then(res => res.json())
      .then(data => {
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

  const handleSort = (field: any) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const formatLastOnline = (updatedAt: string) => {
    if (!updatedAt) return { text: '• Offline', isOnline: false };
    const diffMs = Date.now() - new Date(updatedAt).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    // If updated within last 20 minutes, consider online
    if (diffMins < 20 && diffMins >= 0) {
      return { text: '• Online', isOnline: true };
    }
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24 && diffHours > 0) {
      return { text: `${diffHours}h ago`, isOnline: false };
    }
    if (diffMins < 60 && diffMins >= 20) {
      return { text: `${diffMins}m ago`, isOnline: false };
    }
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7 && diffDays > 0) {
      return { text: `${diffDays}d ago`, isOnline: false };
    }
    const date = new Date(updatedAt);
    return { text: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), isOnline: false };
  };

  const formatPlaytime = (hoursTotal: number) => {
    const hours = Math.floor(hoursTotal || 0);
    const mins = Math.round(((hoursTotal || 0) - hours) * 60);
    return `${hours}h ${mins > 0 ? `${mins}m` : '00m'}`;
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <span style={{ opacity: 0.25, marginLeft: '4px', fontSize: '0.75rem' }}>↕</span>;
    return <span style={{ color: 'var(--primary)', marginLeft: '4px', fontSize: '0.8rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

  const filteredPlayers = players
    .filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      let valA: any = 0;
      let valB: any = 0;

      if (sortField === 'player') {
        valA = a.name?.toLowerCase() || '';
        valB = b.name?.toLowerCase() || '';
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (sortField === 'rank') {
        valA = getRankLevel(a.playtime, a.name);
        valB = getRankLevel(b.playtime, b.name);
      } else if (sortField === 'playtime') {
        valA = a.playtime || 0;
        valB = b.playtime || 0;
      } else if (sortField === 'last_server') {
        valA = a.last_server?.toLowerCase() || '';
        valB = b.last_server?.toLowerCase() || '';
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (sortField === 'last_online') {
        valA = new Date(a.updated_at || 0).getTime();
        valB = new Date(b.updated_at || 0).getTime();
      } else if (sortField === 'votes') {
        valA = a.votes || 0;
        valB = b.votes || 0;
      } else if (sortField === 'discord') {
        valA = a.discord ? 1 : 0;
        valB = b.discord ? 1 : 0;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / playersPerPage));
  const paginatedPlayers = filteredPlayers.slice(
    (currentPage - 1) * playersPerPage,
    currentPage * playersPerPage
  );

  return (
    <main style={{ background: 'var(--bg-base)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* HEADER / HERO BANNER */}
      <div style={{ 
        position: 'relative', 
        padding: '5rem 1.5rem 3.5rem', 
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/herobg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          filter: 'blur(4px)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--bg-base) 0%, transparent 40%, var(--bg-base) 100%)',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1250px', margin: '0 auto', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ color: '#a855f7', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              COMMUNITY RANKINGS
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 'bold', letterSpacing: '-0.02em', color: '#fff', margin: '0 0 0.75rem 0' }}>
              Network Leaderboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '44rem', margin: 0, lineHeight: 1.5 }}>
              See who's leading the charge across all MaTTeRPxiel servers. Search by player name and click headers to order stats dynamically.
            </p>
          </div>
          <div style={{ position: 'relative', width: '100%', maxWidth: '24rem' }}>
            <input 
              type="text" 
              placeholder="Search player name..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                background: 'rgba(18, 18, 24, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.9rem',
                borderRadius: '0.75rem',
                padding: '0.85rem 1.25rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                backdropFilter: 'blur(8px)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div style={{ padding: '3.5rem 1.5rem', maxWidth: '1250px', margin: '0 auto' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(18, 18, 24, 0.85) 0%, rgba(18, 18, 24, 0.7) 100%)', 
          border: '1px solid rgba(255, 255, 255, 0.08)', 
          borderRadius: '1.25rem', 
          overflow: 'hidden', 
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-light)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', color: 'var(--text-muted)', userSelect: 'none' }}>
                  <th onClick={() => handleSort('player')} style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }} className="hover-text-primary">
                    PLAYER {renderSortIcon('player')}
                  </th>
                  <th onClick={() => handleSort('rank')} style={{ padding: '1.25rem 1rem', cursor: 'pointer' }} className="hover-text-primary">
                    RANK {renderSortIcon('rank')}
                  </th>
                  <th onClick={() => handleSort('playtime')} style={{ padding: '1.25rem 1rem', cursor: 'pointer' }} className="hover-text-primary">
                    PLAYTIME {renderSortIcon('playtime')}
                  </th>
                  <th onClick={() => handleSort('last_server')} style={{ padding: '1.25rem 1rem', cursor: 'pointer' }} className="hover-text-primary">
                    LAST SERVER {renderSortIcon('last_server')}
                  </th>
                  <th onClick={() => handleSort('last_online')} style={{ padding: '1.25rem 1rem', cursor: 'pointer' }} className="hover-text-primary">
                    LAST ONLINE {renderSortIcon('last_online')}
                  </th>
                  <th onClick={() => handleSort('votes')} style={{ padding: '1.25rem 1rem', cursor: 'pointer' }} className="hover-text-primary">
                    VOTES {renderSortIcon('votes')}
                  </th>
                  <th onClick={() => handleSort('discord')} style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }} className="hover-text-primary">
                    DISCORD {renderSortIcon('discord')}
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.9rem' }}>
                {loading ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Loading leaderboard data...
                    </td>
                  </tr>
                ) : filteredPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      {searchQuery ? `No players matching "${searchQuery}"` : "No players found on the leaderboard yet."}
                    </td>
                  </tr>
                ) : paginatedPlayers.map((p, idx) => {
                  const rank = getPlaytimeRank(p.playtime, p.name);
                  const onlineInfo = formatLastOnline(p.updated_at);
                  const serverName = p.last_server && p.last_server !== 'Unknown' ? p.last_server : 'Lobby';
                  const absolutePosition = (currentPage - 1) * playersPerPage + idx + 1;

                  return (
                    <tr key={p.uuid} onClick={() => window.location.href = `/player/${p.uuid}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background-color 0.2s', cursor: 'pointer' }} className="hover-row">
                      {/* PLAYER & POSITION */}
                      <td style={{ padding: '1.1rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          {absolutePosition === 1 ? (
                            <span style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', color: '#000', fontWeight: '900', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: '6px', minWidth: '2.4rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(251, 191, 36, 0.4)' }}>
                              #1
                            </span>
                          ) : absolutePosition === 2 ? (
                            <span style={{ background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)', color: '#0f172a', fontWeight: '900', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: '6px', minWidth: '2.4rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(226, 232, 240, 0.3)' }}>
                              #2
                            </span>
                          ) : absolutePosition === 3 ? (
                            <span style={{ background: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)', color: '#fff', fontWeight: '900', fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: '6px', minWidth: '2.4rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)' }}>
                              #3
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.85rem', width: '2.4rem', display: 'inline-block' }}>
                              #{absolutePosition}
                            </span>
                          )}
                          <img src={`https://mc-heads.net/avatar/${p.uuid}/256`} alt={p.name} style={{ width: '38px', height: '38px', borderRadius: '0.6rem', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.6)' }} crossOrigin="anonymous" />
                          <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem' }}>{p.name}</span>
                        </div>
                      </td>

                      {/* RANK */}
                      <td style={{ padding: '1.1rem 1rem' }}>
                        <span style={{ fontStyle: 'italic', fontWeight: 'bold', color: rank.color, fontSize: '0.95rem' }}>
                          {rank.name}
                        </span>
                      </td>

                      {/* PLAYTIME */}
                      <td style={{ padding: '1.1rem 1rem', color: 'rgba(255,255,255,0.9)', fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: '500' }}>
                        <span style={{ opacity: 0.5, marginRight: '0.35rem' }}>🕒</span>{formatPlaytime(p.playtime)}
                      </td>

                      {/* LAST SERVER */}
                      <td style={{ padding: '1.1rem 1rem' }}>
                        <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#cbd5e1', whiteSpace: 'nowrap', fontWeight: '500' }}>
                          {serverName}
                        </span>
                      </td>

                      {/* LAST ONLINE */}
                      <td style={{ padding: '1.1rem 1rem' }}>
                        <span style={{ color: onlineInfo.isOnline ? '#4ade80' : 'var(--text-muted)', fontWeight: onlineInfo.isOnline ? 'bold' : 'normal', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          {onlineInfo.isOnline && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />}
                          {onlineInfo.text}
                        </span>
                      </td>

                      {/* VOTES */}
                      <td style={{ padding: '1.1rem 1rem', color: '#fbbf24', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                        ★ {p.votes || 0}
                      </td>

                      {/* DISCORD */}
                      <td style={{ padding: '1.1rem 1.5rem' }}>
                        <span style={{ background: p.discord ? 'rgba(88, 101, 242, 0.2)' : 'rgba(255,255,255,0.03)', border: `1px solid ${p.discord ? 'rgba(88, 101, 242, 0.45)' : 'rgba(255,255,255,0.08)'}`, color: p.discord ? '#a5b4fc' : 'var(--text-muted)', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', fontWeight: p.discord ? 'bold' : 'normal', whiteSpace: 'nowrap' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                          {p.discord ? 'Linked' : 'Unlinked'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: 'rgba(0,0,0,0.45)', borderTop: '1px solid var(--border-light)', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Showing <span style={{ color: '#fff', fontWeight: 'bold' }}>{(currentPage - 1) * playersPerPage + 1}</span> to <span style={{ color: '#fff', fontWeight: 'bold' }}>{Math.min(currentPage * playersPerPage, filteredPlayers.length)}</span> of <span style={{ color: '#fff', fontWeight: 'bold' }}>{filteredPlayers.length}</span> players
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="btn"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem', background: currentPage === 1 ? 'transparent' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: currentPage === 1 ? 'rgba(255,255,255,0.25)' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', borderRadius: '8px', transition: 'all 0.2s' }}
                >
                  « First
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="btn"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem', background: currentPage === 1 ? 'transparent' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: currentPage === 1 ? 'rgba(255,255,255,0.25)' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', borderRadius: '8px', transition: 'all 0.2s' }}
                >
                  ‹ Prev
                </button>
                <div style={{ padding: '0 0.85rem', color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>
                  Page <span style={{ color: '#a855f7' }}>{currentPage}</span> of {totalPages}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="btn"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem', background: currentPage === totalPages ? 'transparent' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: currentPage === totalPages ? 'rgba(255,255,255,0.25)' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', borderRadius: '8px', transition: 'all 0.2s' }}
                >
                  Next ›
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="btn"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem', background: currentPage === totalPages ? 'transparent' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: currentPage === totalPages ? 'rgba(255,255,255,0.25)' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', borderRadius: '8px', transition: 'all 0.2s' }}
                >
                  Last »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
