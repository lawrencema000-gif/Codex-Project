import * as FileSystem from 'expo-file-system';
import { GameStateData } from './types';

const FILE_NAME = 'life-rpg.json';
const fileUri = `${FileSystem.documentDirectory}${FILE_NAME}`;

export const defaultState: GameStateData = {
  player: {
    level: 1,
    xp: 0,
    coins: 0,
    stats: {
      health: 1,
      mind: 1,
      wealth: 1,
      social: 1,
    },
    streaks: {
      dailyCheckIn: 0,
      questStreak: 0,
      lastCompletionDate: null,
    },
    isProUnlocked: false,
  },
  quests: [
    {
      id: 'q-1',
      title: 'Morning stretch',
      category: 'health',
      difficulty: 'C',
      schedule: 'daily',
      rewards: { xp: 30, coins: 10, stats: { health: 1 } },
      isActive: true,
      createdAt: Date.now(),
    },
    {
      id: 'q-2',
      title: 'Plan the day',
      category: 'mind',
      difficulty: 'B',
      schedule: 'daily',
      rewards: { xp: 45, coins: 15, stats: { mind: 1 } },
      isActive: true,
      createdAt: Date.now(),
    },
  ],
  logs: [],
  shopRewards: [
    {
      id: 'r-1',
      title: 'Coffee break',
      cost: 20,
      createdAt: Date.now(),
      isCustom: false,
    },
    {
      id: 'r-2',
      title: 'Movie night',
      cost: 80,
      createdAt: Date.now(),
      isCustom: false,
    },
  ],
  hasOnboarded: false,
};

export const loadState = async (): Promise<GameStateData> => {
  try {
    const info = await FileSystem.getInfoAsync(fileUri);
    if (!info.exists) {
      return defaultState;
    }
    const contents = await FileSystem.readAsStringAsync(fileUri);
    const parsed = JSON.parse(contents) as GameStateData;
    return {
      ...defaultState,
      ...parsed,
      player: { ...defaultState.player, ...parsed.player },
    };
  } catch (error) {
    return defaultState;
  }
};

export const saveState = async (state: GameStateData): Promise<void> => {
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(state));
  } catch (error) {
    // ignore write errors in MVP
  }
};

export const resetState = async (): Promise<GameStateData> => {
  await saveState(defaultState);
  return defaultState;
};
