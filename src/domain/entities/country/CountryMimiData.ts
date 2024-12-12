import { Feature } from '@/domain/entities/common/Feature.ts';

import { RegionNutritionProperties } from '../region/RegionNutritionProperties';

export interface CountryMimiData {
  type: string;
  'hc-transform': {
    default: {
      crs: string;
    };
  };
  features: (Feature<RegionNutritionProperties> & {
    id: string;
  })[];
}
