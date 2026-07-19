"use client";
import React, { useState } from "react";

export default function StorePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const tiers = [
    {
      id: "blue",
      name: "Blue MaTTeR",
      priceMonthly: "$6.50",
      priceAnnual: "$5.85",
      color: "#06b6d4",
      gradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(18, 18, 24, 0.9) 100%)",
      border: "rgba(6, 182, 212, 0.4)",
      glow: "0 0 30px rgba(6, 182, 212, 0.25)",
      image: "https://media.discordapp.net/attachments/1024056889866194964/1465117536319439052/IMG_0818.PNG?ex=6a5dfe49&is=6a5cacc9&hm=8b5ff7e75b44785f40ddea00412e347a696dbd308d4d6da95ca882687a112eac&=&format=webp&quality=lossless&width=1114&height=1114",
      desc: "Thank you so much for the support! As a reward for fueling our servers, you get essential network boosts and Discord perks.",
      perks: [
        { text: "Discord Supporter Role & Badge", highlighted: false },
        { text: "Private #supporter-chat Access", highlighted: false },
        { text: "+100 Bonus FTB Claim Chunks", highlighted: true },
        { text: "+15 Force Loaded Chunks", highlighted: true },
        { text: "Custom In-Game Supporter Prefix", highlighted: false },
        { text: "Direct Staff Priority Support", highlighted: false },
      ],
      popular: false,
      patreonUrl: "https://www.patreon.com/cw/matterpixelsmp"
    },
    {
      id: "red",
      name: "Red MaTTeR",
      priceMonthly: "$18.50",
      priceAnnual: "$16.65",
      color: "#ef4444",
      gradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(18, 18, 24, 0.95) 100%)",
      border: "rgba(239, 68, 68, 0.6)",
      glow: "0 0 45px rgba(239, 68, 68, 0.35)",
      image: "https://media.discordapp.net/attachments/1024056889866194964/1465117535753080933/IMG_0811.PNG?ex=6a5dfe49&is=6a5cacc9&hm=5acf4a995918c8fc86dbec6d8941f9528a4ce049c6c1ee216e8c0431915b6f5b&=&format=webp&quality=lossless&width=1114&height=1114",
      desc: "Woah, your support is crazily helpful to our network! Without you we wouldn't have expanded this far. Unlocks massive claim reserves.",
      perks: [
        { text: "Everything in Blue MaTTeR Tier", highlighted: false },
        { text: "+250 Bonus FTB Claim Chunks", highlighted: true },
        { text: "+40 Force Loaded Chunks", highlighted: true },
        { text: "Glowing [&cRed MaTTeR&r] Title", highlighted: true },
        { text: "Custom Supporter Cosmetic Cape", highlighted: false },
        { text: "Vote/Suggest on Future Modpack Picks", highlighted: false },
      ],
      popular: true,
      patreonUrl: "https://www.patreon.com/cw/matterpixelsmp"
    },
    {
      id: "vibrant",
      name: "Vibrant MaTTeR",
      priceMonthly: "$25.00",
      priceAnnual: "$22.50",
      color: "#a855f7",
      gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(18, 18, 24, 0.95) 100%)",
      border: "rgba(168, 85, 247, 0.6)",
      glow: "0 0 45px rgba(168, 85, 247, 0.35)",
      image: "https://media.discordapp.net/attachments/1024056889866194964/1465117536688275700/IMG_0821.PNG?ex=6a5dfe49&is=6a5cacc9&hm=c15f766fa291934c0a85734a514cdc73333f48caa68eaf5e8fe3417ed42ff5f4&=&format=webp&quality=lossless&width=1114&height=1114",
      desc: "We cannot express how much this means to us! You cover a huge portion of our monthly dedicated machine bills. Ultimate VIP status.",
      perks: [
        { text: "Everything in Red MaTTeR Tier", highlighted: false },
        { text: "+500 Bonus FTB Claim Chunks", highlighted: true },
        { text: "+80 Force Loaded Chunks (24/7 Automation)", highlighted: true },
        { text: "Exclusive [&dVibrant VIP&r] Title & Glow", highlighted: true },
        { text: "Priority Entry During Server Peak Hours", highlighted: false },
        { text: "Direct VIP Voice Chat Access with Owners", highlighted: false },
      ],
      popular: false,
      patreonUrl: "https://www.patreon.com/cw/matterpixelsmp"
    }
  ];

  return (
    <main style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '4rem 1.5rem 6rem', overflowX: 'hidden' }}>
      {/* HERO SECTION */}
      <div style={{ maxWidth: '1250px', margin: '0 auto', textAlign: 'center', marginBottom: '4.5rem', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '350px',
          background: 'radial-gradient(ellipse, rgba(239, 68, 68, 0.14) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(239, 68, 68, 0.12)', 
            border: '1px solid rgba(239, 68, 68, 0.35)', 
            color: '#fca5a5', 
            padding: '0.45rem 1rem', 
            borderRadius: '100px', 
            fontSize: '0.8rem', 
            fontWeight: 'bold', 
            letterSpacing: '0.08em', 
            textTransform: 'uppercase',
            marginBottom: '1.25rem' 
          }}>
            <span>💎 SUPPORT THE NETWORK</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#fff', margin: '0 0 1rem 0', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Patreon Membership & <span style={{ background: 'linear-gradient(135deg, #ef4444 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Perks</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '44rem', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Our servers run on enterprise high-clock AMD hardware with massive RAM pools to keep tick rates at 20 TPS. 
            By becoming a Patreon member, you directly fund hosting bills and unlock permanent claim chunk extensions!
          </p>

          {/* Billing Cycle Toggle */}
          <div style={{ display: 'inline-flex', background: 'rgba(18, 18, 24, 0.85)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '0.35rem', borderRadius: '1rem', gap: '0.5rem' }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                background: billingCycle === 'monthly' ? 'var(--primary)' : 'transparent',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: '0.75rem',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                background: billingCycle === 'annual' ? 'var(--primary)' : 'transparent',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: '0.75rem',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
            >
              <span>Annual Billing</span>
              <span style={{ background: '#22c55e', color: '#000', fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 900 }}>SAVE 10%</span>
            </button>
          </div>
        </div>
      </div>

      {/* MONTHLY SERVER COST GOAL BAR */}
      <div style={{ maxWidth: '850px', margin: '0 auto 4.5rem', background: 'linear-gradient(135deg, rgba(30, 27, 46, 0.85) 0%, rgba(18, 18, 24, 0.95) 100%)', border: '1px solid rgba(239, 68, 68, 0.45)', borderRadius: '1.5rem', padding: '2rem 2.5rem', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: '100px', marginBottom: '0.5rem' }}>
              <span>⚡ MONTHLY COMMUNITY GOAL</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: 0 }}>
              Server Hosting Costs & Maintenance
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#4ade80' }}>$312</span>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 600 }}> / $450 USD</span>
            <div style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: 'bold', marginTop: '0.15rem' }}>69% Funded This Month</div>
          </div>
        </div>

        {/* Progress Track */}
        <div style={{ width: '100%', height: '16px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '100px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <div style={{
            width: '69%',
            height: '100%',
            background: 'linear-gradient(90deg, #ef4444 0%, #a855f7 50%, #06b6d4 100%)',
            borderRadius: '100px',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
          }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.85rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <span>💻 Covers 8 Dedicated Ryzen 9 Nodes + DDoS Protection</span>
          <span>🔄 Goal resets every 1st of the month</span>
        </div>
      </div>

      {/* PATREON TIERS GRID */}
      <div style={{ maxWidth: '1250px', margin: '0 auto 5.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
        {tiers.map((tier) => (
          <div
            key={tier.id}
            style={{
              background: tier.gradient,
              border: `1px solid ${tier.border}`,
              borderRadius: '1.5rem',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: tier.popular ? tier.glow : '0 20px 40px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s',
              overflow: 'hidden'
            }}
            className="hover-scale"
          >
            {/* Popular Ribbon */}
            {tier.popular && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(90deg, #ef4444, #f43f5e)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: '900',
                letterSpacing: '0.12em',
                textAlign: 'center',
                padding: '0.4rem 0',
                textTransform: 'uppercase',
                boxShadow: '0 2px 10px rgba(239, 68, 68, 0.5)'
              }}>
                🔥 YOU MIGHT LIKE / MOST POPULAR
              </div>
            )}

            <div>
              {/* Crystal Image */}
              <div style={{ textAlign: 'center', margin: tier.popular ? '1rem 0 1.5rem' : '0 0 1.5rem', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '120px',
                  background: tier.color,
                  filter: 'blur(45px)',
                  opacity: 0.35,
                  zIndex: 0
                }} />
                <img
                  src={tier.image}
                  alt={tier.name}
                  style={{ width: '135px', height: '135px', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))' }}
                />
              </div>

              {/* Title & Price */}
              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', margin: '0 0 0.35rem 0' }}>
                {tier.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: tier.color }}>
                  {billingCycle === 'monthly' ? tier.priceMonthly : tier.priceAnnual}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  / month {billingCycle === 'annual' && '(billed annually)'}
                </span>
              </div>

              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                {tier.desc}
              </p>

              {/* Perks List */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  INCLUDED BENEFITS & BOOSTS:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {tier.perks.map((perk, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: perk.highlighted ? '#fff' : 'rgba(255,255,255,0.85)', fontWeight: perk.highlighted ? 'bold' : 'normal' }}>
                      <span style={{ color: tier.color, fontSize: '1.1rem', lineHeight: 1 }}>✔</span>
                      <span>{perk.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={tier.patreonUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                background: tier.popular ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${tier.popular ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                color: '#fff',
                padding: '1rem',
                borderRadius: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: tier.popular ? '0 8px 25px rgba(239, 68, 68, 0.4)' : 'none',
                transition: 'all 0.2s'
              }}
              className={tier.popular ? '' : 'hover-bg-light'}
            >
              <span>Join {tier.name}</span>
              <span>↗</span>
            </a>
          </div>
        ))}
      </div>

      {/* SERVER HOSTING TRANSPARENCY & HOW IT WORKS */}
      <div style={{ maxWidth: '1250px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
        {/* Transparency Box */}
        <div style={{
          background: 'rgba(18, 18, 24, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ color: '#06b6d4', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            WHERE DOES YOUR MONEY GO?
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', margin: '0 0 1rem 0' }}>
            100% Server Cost Transparency
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            MaTTeRPixel is a passion project built by Minecraft veterans for players who hate block lag. We do not run pay-to-win gambling or sell power items. 
            All Patreon contributions go strictly toward maintaining our dedicated server clusters:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#fff' }}>AMD Ryzen 9 Dedicated Nodes</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>High single-core clocks needed for GTNH & ATM10 20 TPS</div>
              </div>
              <span style={{ color: '#4ade80', fontWeight: 'bold', fontFamily: 'monospace' }}>Active</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#fff' }}>128GB+ ECC RAM & NVMe Storage</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ensures rapid chunk generation and zero disk bottlenecks</div>
              </div>
              <span style={{ color: '#4ade80', fontWeight: 'bold', fontFamily: 'monospace' }}>Active</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#fff' }}>DDoS Protection & Global Network Routing</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Low latency ping across North America and Europe</div>
              </div>
              <span style={{ color: '#4ade80', fontWeight: 'bold', fontFamily: 'monospace' }}>Active</span>
            </div>
          </div>
        </div>

        {/* How to Claim FAQ Box */}
        <div style={{
          background: 'rgba(18, 18, 24, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ color: '#a855f7', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            HOW TO CLAIM YOUR PERKS
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', margin: '0 0 1.25rem 0' }}>
            Instant Discord & In-Game Sync
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                1
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 0.25rem 0' }}>Link your Discord account to Patreon</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                  When subscribing on Patreon, make sure your Discord account is connected in Patreon settings. You will automatically receive your VIP tier role inside our Discord server!
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                2
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 0.25rem 0' }}>Link Minecraft in your Web Dashboard</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                  Log into this website with Discord (`/account`) and link your Minecraft username/UUID using the in-game command (`/link &lt;code&gt;`).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                3
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 0.25rem 0' }}>Enjoy your Claim Boosts & Perks</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                  Our network bot automatically syncs your supporter permissions (`FTB Chunks` bonus claims, force loaders, and titles) directly into all active servers!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
