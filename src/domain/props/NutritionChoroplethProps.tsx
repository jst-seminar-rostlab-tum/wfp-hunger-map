import { FeatureCollection } from 'geojson';

export default interface NutritionChoroplethProps {
  data: FeatureCollection;
  countryId: number;
  regionNutritionData?: FeatureCollection;
  selectedCountryName?: string;
}
