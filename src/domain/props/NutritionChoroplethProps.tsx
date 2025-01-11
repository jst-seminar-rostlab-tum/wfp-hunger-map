import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

export default interface NutritionChoroplethProps {
  data: FeatureCollection;
  countryId: number;
  regionNutritionData?: FeatureCollection;
  selectedCountryName?: string;
  regionLabelData?: FeatureCollection<Geometry, GeoJsonProperties>;
  setRegionLabelTooltips: (tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void;
  isLoadingCountry: boolean;
}
