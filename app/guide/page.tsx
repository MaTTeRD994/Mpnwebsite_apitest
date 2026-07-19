import Link from "next/link";

export default function Guide() {
  const categories: any[] = [
    { title: "Playtime Ranks", desc: "View the hours required to level up and unlock more claims.", link: "/guide/playtime-ranks" },
    { title: "Getting Started", desc: "How to install modpacks and join the servers." },
    { title: "Server Guides", desc: "Specific information for individual servers." },
    { title: "Commands", desc: "A list of all available player commands." },
    { title: "Claims & Teams", desc: "How to protect your builds and invite friends." },
    { title: "Backups", desc: "Information on playtime backups and restores." },
    { title: "Mod Guides", desc: "Tips and tricks for complex mods like GregTech." },
    { title: "Rules", desc: "Network rules and banned items list." },
    { title: "Troubleshooting", desc: "Fixes for common crashes and connection issues." },
  ];

  const popularArticles = [
    { title: "How to allocate more RAM to Minecraft", category: "Troubleshooting" },
    { title: "Claiming land using FTB Chunks", category: "Claims & Teams" },
    { title: "Setting up your first GregTech machine", category: "Mod Guides" },
    { title: "How to vote and claim rewards", category: "Getting Started" },
    { title: "Connection closed / ReadTimeout Exception", category: "Troubleshooting" },
  ];

  return (
    <main>
      <div style={{ 
        background: 'var(--bg-surface)', 
        borderBottom: '1px solid var(--border-light)', 
        padding: '5rem 2rem', 
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
        <div style={{ maxWidth: '56rem', margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: '-0.02em', color: '#fff', marginBottom: '1.5rem' }}>
            Documentation Hub
          </h1>
          <div style={{ position: 'relative', maxWidth: '42rem', margin: '0 auto' }}>
            <input 
              type="text" 
              placeholder="Search guides, commands, or troubleshooting..." 
              style={{
                width: '100%',
                background: 'var(--bg-base)',
                border: '1px solid var(--border-light)',
                color: '#fff',
                height: '3.5rem',
                borderRadius: '0.75rem',
                padding: '0 1rem',
                fontSize: '1.125rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Documentation</span>
          <span>&gt;</span>
          <span style={{ color: '#fff', fontWeight: 500 }}>Categories</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat, idx) => (
            cat.link ? (
              <Link href={cat.link} key={idx} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '0.75rem', 
                  padding: '1.5rem', 
                  cursor: 'pointer', 
                  transition: 'border-color 0.2s, background-color 0.2s',
                  height: '100%'
                }} className="hover-border-primary hover-bg-surface">
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>❖</span>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>{cat.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{cat.desc}</p>
                </div>
              </Link>
            ) : (
            <div key={idx} style={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid var(--border-light)', 
              borderRadius: '0.75rem', 
              padding: '1.5rem', 
              cursor: 'pointer', 
              transition: 'border-color 0.2s, background-color 0.2s'
            }} className="hover-border-primary hover-bg-surface">
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.5rem', background: 'var(--bg-base)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>❖</span>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>{cat.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{cat.desc}</p>
            </div>
            )
          ))}
        </div>

        <div style={{ marginTop: '4rem', border: '1px solid var(--border-light)', borderRadius: '0.75rem', background: 'var(--bg-surface)', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.25rem' }}>Popular Articles</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>The most frequently read guides from our community.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {popularArticles.map((article, idx) => (
              <div key={idx} style={{ 
                padding: '1rem 1.5rem', 
                borderBottom: idx !== popularArticles.length - 1 ? '1px solid var(--border-light)' : 'none',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }} className="hover-bg-base">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>📄</span>
                  <h4 style={{ fontWeight: 500, color: '#fff', transition: 'color 0.2s' }} className="hover-text-primary">{article.title}</h4>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.125rem 0.625rem', border: '1px solid var(--border-light)', borderRadius: '9999px', color: '#fff' }}>
                    {article.category}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>&gt;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
