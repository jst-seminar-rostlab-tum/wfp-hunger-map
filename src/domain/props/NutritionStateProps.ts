import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryMimiData } from '../entities/country/CountryMimiData';

export interface NutritionStateChoroplethProps {
  regionNutrition: CountryMimiData | undefined;
  regionData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryName?: string;
}
