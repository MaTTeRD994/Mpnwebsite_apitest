export interface StaticServerConfig {
  id: string; // The display ID, usually short string
  pterodactyl_id?: string; // The internal UUID or identifier of Pterodactyl. E.g. 'b691e0da' for MakeShiftSM
  name: string;
  address: string;
  version: string;
  mc: string;
  packUrl: string;
  color: string;
  imgUrl: string;
  featured?: boolean;
}

export const staticServers: StaticServerConfig[] = [
  {
    id: "gtnh",
    pterodactyl_id: "ed952e62",
    name: "GregTech New Horizons",
    address: "gtnh.mpnhost.com",
    version: "2.6.1",
    mc: "1.7.10",
    packUrl: "https://www.curseforge.com/minecraft/modpacks/gt-new-horizons",
    color: "var(--primary)",
    imgUrl: "https://media.forgecdn.net/avatars/thumbnails/53/488/256/256/636125694388807951.png",
    featured: true
  },
  {
    id: "atm10",
    pterodactyl_id: "31613859",
    name: "All The Mods 10",
    address: "atm10.mpnhost.com",
    version: "1.2.3",
    mc: "1.20.1",
    packUrl: "https://www.curseforge.com/minecraft/modpacks/all-the-mods-10",
    color: "var(--primary)",
    imgUrl: "https://media.forgecdn.net/avatars/1182/438/638755918649288941.png",
    featured: true
  },
  {
    id: "atm10tts",
    pterodactyl_id: "31463b29",
    name: "ATM 10 To The Sky",
    address: "atm10tts.mpnhost.com",
    version: "0.1.5",
    mc: "1.20.1",
    packUrl: "https://www.curseforge.com/minecraft/modpacks/all-the-mods-10-sky",
    color: "var(--primary)",
    imgUrl: "https://media.forgecdn.net/avatars/thumbnails/1389/739/256/256/638901033593272382.png",
    featured: true
  },
  {
    id: "atmons",
    pterodactyl_id: "7230a0f8",
    name: "All The Mons",
    address: "atmons.mpnhost.com",
    version: "1.0.0",
    mc: "1.20.1",
    packUrl: "https://www.curseforge.com/minecraft/modpacks/all-the-mons",
    color: "#ef4444",
    imgUrl: "https://media.forgecdn.net/avatars/thumbnails/1567/555/256/256/639016249214580144.png"
  },
  {
    id: "makeshiftsmp",
    pterodactyl_id: "b691e0da", // Mapped from the API test
    name: "Makeshift SMP (Private)",
    address: "makeshiftsmp.mpnhost.com",
    version: "Custom",
    mc: "1.20.4",
    packUrl: "https://modrinth.com/modpack/makeshift",
    color: "var(--primary)",
    imgUrl: "https://cdn.modrinth.com/data/zqTr0quY/de943b4e36d73dd9262af8c543453846a02ea457_96.webp"
  },
  {
    id: "thasmp",
    pterodactyl_id: "9b7f4bba",
    name: "ThaSMP (Private)",
    address: "thasmp.mpnhost.com",
    version: "Custom",
    mc: "1.20.4",
    packUrl: "https://modrinth.com/modpack/thasmp",
    color: "#eab308",
    imgUrl: "https://cdn.modrinth.com/data/BJE0QM1S/35fb306549e10716fda1cc35f653652e2d16d55c_96.webp"
  },
  {
    id: "deceasedcraft",
    pterodactyl_id: "6d11144c",
    name: "Deceased Craft",
    address: "deceased.mpnhost.com",
    version: "5.4.2",
    mc: "1.18.2",
    packUrl: "https://www.curseforge.com/minecraft/modpacks/deceasedcraft",
    color: "var(--primary)",
    imgUrl: "https://media.forgecdn.net/avatars/thumbnails/1577/605/256/256/639022081315858417.png"
  },
  {
    id: "atm9reborn",
    pterodactyl_id: "94cf900e",
    name: "All The Mods 9 - Reborn",
    address: "atm9.mpnhost.com",
    version: "1.0.0",
    mc: "1.20.1",
    packUrl: "https://www.curseforge.com/minecraft/modpacks/all-the-mods-9",
    color: "var(--primary)",
    imgUrl: "https://media.forgecdn.net/avatars/1036/141/638521570188047021.png"
  },
  {
    id: "makeshiftcommunity",
    pterodactyl_id: "004c817a",
    name: "Makeshift Community | SMP",
    address: "makeshiftcom.mpnhost.com",
    version: "Custom",
    mc: "1.20.4",
    packUrl: "https://modrinth.com/modpack/makeshift",
    color: "var(--primary)",
    imgUrl: "https://cdn.modrinth.com/data/zqTr0quY/de943b4e36d73dd9262af8c543453846a02ea457_96.webp"
  }
];
