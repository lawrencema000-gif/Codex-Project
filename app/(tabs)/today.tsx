import { ScrollView, StyleSheet, View } from 'react-native';
import { PixelCard } from '../../components/ui/PixelCard';
import { PixelText } from '../../components/ui/PixelText';
import { PixelButton } from '../../components/ui/PixelButton';
import { PixelProgressBar } from '../../components/ui/PixelProgressBar';
import { StatPill } from '../../components/ui/StatPill';
import { colors, spacing } from '../../src/theme';
import { useGameStore, statDisplay } from '../../src/store/useGameStore';
import { xpToNext } from '../../src/utils/gameLogic';

export default function TodayScreen() {
  const player = useGameStore((state) => state.player);
  const quests = useGameStore((state) => state.quests.filter((quest) => quest.isActive));
  const completeQuest = useGameStore((state) => state.completeQuest);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <PixelCard style={styles.heroCard}>
        <PixelText variant="title">Daily Hub</PixelText>
        <PixelText style={styles.subtext}>Level {player.level}</PixelText>
        <PixelProgressBar value={player.xp} max={xpToNext(player.level)} />
        <View style={styles.statsRow}>
          {Object.entries(player.stats).map(([key, value]) => (
            <StatPill
              key={key}
              label={statDisplay[key as keyof typeof statDisplay].label}
              value={value}
              color={statDisplay[key as keyof typeof statDisplay].color}
            />
          ))}
        </View>
        <View style={styles.currencyRow}>
          <PixelText>XP {player.xp}</PixelText>
          <PixelText>Coins {player.coins}</PixelText>
        </View>
      </PixelCard>

      <PixelText variant="subtitle" style={styles.sectionTitle}>
        Active Quests
      </PixelText>
      {quests.length === 0 ? (
        <PixelCard>
          <PixelText style={styles.subtext}>No active quests. Add one in the Quests tab.</PixelText>
        </PixelCard>
      ) : (
        quests.map((quest) => (
          <PixelCard key={quest.id} style={styles.questCard}>
            <PixelText variant="subtitle">{quest.title}</PixelText>
            <PixelText style={styles.subtext}>
              {quest.category.toUpperCase()} | Difficulty {quest.difficulty}
            </PixelText>
            <PixelText style={styles.subtext}>
              Rewards: {quest.rewards.xp} XP, {quest.rewards.coins} coins
            </PixelText>
            <PixelButton label="Complete" onPress={() => completeQuest(quest.id)} />
          </PixelCard>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  heroCard: {
    gap: spacing.sm,
  },
  sectionTitle: {
    marginTop: spacing.sm,
  },
  questCard: {
    gap: spacing.sm,
  },
  subtext: {
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
