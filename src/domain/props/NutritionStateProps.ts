import { FeatureCollection, Geometry } from 'geojson';

import { CountryProps } from '@/domain/entities/country/CountryMapData.ts';

import { NutrientType } from '../enums/NutrientType';

export interface NutritionStateChoroplethProps {
  countryMapData: FeatureCollection<Geometry, CountryProps>;
  onDataUnavailable: () => void;
  selectedNutrient: NutrientType;
  setSelectedNutrient: React.Dispatch<React.SetStateAction<NutrientType>>;
}
