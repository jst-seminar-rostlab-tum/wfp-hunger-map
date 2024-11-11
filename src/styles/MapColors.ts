import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';

export const getColors = (isDark: boolean): MapColorsType => ({
  activeCountries: isDark ? '#0e6397' : '#fefeff',
  inactiveCountries: isDark ? '#5a819b' : '#e8e8e8',
  ocean: isDark ? '#111111' : '#91cccb',
  outline: isDark ? '#0e2a3a' : '#306f96',
  roads: isDark ? '#404040' : '#808080',
});
