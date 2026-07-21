"use client";
import { useEffect, useRef } from "react";
import type { SkinViewer as SkinViewerType } from "skinview3d";
import type { AchievementCategory } from "../utils/achievements";
import { ACHIEVEMENT_CATEGORY_COLORS } from "../utils/achievements";

interface RankInfo {
  name: string;
  color: string;
}

interface RankProgressInfo {
  next: { name: string; hours: number; color: string } | null;
  percent: number;
  remaining: number;
}

interface HeroStats {
  playtime: number;
  votes: number;
  deaths: number;
  mob_kills: number;
  blocks_mined: number;
  servers_played: number;
}

interface PlayerProfileHeroProps {
  uuid: string;
  name: string;
  eyebrow: string;
  rank: RankInfo;
  stats: HeroStats;
  rankProgress: RankProgressInfo;
  achievementCategories: AchievementCategory[];
  identityBadge?: React.ReactNode;
  actions?: React.ReactNode;
}

// rgba() tint lookup for the icon chips — same "var() for solid, literal rgba() for
// tints" convention used by StatBox elsewhere, since CSS custom properties can't be
// alpha-suffixed directly.
const TOKEN_RGB: Record<string, string> = {
  "var(--diamond)": "110, 140, 184",
  "var(--redstone)": "196, 25, 18",
  "var(--secondary)": "255, 111, 98",
  "var(--gold)": "242, 169, 60",
  "var(--signal)": "53, 194, 103",
  "var(--primary)": "229, 35, 27",
};

export default function PlayerProfileHero({ uuid, name, eyebrow, rank, stats, rankProgress, achievementCategories, identityBadge, actions }: PlayerProfileHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewerRef = useRef<SkinViewerType | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let disposed = false;

    import('skinview3d').then(({ SkinViewer, IdleAnimation }) => {
      if (disposed || !canvasRef.current) return;
      const viewer = new SkinViewer({
        canvas: canvasRef.current,
        width: 230,
        height: 400,
        skin: `https://mc-heads.net/skin/${uuid}`
      });
      viewer.animation = new IdleAnimation();
      viewer.autoRotate = true;
      viewer.autoRotateSpeed = 0.6;
      viewer.zoom = 0.9;
      viewerRef.current = viewer;
    }).catch(err => console.error("Failed to load skinview3d", err));

    return () => {
      disposed = true;
      if (viewerRef.current) {
        try { viewerRef.current.dispose(); } catch { /* already torn down */ }
        viewerRef.current = null;
      }
    };
  }, [uuid]);

  return (
    <div className="glass" style={{ padding: "2rem", borderRadius: "20px", border: "1px solid var(--border-light)", position: "relative", overflow: "hidden" }}>
      {/* Ambient rank-colored glow, matches the account hero's existing treatment */}
      <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "420px", height: "420px", background: rank.color, filter: "blur(140px)", opacity: 0.1, pointerEvents: "none" }} />

      {/* Header row: identity + rank on the left, currency pills + actions on the right */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.25rem", marginBottom: "2rem", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {identityBadge}
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 600 }}>
              {eyebrow}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "2.2rem", margin: 0, fontWeight: 900, letterSpacing: "-0.01em" }}>{name}</h1>
              <span style={{ background: `rgba(0,0,0,0.5)`, border: `1px solid ${rank.color}`, padding: "0.3rem 0.75rem", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "bold", color: rank.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {rank.name}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <CurrencyPill icon="🕒" color="var(--gold)" value={`${stats.playtime}h`} label="Playtime" />
          <CurrencyPill icon="★" color="var(--diamond)" value={stats.votes} label="Votes" />
          {actions}
        </div>
      </div>

      {/* Stats-left / Skin-center / Achievements-right */}
      <div className="profile-hero-grid" style={{ position: "relative", zIndex: 2 }}>
        <div className="profile-hero-stats" style={{ display: "flex", flexDirection: "column", gap: "0.65rem", justifyContent: "center" }}>
          <StatRow icon="🕒" color="var(--gold)" value={`${stats.playtime}h`} label="Playtime" />
          <StatRow icon="⚡" color="var(--secondary)" value={stats.mob_kills.toLocaleString()} label="Mob Kills" />
          <StatRow icon="⛏️" color="var(--gold)" value={stats.blocks_mined.toLocaleString()} label="Blocks Mined" />
          <StatRow icon="💀" color="var(--redstone)" value={stats.deaths.toLocaleString()} label="Deaths" />
          <StatRow icon="📦" color="var(--diamond)" value={stats.servers_played} label="Modpacks Played" />
        </div>

        <div className="profile-hero-character" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem" }}>
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: "16px", padding: "1rem", border: `1px solid ${rank.color}44`, boxShadow: "0 15px 40px rgba(0,0,0,0.55)" }}>
            <canvas ref={canvasRef} style={{ display: "block" }} />
          </div>
          <button
            onClick={() => {
              if (viewerRef.current) {
                viewerRef.current.loadSkin(`https://mc-heads.net/skin/${uuid}?t=${Date.now()}`);
              }
            }}
            style={{ background: "transparent", border: "1px solid var(--border-light)", color: "var(--text-muted)", padding: "0.5rem 1rem", fontSize: "0.8rem", borderRadius: "6px", cursor: "pointer", width: "100%", transition: "all 0.2s" }}
            className="hover-bg-surface"
          >
            ⟳ Refresh skin
          </button>
        </div>

        <div className="profile-hero-achievements" style={{ display: "flex", flexDirection: "column", gap: "0.65rem", justifyContent: "center" }}>
          {achievementCategories.map(cat => (
            <AchievementRow key={cat.key} icon={cat.icon} color={ACHIEVEMENT_CATEGORY_COLORS[cat.key]} title={cat.title} unlocked={cat.unlocked} total={cat.total} />
          ))}
        </div>
      </div>

      {/* Footer: current rank -> next rank progress */}
      <div style={{ marginTop: "2rem", position: "relative", zIndex: 2 }}>
        {rankProgress.next ? (
          <div style={{ background: "rgba(0,0,0,0.4)", padding: "1rem", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.5rem", fontWeight: 600 }}>
              <span style={{ color: rank.color }}>{rank.name} ({stats.playtime}h)</span>
              <span style={{ color: rankProgress.next.color }}>Next: {rankProgress.next.name} ({rankProgress.next.hours}h)</span>
            </div>
            <div style={{ height: "10px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${rankProgress.percent}%`, background: `linear-gradient(90deg, ${rank.color}, ${rankProgress.next.color})`, borderRadius: "999px", transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
              <span>Progress to next rank: <strong style={{ color: "#fff" }}>{rankProgress.percent}%</strong></span>
              <span><strong style={{ color: "#fff" }}>{rankProgress.remaining} hours</strong> remaining</span>
            </div>
          </div>
        ) : (
          <div style={{ background: "rgba(242, 169, 60, 0.1)", border: "1px solid rgba(242, 169, 60, 0.3)", padding: "0.75rem 1rem", borderRadius: "0.75rem", color: "var(--gold)", fontSize: "0.85rem", fontWeight: 600, textAlign: "center" }}>
            🌟 Maximum rank milestone reached (`{rank.name}`) — or special Admin/Owner privileges!
          </div>
        )}
      </div>
    </div>
  );
}

function CurrencyPill({ icon, color, value, label }: { icon: string; color: string; value: string | number; label: string }) {
  const rgb = TOKEN_RGB[color] || "255, 255, 255";
  return (
    <div title={label} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(${rgb}, 0.1)`, border: `1px solid rgba(${rgb}, 0.25)`, padding: "0.45rem 0.9rem", borderRadius: "20px" }}>
      <span style={{ fontSize: "0.95rem" }}>{icon}</span>
      <span style={{ fontSize: "0.9rem", fontWeight: 800, color }}>{value}</span>
    </div>
  );
}

function StatRow({ icon, color, value, label }: { icon: string; color: string; value: string | number; label: string }) {
  const rgb = TOKEN_RGB[color] || "255, 255, 255";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "0.7rem 0.9rem" }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `rgba(${rgb}, 0.12)`, border: `1px solid rgba(${rgb}, 0.25)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: "1.05rem", fontWeight: 800, color, lineHeight: 1.15 }}>{value}</div>
        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{label}</div>
      </div>
    </div>
  );
}

function AchievementRow({ icon, color, title, unlocked, total }: { icon: string; color: string; title: string; unlocked: number; total: number }) {
  const rgb = TOKEN_RGB[color] || "255, 255, 255";
  const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "0.7rem 0.9rem" }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `rgba(${rgb}, 0.12)`, border: `1px solid rgba(${rgb}, 0.25)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.35rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{title}</span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>{unlocked}/{total}</span>
        </div>
        <div style={{ height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: "10px", transition: "width 0.4s ease" }} />
        </div>
      </div>
    </div>
  );
}
