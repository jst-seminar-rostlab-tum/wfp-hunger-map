import { FeatureCollection, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryProps } from '../entities/country/CountryMapData';

export default interface NutritionChoroplethProps {
  data: FeatureCollection<Geometry, CountryProps>;
  countryId: number;
  setRegionLabelTooltips: (tooltips: L.Tooltip[]) => void;
  onDataUnavailable: () => void;
}
