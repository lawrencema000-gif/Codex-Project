import { View, StyleSheet } from 'react-native';
import { colors, radii } from '../../src/theme';

interface PixelProgressBarProps {
  value: number;
  max: number;
  color?: string;
}

export const PixelProgressBar = ({ value, max, color = colors.accent }: PixelProgressBarProps) => {
  const percentage = max === 0 ? 0 : Math.min(value / max, 1);
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${percentage * 100}%`, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 12,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
