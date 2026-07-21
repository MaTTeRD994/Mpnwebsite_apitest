import ranksData from '../discord-bot/ranks.json';

export interface PlaytimeRank {
  name: string;
  color: string;
  hours: number;
  claims: number;
  forceLoaded: number;
  homes: number;
  specialDiscord?: boolean;
  discordRoleId?: string;
}

// Canonical global rank ladder — lives in discord-bot/ranks.json so the
// Discord bot (deployed standalone, can't import TS from this app) reads
// the exact same tiers. Edit that file, not this array.
export const PLAYTIME_RANKS: PlaytimeRank[] = ranksData;

export function getPlaytimeRank(playtime: number, username?: string, uuid?: string): { name: string; color: string } {
  const lowerName = username ? username.toLowerCase() : "";
  const lowerUuid = uuid ? uuid.toLowerCase() : "";

  // Special Owner / Admin Exceptions
  if (lowerName === 'vallith' || lowerUuid === '63514ed4-62d2-413f-aeaf-a29d204d757b') {
    return { name: 'Owner', color: '#FF6F62' }; // --secondary
  }
  if (lowerName === 'thamatter') {
    return { name: 'Admin', color: '#FF6F62' }; // --secondary
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
  return { name: 'Neophyte', color: '#FF6F62' };
}

export interface RankProgress {
  next: PlaytimeRank | null;
  percent: number;
  remaining: number;
}

// Shared by the account dashboard and the public player profile hero so both show
// identical "hours to next rank" math instead of two hand-maintained copies.
export function getRankProgress(playtime: number, username?: string, uuid?: string): RankProgress {
  const lowerName = username ? username.toLowerCase() : "";
  const lowerUuid = uuid ? uuid.toLowerCase() : "";

  if (
    lowerName === 'thamatter' ||
    lowerName === 'vallith' ||
    lowerUuid === '63514ed4-62d2-413f-aeaf-a29d204d757b'
  ) {
    return { next: null, percent: 100, remaining: 0 };
  }

  let currentIdx = 0;
  for (let i = PLAYTIME_RANKS.length - 1; i >= 0; i--) {
    if (playtime >= PLAYTIME_RANKS[i].hours) {
      currentIdx = i;
      break;
    }
  }

  const next = currentIdx + 1 < PLAYTIME_RANKS.length ? PLAYTIME_RANKS[currentIdx + 1] : null;
  if (!next) {
    return { next: null, percent: 100, remaining: 0 };
  }

  const current = PLAYTIME_RANKS[currentIdx];
  const progressInRange = playtime - current.hours;
  const rangeTotal = next.hours - current.hours;
  const percent = Math.min(Math.max(Math.round((progressInRange / rangeTotal) * 100), 0), 100);
  const remaining = Math.max(next.hours - playtime, 0);
  return { next, percent, remaining };
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
