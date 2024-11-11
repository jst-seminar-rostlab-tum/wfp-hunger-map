import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';

export const getColors = (isDark: boolean): MapColorsType => ({
  activeCountries: isDark ? '#6890a8' : '#c6d5d8',
  inactiveCountries: isDark ? '#85929b' : '#a7b3ba',
  ocean: isDark ? '#143b51' : '#83b9d7',
  outline: isDark ? '#0e2a3a' : '#306f96',
  roads: isDark ? '#404040' : '#808080',
});
