import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { spacing, borderRadius, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home',
  'new-pact': 'add-circle',
  streaks: 'flame',
  camera: 'camera',
};

const TAB_LABELS: Record<string, string> = {
  index: 'Pacts',
  'new-pact': 'New',
  streaks: 'Streaks',
  camera: 'Verify',
};

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={[styles.blur, { borderColor: colors.border }]}>
        <View style={[styles.container, { backgroundColor: colors.tabBarBg }]}>
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const iconName = TAB_ICONS[route.name] || 'ellipse';
            const label = TAB_LABELS[route.name] || route.name;
            const isCamera = route.name === 'camera';
            const cameraBg = isDark ? colors.textPrimary : colors.textPrimary;
            const cameraIcon = isDark ? colors.background : colors.background;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate(route.name);
              }
            };

            if (isCamera) {
              return (
                <Pressable key={route.key} onPress={onPress} style={styles.tab}>
                  <View style={[styles.cameraIcon, { backgroundColor: cameraBg }]}>
                    <Ionicons
                      name="camera"
                      size={20}
                      color={cameraIcon}
                    />
                  </View>
                  <Text style={[styles.label, { color: isFocused ? colors.primary : colors.textTertiary }]}>
                    {label}
                  </Text>
                </Pressable>
              );
            }

            return (
              <Pressable key={route.key} onPress={onPress} style={styles.tab}>
                <View style={styles.iconWrapper}>
                  <Ionicons
                    name={
                      isFocused
                        ? (iconName as keyof typeof Ionicons.glyphMap)
                        : (`${iconName}-outline` as keyof typeof Ionicons.glyphMap)
                    }
                    size={24}
                    color={isFocused ? colors.primary : colors.textTertiary}
                  />
                </View>
                <Text style={[styles.label, { color: isFocused ? colors.primary : colors.textTertiary }]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
  },
  blur: {
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    borderWidth: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: spacing.xs,
  },
  iconWrapper: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  cameraIcon: {
    width: 36,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
  },
  label: {
    ...typography.tabLabel,
    marginTop: spacing.xxs,
  },
});
