import { GeoJsonProperties } from 'geojson';

interface TooltipProps {
  className?: string;
  render: (feature: GeoJsonProperties) => string;
}

export default interface NutritionStateChoroplethProps {
  regionNutri: GeoJSON.FeatureCollection | undefined;
  regionData: GeoJSON.FeatureCollection;
  handleClick?: (feature: GeoJsonProperties) => void;
  tooltip?: TooltipProps;
}
