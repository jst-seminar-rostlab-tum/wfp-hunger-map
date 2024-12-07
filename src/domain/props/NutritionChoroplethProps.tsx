import { FeatureCollection } from 'geojson';

import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';

export default interface NutritionChoroplethProps {
  data: FeatureCollection;
  countryId: number;
  selectedCountryId?: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
  nutritionData: CountryNutrition;
  regionNutritionData?: FeatureCollection;
  selectedCountryName?: string;
}
