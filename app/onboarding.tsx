import { View, StyleSheet } from 'react-native';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelText } from '../components/ui/PixelText';
import { PixelButton } from '../components/ui/PixelButton';
import { colors, spacing } from '../src/theme';
import { useGameStore } from '../src/store/useGameStore';

export default function OnboardingScreen() {
  const completeOnboarding = useGameStore((state) => state.completeOnboarding);

  return (
    <View style={styles.container}>
      <PixelCard style={styles.card}>
        <PixelText variant="title" style={styles.title}>
          Life RPG
        </PixelText>
        <PixelText style={styles.body}>
          Turn real life quests into progress. Complete quests, earn XP and coins, and grow your stats.
        </PixelText>
        <PixelText style={styles.body}>
          Your journey is stored locally so you can play offline.
        </PixelText>
        <PixelButton label="Start Adventure" onPress={completeOnboarding} />
      </PixelCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  card: {
    gap: spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  body: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
