import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

interface StreakCounterProps {
  count: number;
  color?: string;
  streakType?: 'daily' | 'weekly';
}

export default function StreakCounter({ count, color, streakType = 'daily' }: StreakCounterProps) {
  const { colors } = useTheme();
  const countColor = color ?? colors.streakFire;
  const unit = streakType === 'weekly' ? 'week' : 'day';

  return (
    <View style={styles.container}>
      <Ionicons name="flame" size={28} color={countColor} />
      <Text style={[styles.count, { color: countColor }]}>{count}</Text>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{unit} streak</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  count: {
    ...typography.hero,
  },
  label: {
    ...typography.body,
  },
});
