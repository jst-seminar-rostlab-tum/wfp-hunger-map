import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';

export const getColors = (isDark: boolean): MapColorsType => ({
  countriesBase: isDark ? '#002129' : '#fefeff',
  inactiveCountriesOverlay: isDark ? '#a69f9f' : '#d2d1d1',
  ocean: isDark ? '#002a38' : '#91cccb',
  outline: isDark ? '#0e2a3a' : '#306f96',
  roads: isDark ? '#404040' : '#808080',
});
