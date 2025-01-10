import { FeatureCollection, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryProps } from '@/domain/entities/country/CountryMapData.ts';

export default interface FscCountryChoroplethProps {
  countryMapData: FeatureCollection<Geometry, CountryProps>;
  setRegionLabelTooltips: (tooltips: L.Tooltip[]) => void;
  onDataUnavailable: () => void;
}
