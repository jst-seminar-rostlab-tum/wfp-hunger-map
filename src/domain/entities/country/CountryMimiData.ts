import { LatLngExpression } from 'leaflet';

import { Feature } from '@/domain/entities/common/Feature.ts';

import { Geometry } from '../common/Geometry';
import { RegionNutritionProperties } from '../region/RegionNutritionProperties';

export interface CountryMimiData {
  type: string;
  'hc-transform': {
    default: {
      crs: string;
    };
  };
  features: (Feature<RegionNutritionProperties> & {
    geometry: Geometry<LatLngExpression[][][]>;
    id: string;
  })[];
}
