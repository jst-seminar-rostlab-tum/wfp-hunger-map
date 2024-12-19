import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import L from 'leaflet';

import { CountryMapData } from '@/domain/entities/country/CountryMapData.ts';

import { CountryData } from '../entities/country/CountryData';
import { CountryIso3Data } from '../entities/country/CountryIso3Data';

export default interface FscCountryChoroplethProps {
  regionData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryData?: CountryData;
  countryIso3Data?: CountryIso3Data;
  countryName?: string;
  loading: boolean;
  handleBackButtonClick?: () => void;
  regionLabelData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryMapData: CountryMapData;
  setRegionLabelTooltips: (tooltips: (prevRegionLabelData: L.Tooltip[]) => L.Tooltip[]) => void;
}
