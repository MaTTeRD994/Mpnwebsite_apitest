"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPlaytimeRank, PLAYTIME_RANKS } from "../../../utils/ranks";
import { supabase } from "../../../utils/supabase";

export default function PlayerProfile() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [playerInfo, setPlayerInfo] = useState<any>(null);
  const [allServerStats, setAllServerStats] = useState<any[]>([]);
  const [selectedServerId, setSelectedServerId] = useState<string>("");
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

      if (globalData) setPlayerInfo(globalData);
      if (serverList && serverList.length > 0) {
        setAllServerStats(serverList);
        setSelectedServerId(serverList[0].server_id);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [uuid]);

  useEffect(() => {
    if (!playerInfo || loading || !uuid) return;
    
    const canvas = document.getElementById("skin_container") as HTMLCanvasElement;
    if (canvas) {
      import('skinview3d').then(({ SkinViewer, IdleAnimation }) => {
        if ((window as any)._skinViewer) {
          try { (window as any)._skinViewer.dispose(); } catch(e) {}
        }
        
        const viewer = new SkinViewer({
          canvas: canvas,
          width: 180,
          height: 320,
          skin: `https://mc-heads.net/skin/${uuid}`
        });
        
        viewer.animation = new IdleAnimation();
        viewer.autoRotate = true;
        viewer.autoRotateSpeed = 0.6;
        viewer.zoom = 0.9;
        
        (window as any)._skinViewer = viewer;
      }).catch(err => console.error("Failed to load skinview3d", err));
      
      return () => {
        if ((window as any)._skinViewer) {
          try { (window as any)._skinViewer.dispose(); } catch(e) {}
        }
      };
    }
  }, [playerInfo, loading, uuid]);

  if (loading) {
    return <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--text-muted)" }}>Loading Profile...</div>;
  }

  if (!playerInfo) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1 style={{ color: "#ef4444", marginBottom: "1rem" }}>Player Not Found</h1>
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

  const rank = getPlaytimeRank(playerInfo.playtime, playerInfo.name);

  // Selected server for "PER SERVER -> Server Statistics"
  const selectedServerData = allServerStats.find(s => s.server_id === selectedServerId) || allServerStats[0] || null;

  // --- ACHIEVEMENTS SETUP (No Economy, No Gambling) ---
  const playtimeMilestones = PLAYTIME_RANKS.map(rank => ({
    title: `${rank.name} Rank`,
    desc: rank.hours === 0 
      ? `Start your journey on the network (${rank.claims} claims, ${rank.homes} home).` 
      : `Reach ${rank.hours} hours across all servers to unlock ${rank.name} (${rank.claims} claims, ${rank.forceLoaded} force loaded chunks, ${rank.homes} homes${rank.specialDiscord ? ', VIP Discord role' : ''}).`,
    required: rank.hours,
    current: playerInfo.playtime || 0
  }));

  const votingMilestones = [
    { title: "First Vote", desc: "Vote for MaTTeRPixel Network for the first time.", required: 1, current: playerInfo.votes || 0 },
    { title: "Supporter", desc: "Vote for MaTTeRPixel Network 10 times.", required: 10, current: playerInfo.votes || 0 },
    { title: "Regular", desc: "Vote for MaTTeRPixel Network 25 times.", required: 25, current: playerInfo.votes || 0 },
    { title: "Dedicated Voter", desc: "Vote for MaTTeRPixel Network 50 times.", required: 50, current: playerInfo.votes || 0 },
    { title: "Super Voter", desc: "Vote for MaTTeRPixel Network 100 times.", required: 100, current: playerInfo.votes || 0 },
    { title: "Champion Voter", desc: "Vote for MaTTeRPixel Network 500 times.", required: 500, current: playerInfo.votes || 0 },
    { title: "Elite Voter", desc: "Vote for MaTTeRPixel Network 1,000 times.", required: 1000, current: playerInfo.votes || 0 },
    { title: "Network Pillar", desc: "Vote for MaTTeRPixel Network 2,500 times.", required: 2500, current: playerInfo.votes || 0 },
    { title: "Network Legend", desc: "Vote for MaTTeRPixel Network 5,000 times.", required: 5000, current: playerInfo.votes || 0 },
    { title: "Eternal Voter", desc: "Vote for MaTTeRPixel Network 10,000 times.", required: 10000, current: playerInfo.votes || 0 },
  ];

  const communityMilestones = [
    { title: "Community Member", desc: "Link your Discord account to your profile.", required: 1, current: playerInfo.discord ? 1 : 0 },
  ];

  const gameStatsMilestones = [
    { title: "First Blood", desc: "Defeat your first mob across the network.", required: 1, current: playerInfo.mob_kills || 0 },
    { title: "Monster Hunter", desc: "Defeat 100 mobs across all servers.", required: 100, current: playerInfo.mob_kills || 0 },
    { title: "Slayer", desc: "Defeat 1,000 mobs across all servers.", required: 1000, current: playerInfo.mob_kills || 0 },
    { title: "Exterminator", desc: "Defeat 10,000 mobs across all servers.", required: 10000, current: playerInfo.mob_kills || 0 },
    { title: "First Dig", desc: "Mine your first 100 blocks across the network.", required: 100, current: playerInfo.blocks_mined || 0 },
    { title: "Excavator", desc: "Mine 5,000 blocks across all servers.", required: 5000, current: playerInfo.blocks_mined || 0 },
    { title: "Quarry Master", desc: "Mine 50,000 blocks across all servers.", required: 50000, current: playerInfo.blocks_mined || 0 },
    { title: "World Shaper", desc: "Mine 250,000 blocks across all servers.", required: 250000, current: playerInfo.blocks_mined || 0 },
    { title: "First Lesson", desc: "Experience your first death.", required: 1, current: playerInfo.deaths || 0 },
    { title: "Survivor's Grit", desc: "Die 25 times and keep getting back up.", required: 25, current: playerInfo.deaths || 0 },
    { title: "Never Surrender", desc: "Die 100 times across all servers.", required: 100, current: playerInfo.deaths || 0 },
    { title: "Explorer", desc: "Play on 2 different modpacks.", required: 2, current: playerInfo.servers_played || 0 },
    { title: "Multi-Dimensional", desc: "Play on 4 different modpacks.", required: 4, current: playerInfo.servers_played || 0 },
    { title: "Network Hopper", desc: "Play on 8 different modpacks.", required: 8, current: playerInfo.servers_played || 0 },
  ];

  const countUnlocked = (list: any[]) => list.filter(item => item.current >= item.required).length;
  
  const playtimeUnlocked = countUnlocked(playtimeMilestones);
  const votingUnlocked = countUnlocked(votingMilestones);
  const communityUnlocked = countUnlocked(communityMilestones);
  const gameStatsUnlocked = countUnlocked(gameStatsMilestones);

  const totalUnlocked = playtimeUnlocked + votingUnlocked + communityUnlocked + gameStatsUnlocked;
  const totalAchievements = playtimeMilestones.length + votingMilestones.length + communityMilestones.length + gameStatsMilestones.length;

  // Find most recent unlocked achievement across all lists
  const allMilestones = [
    ...playtimeMilestones.map(m => ({ ...m, category: "Playtime" })),
    ...votingMilestones.map(m => ({ ...m, category: "Voting" })),
    ...communityMilestones.map(m => ({ ...m, category: "Community" })),
    ...gameStatsMilestones.map(m => ({ ...m, category: "Game Statistics" })),
  ];
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

      {/* Main Profile Card (Clean, no economy/gambling box) */}
      <div className="glass" style={{ display: "flex", flexDirection: "row", padding: "2rem", borderRadius: "16px", gap: "2.5rem", flexWrap: "wrap", position: "relative", border: "1px solid var(--border-light)" }}>
        
        {/* Left Column: Skin */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: "12px", padding: "1rem", border: "1px solid var(--border-light)", boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}>
            <canvas id="skin_container" style={{ display: "block" }}></canvas>
          </div>
          <button 
            className="btn hover-bg-surface" 
            onClick={() => {
              if ((window as any)._skinViewer) {
                (window as any)._skinViewer.loadSkin(`https://mc-heads.net/skin/${uuid}?t=${Date.now()}`);
              }
            }}
            style={{ background: "transparent", border: "1px solid var(--border-light)", color: "var(--text-muted)", padding: "0.5rem 1rem", fontSize: "0.8rem", borderRadius: "6px", cursor: "pointer", width: "100%", transition: "all 0.2s" }}>
            ⟳ Refresh skin
          </button>
        </div>

        {/* Right Column: Details */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.5rem", fontWeight: 600 }}>YOUR PROFILE</div>
            <h1 style={{ fontSize: "2.8rem", margin: 0, marginBottom: "1rem", textShadow: "0 2px 15px rgba(0,0,0,0.5)", fontWeight: 800 }}>{playerInfo.name}</h1>
            
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${rank.color}`, padding: "0.35rem 0.85rem", borderRadius: "6px", fontSize: "0.875rem", fontWeight: "bold", color: rank.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {rank.name}
              </span>
              <span style={{ background: "rgba(234, 179, 8, 0.1)", color: "#eab308", padding: "0.35rem 0.85rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold", border: "1px solid rgba(234, 179, 8, 0.25)" }}>
                🕒 {playerInfo.playtime}h Playtime
              </span>
              <span style={{ background: "rgba(96, 165, 250, 0.1)", color: "#60a5fa", padding: "0.35rem 0.85rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold", border: "1px solid rgba(96, 165, 250, 0.25)" }}>
                📦 {playerInfo.servers_played || 0} Modpacks Played
              </span>
            </div>
          </div>

          {/* Info Rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <InfoRow icon="🗄️" label="Last Server" value={mostRecentServerObj?.server_id || "Unknown"} extra={lastOnlineStr} />
            <InfoRow icon="📅" label="Member since" value={memberSinceStr} />
            <InfoRow icon="💬" label="Discord" value={playerInfo.discord ? "Linked" : "Not Linked"} extra={playerInfo.discord ? <span style={{ color: "#4ade80", fontSize: "0.8rem", fontWeight: "bold" }}>✓ Connected</span> : <span style={{ background: "transparent", border: "1px solid var(--border-light)", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.75rem", cursor: "not-allowed", opacity: 0.5 }}>Re-link</span>} />
            <InfoRow icon="🔑" label="UUID" value={uuid} isSmall />
          </div>
        </div>
      </div>

      {/* Global Statistics Section */}
      <div style={{ marginTop: "4rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--primary)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 700 }}>NETWORK-WIDE</div>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", fontWeight: 800 }}>Global Statistics</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem" }}>
          <StatBox icon="📦" color="#60a5fa" value={playerInfo.servers_played || 0} label="Modpacks Played" />
          <StatBox icon="💀" color="#f87171" value={playerInfo.deaths || 0} label="Deaths" />
          <StatBox icon="⚡" color="#fb923c" value={playerInfo.mob_kills || 0} label="Mob Kills" />
          <StatBox icon="⛏️" color="#eab308" value={playerInfo.blocks_mined || 0} label="Blocks Mined" />
          <StatBox icon="⏱️" color="#4ade80" value={`${playerInfo.playtime}h`} label="Network Playtime" />
        </div>
      </div>

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
        <div style={{ background: "rgba(18, 18, 26, 0.8)", border: "1px solid rgba(234, 179, 8, 0.3)", borderRadius: "16px", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem", boxShadow: "0 4px 25px rgba(234, 179, 8, 0.06)" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "14px", background: "rgba(234, 179, 8, 0.15)", border: "1px solid rgba(234, 179, 8, 0.35)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem", flexShrink: 0 }}>
            🏆
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.75rem", color: "#eab308", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.3rem" }}>
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
          
          {/* Playtime Card */}
          <AchievementCategoryCard 
            icon="🏆"
            title="Playtime"
            unlocked={playtimeUnlocked}
            total={playtimeMilestones.length}
            isOpen={expandedCategory === "playtime"}
            onToggle={() => toggleCategory("playtime")}
            milestones={playtimeMilestones}
            unit="h"
          />

          {/* Voting Card */}
          <AchievementCategoryCard 
            icon="🏆"
            title="Voting"
            unlocked={votingUnlocked}
            total={votingMilestones.length}
            isOpen={expandedCategory === "voting"}
            onToggle={() => toggleCategory("voting")}
            milestones={votingMilestones}
            unit=" votes"
          />

          {/* Community Card */}
          <AchievementCategoryCard 
            icon="🏆"
            title="Community"
            unlocked={communityUnlocked}
            total={communityMilestones.length}
            isOpen={expandedCategory === "community"}
            onToggle={() => toggleCategory("community")}
            milestones={communityMilestones}
            unit=""
          />

          {/* Game Statistics Card */}
          <AchievementCategoryCard 
            icon="🏆"
            title="Game Statistics"
            unlocked={gameStatsUnlocked}
            total={gameStatsMilestones.length}
            isOpen={expandedCategory === "gamestats"}
            onToggle={() => toggleCategory("gamestats")}
            milestones={gameStatsMilestones}
            unit=""
          />

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
                      color: selectedServerId === s.server_id ? "#000" : "#fff",
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
                  <StatBox icon="⏱️" color="#4ade80" value={`${selectedServerData.playtime || 0}h`} label="Server Playtime" />
                  <StatBox icon="⚡" color="#fb923c" value={selectedServerData.mob_kills || 0} label="Mob Kills" />
                  <StatBox icon="⛏️" color="#eab308" value={selectedServerData.blocks_mined || 0} label="Blocks Mined" />
                  <StatBox icon="💀" color="#f87171" value={selectedServerData.deaths || 0} label="Deaths" />
                  <StatBox icon="★" color="#60a5fa" value={selectedServerData.votes || 0} label="Votes" />
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
          <span style={{ fontSize: "1.3rem", color: "#eab308" }}>{icon}</span>
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
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", background: isDone ? "rgba(74, 222, 128, 0.03)" : "rgba(0,0,0,0.25)", borderRadius: "10px", border: `1px solid ${isDone ? "rgba(74, 222, 128, 0.15)" : "rgba(255,255,255,0.04)"}`, gap: "1.25rem", flexWrap: "wrap" }}>
                  
                  {/* Left: Status Icon + Text */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1, minWidth: "240px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: isDone ? "rgba(74, 222, 128, 0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${isDone ? "rgba(74, 222, 128, 0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", justifyContent: "center", alignItems: "center", color: isDone ? "#4ade80" : "var(--text-muted)", flexShrink: 0, fontSize: "0.9rem", marginTop: "2px" }}>
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
                          <div style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #f43f5e, #38bdf8)", height: "100%" }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Done Stamp or Current/Required counts */}
                  <div style={{ textAlign: "right", fontFamily: "monospace", minWidth: "120px" }}>
                    {isDone ? (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#4ade80", fontWeight: "bold", fontSize: "0.85rem" }}>
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
      <div style={{ flex: 1, color: "var(--text-main)", fontSize: isSmall ? "0.82rem" : "1rem", letterSpacing: isSmall ? "0.5px" : "0", fontWeight: 600, fontFamily: isSmall ? "monospace" : "inherit" }}>
        {value}
      </div>
      {extra && <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", opacity: 0.9 }}>{extra}</div>}
    </div>
  );
}

function StatBox({ icon, color, value, label }: any) {
  return (
    <div className="glass" style={{ padding: "1.75rem 1rem", borderRadius: "14px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem", border: "1px solid var(--border-light)" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `rgba(${color === '#60a5fa' ? '96,165,250' : color === '#f87171' ? '248,113,113' : color === '#fb923c' ? '251,146,60' : color === '#eab308' ? '234,179,8' : '74,222,128'}, 0.12)`, border: `1px solid rgba(${color === '#60a5fa' ? '96,165,250' : color === '#f87171' ? '248,113,113' : color === '#fb923c' ? '251,146,60' : color === '#eab308' ? '234,179,8' : '74,222,128'}, 0.25)`, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.3rem" }}>
        {icon}
      </div>
      <div style={{ fontSize: "2rem", fontWeight: 800, color: color }}>{value}</div>
      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.6px", fontWeight: 600 }}>{label}</div>
    </div>
  );
}
