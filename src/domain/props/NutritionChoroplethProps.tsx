import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryMimiData } from '@/domain/entities/country/CountryMimiData.ts';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition.ts';

import { AlertType } from '../enums/AlertType';

export default interface NutritionChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryId: number;
  selectedAlert: AlertType | null;
  selectedCountryId?: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
  toggleAlert: (alertType: AlertType) => void;
  nutritionData: CountryNutrition;
  regionNutritionData: CountryMimiData | undefined;
  regionData?: FeatureCollection<Geometry, GeoJsonProperties>;
}
