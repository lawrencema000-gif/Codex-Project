import { View, ViewProps, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../../src/theme';

export const PixelCard = ({ style, ...props }: ViewProps) => {
  return <View {...props} style={[styles.card, style]} />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
});
