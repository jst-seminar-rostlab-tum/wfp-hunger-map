import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { Layer } from 'leaflet';

export type LayerWithFeature = Layer & {
  feature?: Feature<Geometry, GeoJsonProperties>;
};
