import React from 'react';
import { 
  Server, Users, Globe, Shield, Handshake, Heart, Star, Cloud, 
  MapPin, Clock, MessageSquare, Ticket, FileWarning, Key, RefreshCw, Zap,
  ExternalLink
} from 'lucide-react';

export const metadata = {
  title: 'Info & Rules',
  description: 'Everything you need to know about the MaTTeRPixel Network. Playtime ranks, server rules, and network info.',
};

export default function InfoPage() {
  // Canonical global rank ladder — mirrors discord-bot/ranks.json / utils/ranks.ts.
  const ranks = [
    { hours: 0, name: 'Neophyte', color: '#FF6F62', commands: 3, homes: 1, keepInv: false },
    { hours: 4, name: 'Ember', color: '#6E8CB8', commands: 4, homes: 1, keepInv: false },
    { hours: 24, name: 'Astral', color: '#F2A93C', commands: 5, homes: 1, keepInv: false },
    { hours: 50, name: 'Vanguard', color: '#E5231B', commands: 6, homes: 2, keepInv: false },
    { hours: 75, name: 'Warden', color: '#FF6F62', commands: 7, homes: 2, keepInv: false },
    { hours: 100, name: 'Luminar', color: '#6E8CB8', commands: 8, homes: 3, keepInv: true },
    { hours: 200, name: 'Vesper', color: '#F2A93C', commands: 8, homes: 3, keepInv: true },
    { hours: 400, name: 'Zenith', color: '#E5231B', commands: 9, homes: 4, keepInv: true },
    { hours: 700, name: 'Mythos', color: '#FF6F62', commands: 10, homes: 5, keepInv: true },
    { hours: 1000, name: 'Eclipse', color: '#6E8CB8', commands: 10, homes: 5, keepInv: true },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <div style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          MaTTeRPixel Network
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Everything You Need<br />
          <span style={{ color: 'var(--text-muted)' }}>to Know</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          A passion project built for the love of modded Minecraft. Learn about our ranks, rules, features, and how you can get involved.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#about" className="glass" style={{ padding: '0.75rem 1.5rem', borderRadius: '100px', fontSize: '0.9rem', color: 'var(--text-light)', textDecoration: 'none', transition: 'background 0.2s' }}>About</a>
          <a href="#ranks" className="glass" style={{ padding: '0.75rem 1.5rem', borderRadius: '100px', fontSize: '0.9rem', color: 'var(--text-light)', textDecoration: 'none', transition: 'background 0.2s' }}>Playtime Ranks</a>
          <a href="#rules" className="glass" style={{ padding: '0.75rem 1.5rem', borderRadius: '100px', fontSize: '0.9rem', color: 'var(--text-light)', textDecoration: 'none', transition: 'background 0.2s' }}>Server Rules</a>
          <a href="#support" className="glass" style={{ padding: '0.75rem 1.5rem', borderRadius: '100px', fontSize: '0.9rem', color: 'var(--text-light)', textDecoration: 'none', transition: 'background 0.2s' }}>Support Us</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
          About MaTTeRPixel Network
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(110, 140, 184, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Heart size={20} color="var(--diamond)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 600 }}>A Passion Project</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Started purely out of love for Minecraft and the modding community. We aren't here to make money, we are here to provide a stable, fun, and free home for players.
            </p>
          </div>
          
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(53, 194, 103, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Server size={20} color="var(--signal)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 600 }}>Community-Driven Modpack Selection</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              We carefully curate our servers based on community feedback. From hardcore expert packs to massive kitchen-sink modpacks, we try to host what you want to play.
            </p>
          </div>
          
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(110, 140, 184, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Globe size={20} color="var(--diamond)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 600 }}>Open to Everyone</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              No whitelists, no paywalls, no barriers to entry. Everyone is welcome to join our servers and our Discord community to meet new friends and start building.
            </p>
          </div>
        </div>

        <div className="glass" style={{ padding: '1.5rem 2rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.25rem' }}>24/7</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Server Uptime</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--signal)', marginBottom: '0.25rem' }}>1 Gbps</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Dedicated Connection</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '0.25rem' }}>1h</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Active Backups</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--diamond)', marginBottom: '0.25rem' }}>Free</div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>To Play</div>
          </div>
        </div>
      </section>

      {/* Ranks Section */}
      <section id="ranks" style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
          Synced Playtime Ranks
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Unlock perks by playing on any server. Your playtime syncs across the entire network.
        </p>

        <div className="glass" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                  <th style={{ padding: '1.5rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'left' }}>Playtime Req.</th>
                  <th style={{ padding: '1.5rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Rank</th>
                  <th style={{ padding: '1.5rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Commands</th>
                  <th style={{ padding: '1.5rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Homes</th>
                  <th style={{ padding: '1.5rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>KeepInventory</th>
                </tr>
              </thead>
              <tbody>
                {ranks.map((rank, i) => (
                  <tr key={rank.name} style={{ borderBottom: i === ranks.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      {rank.hours} Hours
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: rank.color }}>
                      {rank.name}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                      {rank.commands}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                      {rank.homes}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                      {rank.keepInv ? (
                        <span style={{ color: 'var(--signal)' }}>✔</span>
                      ) : (
                        <span style={{ color: 'var(--redstone)' }}>✘</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" style={{ marginBottom: '5rem' }}>
        <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px', border: '1px solid rgba(242, 169, 60, 0.2)', background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(242, 169, 60, 0.05))' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(242, 169, 60, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <Heart size={32} color="var(--gold)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--gold)' }}>Where Your Donations Go</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Every absolute cent directly goes to paying for our dedicated host boxes. We do not take money for ourselves, we do not 
                make a profit from this network. We rely exclusively on your support to keep the servers running. If you enjoy the servers and want to help 
                keep them online for everyone, consider supporting us via Patreon!
              </p>
              <a 
                href="https://patreon.com" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  background: 'var(--gold)',
                  color: '#000',
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'opacity 0.2s'
                }}
              >
                Support on Patreon <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
          Network & Server Rules
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          By playing on our servers, you agree to follow these rules at all times.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
          
          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--redstone)', flexShrink: 0 }}><MessageSquare size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>No Bullying or Harassment</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                We maintain a zero-tolerance policy for racism, sexism, homophobia, and any form of targeted harassment.
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--diamond)', flexShrink: 0 }}><Shield size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>No Exploits or Hacked Clients</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Do not use cheat clients (X-Ray, KillAura, Baritone) or exploit server/mod bugs for an unfair advantage.
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--gold)', flexShrink: 0 }}><Handshake size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>Respect All Players</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Be respectful to everybody. Toxic behavior ruins the experience for others and will not be tolerated.
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--signal)', flexShrink: 0 }}><FileWarning size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>No Griefing, Stealing or Raiding</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Griefing and stealing are strictly prohibited. Do not touch player bases, chests, or items without explicit permission.
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--diamond)', flexShrink: 0 }}><MapPin size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>Don't Claim Major Landmarks</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Do not claim the end portal, major world structures, or spawn areas. Let everyone have access to major locations.
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--redstone)', flexShrink: 0 }}><Ticket size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>No Advertising</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Do not advertise other Minecraft servers, Discord servers, or products in global chat.
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--diamond)', flexShrink: 0 }}><Cloud size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>Manage Lag</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Do not build excessive mob farms, redstone clocks, or massive storage arrays that heavily impact server TPS.
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--redstone)', flexShrink: 0 }}><Shield size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>No AFK Bypass Scripts or Macros</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Do not use auto-clickers, macros, or weights on your keyboard to bypass the AFK kick timer. Let the server rest.
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--diamond)', flexShrink: 0 }}><Globe size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>Overworld is for Bases Only</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Do not run large quarries or massive destruction machines in the overworld. Use the Mining Dimension instead.
              </p>
            </div>
          </div>
          
          <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--diamond)', flexShrink: 0 }}><Zap size={20} /></div>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-light)' }}>Mob Farms Need an ON Switch</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Spawners and massive mob farms must have a redstone switch to turn them off to prevent massive entity lag.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
