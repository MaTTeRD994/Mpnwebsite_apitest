"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPlaytimeRank } from "../../../utils/ranks";
import { supabase } from "../../../utils/supabase";

export default function PlayerProfile({ params }: { params: { uuid: string } }) {
  const [playerInfo, setPlayerInfo] = useState<any>(null);
  const [lastServer, setLastServer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      // Fetch global aggregated stats
      const { data: globalData, error: globalError } = await supabase
        .from("network_leaderboard")
        .select("*")
        .eq("uuid", params.uuid)
        .single();

      // Fetch the most recently played server
      const { data: serverData, error: serverError } = await supabase
        .from("players")
        .select("server_id, updated_at")
        .eq("uuid", params.uuid)
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (globalData) setPlayerInfo(globalData);
      if (serverData) setLastServer(serverData);
      setLoading(false);
    };

    fetchProfile();
  }, [params.uuid]);

  useEffect(() => {
    if (!playerInfo || loading) return;
    
    const canvas = document.getElementById("skin_container") as HTMLCanvasElement;
    if (canvas) {
      // Dynamically import skinview3d to avoid Next.js SSR crashes
      import('skinview3d').then(({ SkinViewer }) => {
        // Clear previous instances if any
        const viewer = new SkinViewer({
          canvas: canvas,
          width: 150,
          height: 300,
          skin: `https://crafatar.com/skins/${params.uuid}`
        });
        
        // Setup animation
        viewer.autoRotate = true;
        viewer.autoRotateSpeed = 0.5;
        
        // Save to window so we can dispose it later if needed
        (window as any)._skinViewer = viewer;
      }).catch(err => console.error("Failed to load skinview3d", err));
      
      // Cleanup on unmount
      return () => {
        if ((window as any)._skinViewer) {
          (window as any)._skinViewer.dispose();
        }
      };
    }
  }, [playerInfo, loading, params.uuid]);

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
  
  const lastOnlineStr = lastServer ? new Date(lastServer.updated_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Unknown";

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 2rem", minHeight: "80vh" }}>
      <Link href="/leaderboard" style={{ color: "var(--primary)", textDecoration: "none", marginBottom: "2rem", display: "inline-block" }}>
        ← Back to Leaderboard
      </Link>

      {/* Main Profile Card */}
      <div className="glass" style={{ display: "flex", flexDirection: "row", padding: "2rem", borderRadius: "12px", gap: "2rem", flexWrap: "wrap", position: "relative" }}>
        
        {/* Left Column: Skin */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "1rem", border: "1px solid var(--border-light)" }}>
            <canvas id="skin_container" style={{ display: "block" }}></canvas>
          </div>
          <button className="btn" style={{ background: "transparent", border: "1px solid var(--border-light)", color: "var(--text-muted)", padding: "0.5rem 1rem", fontSize: "0.8rem", borderRadius: "4px", cursor: "pointer", width: "100%" }}>
            ⟳ Refresh skin
          </button>
        </div>

        {/* Right Column: Details */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>YOUR PROFILE</div>
              <h1 style={{ fontSize: "2.5rem", margin: 0, marginBottom: "1rem", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{playerInfo.name}</h1>
              
              <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                <span style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${rank.color}`, padding: "0.25rem 0.75rem", borderRadius: "4px", fontSize: "0.875rem", fontWeight: "bold", color: rank.color, textTransform: "uppercase" }}>
                  {rank.name}
                </span>
                <span style={{ background: "rgba(234, 179, 8, 0.1)", color: "#eab308", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold", border: "1px solid rgba(234, 179, 8, 0.2)" }}>
                  🏆 {playerInfo.playtime}h Playtime
                </span>
              </div>
            </div>

            {/* Credits Box */}
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-light)", borderRadius: "12px", padding: "1rem", textAlign: "center", minWidth: "100px" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#eab308" }}>0</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase" }}>CREDITS</div>
            </div>
          </div>

          {/* Info Rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <InfoRow icon="🗄️" label="Last Server" value={lastServer?.server_id || "Unknown"} extra={lastOnlineStr} />
            <InfoRow icon="📅" label="Member since" value={memberSinceStr} />
            <InfoRow icon="💬" label="Discord" value="Not Linked" extra={<span style={{ background: "transparent", border: "1px solid var(--border-light)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", cursor: "not-allowed", opacity: 0.5 }}>Re-link</span>} />
            <InfoRow icon="🔑" label="UUID" value={params.uuid} isSmall />
          </div>
        </div>
      </div>

      {/* Global Statistics Section */}
      <div style={{ marginTop: "4rem" }}>
        <div style={{ fontSize: "0.8rem", color: "var(--primary)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>NETWORK-WIDE</div>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "2rem" }}>Global Statistics</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          <StatBox icon="📦" color="#60a5fa" value={playerInfo.servers_played || 0} label="Modpacks Played" />
          <StatBox icon="💀" color="#f87171" value={playerInfo.deaths || 0} label="Deaths" />
          <StatBox icon="⚡" color="#fb923c" value={playerInfo.mob_kills || 0} label="Mob Kills" />
          <StatBox icon="⛏️" color="#eab308" value={playerInfo.blocks_mined || 0} label="Blocks Mined" />
          <StatBox icon="⏱️" color="#4ade80" value={`${playerInfo.playtime}h`} label="Network Playtime" />
        </div>
      </div>
    </main>
  );
}

function InfoRow({ icon, label, value, extra, isSmall }: any) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: "150px" }}>
        <span style={{ color: "var(--text-muted)", opacity: 0.7 }}>{icon}</span>
        <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{label}</span>
      </div>
      <div style={{ flex: 1, color: "var(--text-main)", fontSize: isSmall ? "0.8rem" : "1rem", letterSpacing: isSmall ? "0.5px" : "0" }}>
        {value}
      </div>
      {extra && <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", opacity: 0.8 }}>{extra}</div>}
    </div>
  );
}

function StatBox({ icon, color, value, label }: any) {
  return (
    <div className="glass" style={{ padding: "2rem 1rem", borderRadius: "12px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `rgba(${color === '#60a5fa' ? '96,165,250' : color === '#f87171' ? '248,113,113' : color === '#fb923c' ? '251,146,60' : color === '#eab308' ? '234,179,8' : '74,222,128'}, 0.1)`, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.2rem" }}>
        {icon}
      </div>
      <div style={{ fontSize: "2rem", fontWeight: "bold", color: color }}>{value}</div>
      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
    </div>
  );
}
