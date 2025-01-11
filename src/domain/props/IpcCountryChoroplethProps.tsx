import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export default interface IpcCountryChoroplethProps {
  regionIpcData: FeatureCollection<Geometry, GeoJsonProperties>;
}
