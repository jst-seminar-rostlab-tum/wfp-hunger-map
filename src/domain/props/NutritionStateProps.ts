import { FeatureCollection, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryProps } from '@/domain/entities/country/CountryMapData.ts';

export interface NutritionStateChoroplethProps {
  setRegionLabelTooltips: (tooltips: L.Tooltip[]) => void;
  countryMapData: FeatureCollection<Geometry, CountryProps>;
  onDataUnavailable: () => void;
}
