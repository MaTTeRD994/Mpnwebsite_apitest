export default function FAQ() {
  const generalFaqs = [
    {
      q: "Are servers free?",
      a: "Yes, all of our servers are completely free to play. We sustain the network through optional community donations and vote rewards."
    },
    {
      q: "Can beginners join?",
      a: "Absolutely! Our community is very welcoming. While we host expert packs like GregTech New Horizons, we also host \"kitchen sink\" packs that are perfect for learning modded Minecraft at your own pace. Our Discord is full of players happy to answer questions."
    },
    {
      q: "Are there wipes?",
      a: "We pride ourselves on being a long-term network. We only wipe servers when absolutely necessary (e.g., severe world corruption, major modpack updates that break compatibility, or when the community unanimously votes for a fresh start). Expert packs usually run for years without wiping."
    },
    {
      q: "How do I report issues or bad behavior?",
      a: "The best way to report a bug, server lag, or a rulebreaker is by opening a Ticket in our Discord server. Our staff team reviews tickets daily."
    }
  ];

  const technicalFaqs = [
    {
      q: "How do I install the modpack?",
      a: "The easiest method is using the CurseForge App or Prism Launcher. Simply search for the modpack name in the launcher, click install, and launch the game. You don't need to download mods manually."
    },
    {
      q: "Why can't I join?",
      a: "Check the following: 1) Ensure you are running the exact Modpack Version listed on our Servers page. 2) Check if the server is offline or restarting via our Discord or website dashboard. 3) Make sure you have allocated enough RAM."
    },
    {
      q: "How much RAM do I need?",
      a: "This depends on the modpack. For light packs, 4GB to 6GB is enough. For heavy packs like All The Mods 10, we recommend dedicating 8GB to 10GB of RAM in your launcher settings. Never allocate more than 80% of your total system RAM."
    },
    {
      q: "How do backups work?",
      a: "Our servers automatically backup player data and world regions every few hours. In case of major corruption or griefing, staff can restore areas to a previous state."
    }
  ];

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
        <div style={{ maxWidth: '56rem', margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
            Got a question? We've probably answered it here. If not, feel free to ask in our Discord community.
          </p>
        </div>
      </div>

      <div style={{ padding: '4rem 2rem', maxWidth: '56rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            General
          </h2>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '0.75rem', overflow: 'hidden' }}>
            {generalFaqs.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: idx !== generalFaqs.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <details style={{ width: '100%' }}>
                  <summary style={{ padding: '1.25rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 500, fontSize: '1.05rem', color: '#fff', listStyle: 'none' }} className="hover-text-primary">
                    {faq.q}
                    <span style={{ color: 'var(--text-muted)' }}>+</span>
                  </summary>
                  <div style={{ padding: '0 1rem 1.25rem 1rem', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Technical
          </h2>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '0.75rem', overflow: 'hidden' }}>
            {technicalFaqs.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: idx !== technicalFaqs.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <details style={{ width: '100%' }}>
                  <summary style={{ padding: '1.25rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 500, fontSize: '1.05rem', color: '#fff', listStyle: 'none' }} className="hover-text-primary">
                    {faq.q}
                    <span style={{ color: 'var(--text-muted)' }}>+</span>
                  </summary>
                  <div style={{ padding: '0 1rem 1.25rem 1rem', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
