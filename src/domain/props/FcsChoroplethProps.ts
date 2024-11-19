import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';

export default interface FcsChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  style: PathOptions;
  countryId: number;
  selectedCountryId?: number;
  setSelectedCountryId: (countryId: number) => void;
}
