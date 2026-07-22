"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { mpnPacks, PackConfig } from "../../../config/packs";
import { parseChangelog, tokenizeInline, ChangelogVersion } from "../../../utils/changelog";

export default function PackDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const pack: PackConfig | undefined = mpnPacks.find((p) => p.id === id);

  const [activeInstallTab, setActiveInstallTab] = useState("modrinth");
  const [changelog, setChangelog] = useState<ChangelogVersion[] | null>(null);

  useEffect(() => {
    if (!pack?.changelogRepo) return;
    fetch(`/api/packs/${pack.id}/changelog`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.markdown) setChangelog(parseChangelog(data.markdown));
      })
      .catch((err) => console.error("Failed to load changelog:", err));
  }, [pack?.id, pack?.changelogRepo]);

  if (!pack) {
    return (
      <main style={{ background: "var(--bg-base)", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div className="glass" style={{ maxWidth: "500px", padding: "3rem", textAlign: "center", borderRadius: "1.5rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff", marginBottom: "0.75rem" }}>Modpack Not Found</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
            The modpack you are looking for does not exist or has been renamed.
          </p>
          <Link
            href="/packs"
            style={{
              background: "var(--primary)",
              color: "#fff",
              padding: "0.8rem 1.75rem",
              borderRadius: "0.75rem",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: "0 8px 20px var(--primary-glow)"
            }}
          >
            ← Back to Modpacks
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "var(--bg-base)", minHeight: "100vh", overflowX: "hidden", paddingBottom: "6rem" }}>
      {/* 1. HERO BANNER WITH GRADIENT */}
      <section style={{ position: "relative", minHeight: "420px", display: "flex", alignItems: "flex-end", padding: "4rem 2rem 3rem", borderBottom: "1px solid var(--border-light)", overflow: "hidden" }}>
        {/* Background Banner Image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${pack.bannerUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35,
            filter: "blur(6px) brightness(0.7)",
            zIndex: 0
          }}
        />
        {/* Dark Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, var(--bg-base) 0%, rgba(18, 18, 24, 0.7) 60%, rgba(18, 18, 24, 0.4) 100%)",
            zIndex: 1
          }}
        />

        {/* Hero Content */}
        <div style={{ maxWidth: "1250px", width: "100%", margin: "0 auto", position: "relative", zIndex: 10, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem" }}>
          <div style={{ display: "flex", gap: "1.75rem", alignItems: "center", flexWrap: "wrap" }}>
            {/* Pack Icon */}
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "1.5rem",
                background: "var(--bg-surface)",
                border: `3px solid ${pack.color}`,
                padding: "6px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0
              }}
            >
              <img src={pack.iconUrl} alt={pack.name} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "1.1rem" }} />
            </div>

            <div>
              {/* Breadcrumb & Badges */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                <Link href="/packs" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", fontWeight: "bold", transition: "color 0.2s" }} className="hover-text-light">
                  📦 Modpacks
                </Link>
                <span style={{ color: "var(--text-muted)" }}>/</span>
                <span
                  style={{
                    background: "color-mix(in srgb, var(--gold) 25%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--gold) 40%, transparent)",
                    color: "var(--gold)",
                    fontSize: "0.7rem",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "0.25rem 0.7rem",
                    borderRadius: "0.4rem"
                  }}
                >
                  {pack.status}
                </span>
                <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "0.75rem", fontWeight: "bold", padding: "0.25rem 0.65rem", borderRadius: "0.4rem" }}>
                  MC {pack.mcVersion}
                </span>
                <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "0.75rem", fontWeight: "bold", padding: "0.25rem 0.65rem", borderRadius: "0.4rem" }}>
                  {pack.modloader}
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                {pack.name}
              </h1>
              <p style={{ color: "var(--text-light)", fontSize: "1.1rem", margin: "0.4rem 0 0", maxWidth: "650px", opacity: 0.85 }}>
                {pack.tagline}
              </p>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/packs"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "var(--text-light)",
                padding: "0.9rem 1.5rem",
                borderRadius: "0.75rem",
                fontWeight: "bold",
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s"
              }}
              className="hover-bg-surface"
            >
              ← All Packs
            </Link>

            <a
              href={pack.modrinthUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg, var(--signal) 0%, color-mix(in srgb, var(--signal) 70%, black) 100%)",
                color: "#fff",
                fontWeight: "bold",
                padding: "0.9rem 2.2rem",
                borderRadius: "0.75rem",
                fontSize: "1.05rem",
                textDecoration: "none",
                boxShadow: "0 10px 25px -5px color-mix(in srgb, var(--signal) 45%, transparent)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              className="hover-scale"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download on Modrinth ↗
            </a>
          </div>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN CONTENT SECTION */}
      <section style={{ maxWidth: "1250px", margin: "3rem auto 0", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "flex-start" }}>
        {/* LEFT COLUMN (70% on large screen) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem", gridColumn: "1 / -1" }} className="pack-details-main">
          <style jsx>{`
            @media (min-width: 1024px) {
              .pack-details-main {
                grid-column: span 2 / span 2;
              }
            }
          `}</style>

          {/* About & Overview */}
          <div className="glass" style={{ background: "rgba(18, 18, 24, 0.75)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.25rem", padding: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff", margin: "0 0 1.5rem 0", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ color: pack.color }}>📖</span> About {pack.name}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {pack.description.map((para, idx) => (
                <p key={idx} style={{ color: "var(--text-muted)", fontSize: "1.02rem", lineHeight: 1.7, margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Key Features Grid */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ color: "var(--primary)", fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: "0.3rem" }}>
                CURATED MECHANICS
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#fff", margin: 0 }}>
                Key Features
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {pack.features.map((feat, i) => (
                <div
                  key={i}
                  className="glass hover-scale"
                  style={{
                    background: "rgba(18, 18, 24, 0.65)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "1rem",
                    padding: "1.75rem",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>
                    {feat.icon}
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff", margin: "0 0 0.5rem 0" }}>
                    {feat.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Installation Guide */}
          <div className="glass" style={{ background: "rgba(18, 18, 24, 0.75)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.25rem", padding: "2.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff", margin: "0 0 1.25rem 0", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span>🛠️</span> Installation Guide
            </h2>

            {/* Install Tabs */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.75rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem", flexWrap: "wrap" }}>
              {[
                { id: "modrinth", label: "Modrinth App (Recommended)" },
                { id: "curseforge", label: "CurseForge" },
                { id: "prism", label: "Prism / MultiMC" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInstallTab(tab.id)}
                  style={{
                    background: activeInstallTab === tab.id ? "var(--primary)" : "rgba(255,255,255,0.03)",
                    color: activeInstallTab === tab.id ? "#fff" : "var(--text-muted)",
                    border: activeInstallTab === tab.id ? "1px solid var(--primary)" : "1px solid rgba(255,255,255,0.08)",
                    padding: "0.65rem 1.25rem",
                    borderRadius: "0.65rem",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeInstallTab === "modrinth" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "color-mix(in srgb, var(--signal) 20%, transparent)", color: "var(--signal)", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</span>
                  <p style={{ margin: 0 }}>Download and install the official <a href="https://modrinth.com/app" target="_blank" rel="noopener noreferrer" style={{ color: "var(--signal)", fontWeight: "bold" }}>Modrinth App</a> for Windows, macOS, or Linux.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "color-mix(in srgb, var(--signal) 20%, transparent)", color: "var(--signal)", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</span>
                  <p style={{ margin: 0 }}>Open the Modrinth App, click on the **Search** icon on the left, and search for `<span style={{ color: "#fff", fontWeight: "bold" }}>{pack.name}</span>`.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "color-mix(in srgb, var(--signal) 20%, transparent)", color: "var(--signal)", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>3</span>
                  <p style={{ margin: 0 }}>Click the **Install** button. The app will automatically download all required mods, configs, and the exact {pack.modloader} version with zero setup needed!</p>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "color-mix(in srgb, var(--signal) 20%, transparent)", color: "var(--signal)", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>4</span>
                  <p style={{ margin: 0 }}>Once installed, click **Play** from your library to start your adventure in solo or multiplayer!</p>
                </div>
              </div>
            )}

            {activeInstallTab === "curseforge" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}>
                  You can also search for `<span style={{ color: "#fff", fontWeight: "bold" }}>{pack.name}</span>` directly within the CurseForge App under the Minecraft section and click **Install**. Ensure your allocated RAM in CurseForge settings is set to at least **4096 MB (4 GB)**.
                </p>
              </div>
            )}

            {activeInstallTab === "prism" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "color-mix(in srgb, var(--diamond) 20%, transparent)", color: "var(--diamond)", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</span>
                  <p style={{ margin: 0 }}>In Prism Launcher, click **Add Instance** at the top left.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "color-mix(in srgb, var(--diamond) 20%, transparent)", color: "var(--diamond)", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</span>
                  <p style={{ margin: 0 }}>Select **Modrinth** from the left tab list and search for `<span style={{ color: "#fff", fontWeight: "bold" }}>{pack.name}</span>`.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "color-mix(in srgb, var(--diamond) 20%, transparent)", color: "var(--diamond)", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>3</span>
                  <p style={{ margin: 0 }}>Select the latest release and click **OK** to build the instance.</p>
                </div>
              </div>
            )}
          </div>

          {/* Update Log — auto-pulled from the pack's GitHub CHANGELOG.md (see
              config/packs.ts `changelogRepo` + app/api/packs/[id]/changelog).
              Only rendered for packs that have a linked repo. */}
          {pack.changelogRepo && changelog && changelog.length > 0 && (
            <div className="glass" style={{ background: "rgba(18, 18, 24, 0.75)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.25rem", padding: "2.5rem" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff", margin: "0 0 1.5rem 0", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ color: pack.color }}>📋</span> Update Log
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {changelog.map((version, vIdx) => (
                  <div key={vIdx} style={{ position: "relative", paddingLeft: "1.5rem", borderLeft: `2px solid ${pack.color}40` }}>
                    <div style={{ position: "absolute", left: "-7px", top: "0.3rem", width: "12px", height: "12px", borderRadius: "50%", background: pack.color, boxShadow: `0 0 0 4px rgba(18, 18, 24, 0.75)` }} />
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: pack.color, margin: "0 0 1rem 0" }}>{version.title}</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      {version.sections.map((section, sIdx) => (
                        <div key={sIdx}>
                          {section.heading && (
                            <div style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.6rem" }}>
                              {tokenizeInline(section.heading).map((tok, tIdx) =>
                                tok.type === "code" ? (
                                  <code key={tIdx} style={{ background: "rgba(255,255,255,0.08)", padding: "0.1rem 0.4rem", borderRadius: "4px", fontFamily: "monospace", color: "#fff" }}>{tok.value}</code>
                                ) : (
                                  <span key={tIdx}>{tok.value}</span>
                                )
                              )}
                            </div>
                          )}
                          {section.bullets.length > 0 && (
                            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {section.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} style={{ display: "flex", gap: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                                  <span style={{ color: pack.color, flexShrink: 0 }}>•</span>
                                  <span>
                                    {bullet.linkUrl && (
                                      <a href={bullet.linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--signal)", fontWeight: "bold", textDecoration: "none" }}>
                                        {bullet.linkText}
                                      </a>
                                    )}{" "}
                                    {tokenizeInline(bullet.rest).map((tok, tIdx) =>
                                      tok.type === "code" ? (
                                        <code key={tIdx} style={{ background: "rgba(255,255,255,0.08)", padding: "0.1rem 0.4rem", borderRadius: "4px", fontFamily: "monospace", color: "#fff" }}>{tok.value}</code>
                                      ) : (
                                        <span key={tIdx}>{tok.value}</span>
                                      )
                                    )}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: "1.5rem", fontSize: "0.78rem", color: "var(--text-light)" }}>
                Synced from{" "}
                <a href={`https://github.com/${pack.changelogRepo}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>
                  github.com/{pack.changelogRepo}
                </a>
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN SIDEBAR (Modrinth Project Style Sidebar) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "sticky", top: "6.5rem" }}>
          {/* 1. Download & Focus Card */}
          <div className="glass" style={{ background: "rgba(18, 18, 24, 0.85)", border: `1px solid ${pack.color}`, borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{pack.id === "makeshiftsmp" ? "🚂" : "🌿"}</span>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "bold" }}>Pack Focus</div>
                <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#fff" }}>{pack.specs.focus}</div>
              </div>
            </div>

            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {pack.id === "makeshiftsmp"
                ? "Ideal for redstone engineers, kinetic builders, and players who love designing trains and automated machinery."
                : "Built for long-term survival with a friend — ideal if you want vanilla Minecraft that just runs smoother and forgets less."}
            </p>

            <a
              href={pack.modrinthUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg, var(--signal) 0%, color-mix(in srgb, var(--signal) 70%, black) 100%)",
                color: "#fff",
                fontWeight: "bold",
                padding: "0.9rem",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 8px 20px color-mix(in srgb, var(--signal) 40%, transparent)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              className="hover-scale"
            >
              <span>Download on Modrinth ↗</span>
            </a>
          </div>

          {/* 2. Pack Specifications Card */}
          <div className="glass" style={{ background: "rgba(18, 18, 24, 0.75)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.25rem", padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#fff", margin: "0 0 1.25rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.75rem" }}>
              Technical Specs
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Minecraft Version:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>{pack.mcVersion}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Modloader:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>{pack.modloader}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Mod Count:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>{pack.specs.totalMods}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Recommended RAM:</span>
                <span style={{ color: "var(--signal)", fontWeight: "bold" }}>{pack.specs.ramRecommendation}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Developer:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>{pack.specs.creator}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Release Year:</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>{pack.specs.releaseYear}</span>
              </div>
            </div>
          </div>

          {/* 3. Community Feedback Box */}
          <div className="glass" style={{ background: "rgba(18, 18, 24, 0.75)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.25rem", padding: "1.5rem", textAlign: "center" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#fff", margin: "0 0 0.5rem 0" }}>
              Have Mod Suggestions?
            </h4>
            <p style={{ color: "var(--text-muted)", fontSize: '0.85rem', margin: "0 0 1rem 0", lineHeight: 1.5 }}>
              We actively listen to feedback, recipe balancing ideas, and mod requests on our Discord.
            </p>
            <Link
              href="/discord"
              style={{
                background: "rgba(88, 101, 242, 0.15)",
                border: "1px solid rgba(88, 101, 242, 0.3)",
                color: "#818cf8",
                fontWeight: "bold",
                padding: "0.65rem 1rem",
                borderRadius: "0.65rem",
                fontSize: "0.85rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.2s"
              }}
              className="hover-bg-surface"
            >
              💬 Join Discord Studio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
