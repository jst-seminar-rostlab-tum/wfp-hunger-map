import { FeatureCollection } from 'geojson';
import { useTheme } from 'next-themes';
import { GeoJSON } from 'react-leaflet';

import { WorldInactiveCountriesOverlayProps } from '@/domain/props/WorldInactiveCountriesOverlayProps.ts';
import { inactiveCountryOverlayStyling } from '@/styles/MapColors.ts';

export default function WorldInactiveCountriesOverlay({ data }: WorldInactiveCountriesOverlayProps) {
  const { theme } = useTheme();
  return <GeoJSON data={data as FeatureCollection} style={inactiveCountryOverlayStyling(theme === 'dark')} />;
}
