import React from 'react';
import { 
  MessageSquare, Headphones, Bot, Bell, Hash, MessageCircle, 
  Terminal, Shield, ExternalLink, Download, Sparkles, CheckCircle2,
  AlertCircle, Users, Zap
} from 'lucide-react';

export const metadata = {
  title: 'Community Discord | MaTTeRPixel Network',
  description: 'Join the MaTTeRPixel Network Discord community. Get instant support, link your Minecraft account, check live server status, and chat across our in-game bridges.',
};

export default function DiscordPage() {
  const commands = [
    {
      cmd: '/lookup <playername>',
      desc: 'Shows detailed information about a player on our network — stats, playtime, rank and more.'
    },
    {
      cmd: '/players',
      desc: 'Gives a live overview of all players currently online across our servers.'
    },
    {
      cmd: '/networkstatus',
      desc: 'Displays the current status, TPS, and player count for each server in the network.'
    },
    {
      cmd: '/link',
      desc: 'Connect your Minecraft account to Discord to unlock rank sync, special Discord roles, and instant website access.'
    }
  ];

  const rules = [
    { num: 1, title: 'Be Respectful', desc: 'Treat all members with respect and kindness. No hate speech, harassment, or discrimination.' },
    { num: 2, title: 'No Spamming', desc: 'Do not flood chat with repetitive messages, excessive emojis, or advertisements.' },
    { num: 3, title: 'No Offensive Language', desc: 'Avoid offensive language, slurs, or derogatory terms. Keep discussions civil.' },
    { num: 4, title: 'Respect Privacy', desc: 'Do not share personal information about others without consent.' },
    { num: 5, title: 'No Advertisement', desc: 'Do not promote other servers, websites, or services without prior Staff approval.' },
    { num: 6, title: 'Listen to Staff', desc: 'Staff decisions are final. Provoking staff or refusing instructions may result in an immediate ban.' },
    { num: 7, title: 'English Only', desc: 'Global Discord chat remains in English so everyone and staff can participate.' },
    { num: 8, title: 'Use #support', desc: 'All help requests are handled through our #support ticket channel, not in staff DMs.' },
    { num: 9, title: 'No Ban Evasion', desc: 'If banned, do not rejoin using alternate accounts. This will result in permanent network removal.' }
  ];

  const features = [
    { icon: <MessageSquare size={24} color="#5865F2" />, title: 'Community Chat', desc: 'Meet fellow modpack players, share base builds, and discuss strategies.' },
    { icon: <Headphones size={24} color="var(--signal)" />, title: 'Instant Support', desc: 'Get fast help from staff and community members via our #support ticket system.' },
    { icon: <Bot size={24} color="var(--gold)" />, title: 'Network Bot', desc: 'Check live server stats, leaderboards, and player accounts directly inside Discord.' },
    { icon: <Bell size={24} color="#F472B6" />, title: 'Announcements', desc: 'Be the first to know about modpack updates, server wipes, and new pack launches.' },
  ];

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '1.5rem' }}>
        <div style={{ 
          display: 'inline-block', 
          color: '#5865F2', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em', 
          fontSize: '0.8rem', 
          fontWeight: 800, 
          marginBottom: '1rem',
          background: 'rgba(88, 101, 242, 0.12)',
          padding: '0.4rem 1rem',
          borderRadius: '999px',
          border: '1px solid rgba(88, 101, 242, 0.3)'
        }}>
          COMMUNITY HUB
        </div>
        <h1 style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          lineHeight: 1.1, 
          marginBottom: '1.5rem', 
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #5865F2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Join Our Discord
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          MaTTeRPixel Network&apos;s Discord is where the community lives — get support, stay up to date with announcements, chat with fellow players and access exclusive in-game perks.
        </p>
        
        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://discord.gg/NeYyChaFfZ" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              background: '#5865F2', 
              color: '#fff', 
              padding: '0.9rem 2.2rem', 
              borderRadius: '12px', 
              fontSize: '1rem', 
              fontWeight: 700, 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              boxShadow: '0 12px 28px rgba(88, 101, 242, 0.35)',
              transition: 'all 0.2s transform'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join MaTTeRPixel Discord
          </a>
          <a 
            href="https://discord.com/download" 
            target="_blank"
            rel="noopener noreferrer"
            className="glass hover-bg-surface"
            style={{ 
              padding: '0.9rem 2rem', 
              borderRadius: '12px', 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: 'var(--text-light)', 
              textDecoration: 'none', 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              transition: 'background 0.2s' 
            }}
          >
            <Download size={18} />
            Download Discord
          </a>
        </div>
      </section>

      {/* Feature Grid (4 cards) */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '5rem' }}>
        {features.map((feat, idx) => (
          <div key={idx} className="glass" style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              {feat.icon}
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>
              {feat.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
              {feat.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Personalise Your Experience */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#5865F2', fontWeight: 'bold', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          PERSONALISED EXPERIENCE
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '1.75rem' }}>
          Server Roles & Linked Chat
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid rgba(88, 101, 242, 0.2)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(88, 101, 242, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#5865F2' }}>
              <Hash size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.75rem' }}>
              Pick Your Server Role
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Head to <code style={{ color: '#a5b4fc', background: 'rgba(88,101,242,0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>#channels-and-roles</code> in our Discord and select the modpack or server you play on. This gives you access to a dedicated server channel, patch notes, and server-specific announcements — keeping your feed relevant to the servers you actually care about.
            </p>
          </div>

          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid rgba(53, 194, 103, 0.2)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(53, 194, 103, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--signal)' }}>
              <MessageCircle size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.75rem' }}>
              In-Game ↔ Discord Chat
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Once you&apos;ve selected a server role, your Discord channel becomes a two-way bridge with the in-game chat. Messages you send in Discord appear in-game, and what players type in-game shows up in Discord — so you can stay connected to your server community even while you&apos;re away from the game.
            </p>
          </div>

        </div>

        {/* Support Banner */}
        <div className="glass" style={{ 
          padding: '1.75rem 2rem', 
          borderRadius: '16px', 
          border: '1px solid rgba(244, 114, 182, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          background: 'linear-gradient(90deg, rgba(18,18,24,0.85) 0%, rgba(244,114,182,0.06) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(244, 114, 182, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F472B6', flexShrink: 0 }}>
              <Headphones size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.25rem 0' }}>
                Need Help? Use <span style={{ color: '#F472B6' }}>#support</span>
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                If you encounter a bug, an issue, or need assistance — open a ticket in #support. Our staff team responds as quickly as possible.
              </p>
            </div>
          </div>
          <a 
            href="https://discord.gg/NeYyChaFfZ" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              background: 'rgba(244, 114, 182, 0.15)',
              border: '1px solid rgba(244, 114, 182, 0.4)',
              color: '#f472b6',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            Go to #support →
          </a>
        </div>
      </section>

      {/* Discord Bot Commands */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 'bold', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          MATTERPIXEL NETWORK BOT
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
          Discord Bot Commands
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Our Discord bot lets you check live network information without leaving Discord. All responses are <strong style={{ color: '#fff' }}>only visible to you</strong>.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {commands.map((cmdItem, idx) => (
            <div key={idx} className="glass" style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(242, 169, 60, 0.12)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                  &gt;_
                </div>
                <code style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--gold)', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 700 }}>
                  {cmdItem.cmd}
                </code>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                {cmdItem.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Discord Rules Grid */}
      <section>
        <div style={{ fontSize: '0.75rem', color: 'var(--signal)', fontWeight: 'bold', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          KEEP IT FRIENDLY
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
          Discord Rules
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          Breaking these rules may result in a mute, kick, or ban from our Discord and game servers.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {rules.map((rule) => (
            <div key={rule.num} className="glass" style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                background: 'rgba(255, 255, 255, 0.08)', 
                color: 'var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 800, 
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                {rule.num}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: '0 0 0.35rem 0' }}>
                  {rule.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
