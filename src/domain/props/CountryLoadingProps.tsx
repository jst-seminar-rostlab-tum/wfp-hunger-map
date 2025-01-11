import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export default interface CountryLoadingProps {
  countryMapData: FeatureCollection<Geometry, GeoJsonProperties>;
  color: string;
}
