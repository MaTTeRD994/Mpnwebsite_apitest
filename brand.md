# MaTTeRPixel Network — Brand Identity (`brand.md`)

> **"More Than Servers. A Home."**
> **Design Foundation:** Anchored to the actual MPN logo (sampled pixel colors, not guessed), with component/layout language borrowed from [Modrinth](https://modrinth.com/) and [Laby.net](https://laby.net/skins) — dense, honest, data-first "tool" design rather than a marketing-glossy or decorative-block aesthetic.

---

## 1. Brand Rebrand Vision (Desktop + Mobile)

MPN's visual identity is anchored to what the **logo actually is** — a bold red-and-chrome wordmark — not the green "Minecraft Guide App" palette this doc described in v1. That mismatch was a real bug, not a style choice, and is retired.

The new direction:
- **Deep matte foundation:** `#111824` slate-black base, `#1B2535` structured card surfaces — unchanged from v1, this was already working.
- **One confident accent, spent deliberately:** brand **red**, used for CTAs, brand moments, and nothing else. It does not decorate every icon or link — see §3.2.
- **Muted panels over solid color blocks:** cards are dark surfaces with **accent chips** (status pills, tag pills, small icon badges) — not the old "whole card painted emerald/gold/diamond" spotlight-card treatment. Boxxy Network and Modrinth both validate this pattern; lean into it.
- **Honest data density:** real counts, real stats, sortable tables where the content is tabular (e.g. the player leaderboard) — not more decoration standing in for information.

---

## 2. Typography (`Roboto`, one family)

Press Start 2P is retired. One family carries the whole system:

| Tier | Weight | CSS Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Display** | Roboto Black (900) | `--font-heading` at 900 | Hero titles, big numeric stats |
| **Heading** | Roboto Bold (700) | `--font-heading` at 700 | Section headings, card titles, usernames |
| **UI Label** | Roboto Medium (500) | `--font-body` at 500, uppercase, `0.1–0.12em` tracking | Eyebrows, pills, nav items, buttons |
| **Body** | Roboto Regular (400) | `--font-body` | Descriptions, prose |

---

## 3. Color System

### 3.1 Where the colors actually come from

The red and chrome scales are **sampled directly from `public/logo.png`**, not invented:

- Flat red fill: `#FF0000` (pure)
- Red bevel shadow: `#520303`
- Chrome gradient: `#333333` → `#F5F5F5` (pure grayscale, no hue)

`#FF0000` is too harsh for UI use at scale (buttons, large fills), so the working **primary** token is a refined step down: `#E5231B`. The darkest red step (`--redstone: #C41912` and design-system `red-900: #520303`) traces straight back to the logo's own shadow tone.

### 3.2 Token Table

| Token | Hex | Role |
| :--- | :--- | :--- |
| `--primary` | `#E5231B` | **Brand red.** Solid-fill CTA buttons, brand accent moments. Pairs with **white** text on top — it's a mid-dark red, not bright enough for dark text. |
| `--secondary` | `#FF6F62` | **Lighter red**, used as TEXT/icon color sitting directly on the dark page background (eyebrows, links, small labels) — `--primary` alone doesn't clear small-text contrast against `#111824`. |
| `--redstone` | `#C41912` | Alert / offline / danger states. A distinct, deeper shade from `--primary` so "brand CTA" and "something's wrong" don't read identically. |
| `--diamond` | `#6E8CB8` | **Steel.** Info, "Private" status, secondary accent. Chrome-adjacent cool blue-gray, not the old bright diamond blue. |
| `--gold` | `#F2A93C` | **Ember.** Featured / VIP / rank-high. Warmed slightly from the old gold to sit next to red without clashing. |
| `--signal` | `#35C267` | **Status-only green.** Online/live indicators and success/confirmation states (e.g. "Copied!"). Small footprint on purpose — this is not a decorative brand color, just a universal status convention worth keeping. |
| `--bg-base` | `#111824` | Page background |
| `--bg-surface` | `#1B2535` | Card / panel surface |
| `--bg-elevated` | `#233045` | Icon containers, nested elements |
| `--bg-deep` | `#0B0F16` | Modal backdrops, deepest layer |
| `--chrome-100…900` | `#F5F5F5 → #333333` | Neutral scale sampled from the logo's chrome half, for future components that need a hue-neutral gray rather than a pure-white/pure-black step |

**Rule of thumb:** if it's a solid background needing text on top, reach for `--primary`. If it's text/an icon sitting on the dark page background, reach for `--secondary`. Don't use `--redstone` for text-on-dark — it's too dark to clear contrast at small sizes; it's a fill color like `--primary`.

### 3.3 Discipline

Only **one** hue is a "brand" color (red). `--diamond`/`--gold`/`--signal` are semantic, not decorative — they mean something specific (info, featured, online) and shouldn't be reached for just to add variety to a layout. If a design needs another accent color, that's a sign to lean on the chrome/neutral scale or spacing/type hierarchy instead of adding a new hue.

---

## 4. Brand Assets & Logo Rules

### 4.1 MPN Logo Preservation
- The MPN logo (`public/logo.png` / `public/logo.webp`) is preserved as-is across all navigation.
- Wordmark treatment: `MaTTeR` in white (`--text-primary`), `Pixel` in `--primary` (brand red), `NETWORK` subtitle in `--secondary` (lighter red), all Roboto Black/Bold.
