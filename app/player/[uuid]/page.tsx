"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPlaytimeRank, getRankProgress } from "../../../utils/ranks";
import { getAchievementCategories } from "../../../utils/achievements";
import { supabase } from "../../../utils/supabase";
import PlayerProfileHero from "../../../components/PlayerProfileHero";

export default function PlayerProfile() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [playerInfo, setPlayerInfo] = useState<any>(null);
  const [allServerStats, setAllServerStats] = useState<any[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<string>("");
  const [liveStatus, setLiveStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Accordion states for Achievement categories
  const [expandedCategory, setExpandedCategory] = useState<string | null>("playtime");

  useEffect(() => {
    if (!uuid) return;
    const fetchProfile = async () => {
      // Fetch global aggregated stats
      const { data: globalData, error: globalError } = await supabase
        .from("network_leaderboard")
        .select("*")
        .eq("uuid", uuid)
        .single();

      // Fetch all server entries for this player
      const { data: serverList } = await supabase
        .from("players")
        .select("*")
        .eq("uuid", uuid)
        .order("playtime", { ascending: false });

      // Fetch discord status
      const { data: discordData } = await supabase
        .from("users")
        .select("discord_id")
        .ilike("minecraft_uuid", uuid)
        .maybeSingle();

      // Fetch real-time live character status from player_live_status
      const { data: liveData } = await supabase
        .from("player_live_status")
        .select("*")
        .eq("uuid", uuid)
        .maybeSingle();

      if (globalData) {
        setPlayerInfo({
          ...globalData,
          discord: !!discordData
        });
      }
      if (serverList && serverList.length > 0) {
        setAllServerStats(serverList);
        setSelectedServerId(serverList[0].server_id);
      }
      if (liveData) {
        setLiveStatus(liveData);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [uuid]);

  if (loading) {
    return <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--text-muted)" }}>Loading Profile...</div>;
  }

  if (!playerInfo) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1 style={{ color: "var(--redstone)", marginBottom: "1rem" }}>Player Not Found</h1>
        <p style={{ color: "var(--text-muted)" }}>We couldn't find any statistics for this UUID.</p>
        <Link href="/leaderboard" className="btn btn-primary" style={{ marginTop: "2rem" }}>Back to Leaderboard</Link>
      </div>
    );
  }

  // Formatting dates
  const memberSinceDate = new Date(playerInfo.updated_at);
  const memberSinceStr = memberSinceDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  
  const mostRecentServerObj = allServerStats.length > 0 
    ? [...allServerStats].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0] 
    : null;
  const lastOnlineStr = mostRecentServerObj 
    ? new Date(mostRecentServerObj.updated_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) 
    : "Unknown";

  const rank = getPlaytimeRank(playerInfo.playtime, playerInfo.name, playerInfo.uuid);
  const rankProgress = getRankProgress(playerInfo.playtime, playerInfo.name, playerInfo.uuid);

  // Selected server for "PER SERVER -> Server Statistics"
  const selectedServerData = allServerStats.find(s => s.server_id === selectedServerId) || allServerStats[0] || null;

  // --- ACHIEVEMENTS SETUP (No Economy, No Gambling) ---
  const achievementCategories = getAchievementCategories({
    playtime: playerInfo.playtime || 0,
    votes: playerInfo.votes || 0,
    discordLinked: !!playerInfo.discord,
    mob_kills: playerInfo.mob_kills || 0,
    blocks_mined: playerInfo.blocks_mined || 0,
    deaths: playerInfo.deaths || 0,
    servers_played: playerInfo.servers_played || 0,
  });

  const totalUnlocked = achievementCategories.reduce((sum, c) => sum + c.unlocked, 0);
  const totalAchievements = achievementCategories.reduce((sum, c) => sum + c.total, 0);

  // Find most recent unlocked achievement across all categories
  const allMilestones = achievementCategories.flatMap(c => c.milestones.map(m => ({ ...m, category: c.title })));
  const unlockedList = allMilestones.filter(m => m.current >= m.required);
  const mostRecentAchievement = unlockedList.length > 0 
    ? unlockedList[unlockedList.length - 1] 
    : { title: "First Steps", desc: "Join any server and play for 1 hour to earn your first achievement!" };

  const toggleCategory = (cat: string) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
  };

  return (
    <main style={{ maxWidth: "1150px", margin: "0 auto", padding: "4rem 2rem", minHeight: "80vh" }}>
      <Link href="/leaderboard" style={{ color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", display: "inline-block", fontWeight: 500 }}>
        ← Back to Leaderboard
      </Link>

      {/* Profile Hero: stats-left / skin-center / achievements-right */}
      <PlayerProfileHero
        uuid={uuid}
        name={playerInfo.name}
        eyebrow="PUBLIC PROFILE"
        rank={rank}
        stats={{
          playtime: playerInfo.playtime || 0,
          votes: playerInfo.votes || 0,
          deaths: playerInfo.deaths || 0,
          mob_kills: playerInfo.mob_kills || 0,
          blocks_mined: playerInfo.blocks_mined || 0,
          servers_played: playerInfo.servers_played || 0,
        }}
        rankProgress={rankProgress}
        achievementCategories={achievementCategories}
      />

      {/* Profile Details (doesn't fit the hero's stat/achievement rails) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.5rem" }}>
        <InfoRow icon="🗄️" label="Last Server" value={mostRecentServerObj?.server_id || "Unknown"} extra={lastOnlineStr} />
        <InfoRow icon="📅" label="Member since" value={memberSinceStr} />
        <InfoRow icon="💬" label="Discord" value={playerInfo.discord ? "Linked" : "Not Linked"} extra={playerInfo.discord ? <span style={{ color: "var(--signal)", fontSize: "0.8rem", fontWeight: "bold" }}>✓ Connected</span> : <span style={{ background: "transparent", border: "1px solid var(--border-light)", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.75rem", cursor: "not-allowed", opacity: 0.5 }}>Re-link</span>} />
        <InfoRow icon="🔑" label="UUID" value={uuid} isSmall />
      </div>

      {/* Live Character Status & Equipped Gear Card (if available) */}
      {liveStatus && (
        <div className="glass" style={{ marginTop: "2.5rem", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", background: "rgba(18, 18, 24, 0.8)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--primary)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.3rem", fontWeight: 700 }}>REAL-TIME MOD DATA</div>
              <h2 style={{ fontSize: "1.6rem", margin: 0, fontWeight: 800, display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span>Live Character Status</span>
                {liveStatus.is_online ? (
                  <span style={{ fontSize: "0.75rem", background: "rgba(53, 194, 103, 0.2)", color: "var(--signal)", border: "1px solid rgba(53, 194, 103, 0.4)", padding: "0.25rem 0.75rem", borderRadius: "9999px", display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: "bold" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--signal)", boxShadow: "0 0 8px var(--signal)" }} />
                    ONLINE ({liveStatus.server_id?.toUpperCase()})
                  </span>
                ) : (
                  <span style={{ fontSize: "0.75rem", background: "rgba(196, 25, 18, 0.15)", color: "var(--redstone)", border: "1px solid rgba(196, 25, 18, 0.3)", padding: "0.25rem 0.75rem", borderRadius: "9999px", display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: "bold" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--redstone)" }} />
                    OFFLINE (Last on {liveStatus.server_id?.toUpperCase()})
                  </span>
                )}
              </h2>
            </div>
            {liveStatus.updated_at && (
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Updated: {new Date(liveStatus.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>

          {/* Vitals Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
            {liveStatus.health !== null && liveStatus.health !== undefined && (
              <div style={{ background: "rgba(196, 25, 18, 0.08)", border: "1px solid rgba(196, 25, 18, 0.25)", padding: "1rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <span style={{ fontSize: "1.6rem" }}>❤️</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Health</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--redstone)" }}>{liveStatus.health} / {liveStatus.max_health || 20} HP</div>
                </div>
              </div>
            )}
            {liveStatus.level !== null && liveStatus.level !== undefined && (
              <div style={{ background: "rgba(242, 169, 60, 0.08)", border: "1px solid rgba(242, 169, 60, 0.25)", padding: "1rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <span style={{ fontSize: "1.6rem" }}>✨</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>XP Level</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--gold)" }}>Level {liveStatus.level}</div>
                </div>
              </div>
            )}
            {liveStatus.dimension && (
              <div style={{ background: "rgba(255, 111, 98, 0.08)", border: "1px solid rgba(255, 111, 98, 0.25)", padding: "1rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <span style={{ fontSize: "1.6rem" }}>🌍</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Dimension</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--secondary)", textTransform: "capitalize" }}>{typeof liveStatus.dimension === 'string' ? liveStatus.dimension.replace('minecraft:', '') : 'Overworld'}</div>
                </div>
              </div>
            )}
            {liveStatus.coordinates && (
              <div style={{ background: "rgba(110, 140, 184, 0.08)", border: "1px solid rgba(110, 140, 184, 0.25)", padding: "1rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <span style={{ fontSize: "1.6rem" }}>📍</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "bold" }}>Coordinates</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "var(--diamond)", fontFamily: "monospace" }}>X:{liveStatus.coordinates.x} Y:{liveStatus.coordinates.y} Z:{liveStatus.coordinates.z}</div>
                </div>
              </div>
            )}
          </div>

          {/* Equipped Gear & Armor */}
          {(liveStatus.armor || liveStatus.main_hand) && (
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.8rem", fontWeight: 700 }}>EQUIPPED GEAR & ARMOR</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.85rem" }}>
                {/* Main Hand */}
                {liveStatus.main_hand && (
                  <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.12)", padding: "0.85rem 1rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontSize: "1.3rem" }}>⚔️</span>
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Main Hand</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{liveStatus.main_hand.name || liveStatus.main_hand.item}</div>
                    </div>
                  </div>
                )}
                {/* Armor Slots */}
                {Array.isArray(liveStatus.armor) && liveStatus.armor.map((slot: any, idx: number) => {
                  const icons: Record<string, string> = { helmet: "🪖", chestplate: "👕", leggings: "👖", boots: "🥾" };
                  return (
                    <div key={idx} style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.12)", padding: "0.85rem 1rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ fontSize: "1.3rem" }}>{icons[slot.slot?.toLowerCase()] || "🛡️"}</span>
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{slot.slot}</div>
                        <div style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{slot.name || slot.item || "Empty"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PROGRESS -> Achievements Section */}
      <div style={{ marginTop: "4.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.25rem" }}>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.3rem", fontWeight: 700 }}>PROGRESS</div>
            <h2 style={{ fontSize: "1.8rem", margin: 0, fontWeight: 800 }}>Achievements</h2>
          </div>
          <div style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 600 }}>
            <span style={{ color: "#fff", fontWeight: "bold" }}>{totalUnlocked}</span> / {totalAchievements} unlocked
          </div>
        </div>

        {/* Top Banner: Most Recent Achievement */}
        <div style={{ background: "rgba(18, 18, 26, 0.8)", border: "1px solid rgba(242, 169, 60, 0.3)", borderRadius: "16px", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem", boxShadow: "0 4px 25px rgba(242, 169, 60, 0.06)" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "14px", background: "rgba(242, 169, 60, 0.15)", border: "1px solid rgba(242, 169, 60, 0.35)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem", flexShrink: 0 }}>
            🏆
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.75rem", color: "var(--gold)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.3rem" }}>
              MOST RECENT ACHIEVEMENT
            </div>
            <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff", marginBottom: "0.25rem" }}>
              {mostRecentAchievement.title}
            </div>
            <div style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
              {mostRecentAchievement.desc}
            </div>
          </div>
          {unlockedList.length > 0 && (
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "monospace", textAlign: "right" }}>
              {memberSinceStr}
            </div>
          )}
        </div>

        {/* Collapsible Category Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {achievementCategories.map(cat => (
            <AchievementCategoryCard
              key={cat.key}
              icon="🏆"
              title={cat.title}
              unlocked={cat.unlocked}
              total={cat.total}
              isOpen={expandedCategory === cat.key}
              onToggle={() => toggleCategory(cat.key)}
              milestones={cat.milestones}
              unit={cat.unit}
            />
          ))}
        </div>
      </div>

      {/* PER SERVER -> Server Statistics Section */}
      <div style={{ marginTop: "4.5rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--primary)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 700 }}>PER SERVER</div>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", fontWeight: 800 }}>Server Statistics</h2>

        {allServerStats.length === 0 ? (
          <div className="glass" style={{ padding: "3rem", borderRadius: "12px", textAlign: "center", color: "var(--text-muted)" }}>
            No individual server statistics recorded yet for this player.
          </div>
        ) : (
          <div>
            {/* Server Selector Tabs */}
            {allServerStats.length > 1 && (
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                {allServerStats.map(s => (
                  <button
                    key={s.server_id}
                    onClick={() => setSelectedServerId(s.server_id)}
                    style={{
                      background: selectedServerId === s.server_id ? "var(--primary)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${selectedServerId === s.server_id ? "var(--primary)" : "rgba(255,255,255,0.1)"}`,
                      color: "#fff",
                      fontWeight: selectedServerId === s.server_id ? "bold" : "500",
                      padding: "0.6rem 1.25rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontSize: "0.9rem"
                    }}
                  >
                    {s.server_id}
                  </button>
                ))}
              </div>
            )}

            {/* Selected Server Stat Grid */}
            {selectedServerData && (
              <div className="glass" style={{ padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>🖥️</span>
                    <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>{selectedServerData.server_id}</span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Last played: {new Date(selectedServerData.updated_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1.25rem" }}>
                  <StatBox icon="⏱️" color="var(--signal)" value={`${selectedServerData.playtime || 0}h`} label="Server Playtime" />
                  <StatBox icon="⚡" color="var(--secondary)" value={selectedServerData.mob_kills || 0} label="Mob Kills" />
                  <StatBox icon="⛏️" color="var(--gold)" value={selectedServerData.blocks_mined || 0} label="Blocks Mined" />
                  <StatBox icon="💀" color="var(--redstone)" value={selectedServerData.deaths || 0} label="Deaths" />
                  <StatBox icon="★" color="var(--diamond)" value={selectedServerData.votes || 0} label="Votes" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function AchievementCategoryCard({ icon, title, unlocked, total, isOpen, onToggle, milestones, unit }: any) {
  const percentTotal = Math.round((unlocked / total) * 100);

  return (
    <div style={{ background: "rgba(18, 18, 24, 0.65)", border: "1px solid var(--border-light)", borderRadius: "14px", overflow: "hidden", transition: "all 0.2s" }}>
      {/* Category Header Row */}
      <div 
        onClick={onToggle}
        style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: isOpen ? "rgba(255,255,255,0.03)" : "transparent", userSelect: "none" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <span style={{ fontSize: "1.3rem", color: "var(--gold)" }}>{icon}</span>
          <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>{title}</span>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "monospace" }}>({unlocked}/{total})</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "40%", justifyContent: "flex-end" }}>
          <div style={{ flex: 1, maxWidth: "180px", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden", display: "flex" }}>
            <div style={{ width: `${percentTotal}%`, background: unlocked > 0 ? "var(--primary)" : "transparent", transition: "width 0.4s ease" }} />
          </div>
          <span style={{ color: "var(--text-muted)", fontSize: "1.1rem", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
            ❯
          </span>
        </div>
      </div>

      {/* Expandable Milestones List */}
      {isOpen && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "0.75rem 1.5rem 1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {milestones.map((m: any, idx: number) => {
              const isDone = m.current >= m.required;
              const progressPct = Math.min(100, Math.floor((m.current / m.required) * 100));

              return (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", background: isDone ? "rgba(53, 194, 103, 0.03)" : "rgba(0,0,0,0.25)", borderRadius: "10px", border: `1px solid ${isDone ? "rgba(53, 194, 103, 0.15)" : "rgba(255,255,255,0.04)"}`, gap: "1.25rem", flexWrap: "wrap" }}>

                  {/* Left: Status Icon + Text */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1, minWidth: "240px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: isDone ? "rgba(53, 194, 103, 0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${isDone ? "rgba(53, 194, 103, 0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", justifyContent: "center", alignItems: "center", color: isDone ? "var(--signal)" : "var(--text-muted)", flexShrink: 0, fontSize: "0.9rem", marginTop: "2px" }}>
                      {isDone ? "✓" : "🔒"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: isDone ? "#fff" : "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: "0.2rem" }}>
                        {m.title}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, marginBottom: !isDone ? "0.6rem" : 0 }}>
                        {m.desc}
                      </div>

                      {/* Locked Progress Bar underneath */}
                      {!isDone && (
                        <div style={{ width: "100%", maxWidth: "320px", height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
                          <div style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, var(--primary), var(--diamond))", height: "100%" }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Done Stamp or Current/Required counts */}
                  <div style={{ textAlign: "right", fontFamily: "monospace", minWidth: "120px" }}>
                    {isDone ? (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--signal)", fontWeight: "bold", fontSize: "0.85rem" }}>
                        ✓ Done
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", fontWeight: "bold" }}>
                          {m.current}{unit} / {m.required}{unit}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {progressPct}%
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value, extra, isSmall }: any) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.25)", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: "150px" }}>
        <span style={{ color: "var(--text-muted)", opacity: 0.8, fontSize: "1.1rem" }}>{icon}</span>
        <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ flex: 1, color: "var(--text-primary)", fontSize: isSmall ? "0.82rem" : "1rem", letterSpacing: isSmall ? "0.5px" : "0", fontWeight: 600, fontFamily: isSmall ? "monospace" : "inherit" }}>
        {value}
      </div>
      {extra && <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", opacity: 0.9 }}>{extra}</div>}
    </div>
  );
}

// Maps each token's `var(--x)` reference to its rgb triplet so the icon chip's
// tint/border can be built as rgba(...) — same "var() for solid, literal rgba()
// for tints" convention ServerCard.tsx uses. Previously this matched raw Tailwind
// hex values directly; now callers pass tokens (see call sites above), so the
// lookup key changed accordingly instead of matching literal hex.
const STAT_BOX_RGB: Record<string, string> = {
  "var(--diamond)": "110, 140, 184",
  "var(--redstone)": "196, 25, 18",
  "var(--secondary)": "255, 111, 98",
  "var(--gold)": "242, 169, 60",
  "var(--signal)": "53, 194, 103",
};

function StatBox({ icon, color, value, label }: any) {
  const rgb = STAT_BOX_RGB[color] || "255, 255, 255";
  return (
    <div className="glass" style={{ padding: "1.75rem 1rem", borderRadius: "14px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem", border: "1px solid var(--border-light)" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `rgba(${rgb}, 0.12)`, border: `1px solid rgba(${rgb}, 0.25)`, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.3rem" }}>
        {icon}
      </div>
      <div style={{ fontSize: "2rem", fontWeight: 800, color: color }}>{value}</div>
      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.6px", fontWeight: 600 }}>{label}</div>
    </div>
  );
}
