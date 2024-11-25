import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { AlertType } from '../enums/AlertType';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';

export default interface NutritionChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryId: number;
  selectedAlert: AlertType | null;
  selectedCountryId?: number;
  setSelectedCountryId: (countryId?: number) => void;
  toggleAlert: (alertType: AlertType) => void;
  nutritionData: CountryNutrition;
}
