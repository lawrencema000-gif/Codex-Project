import { View, StyleSheet } from 'react-native';
import { PixelText } from './PixelText';
import { colors, radii, spacing } from '../../src/theme';

interface PixelTagProps {
  label: string;
  tone?: 'accent' | 'neutral' | 'danger';
}

export const PixelTag = ({ label, tone = 'accent' }: PixelTagProps) => {
  return (
    <View style={[styles.tag, styles[tone]]}>
      <PixelText variant="caption" style={styles.label}>
        {label}
      </PixelText>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
    borderWidth: 2,
  },
  accent: {
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.accent,
  },
  neutral: {
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.danger,
  },
  label: {
    color: colors.textPrimary,
  },
});
