import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { PathOptions } from 'leaflet';

interface TooltipProps {
  className?: string;
  render: (feature: Feature<Geometry, GeoJsonProperties>) => string;
}

export default interface NutritionChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  style?: PathOptions;
  handleClick?: (feature: GeoJsonProperties, bounds: L.LatLngBounds, map: L.Map) => void;
  onEachFeature?: (feature: GeoJsonProperties, layer: L.Layer) => void;
  tooltip?: TooltipProps;
}
