import { FeatureCollection, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryProps } from '@/domain/entities/country/CountryMapData.ts';

import { NutrientType } from '../enums/NutrientType';

export interface NutritionStateChoroplethProps {
  setRegionLabelTooltips: (tooltips: L.Tooltip[]) => void;
  countryMapData: FeatureCollection<Geometry, CountryProps>;
  onDataUnavailable: () => void;
  selectedNutrient: NutrientType;
}
