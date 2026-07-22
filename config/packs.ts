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
      "Makeshift SMP is our premier Create Mod focused modpack engineered by the MaTTeRPixel Network team for Minecraft 1.20.4. If you love designing kinetic mechanisms, building functional steam engines, laying down vast railway networks, and automating complex factories, this pack is your ultimate playground.",
      "Instead of magical black boxes or spreadsheet-driven tech mods, Makeshift focuses purely on visual, physical automation through the Create Mod ecosystem and its finest add-ons. Watch gears turn, conveyor belts carry resources, and mechanical arms assemble components right before your eyes.",
      "Every mod has been carefully balanced and optimized with Sodium, Lithium, and custom memory configs so that even complex moving contraptions run at silky-smooth frame rates. Whether playing solo or with friends on multiplayer, Makeshift delivers an unmatched engineering experience."
    ],
    version: "2.1.0",
    mcVersion: "1.20.4",
    modloader: "Fabric",
    color: "var(--diamond)", // steel accent — mechanical/tech identity
    iconUrl: "https://cdn.modrinth.com/data/zqTr0quY/de943b4e36d73dd9262af8c543453846a02ea457_96.webp",
    bannerUrl: "https://cdn.modrinth.com/data/zqTr0quY/de943b4e36d73dd9262af8c543453846a02ea457_96.webp",
    modrinthUrl: "https://modrinth.com/modpack/makeshift",
    changelogRepo: "MaTTeRD994/MakeshiftSMP",
    status: "Featured Pack",
    specs: {
      totalMods: "140+ Curated Mods",
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
    tagline: "The ultimate Vanilla+ modpack capturing the true, cozy soul of Minecraft while elevating exploration, building, and quality of life.",
    description: [
      "ThaSMP is designed around one guiding philosophy: preserve the timeless, cozy feeling of vanilla Minecraft while subtly enhancing everything that makes the game magical. Built for Minecraft 1.20.4, it feels like the sequel to vanilla survival that you have always wanted.",
      "Instead of overwhelming you with completely foreign mechanics, ThaSMP enriches your world with majestic terrain generation, atmospheric ambient sounds, refined building options, and thoughtful quality-of-life additions like inventory sorting and waypoints. Every mod feels like it could be a native Mojang update.",
      "Whether you are building a peaceful mountainside homestead, exploring ancient caverns, or sharing a survival world with close friends, ThaSMP provides a polished, ultra-optimized experience that never loses the authentic charm of Minecraft."
    ],
    version: "1.4.2",
    mcVersion: "1.20.4",
    modloader: "Fabric",
    color: "var(--gold)", // cozy/vanilla+ identity
    iconUrl: "https://cdn.modrinth.com/data/BJE0QM1S/35fb306549e10716fda1cc35f653652e2d16d55c_96.webp",
    bannerUrl: "https://cdn.modrinth.com/data/BJE0QM1S/35fb306549e10716fda1cc35f653652e2d16d55c_96.webp",
    modrinthUrl: "https://modrinth.com/modpack/thasmp",
    status: "Featured Pack",
    specs: {
      totalMods: "125+ Curated Mods",
      ramRecommendation: "4GB - 6GB RAM",
      creator: "MaTTeRPixel Team",
      releaseYear: "2026",
      focus: "Vanilla+ & Cozy QoL"
    },
    features: [
      {
        title: "Authentic Vanilla+ Feel",
        icon: "🌿",
        description: "Every mod is carefully selected to blend seamlessly with vanilla progression, ensuring the game feels familiar yet fresh and exciting."
      },
      {
        title: "Breathtaking World Generation",
        icon: "🌄",
        description: "Majestic mountain ranges, lush forests, and natural rivers that invite peaceful exploration without chaotic or cluttered biomes."
      },
      {
        title: "Quality of Life Perfection",
        icon: "🎒",
        description: "Say goodbye to tedious sorting sessions with intuitive inventory management, mini-maps, waypoints, and smart storage utilities."
      },
      {
        title: "Cozy Aesthetic & Building",
        icon: "🏡",
        description: "New wooden palettes, furniture accents, cozy lighting, and atmospheric sound design that make every base feel like home."
      },
      {
        title: "Silky Smooth FPS",
        icon: "🚀",
        description: "Packed with Sodium, Lithium, and FerriteCore. Experience lightning-fast world loading and high frame rates even on modest laptops."
      },
      {
        title: "Multiplayer Synchronized",
        icon: "🤝",
        description: "Lightweight, stable, and ready for cooperative play with proximity voice chat integration for unforgettable shared adventures."
      }
    ]
  }
];
