import { PLAYTIME_RANKS } from "./ranks";

export interface Milestone {
  title: string;
  desc: string;
  required: number;
  current: number;
}

export interface AchievementCategory {
  key: "playtime" | "voting" | "community" | "gamestats";
  title: string;
  icon: string;
  unit: string;
  milestones: Milestone[];
  unlocked: number;
  total: number;
}

export interface AchievementInput {
  playtime: number;
  votes: number;
  discordLinked: boolean;
  mob_kills: number;
  blocks_mined: number;
  deaths: number;
  servers_played: number;
}

const countUnlocked = (list: Milestone[]) => list.filter(m => m.current >= m.required).length;

// Shared by the public player profile and the logged-in account dashboard so both
// render the exact same tiers/thresholds instead of two hand-maintained copies.
export function getAchievementCategories(input: AchievementInput): AchievementCategory[] {
  const playtimeMilestones: Milestone[] = PLAYTIME_RANKS.map(rank => ({
    title: `${rank.name} Rank`,
    desc: rank.hours === 0
      ? `Start your journey on the network (${rank.claims} claims, ${rank.homes} home).`
      : `Reach ${rank.hours} hours across all servers to unlock ${rank.name} (${rank.claims} claims, ${rank.forceLoaded} force loaded chunks, ${rank.homes} homes${rank.specialDiscord ? ', VIP Discord role' : ''}).`,
    required: rank.hours,
    current: input.playtime || 0
  }));

  const votingMilestones: Milestone[] = [
    { title: "First Vote", desc: "Vote for MaTTeRPixel Network for the first time.", required: 1, current: input.votes || 0 },
    { title: "Supporter", desc: "Vote for MaTTeRPixel Network 10 times.", required: 10, current: input.votes || 0 },
    { title: "Regular", desc: "Vote for MaTTeRPixel Network 25 times.", required: 25, current: input.votes || 0 },
    { title: "Dedicated Voter", desc: "Vote for MaTTeRPixel Network 50 times.", required: 50, current: input.votes || 0 },
    { title: "Super Voter", desc: "Vote for MaTTeRPixel Network 100 times.", required: 100, current: input.votes || 0 },
    { title: "Champion Voter", desc: "Vote for MaTTeRPixel Network 500 times.", required: 500, current: input.votes || 0 },
    { title: "Elite Voter", desc: "Vote for MaTTeRPixel Network 1,000 times.", required: 1000, current: input.votes || 0 },
    { title: "Network Pillar", desc: "Vote for MaTTeRPixel Network 2,500 times.", required: 2500, current: input.votes || 0 },
    { title: "Network Legend", desc: "Vote for MaTTeRPixel Network 5,000 times.", required: 5000, current: input.votes || 0 },
    { title: "Eternal Voter", desc: "Vote for MaTTeRPixel Network 10,000 times.", required: 10000, current: input.votes || 0 },
  ];

  const communityMilestones: Milestone[] = [
    { title: "Community Member", desc: "Link your Discord account to your profile.", required: 1, current: input.discordLinked ? 1 : 0 },
  ];

  const gameStatsMilestones: Milestone[] = [
    { title: "First Blood", desc: "Defeat your first mob across the network.", required: 1, current: input.mob_kills || 0 },
    { title: "Monster Hunter", desc: "Defeat 100 mobs across all servers.", required: 100, current: input.mob_kills || 0 },
    { title: "Slayer", desc: "Defeat 1,000 mobs across all servers.", required: 1000, current: input.mob_kills || 0 },
    { title: "Exterminator", desc: "Defeat 10,000 mobs across all servers.", required: 10000, current: input.mob_kills || 0 },
    { title: "First Dig", desc: "Mine your first 100 blocks across the network.", required: 100, current: input.blocks_mined || 0 },
    { title: "Excavator", desc: "Mine 5,000 blocks across all servers.", required: 5000, current: input.blocks_mined || 0 },
    { title: "Quarry Master", desc: "Mine 50,000 blocks across all servers.", required: 50000, current: input.blocks_mined || 0 },
    { title: "World Shaper", desc: "Mine 250,000 blocks across all servers.", required: 250000, current: input.blocks_mined || 0 },
    { title: "First Lesson", desc: "Experience your first death.", required: 1, current: input.deaths || 0 },
    { title: "Survivor's Grit", desc: "Die 25 times and keep getting back up.", required: 25, current: input.deaths || 0 },
    { title: "Never Surrender", desc: "Die 100 times across all servers.", required: 100, current: input.deaths || 0 },
    { title: "Explorer", desc: "Play on 2 different modpacks.", required: 2, current: input.servers_played || 0 },
    { title: "Multi-Dimensional", desc: "Play on 4 different modpacks.", required: 4, current: input.servers_played || 0 },
    { title: "Network Hopper", desc: "Play on 8 different modpacks.", required: 8, current: input.servers_played || 0 },
  ];

  return [
    { key: "playtime", title: "Playtime", icon: "⏱️", unit: "h", milestones: playtimeMilestones, unlocked: countUnlocked(playtimeMilestones), total: playtimeMilestones.length },
    { key: "voting", title: "Voting", icon: "🗳️", unit: " votes", milestones: votingMilestones, unlocked: countUnlocked(votingMilestones), total: votingMilestones.length },
    { key: "community", title: "Community", icon: "🤝", unit: "", milestones: communityMilestones, unlocked: countUnlocked(communityMilestones), total: communityMilestones.length },
    { key: "gamestats", title: "Game Stats", icon: "⚔️", unit: "", milestones: gameStatsMilestones, unlocked: countUnlocked(gameStatsMilestones), total: gameStatsMilestones.length },
  ];
}

// Colors chosen to match the existing 4-token brand cycle used elsewhere for rank
// tiers (secondary -> diamond -> gold -> primary), so the achievement rail reads as
// part of the same system rather than inventing a new palette.
export const ACHIEVEMENT_CATEGORY_COLORS: Record<AchievementCategory["key"], string> = {
  playtime: "var(--gold)",
  voting: "var(--diamond)",
  community: "var(--signal)",
  gamestats: "var(--secondary)",
};
