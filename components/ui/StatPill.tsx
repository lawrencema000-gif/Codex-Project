import { View, StyleSheet } from 'react-native';
import { PixelText } from './PixelText';
import { colors, radii, spacing } from '../../src/theme';

interface StatPillProps {
  label: string;
  value: number;
  color?: string;
}

export const StatPill = ({ label, value, color = colors.accent }: StatPillProps) => {
  return (
    <View style={[styles.pill, { borderColor: color }]}> 
      <PixelText variant="caption" style={styles.label}>
        {label}
      </PixelText>
      <PixelText variant="subtitle" style={[styles.value, { color }]}>
        {value}
      </PixelText>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
    borderWidth: 2,
    backgroundColor: colors.surfaceRaised,
    minWidth: 64,
    alignItems: 'center',
  },
  label: {
    color: colors.textSecondary,
  },
  value: {
    marginTop: 4,
  },
});
