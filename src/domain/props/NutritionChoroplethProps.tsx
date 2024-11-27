import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryMimiData } from '@/domain/entities/country/CountryMimiData.ts';

export default interface NutritionChoroplethProps {
  countryId: number;
  selectedCountryId: number | undefined;
  regionData: FeatureCollection<Geometry, GeoJsonProperties> | undefined;
  regionNutritionData: CountryMimiData | undefined;
}
