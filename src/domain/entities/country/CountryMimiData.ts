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
    geometry: Geometry;
    properties: RegionNutritionProperties;
    id: string;
  }[];
}
