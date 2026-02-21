import React from 'react';
import { View, Pressable, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, borderRadius, layout, withAlpha } from '@/constants/theme';
import { getPactIcons } from '@/constants/icons';
import { useTheme } from '@/contexts/ThemeContext';

interface IconSelectorProps {
  selectedIcon: string | null;
  onSelect: (icon: string, color: string) => void;
}

export default function IconSelector({ selectedIcon, onSelect }: IconSelectorProps) {
  const { isDark } = useTheme();
  const icons = getPactIcons(isDark);

  return (
    <FlatList
      data={icons}
      numColumns={5}
      scrollEnabled={false}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={styles.row}
      renderItem={({ item, index }) => {
        const isSelected = selectedIcon === item.name;
        return (
          <View>
            <Pressable
              style={[
                styles.iconBtn,
                { backgroundColor: withAlpha(item.color, 0.08) },
                isSelected && { borderColor: item.color, borderWidth: 2, backgroundColor: withAlpha(item.color, 0.19) },
              ]}
              onPress={() => onSelect(item.name, item.color)}
            >
              <Ionicons
                name={item.name as keyof typeof Ionicons.glyphMap}
                size={24}
                color={item.color}
              />
            </Pressable>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing.sm,
  },
  row: {
    gap: spacing.sm,
  },
  iconBtn: {
    width: layout.iconButtonLg,
    height: layout.iconButtonLg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
