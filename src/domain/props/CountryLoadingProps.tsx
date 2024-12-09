import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export default interface CountryLoadingProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  selectedCountryId: number;
  color: string;
}
