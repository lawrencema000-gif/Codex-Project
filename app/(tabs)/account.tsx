import { ScrollView, StyleSheet } from 'react-native';
import { PixelCard } from '../../components/ui/PixelCard';
import { PixelText } from '../../components/ui/PixelText';
import { PixelButton } from '../../components/ui/PixelButton';
import { colors, spacing } from '../../src/theme';
import { useGameStore } from '../../src/store/useGameStore';

export default function AccountScreen() {
  const resetAll = useGameStore((state) => state.resetAll);
  const isProUnlocked = useGameStore((state) => state.player.isProUnlocked);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <PixelCard>
        <PixelText variant="subtitle">Account</PixelText>
        <PixelText style={styles.subtext}>Status: {isProUnlocked ? 'Pro' : 'Free'}</PixelText>
        <PixelText style={styles.subtext}>Sign-in and backup arrive in Phase B and C.</PixelText>
      </PixelCard>

      <PixelCard>
        <PixelText variant="subtitle">Backup</PixelText>
        <PixelText style={styles.subtext}>Local-first storage is enabled.</PixelText>
        <PixelButton label="Export and Import (Phase C)" tone="ghost" onPress={() => null} />
      </PixelCard>

      <PixelCard>
        <PixelText variant="subtitle">Reset</PixelText>
        <PixelText style={styles.subtext}>Clears local progress and restarts the adventure.</PixelText>
        <PixelButton label="Reset Progress" tone="secondary" onPress={resetAll} />
      </PixelCard>

      <PixelCard>
        <PixelText variant="subtitle">Pro Unlock</PixelText>
        <PixelText style={styles.subtext}>One-time purchase unlock arrives in Phase D.</PixelText>
        <PixelButton label="View Pro Plans" tone="ghost" onPress={() => null} />
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
  subtext: {
    color: colors.textSecondary,
  },
});
