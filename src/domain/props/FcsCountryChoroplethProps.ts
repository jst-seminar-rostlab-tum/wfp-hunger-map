import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';

export default interface FscCountryChoroplethProps {
  regionData: FeatureCollection<Geometry, GeoJsonProperties>;
  handleBackButtonClick?: () => void;
  regionLabelData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryMapData: CountryMapData;
  setRegionLabelTooltips: (tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void;
}
