import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export default interface FcsChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryId: number;
  selectedCountryId?: number;
  setSelectedCountryId: (countryId?: number) => void;
  setSelectedMapVisibility: (visibility: boolean) => void;
}
