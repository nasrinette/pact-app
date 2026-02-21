import React, { useEffect, useRef } from 'react';
import { StyleSheet, Image, Dimensions, View, Pressable, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PhotoPreviewProps {
  photoUri: string;
  onRetake: () => void;
  onVerify: () => void;
  onCrop?: () => void;
}

export default function PhotoPreview({ photoUri, onRetake, onVerify, onCrop }: PhotoPreviewProps) {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(slideY, { toValue: 0, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY: slideY }] }]}>
      <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
      <View style={styles.buttons}>
        <Pressable style={[styles.secondaryBtn, { backgroundColor: colors.backgroundTertiary, borderColor: colors.border }]} onPress={onRetake}>
          <Ionicons name="refresh" size={20} color={colors.textPrimary} />
          <Text style={[styles.btnText, { color: colors.textPrimary }]}>Retake</Text>
        </Pressable>
        {onCrop && (
          <Pressable style={[styles.secondaryBtn, { backgroundColor: colors.backgroundTertiary, borderColor: colors.border }]} onPress={onCrop}>
            <Ionicons name="crop" size={20} color={colors.textPrimary} />
            <Text style={[styles.btnText, { color: colors.textPrimary }]}>Crop</Text>
          </Pressable>
        )}
        <Pressable style={[styles.verifyBtn, { backgroundColor: colors.primary }]} onPress={onVerify}>
          <Ionicons name="sparkles" size={20} color={colors.onPrimary} />
          <Text style={[styles.btnText, { color: colors.onPrimary }]}>Verify with AI</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  photo: {
    width: SCREEN_WIDTH - spacing.xl * 2,
    height: SCREEN_WIDTH - spacing.xl * 2,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxl,
    width: '100%',
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  verifyBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  btnText: {
    ...typography.bodyBold,
  },
});
