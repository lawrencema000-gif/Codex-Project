export type StatKey = 'health' | 'mind' | 'wealth' | 'social';

export type Stats = Record<StatKey, number>;

export type Difficulty = 'S' | 'A' | 'B' | 'C';

export type Schedule = 'daily' | 'weekly' | 'one-time';

export interface Player {
  level: number;
  xp: number;
  coins: number;
  stats: Stats;
  streaks: {
    dailyCheckIn: number;
    questStreak: number;
    lastCompletionDate: string | null;
  };
  isProUnlocked: boolean;
}

export interface Quest {
  id: string;
  title: string;
  category: StatKey;
  difficulty: Difficulty;
  schedule: Schedule;
  rewards: {
    xp: number;
    coins: number;
    stats: Partial<Stats>;
  };
  isActive: boolean;
  createdAt: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  questId: string;
  rewardsEarned: {
    xp: number;
    coins: number;
    stats: Partial<Stats>;
  };
  note?: string;
}

export interface ShopReward {
  id: string;
  title: string;
  cost: number;
  createdAt: number;
  isCustom: boolean;
}

export interface GameStateData {
  player: Player;
  quests: Quest[];
  logs: LogEntry[];
  shopRewards: ShopReward[];
  hasOnboarded: boolean;
}
