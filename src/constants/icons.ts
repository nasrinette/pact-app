export type PactIcon = {
  name: string;
  family: 'Ionicons' | 'MaterialCommunityIcons';
  color: string;
};

/** Dark / light color pairs for each pact icon */
const ICON_COLORS: Record<string, { dark: string; light: string }> = {
  fitness:                  { dark: '#FF6B6B', light: '#D44545' },
  book:                     { dark: '#FFE66D', light: '#9E8600' },
  restaurant:               { dark: '#95E1D3', light: '#3BA99F' },
  leaf:                     { dark: '#4ECDC4', light: '#2A8A83' },
  'phone-portrait-outline': { dark: '#F38181', light: '#C95A5A' },
  water:                    { dark: '#95E1D3', light: '#3BA99F' },
  walk:                     { dark: '#FF6B6B', light: '#D44545' },
  bicycle:                  { dark: '#4ECDC4', light: '#2A8A83' },
  'musical-notes':          { dark: '#F38181', light: '#C95A5A' },
  pencil:                   { dark: '#FFE66D', light: '#9E8600' },
  'code-slash':             { dark: '#95E1D3', light: '#3BA99F' },
  bed:                      { dark: '#7EDCD6', light: '#3BA99F' },
  heart:                    { dark: '#F38181', light: '#C95A5A' },
  cafe:                     { dark: '#FFE66D', light: '#9E8600' },
  camera:                   { dark: '#4ECDC4', light: '#2A8A83' },
  globe:                    { dark: '#4ECDC4', light: '#2A8A83' },
  barbell:                  { dark: '#FF6B6B', light: '#D44545' },
  moon:                     { dark: '#7EDCD6', light: '#3BA99F' },
  sunny:                    { dark: '#FFE66D', light: '#9E8600' },
  people:                   { dark: '#4ECDC4', light: '#2A8A83' },
};

const ICON_NAMES: { name: string; family: 'Ionicons' | 'MaterialCommunityIcons' }[] = [
  { name: 'fitness', family: 'Ionicons' },
  { name: 'book', family: 'Ionicons' },
  { name: 'restaurant', family: 'Ionicons' },
  { name: 'leaf', family: 'Ionicons' },
  { name: 'phone-portrait-outline', family: 'Ionicons' },
  { name: 'water', family: 'Ionicons' },
  { name: 'walk', family: 'Ionicons' },
  { name: 'bicycle', family: 'Ionicons' },
  { name: 'musical-notes', family: 'Ionicons' },
  { name: 'pencil', family: 'Ionicons' },
  { name: 'code-slash', family: 'Ionicons' },
  { name: 'bed', family: 'Ionicons' },
  { name: 'heart', family: 'Ionicons' },
  { name: 'cafe', family: 'Ionicons' },
  { name: 'camera', family: 'Ionicons' },
  { name: 'globe', family: 'Ionicons' },
  { name: 'barbell', family: 'Ionicons' },
  { name: 'moon', family: 'Ionicons' },
  { name: 'sunny', family: 'Ionicons' },
  { name: 'people', family: 'Ionicons' },
];

/** Returns pact icons with theme-appropriate colors */
export function getPactIcons(isDark: boolean): PactIcon[] {
  return ICON_NAMES.map(icon => ({
    ...icon,
    color: ICON_COLORS[icon.name]?.[isDark ? 'dark' : 'light'] ?? '#4ECDC4',
  }));
}

/** Resolve a single icon's color for current theme */
export function getIconColor(iconName: string, isDark: boolean): string {
  return ICON_COLORS[iconName]?.[isDark ? 'dark' : 'light'] ?? '#4ECDC4';
}

/** Backward compat: static array with dark-mode colors */
export const pactIcons: PactIcon[] = getPactIcons(true);
