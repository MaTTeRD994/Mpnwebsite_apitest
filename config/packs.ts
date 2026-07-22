export interface PackFeature {
  title: string;
  icon: string;
  description: string;
}

export interface PackConfig {
  id: string; // URL slug e.g. 'thasmp', 'makeshiftsmp'
  name: string;
  tagline: string;
  description: string[];
  version: string;
  mcVersion: string;
  modloader: string;
  color: string;
  iconUrl: string;
  bannerUrl: string;
  modrinthUrl: string;
  curseforgeUrl?: string;
  // "owner/repo" — when set, the pack detail page fetches CHANGELOG.md from
  // this GitHub repo's default branch and renders it as an update log.
  changelogRepo?: string;
  status: "Featured Pack" | "Community Pack";
  specs: {
    totalMods: string;
    ramRecommendation: string;
    creator: string;
    releaseYear: string;
    focus: string;
  };
  features: PackFeature[];
}

export const mpnPacks: PackConfig[] = [
  {
    id: "makeshiftsmp",
    name: "Makeshift SMP",
    tagline: "A mechanical engineering and automation modpack built around the Create Mod, trains, and industrial contraptions.",
    description: [
      "Makeshift SMP is our premier Create Mod focused modpack engineered by the MaTTeRPixel Network team, running NeoForge on Minecraft 1.21.1. If you love designing kinetic mechanisms, building functional steam engines, laying down vast railway networks, and automating complex factories, this pack is your ultimate playground.",
      "Instead of magical black boxes or spreadsheet-driven tech mods, Makeshift focuses purely on visual, physical automation through the Create Mod ecosystem and its finest add-ons — Create Encased, Central Kitchen, Design n' Decor, Railways Navigator, Steam 'n' Rails, and more — plus deep automation tooling like CC: Tweaked, Advanced Peripherals, and KubeJS for scripted logistics.",
      "Every mod has been carefully balanced and optimized with Sodium, Lithium, and custom memory configs so that even complex moving contraptions run at silky-smooth frame rates. 167 mods total, all pinned to exact versions for a stable, reproducible pack. Whether playing solo or with friends on multiplayer, Makeshift delivers an unmatched engineering experience."
    ],
    version: "6.0.0",
    mcVersion: "1.21.1",
    modloader: "NeoForge",
    color: "var(--diamond)", // steel accent — mechanical/tech identity
    iconUrl: "https://cdn.modrinth.com/data/zqTr0quY/de943b4e36d73dd9262af8c543453846a02ea457_96.webp",
    bannerUrl: "https://cdn.modrinth.com/data/zqTr0quY/de943b4e36d73dd9262af8c543453846a02ea457_96.webp",
    modrinthUrl: "https://modrinth.com/modpack/makeshift",
    changelogRepo: "MaTTeRD994/MakeshiftSMP",
    status: "Featured Pack",
    specs: {
      totalMods: "167 Curated Mods",
      ramRecommendation: "4GB - 6GB RAM",
      creator: "MaTTeRPixel Team",
      releaseYear: "2026",
      focus: "Create Mod & Tech"
    },
    features: [
      {
        title: "Create Mod Engineering",
        icon: "⚙️",
        description: "Harness kinetic energy with water wheels, windmills, and steam engines to automate harvesting, crafting, and processing."
      },
      {
        title: "Railway Networks & Trains",
        icon: "🚂",
        description: "Design custom multi-carriage trains, signaling schedules, and track layouts to transport cargo and players across vast distances."
      },
      {
        title: "Physical Automation",
        icon: "🦾",
        description: "No invisible pipes or instant teleporting items. Watch mechanical arms, belts, and funnels physically move goods across your factory floor."
      },
      {
        title: "20 TPS Performance Tuned",
        icon: "⚡",
        description: "Pre-configured with top-tier optimization mods to eliminate micro-stutters and ensure complex redstone and Create machinery run smoothly."
      },
      {
        title: "Industrial Building Blocks",
        icon: "🏗️",
        description: "Expanded factory palettes, industrial lighting, scaffolding, and catwalks designed to give your workshops an authentic mechanical aesthetic."
      },
      {
        title: "Proximity Voice & Multiplayer Ready",
        icon: "🎙️",
        description: "Simple Voice Chat is pre-installed alongside multiplayer optimization utilities so you can build and engineer seamlessly with friends."
      }
    ]
  },
  {
    id: "thasmp",
    name: "ThaSMP",
    tagline: "Just the two of us — keeping it feeling vanilla, with QoL and performance mods layered on top.",
    description: [
      "ThaSMP is a forever-world built for long-term survival with a friend, not a public server — every mod here either makes the game run better or removes a small annoyance. Nothing changes how Minecraft actually plays: no content overhauls, no tech mods, no magic mods. The world stays exactly as recognizable as vanilla, it just runs smoother and remembers more.",
      "That means real performance work (Sodium, Lithium, C2ME, VMP, EntityCulling, MoreCulling), tools for building and remembering what you built (Axiom, Litematica, Flashback replay, Screenshot Gallery), better navigation (Xaero's Minimap & World Map, Distant Horizons), everyday comforts (inventory sorting, tooltips, JEI, Essential, Chat Heads), and small immersion touches (Ambient Sounds, Presence Footsteps, Better Clouds) — 107 mods total, all pinned to exact versions.",
      "The whole pack is managed with packwiz, so it's fully versioned, diffable, and reproducible — every mod bump is a real, reviewable commit."
    ],
    version: "1.0.0",
    mcVersion: "26.2",
    modloader: "Fabric",
    color: "var(--gold)", // cozy/vanilla+ identity
    iconUrl: "https://cdn.modrinth.com/data/BJE0QM1S/35fb306549e10716fda1cc35f653652e2d16d55c_96.webp",
    bannerUrl: "https://raw.githubusercontent.com/MaTTeRD994/ThaSMP/master/docs/images/forest-lake.jpg",
    modrinthUrl: "https://modrinth.com/modpack/thasmp",
    changelogRepo: "MaTTeRD994/ThaSMP",
    status: "Featured Pack",
    specs: {
      totalMods: "107 Curated Mods",
      ramRecommendation: "4GB - 6GB RAM",
      creator: "Thamatter",
      releaseYear: "2026",
      focus: "Vanilla-First QoL & Performance"
    },
    features: [
      {
        title: "Real Performance Gains",
        icon: "⚡",
        description: "Sodium, Lithium, C2ME, VMP, EntityCulling, and MoreCulling keep the world smooth no matter how much you've built — not a placebo optimization pack."
      },
      {
        title: "Building & Creativity Tools",
        icon: "🎨",
        description: "Axiom, Litematica, Flashback replay, and Screenshot Gallery for when you want to build big and actually remember it afterward."
      },
      {
        title: "See Further, Get Lost Less",
        icon: "🧭",
        description: "Xaero's Minimap & World Map plus Distant Horizons long-range rendering, so the world never feels smaller than it is."
      },
      {
        title: "Everyday Comfort",
        icon: "🎒",
        description: "Inventory sorting, item tooltips, JEI, Essential, Chat Heads, and durability warnings — the small conveniences that add up over hundreds of hours."
      },
      {
        title: "Immersion, Not Overhaul",
        icon: "🍃",
        description: "Ambient Sounds, Presence Footsteps, and Better Clouds add atmosphere without changing a single block — still vanilla at heart."
      },
      {
        title: "107 Mods, Fully Reproducible",
        icon: "🧩",
        description: "Every mod is pinned to an exact Modrinth version and hash via packwiz — the whole pack is versioned, diffable, and rebuildable from scratch."
      }
    ]
  }
];
