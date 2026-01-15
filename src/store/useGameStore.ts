import { create } from 'zustand';
import { loadState, saveState, resetState, defaultState } from './storage';
import { GameStateData, Quest, ShopReward, LogEntry, Stats, StatKey } from './types';
import { applyRewards, getStreakBonus } from '../utils/gameLogic';

interface GameStore extends GameStateData {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  completeQuest: (questId: string) => void;
  addQuest: (quest: Omit<Quest, 'id' | 'createdAt'>) => void;
  toggleQuestActive: (questId: string) => void;
  addShopReward: (reward: Omit<ShopReward, 'id' | 'createdAt'>) => void;
  redeemReward: (rewardId: string) => void;
  resetAll: () => Promise<void>;
  completeOnboarding: () => void;
}

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const useGameStore = create<GameStore>((set, get) => ({
  ...defaultState,
  hydrated: false,
  hydrate: async () => {
    const state = await loadState();
    set({ ...state, hydrated: true });
  },
  completeQuest: (questId) => {
    const { quests, player, logs } = get();
    const quest = quests.find((item) => item.id === questId);
    if (!quest) {
      return;
    }
    const completionDate = new Date().toISOString();
    const bonusMultiplier = getStreakBonus(player, completionDate);
    const { updatedPlayer, gained } = applyRewards(player, quest, bonusMultiplier);

    const nextQuestStreak = bonusMultiplier > 1 ? Math.min(player.streaks.questStreak + 1, 5) : 1;

    const updatedPlayerWithStreak = {
      ...updatedPlayer,
      streaks: {
        ...updatedPlayer.streaks,
        questStreak: nextQuestStreak,
        lastCompletionDate: completionDate,
      },
    };

    const newLog: LogEntry = {
      id: createId('log'),
      timestamp: Date.now(),
      questId,
      rewardsEarned: gained,
    };

    const nextState = {
      ...get(),
      player: updatedPlayerWithStreak,
      logs: [newLog, ...logs].slice(0, 100),
    };
    set(nextState);
    saveState(stripHydration(nextState));
  },
  addQuest: (quest) => {
    const newQuest: Quest = {
      ...quest,
      id: createId('quest'),
      createdAt: Date.now(),
    };
    const nextState = { ...get(), quests: [newQuest, ...get().quests] };
    set(nextState);
    saveState(stripHydration(nextState));
  },
  toggleQuestActive: (questId) => {
    const nextQuests = get().quests.map((quest) =>
      quest.id === questId ? { ...quest, isActive: !quest.isActive } : quest
    );
    const nextState = { ...get(), quests: nextQuests };
    set(nextState);
    saveState(stripHydration(nextState));
  },
  addShopReward: (reward) => {
    const newReward: ShopReward = {
      ...reward,
      id: createId('reward'),
      createdAt: Date.now(),
    };
    const nextState = { ...get(), shopRewards: [newReward, ...get().shopRewards] };
    set(nextState);
    saveState(stripHydration(nextState));
  },
  redeemReward: (rewardId) => {
    const { shopRewards, player } = get();
    const reward = shopRewards.find((item) => item.id === rewardId);
    if (!reward || player.coins < reward.cost) {
      return;
    }
    const nextPlayer = { ...player, coins: player.coins - reward.cost };
    const nextState = { ...get(), player: nextPlayer };
    set(nextState);
    saveState(stripHydration(nextState));
  },
  resetAll: async () => {
    const reset = await resetState();
    set({ ...reset, hydrated: true });
  },
  completeOnboarding: () => {
    const nextState = { ...get(), hasOnboarded: true };
    set(nextState);
    saveState(stripHydration(nextState));
  },
}));

const stripHydration = (state: GameStore): GameStateData => {
  const { hydrated, hydrate, completeQuest, addQuest, toggleQuestActive, addShopReward, redeemReward, resetAll, completeOnboarding, ...data } =
    state;
  return data;
};

export const statDisplay: Record<StatKey, { label: string; color: string }> = {
  health: { label: 'Health', color: '#4AF2D3' },
  mind: { label: 'Mind', color: '#7B5CFF' },
  wealth: { label: 'Wealth', color: '#F2C94C' },
  social: { label: 'Social', color: '#FF7FBF' },
};
