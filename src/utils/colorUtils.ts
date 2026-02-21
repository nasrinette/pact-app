/**
 * Maps bright accent colors to muted/darkened equivalents for light mode.
 * Keys are uppercase hex for consistent lookup.
 */
const LIGHT_MODE_MAP: Record<string, string> = {
  '#FF6B6B': '#D44545',
  '#4ECDC4': '#2A8A83',
  '#FFE66D': '#9E8600',
  '#95E1D3': '#3BA99F',
  '#F38181': '#C95A5A',
  '#292F36': '#5A6260',
  '#5B9BD5': '#3D7AB0',
  '#D4A574': '#9E7A52',
  '#7EDCD6': '#3BA99F',
  '#FF9500': '#C47400',
  '#FFD700': '#B89B00',
};

/**
 * Returns a theme-appropriate version of an accent/pact color.
 * In dark mode, returns the original bright color.
 * In light mode, returns a muted/darkened variant for better contrast.
 */
export function adaptColor(color: string, isDark: boolean): string {
  if (isDark) return color;
  return LIGHT_MODE_MAP[color.toUpperCase()] ?? color;
}
