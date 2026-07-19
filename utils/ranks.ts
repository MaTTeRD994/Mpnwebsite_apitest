export interface PlaytimeRank {
  name: string;
  color: string;
  hours: number;
  claims: number;
  forceLoaded: number;
  homes: number;
  specialDiscord?: boolean;
}

export const PLAYTIME_RANKS: PlaytimeRank[] = [
  { name: 'Neophyte', color: '#9ca3af', hours: 0, claims: 16, forceLoaded: 1, homes: 1 },
  { name: 'Ember', color: '#f97316', hours: 4, claims: 32, forceLoaded: 4, homes: 1 },
  { name: 'Astral', color: '#38bdf8', hours: 24, claims: 64, forceLoaded: 8, homes: 2 },
  { name: 'Vanguard', color: '#4ade80', hours: 50, claims: 100, forceLoaded: 16, homes: 2 },
  { name: 'Warden', color: '#3b82f6', hours: 75, claims: 120, forceLoaded: 24, homes: 3 },
  { name: 'Luminar', color: '#eab308', hours: 100, claims: 150, forceLoaded: 30, homes: 3 },
  { name: 'Vesper', color: '#a855f7', hours: 200, claims: 200, forceLoaded: 40, homes: 4 },
  { name: 'Zenith', color: '#ef4444', hours: 400, claims: 250, forceLoaded: 50, homes: 4 },
  { name: 'Mythos', color: '#f43f5e', hours: 700, claims: 300, forceLoaded: 64, homes: 5, specialDiscord: true },
  { name: 'Eclipse', color: '#9333ea', hours: 1000, claims: 400, forceLoaded: 84, homes: 6, specialDiscord: true },
];

export function getPlaytimeRank(playtime: number, username?: string, uuid?: string): { name: string; color: string } {
  const lowerName = username ? username.toLowerCase() : "";
  const lowerUuid = uuid ? uuid.toLowerCase() : "";

  // Special Owner / Admin Exceptions
  if (lowerName === 'vallith' || lowerUuid === '63514ed4-62d2-413f-aeaf-a29d204d757b') {
    return { name: 'Owner', color: '#f87171' }; // Light red / coral for Owner
  }
  if (lowerName === 'thamatter') {
    return { name: 'Admin', color: '#f87171' }; // Light red for Admin
  }

  // Iterate backwards to find the highest rank achieved
  for (let i = PLAYTIME_RANKS.length - 1; i >= 0; i--) {
    if (playtime >= PLAYTIME_RANKS[i].hours) {
      return { 
        name: PLAYTIME_RANKS[i].name, 
        color: PLAYTIME_RANKS[i].color 
      };
    }
  }

  // Fallback (should never happen since Neophyte is 0)
  return { name: 'Neophyte', color: '#9ca3af' };
}

export function getRankLevel(playtime: number, username?: string, uuid?: string): number {
  const lowerName = username ? username.toLowerCase() : "";
  const lowerUuid = uuid ? uuid.toLowerCase() : "";

  if (
    lowerName === 'thamatter' ||
    lowerName === 'vallith' ||
    lowerUuid === '63514ed4-62d2-413f-aeaf-a29d204d757b'
  ) {
    return 99999;
  }
  return playtime || 0;
}
