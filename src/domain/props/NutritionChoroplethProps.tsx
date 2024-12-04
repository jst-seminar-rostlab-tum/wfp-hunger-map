import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';

export default interface NutritionChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryId: number;
  selectedCountryId?: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
  nutritionData: CountryNutrition;
  regionNutritionData: FeatureCollection | undefined;
  regionData?: FeatureCollection<Geometry, GeoJsonProperties>;
  selectedCountryName?: string;
}
