import { FeatureCollection } from 'geojson';

export default interface NutritionChoroplethProps {
  data: FeatureCollection;
  countryId: number;
  selectedCountryId?: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
  regionNutritionData?: FeatureCollection;
  selectedCountryName?: string;
}
