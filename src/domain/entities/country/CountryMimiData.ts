import { LatLngExpression } from 'leaflet';

import { Geometry } from '../common/Geometry';
import { RegionNutritionProperties } from '../region/RegionNutritionProperties';

export interface CountryMimiData {
  type: string;
  'hc-transform': {
    default: {
      crs: string;
    };
  };
  features: {
    type: string;
    geometry: Geometry<LatLngExpression[][][]>;
    properties: RegionNutritionProperties;
    id: string;
  }[];
}
