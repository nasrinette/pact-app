import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, typography, withAlpha, shadows } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Pact } from '@/data/types';
import IconBadge from '@/components/ui/IconBadge';
import { adaptColor } from '@/utils/colorUtils';

interface PactMatchCardProps {
  pact: Pact;
  streakDays: number;
}

export default function PactMatchCard({ pact, streakDays }: PactMatchCardProps) {
  const { colors, isDark } = useTheme();
  const pactColor = adaptColor(pact.color, isDark);
  const slideY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideY, { toValue: 0, delay: 300, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, delay: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[
      styles.card,
      {
        opacity,
        transform: [{ translateY: slideY }],
        backgroundColor: colors.backgroundSecondary,
        borderColor: withAlpha(colors.success, 0.25),
        shadowColor: colors.success,
      },
    ]}>
      <View style={styles.row}>
        <IconBadge icon={pact.icon} color={pactColor} size={48} />
        <View style={styles.info}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{pact.title}</Text>
          <View style={styles.streakRow}>
            <Text style={[styles.streak, { color: colors.streakFireText }]}>
              {pact.frequency === 'weekly' ? `Week ${streakDays}` : `Day ${streakDays}`}
            </Text>
            <Ionicons name="flame" size={16} color={colors.streakFireText} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1.5,
    ...shadows.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  info: {
    flex: 1,
  },
  title: {
    ...typography.h3,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  streak: {
    ...typography.bodyBold,
  },
});
