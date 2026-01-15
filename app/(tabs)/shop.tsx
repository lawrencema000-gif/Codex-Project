import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { useState } from 'react';
import { PixelCard } from '../../components/ui/PixelCard';
import { PixelText } from '../../components/ui/PixelText';
import { PixelButton } from '../../components/ui/PixelButton';
import { ModalSheet } from '../../components/ui/ModalSheet';
import { colors, spacing } from '../../src/theme';
import { useGameStore } from '../../src/store/useGameStore';

export default function ShopScreen() {
  const player = useGameStore((state) => state.player);
  const rewards = useGameStore((state) => state.shopRewards);
  const addShopReward = useGameStore((state) => state.addShopReward);
  const redeemReward = useGameStore((state) => state.redeemReward);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('40');

  const handleCreate = () => {
    if (!title.trim()) {
      return;
    }
    addShopReward({
      title: title.trim(),
      cost: Number(cost) || 0,
      isCustom: true,
    });
    setTitle('');
    setCost('40');
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <PixelCard>
        <PixelText variant="subtitle">Coins</PixelText>
        <PixelText style={styles.balance}>{player.coins}</PixelText>
      </PixelCard>

      <PixelButton label="Create Reward" onPress={() => setModalVisible(true)} />
      {rewards.map((reward) => (
        <PixelCard key={reward.id} style={styles.rewardCard}>
          <View style={styles.rewardHeader}>
            <PixelText variant="subtitle">{reward.title}</PixelText>
            <PixelText style={styles.subtext}>Cost {reward.cost}</PixelText>
          </View>
          <PixelButton
            label={player.coins >= reward.cost ? 'Redeem' : 'Not enough coins'}
            tone={player.coins >= reward.cost ? 'primary' : 'ghost'}
            onPress={() => redeemReward(reward.id)}
          />
        </PixelCard>
      ))}

      <ModalSheet visible={modalVisible} onClose={() => setModalVisible(false)}>
        <PixelText variant="subtitle" style={styles.modalTitle}>
          New Reward
        </PixelText>
        <TextInput
          placeholder="Reward title"
          placeholderTextColor={colors.muted}
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Cost"
          placeholderTextColor={colors.muted}
          style={styles.input}
          keyboardType="number-pad"
          value={cost}
          onChangeText={setCost}
        />
        <View style={styles.actionRow}>
          <PixelButton label="Cancel" tone="ghost" onPress={() => setModalVisible(false)} />
          <PixelButton label="Save Reward" onPress={handleCreate} />
        </View>
      </ModalSheet>
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
  rewardCard: {
    gap: spacing.sm,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtext: {
    color: colors.textSecondary,
  },
  balance: {
    fontSize: 28,
  },
  modalTitle: {
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.sm,
    color: colors.textPrimary,
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceRaised,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
});
