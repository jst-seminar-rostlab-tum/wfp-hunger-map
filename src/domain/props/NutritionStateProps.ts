import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Layer } from 'leaflet';

export interface NutritionStateChoroplethProps {
  regionNutrition?: FeatureCollection;
  countryName?: string;
  handleClick?: (feature: GeoJsonProperties) => void;
  handleBackButtonClick?: () => void;
  tooltip?: { className?: string };
}

export type LayerWithFeature = Layer & {
  feature?: Feature<Geometry, GeoJsonProperties>;
};
