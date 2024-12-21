import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';

export interface NutritionStateChoroplethProps {
  regionNutrition?: FeatureCollection;
  countryName?: string;
  setRegionLabelTooltips: (tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void;
  regionLabelData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryMapData: CountryMapData;
}
