import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '../../src/theme';

interface PixelTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
}

export const PixelText = ({ variant = 'body', style, ...props }: PixelTextProps) => {
  return <Text {...props} style={[styles.base, styles[variant], style]} />;
};

const styles = StyleSheet.create({
  base: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: 'PressStart2P',
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 0.5,
    fontFamily: 'PressStart2P',
  },
  body: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
