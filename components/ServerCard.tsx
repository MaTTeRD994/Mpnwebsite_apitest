export default function ServerCard({ server }: { server: any }) {
  return (
    <div className="glass server-card" style={{ padding: '1rem', transition: 'all 0.3s', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: '120px', background: 'var(--bg-base)', borderRadius: '8px', marginBottom: '1rem', overflow: 'hidden', position: 'relative' }}>
        <img src={server.imgUrl} alt={server.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,18,18,0.9), transparent)' }} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--primary)', opacity: 0.8, textTransform: 'uppercase' }}>
            Server: {server.id}
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
            {server.name}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ 
            fontSize: '0.65rem', 
            padding: '0.25rem 0.5rem', 
            backgroundColor: server.status === 'Online' ? 'rgba(74, 222, 128, 0.1)' : server.status === 'Offline' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)', 
            color: server.status === 'Online' ? '#4ade80' : server.status === 'Offline' ? '#ef4444' : '#eab308', 
            fontWeight: 'bold', 
            border: `1px solid ${server.status === 'Online' ? 'rgba(74, 222, 128, 0.2)' : server.status === 'Offline' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)'}`, 
            borderRadius: '9999px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em', 
            flexShrink: 0 
          }}>
            {server.status}
          </span>
          {server.status === "Online" && server.players !== undefined && (
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '9999px', flexShrink: 0 }}>
              👤 {server.players}
            </span>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <code style={{ flex: 1, fontSize: '0.65rem', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '0.25rem', opacity: 0.7, color: '#fff', userSelect: 'all', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {server.address}
          </code>
          <button className="btn btn-secondary" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyItems: 'center', fontSize: '0.7rem' }}>
            Copy
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '0.5rem' }}>
          <div style={{ flex: 1, fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
            V: {server.version} | MC: {server.mc}
          </div>
          <a href={server.packUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            Pack ↗
          </a>
        </div>
      </div>
    </div>
  );
}
