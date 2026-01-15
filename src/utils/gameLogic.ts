import { Difficulty, Player, Quest, Stats } from '../store/types';

export const difficultyMultiplier: Record<Difficulty, number> = {
  C: 1.0,
  B: 1.3,
  A: 1.7,
  S: 2.3,
};

export const xpToNext = (level: number) => 100 + (level - 1) * 35;

export const applyRewards = (
  player: Player,
  quest: Quest,
  bonusMultiplier = 1
): { updatedPlayer: Player; gained: { xp: number; coins: number; stats: Partial<Stats> } } => {
  const multiplier = difficultyMultiplier[quest.difficulty] * bonusMultiplier;
  const gainedXp = Math.round(quest.rewards.xp * multiplier);
  const gainedCoins = Math.round(quest.rewards.coins * multiplier);
  const gainedStats: Partial<Stats> = {};
  Object.entries(quest.rewards.stats).forEach(([key, value]) => {
    gainedStats[key as keyof Stats] = Math.round((value || 0) * multiplier);
  });

  let totalXp = player.xp + gainedXp;
  let level = player.level;
  while (totalXp >= xpToNext(level)) {
    totalXp -= xpToNext(level);
    level += 1;
  }

  const updatedStats = { ...player.stats };
  Object.entries(gainedStats).forEach(([key, value]) => {
    updatedStats[key as keyof Stats] = (updatedStats[key as keyof Stats] || 0) + (value || 0);
  });

  return {
    updatedPlayer: {
      ...player,
      level,
      xp: totalXp,
      coins: player.coins + gainedCoins,
      stats: updatedStats,
    },
    gained: {
      xp: gainedXp,
      coins: gainedCoins,
      stats: gainedStats,
    },
  };
};

export const getStreakBonus = (player: Player, completionDate: string) => {
  const lastDate = player.streaks.lastCompletionDate;
  if (!lastDate) {
    return 1;
  }
  const last = new Date(lastDate);
  const current = new Date(completionDate);
  const diffDays = Math.floor((current.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) {
    const streak = Math.min(player.streaks.questStreak + 1, 5);
    const bonus = 1 + Math.min(streak * 0.1, 0.5);
    return bonus;
  }
  return 1;
};
