import { MapColorsType } from '@/domain/entities/map/MapColorsType.ts';

export const getColors = (isDark: boolean): MapColorsType => ({
  countriesBase: isDark ? '#0e6397' : '#fefeff',
  inactiveCountriesOverlay: isDark ? '#a69f9f' : '#d2d1d1',
  ocean: isDark ? '#111111' : '#91cccb',
  outline: isDark ? '#0e2a3a' : '#306f96',
  roads: isDark ? '#404040' : '#808080',
});

export const inactiveCountryOverlayStyling = (isDark: boolean) => ({
  color: getColors(isDark).inactiveCountriesOverlay,
  fillOpacity: 0.5,
  stroke: false,
});
