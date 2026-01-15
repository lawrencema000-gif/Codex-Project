import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { PixelText } from './PixelText';
import { colors, radii, spacing } from '../../src/theme';

interface PixelButtonProps extends PressableProps {
  label: string;
  tone?: 'primary' | 'secondary' | 'ghost';
}

export const PixelButton = ({ label, tone = 'primary', style, ...props }: PixelButtonProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.base,
        styles[tone],
        pressed && styles.pressed,
        style,
      ]}
    >
      <PixelText variant="subtitle" style={styles.label}>
        {label}
      </PixelText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.sm,
    borderWidth: 2,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.accentAlt,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    color: colors.background,
  },
});
