import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export default interface NutritionChoroplethProps {
  data: FeatureCollection;
  countryId: number;
  regionNutritionData?: FeatureCollection;
  selectedCountryName?: string;
  regionLabelData?: FeatureCollection<Geometry, GeoJsonProperties>;
}
