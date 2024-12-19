import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';
import { NutrientType } from '@/domain/enums/NutrientType.ts';

export interface NutritionStateChoroplethProps {
  regionNutrition?: FeatureCollection;
  setRegionLabelTooltips: (tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void;
  regionLabelData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryMapData: CountryMapData;
  selectedNutrient: NutrientType;
}
