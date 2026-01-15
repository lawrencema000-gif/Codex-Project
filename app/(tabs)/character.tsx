import { ScrollView, StyleSheet, View } from 'react-native';
import { PixelCard } from '../../components/ui/PixelCard';
import { PixelText } from '../../components/ui/PixelText';
import { PixelProgressBar } from '../../components/ui/PixelProgressBar';
import { StatPill } from '../../components/ui/StatPill';
import { colors, spacing } from '../../src/theme';
import { useGameStore, statDisplay } from '../../src/store/useGameStore';
import { xpToNext } from '../../src/utils/gameLogic';

export default function CharacterScreen() {
  const player = useGameStore((state) => state.player);
  const logs = useGameStore((state) => state.logs.slice(0, 5));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <PixelCard style={styles.card}>
        <PixelText variant="title">Character</PixelText>
        <PixelText style={styles.subtext}>Level {player.level}</PixelText>
        <PixelProgressBar value={player.xp} max={xpToNext(player.level)} color={colors.accentAlt} />
        <PixelText style={styles.subtext}>
          XP {player.xp} / {xpToNext(player.level)}
        </PixelText>
      </PixelCard>

      <PixelCard style={styles.card}>
        <PixelText variant="subtitle">Core Stats</PixelText>
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
      </PixelCard>

      <PixelCard style={styles.card}>
        <PixelText variant="subtitle">Streaks</PixelText>
        <PixelText style={styles.subtext}>Quest streak: {player.streaks.questStreak} days</PixelText>
        <PixelText style={styles.subtext}>Daily check-in: {player.streaks.dailyCheckIn} days</PixelText>
      </PixelCard>

      <PixelCard style={styles.card}>
        <PixelText variant="subtitle">Recent Logs</PixelText>
        {logs.length === 0 ? (
          <PixelText style={styles.subtext}>No completions yet.</PixelText>
        ) : (
          logs.map((log) => (
            <View key={log.id} style={styles.logRow}>
              <PixelText style={styles.subtext}>{new Date(log.timestamp).toLocaleDateString()}</PixelText>
              <PixelText style={styles.subtext}>XP +{log.rewardsEarned.xp}</PixelText>
              <PixelText style={styles.subtext}>Coins +{log.rewardsEarned.coins}</PixelText>
            </View>
          ))
        )}
      </PixelCard>
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
  card: {
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
  logRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
