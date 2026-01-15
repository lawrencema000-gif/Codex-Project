import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { useState } from 'react';
import { PixelCard } from '../../components/ui/PixelCard';
import { PixelText } from '../../components/ui/PixelText';
import { PixelButton } from '../../components/ui/PixelButton';
import { PixelTag } from '../../components/ui/PixelTag';
import { ModalSheet } from '../../components/ui/ModalSheet';
import { colors, spacing } from '../../src/theme';
import { useGameStore } from '../../src/store/useGameStore';
import { Difficulty, Schedule, StatKey } from '../../src/store/types';

const difficultyOptions: Difficulty[] = ['C', 'B', 'A', 'S'];
const categories: StatKey[] = ['health', 'mind', 'wealth', 'social'];
const schedules: Schedule[] = ['daily', 'weekly', 'one-time'];

export default function QuestsScreen() {
  const quests = useGameStore((state) => state.quests);
  const toggleQuestActive = useGameStore((state) => state.toggleQuestActive);
  const addQuest = useGameStore((state) => state.addQuest);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<StatKey>('health');
  const [difficulty, setDifficulty] = useState<Difficulty>('C');
  const [schedule, setSchedule] = useState<Schedule>('daily');
  const [xp, setXp] = useState('30');
  const [coins, setCoins] = useState('10');

  const handleCreate = () => {
    if (!title.trim()) {
      return;
    }
    addQuest({
      title: title.trim(),
      category,
      difficulty,
      schedule,
      rewards: {
        xp: Number(xp) || 0,
        coins: Number(coins) || 0,
        stats: { [category]: 1 },
      },
      isActive: true,
    });
    setTitle('');
    setXp('30');
    setCoins('10');
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <PixelButton label="Create Quest" onPress={() => setModalVisible(true)} />
      {quests.map((quest) => (
        <PixelCard key={quest.id} style={styles.questCard}>
          <View style={styles.questHeader}>
            <PixelText variant="subtitle">{quest.title}</PixelText>
            <PixelButton
              label={quest.isActive ? 'Deactivate' : 'Activate'}
              tone="ghost"
              onPress={() => toggleQuestActive(quest.id)}
            />
          </View>
          <View style={styles.tagRow}>
            <PixelTag label={quest.category.toUpperCase()} />
            <PixelTag label={`Difficulty ${quest.difficulty}`} tone="neutral" />
            <PixelTag label={quest.schedule.toUpperCase()} tone="neutral" />
          </View>
          <PixelText style={styles.subtext}>
            Rewards: {quest.rewards.xp} XP, {quest.rewards.coins} coins
          </PixelText>
        </PixelCard>
      ))}

      <ModalSheet visible={modalVisible} onClose={() => setModalVisible(false)}>
        <PixelText variant="subtitle" style={styles.modalTitle}>
          New Quest
        </PixelText>
        <TextInput
          placeholder="Quest title"
          placeholderTextColor={colors.muted}
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <PixelText style={styles.modalLabel}>Category</PixelText>
        <View style={styles.optionRow}>
          {categories.map((option) => (
            <PixelButton
              key={option}
              label={option.toUpperCase()}
              tone={option === category ? 'secondary' : 'ghost'}
              onPress={() => setCategory(option)}
            />
          ))}
        </View>
        <PixelText style={styles.modalLabel}>Difficulty</PixelText>
        <View style={styles.optionRow}>
          {difficultyOptions.map((option) => (
            <PixelButton
              key={option}
              label={option}
              tone={option === difficulty ? 'secondary' : 'ghost'}
              onPress={() => setDifficulty(option)}
            />
          ))}
        </View>
        <PixelText style={styles.modalLabel}>Schedule</PixelText>
        <View style={styles.optionRow}>
          {schedules.map((option) => (
            <PixelButton
              key={option}
              label={option.toUpperCase()}
              tone={option === schedule ? 'secondary' : 'ghost'}
              onPress={() => setSchedule(option)}
            />
          ))}
        </View>
        <View style={styles.inputRow}>
          <TextInput
            placeholder="XP"
            placeholderTextColor={colors.muted}
            style={[styles.input, styles.inputSmall]}
            keyboardType="number-pad"
            value={xp}
            onChangeText={setXp}
          />
          <TextInput
            placeholder="Coins"
            placeholderTextColor={colors.muted}
            style={[styles.input, styles.inputSmall]}
            keyboardType="number-pad"
            value={coins}
            onChangeText={setCoins}
          />
        </View>
        <View style={styles.actionRow}>
          <PixelButton label="Cancel" tone="ghost" onPress={() => setModalVisible(false)} />
          <PixelButton label="Save Quest" onPress={handleCreate} />
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
  questCard: {
    gap: spacing.sm,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  subtext: {
    color: colors.textSecondary,
  },
  modalTitle: {
    marginBottom: spacing.md,
  },
  modalLabel: {
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
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
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  inputSmall: {
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
});
