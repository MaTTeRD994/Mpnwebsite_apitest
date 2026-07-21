# MaTTeRPixel Network — Design System v2 (`design.md`)

Ground-zero spec for MPN's web UI. Companion to `brand.md` (identity/rationale) — this doc is the token/component reference implementers actually build from.

**Reference direction:** component and layout language borrowed from [Modrinth](https://modrinth.com/) and [Laby.net](https://laby.net/skins) — dense, functional, data-honest. Not [Boxxy Network](https://boxxynetwork.eu)'s muted-panel-plus-gradient-headline style (validated the "muted panel over solid color block" instinct, but MPN's own type/color system stays Roboto + red, not Boxxy's rounded font + purple/orange accents). Not Essential.gg's glossy marketing-hero style except optionally for the homepage hero specifically.

---

## 1. Core Philosophy

### 1.1 Muted panels, accent chips — not solid color blocks
The v1 spec called for "high-chroma solid color blocking" cards (a whole card painted emerald or gold). That's retired. Cards are dark `--bg-surface` panels; color shows up as **chips** — a status pill, a tag pill, a small icon badge — not a full-bleed background.

### 1.2 One confident accent
Red (`--primary`) is spent on CTAs and brand moments only. Status/semantic colors (`--signal`, `--diamond`, `--gold`) mean something specific and aren't reached for decoratively. See `brand.md` §3.3.

### 1.3 Honest data
Where content is genuinely tabular (the player leaderboard), use a real sortable table — columns, sort arrows, pagination — the way Boxxy and Laby do it, not a card grid pretending to be a table.

### 1.4 Zero Neon Hype
Still true from v1: no chaotic glow, no pulsing borders, no cluttered overlays. Ambient glows stay wide-blur and low-opacity.

---

## 2. Color Tokens

See `brand.md` §3 for the full token table and the reasoning behind each value. Quick reference:

| Token | Hex |
| :--- | :--- |
| `--primary` | `#E5231B` |
| `--secondary` | `#FF6F62` |
| `--redstone` | `#C41912` |
| `--diamond` | `#6E8CB8` |
| `--gold` | `#F2A93C` |
| `--signal` | `#35C267` |
| `--bg-base` | `#111824` |
| `--bg-surface` | `#1B2535` |
| `--bg-elevated` | `#233045` |
| `--bg-deep` | `#0B0F16` |

---

## 3. Typography

One family, four weights (`brand.md` §2). No retro/pixel font — Roboto carries UI labels too, uppercase + tracked instead of a separate display face.

| Hierarchy Level | Weight | Size | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Page Header Title | Roboto Black (900) | `28–76px` (clamp) | `1.1` | `-0.02em to -0.03em` | Hero titles |
| Detail Screen Title | Roboto Black (900) | `34px` | `1.05` | `-0.03em` | Detail hero title |
| Card Heading | Roboto Bold (700) | `16–18px` | `1.2–1.3` | `-0.01em` | Card titles, usernames |
| UI Label / Eyebrow | Roboto Bold/Medium (700/500) | `12–13px` | `1.4` | `0.1–0.12em`, uppercase | Eyebrows, pills, nav |
| Body / Description | Roboto Regular (400) | `13.5–16px` | `1.55–1.65` | `0` | Prose, descriptions |

---

## 4. Spacing & Geometry

### 4.1 Grid
- Strict 8pt rhythm globally (per `AGENTS.md`).
- Desktop: 12-column layout, `1440px` max-width, `24px` gutters, `96px` margins (use `clamp()` for the margin so it scales down on smaller viewports rather than snapping).
- Mobile screen padding: `20px` horizontal/vertical.
- Section gap: `24px`. Item gap: `12px`.

### 4.2 Corner Radius Matrix (unchanged from v1 — this was already working)
| Token | Radius | Applied To |
| :--- | :--- | :--- |
| `--radius-nav` | `30px` | Floating bottom-nav pill |
| `--radius-hero` | `28px` | Hero/detail banner containers |
| `--radius-card` | `26px` | Cards |
| `--radius-item` | `20px` | Internal rows, callout boxes |
| `--radius-avatar` | `18px` | Avatar containers |
| `--radius-button` | `16px` | Buttons, chips |
| `--radius-pill` | `9999px` | Fully-rounded pills/tags |

---

## 5. Component Patterns

### 5.1 Server Card
Muted `--bg-surface` panel, `26px` radius. Banner image with a subtle dotted-texture accent (not a solid color wash). Chips, not blocks:
- **Featured chip** (squared, `16px` radius — reads as a static label): `--gold` background, dark text.
- **Status pill** (fully rounded): `--signal` (Online) / `--redstone` (Offline) / `--diamond` (Private) / `--gold` (Coming Soon) background, contrast-appropriate text.
- **Meta chips**: version/MC-version as small `--bg-elevated` pills, not a plain text line.
- **Tag pills** (Modrinth-style, where applicable): category tags like `Skyblock` / `Tech` / `Quests` as `--bg-elevated` pills below the title.
- **IP row**: monospace address field + copy button, direct and functional — no decoration needed here, it's a utility row.

### 5.2 Data Tables (Players / Leaderboard)
Where the content is inherently tabular, use a real table: sortable column headers, rank-tier text colors (small, disciplined set — don't invent a new hue per rank), pagination controls, a search input. Reference: Boxxy's `/players` page and Laby.net. This is a deliberate departure from a card-grid leaderboard.

### 5.3 Buttons
- **Primary**: `--primary` fill, **white** text (not dark — `--primary` is a mid-dark red, dark text fails contrast), `16px` radius.
- **Secondary/Ghost**: `--bg-elevated` or `--chrome-900` fill, `--text-primary` text, `1px` border.

### 5.4 Status Pills
Dot + label, fully rounded. Background/text pairing per `brand.md` §3.2 — always use the semantic token (`--signal` for online, etc.), never `--primary` for status.

---

## 6. Layout Notes (Homepage)

- Hero: badge eyebrow (Roboto Bold, `--secondary` for contrast) → H1 (Roboto Black, `--primary` accent word) → subtitle → CTA row (primary + ghost button) → stats bar (`--bg-surface` panel, 3-stat grid, each stat icon using a **different semantic token** for visual variety — not all brand red).
- Featured Servers section: eyebrow (`--secondary`) → heading → "view all" link (`--secondary`) → card grid using the Server Card pattern above.
- Keep the ambient hero glow wide/low-opacity, mixing `--primary` and `--diamond` — see `AGENTS.md`'s "Zero Neon Hype" rule.
