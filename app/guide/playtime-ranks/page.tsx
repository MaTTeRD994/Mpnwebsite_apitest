import Link from "next/link";
import { PLAYTIME_RANKS } from "../../../utils/ranks";

export default function PlaytimeRanks() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 2rem", minHeight: "80vh", color: "#fff" }}>
      <Link href="/guide" style={{ color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", display: "inline-block" }}>
        ← Back to Guides
      </Link>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "2rem", color: "#ef4444" }}>☆</span>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0, textTransform: "uppercase" }}>Playtime Ranks</h1>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "600px", lineHeight: 1.6 }}>
            Our servers track your playtime in real-time. As you play more, you will automatically level up, unlocking more claim chunks, force-loaded chunks, and home points.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
        {PLAYTIME_RANKS.map((rank, idx) => (
          <div key={idx} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "1.5rem", position: "relative" }}>
            
            {/* Header: Rank Name & Hours */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem", marginBottom: "1rem" }}>
              <span style={{ background: "rgba(0,0,0,0.5)", border: `1px solid rgba(${rank.color.replace('#', '')}, 0.2)`, padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "bold", color: rank.color, textTransform: "uppercase", letterSpacing: "1px" }}>
                {rank.name}
              </span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: 1, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{rank.hours}</div>
                <div style={{ fontSize: "0.6rem", color: "#ef4444", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>Hours Played</div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
                  <span>⬡</span>
                  <span style={{ fontSize: "0.9rem" }}>Claims</span>
                </div>
                <div style={{ fontWeight: "bold" }}>{rank.claims}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
                  <span style={{ color: "#ef4444" }}>⚡</span>
                  <span style={{ fontSize: "0.9rem" }}>Force Loaded</span>
                </div>
                <div style={{ fontWeight: "bold" }}>{rank.forceLoaded}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
                  <span>🏠</span>
                  <span style={{ fontSize: "0.9rem" }}>Homes</span>
                </div>
                <div style={{ fontWeight: "bold" }}>{rank.homes}</div>
              </div>
            </div>

            {/* Special Discord Access */}
            {rank.specialDiscord && (
              <div style={{ marginTop: "1.5rem", padding: "0.75rem", background: "rgba(147, 51, 234, 0.1)", border: "1px solid rgba(147, 51, 234, 0.3)", borderRadius: "4px", textAlign: "center", color: "#c084fc", fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                Special Discord Access
              </div>
            )}
            
          </div>
        ))}
      </div>
    </main>
  );
}
