"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import ServerCard from "../components/ServerCard";

export default function Home() {
  const [featuredServers, setFeaturedServers] = useState<any[]>([]);
  const [totalOnline, setTotalOnline] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/servers')
      .then(res => res.json())
      .then(data => {
        setFeaturedServers(data.filter((s: any) => s.featured));
        
        let onlineCount = 0;
        let playersCount = 0;
        data.forEach((s: any) => {
          if (s.status === "Online") {
            onlineCount++;
            playersCount += s.players || 0;
          }
        });
        setTotalOnline(onlineCount);
        setTotalPlayers(playersCount);
        
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch servers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.5), var(--bg-main)), url(/herobg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Background decorative glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
          zIndex: -1,
          opacity: 0.5,
          filter: 'blur(40px)'
        }} />

        <div className="glass animate-float" style={{ padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: totalOnline > 0 ? '#4ade80' : '#ef4444', boxShadow: `0 0 10px ${totalOnline > 0 ? '#4ade80' : '#ef4444'}` }}></span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {loading ? 'Pinging network...' : `${totalPlayers} Players Online across ${totalOnline} Servers`}
          </span>
        </div>

        <h1 style={{ fontSize: '5rem', lineHeight: '1.1', marginBottom: '1.5rem', maxWidth: '800px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          MORE THAN SERVERS. <br/>
          <span style={{ color: 'transparent', WebkitTextStroke: '1px #E6E6E6' }}>A HOME.</span>
        </h1>
        
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '650px', marginBottom: '2rem', lineHeight: '1.6' }}>
          Free modded Minecraft servers built around community, creativity, automation, and unforgettable adventures. Explore expert packs, kitchen sinks, and long-term worlds.
        </p>
        
        {/* Secret Sauce Box */}
        <div style={{ padding: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-strong)', borderRadius: '8px', maxWidth: '600px', marginBottom: '3rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--primary)' }}>The MPN Difference:</strong> Backed by the absolute best hardware for a completely lag-free experience, expertly configured by the best minds in modded Minecraft.
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button className="btn btn-primary">Browse Servers</button>
          <button className="btn btn-secondary">View Guides</button>
        </div>
      </section>

      {/* Features / Servers */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Recently Added</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Latest Modded Servers</p>
          </div>
          <a href="/servers" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>View All →</a>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading server data...</div>
          ) : (
            featuredServers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
