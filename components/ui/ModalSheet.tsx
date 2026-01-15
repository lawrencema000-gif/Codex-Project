import { Modal, View, StyleSheet, ViewProps } from 'react-native';
import { colors, radii, spacing } from '../../src/theme';

interface ModalSheetProps extends ViewProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalSheet = ({ visible, onClose, children, style, ...props }: ModalSheetProps) => {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View {...props} style={[styles.sheet, style]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  sheet: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.accentAlt,
    padding: spacing.lg,
  },
});
