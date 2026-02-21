import React, { useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { spacing, typography, withAlpha, shadows } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

const CELL_SIZE = 14;
const CELL_GAP = 3;
const CELL_RADIUS = 3;
const DAY_LABELS = ['', 'M', '', 'W', '', 'F', ''];

interface ActivityGraphProps {
  /** Per-pact: list of completed dates. Each date counts as 1. */
  completedDates?: string[];
  /** Aggregate: map of date -> activity count (overrides completedDates). */
  activityMap?: Record<string, number>;
  /** Color for the intensity gradient (should already be theme-adapted). */
  color: string;
  /** Number of weeks to display. Default 16. */
  weeksToShow?: number;
}

interface CellData {
  date: string;
  level: number; // -1=future, 0=empty, 1-4=activity levels
  isToday: boolean;
}

export default function ActivityGraph({
  completedDates,
  activityMap,
  color,
  weeksToShow = 16,
}: ActivityGraphProps) {
  const { colors, isDark } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const { grid, monthLabels, maxLevel } = useMemo(() => {
    // Build a count map
    let countMap: Record<string, number>;
    if (activityMap) {
      countMap = activityMap;
    } else {
      countMap = {};
      (completedDates || []).forEach(d => {
        countMap[d] = (countMap[d] || 0) + 1;
      });
    }

    // Find max count for scaling to 4 levels
    const counts = Object.values(countMap);
    const max = Math.max(1, ...counts);

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // End of current week (Saturday)
    const dayOfWeek = today.getDay(); // 0=Sun
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + (6 - dayOfWeek));

    // Start date
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (weeksToShow * 7 - 1));

    const columns: CellData[][] = [];
    const months: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    for (let week = 0; week < weeksToShow; week++) {
      const column: CellData[] = [];
      for (let day = 0; day < 7; day++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + week * 7 + day);
        const dateStr = d.toISOString().split('T')[0];
        const isFuture = d > today;
        const count = countMap[dateStr] || 0;

        let level: number;
        if (isFuture) {
          level = -1;
        } else if (count === 0) {
          level = 0;
        } else {
          // Scale to 1-4
          level = Math.ceil((count / max) * 4);
          level = Math.max(1, Math.min(4, level));
        }

        column.push({ date: dateStr, level, isToday: dateStr === todayStr });

        // Month labels: first occurrence of a new month on day=0 (Sunday)
        if (day === 0 && d.getMonth() !== lastMonth) {
          months.push({
            label: d.toLocaleString('default', { month: 'short' }),
            weekIndex: week,
          });
          lastMonth = d.getMonth();
        }
      }
      columns.push(column);
    }

    return { grid: columns, monthLabels: months, maxLevel: max };
  }, [completedDates, activityMap, weeksToShow]);

  // Color intensity levels
  const emptyColor = isDark
    ? withAlpha(colors.textTertiary, 0.08)
    : withAlpha(colors.textTertiary, 0.06);

  const levelColors = [
    emptyColor,              // 0: no activity
    withAlpha(color, 0.25),  // 1: low
    withAlpha(color, 0.5),   // 2: medium
    withAlpha(color, 0.75),  // 3: high
    color,                   // 4: max
  ];

  const graphWidth = weeksToShow * (CELL_SIZE + CELL_GAP);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Month labels */}
      <View style={[styles.monthRow, { marginLeft: 20 }]}>
        {monthLabels.map((m, i) => (
          <Text
            key={i}
            style={[
              styles.monthLabel,
              {
                color: colors.textTertiary,
                position: 'absolute',
                left: m.weekIndex * (CELL_SIZE + CELL_GAP),
              },
            ]}
          >
            {m.label}
          </Text>
        ))}
      </View>

      {/* Graph body */}
      <View style={styles.graphBody}>
        {/* Day labels */}
        <View style={styles.dayLabelsCol}>
          {DAY_LABELS.map((label, i) => (
            <View
              key={i}
              style={{ height: CELL_SIZE, marginBottom: CELL_GAP, justifyContent: 'center' }}
            >
              <Text style={[styles.dayLabel, { color: colors.textTertiary }]}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Grid */}
        <View style={styles.gridContainer}>
          {grid.map((column, weekIdx) => (
            <View key={weekIdx} style={styles.column}>
              {column.map((cell, dayIdx) => {
                const isMax = cell.level === 4;
                return (
                  <View
                    key={dayIdx}
                    style={[
                      styles.cell,
                      {
                        backgroundColor:
                          cell.level < 0 ? 'transparent' : levelColors[cell.level] || emptyColor,
                      },
                      cell.isToday && {
                        borderWidth: 1.5,
                        borderColor: color,
                      },
                      isMax && isDark && {
                        shadowColor: color,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.4,
                        shadowRadius: 4,
                      },
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={[styles.legendLabel, { color: colors.textTertiary }]}>Less</Text>
        {[0, 1, 2, 3, 4].map(level => (
          <View
            key={level}
            style={[
              styles.legendCell,
              { backgroundColor: levelColors[level] },
            ]}
          />
        ))}
        <Text style={[styles.legendLabel, { color: colors.textTertiary }]}>More</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  monthRow: {
    height: 16,
    marginBottom: spacing.xs,
    position: 'relative',
  },
  monthLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  graphBody: {
    flexDirection: 'row',
  },
  dayLabelsCol: {
    width: 20,
    marginRight: 2,
  },
  dayLabel: {
    fontSize: 9,
    fontWeight: '500',
    textAlign: 'right',
  },
  gridContainer: {
    flexDirection: 'row',
  },
  column: {
    marginRight: CELL_GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_RADIUS,
    marginBottom: CELL_GAP,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 3,
    marginTop: spacing.sm,
  },
  legendLabel: {
    fontSize: 9,
    fontWeight: '500',
    marginHorizontal: 2,
  },
  legendCell: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});
