import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';

import { AlertType } from '../enums/AlertType';

export default interface FcsChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryId: number;
  selectedCountryId: number | null;
  selectedAlert: AlertType | null;
  setSelectedCountryId: (countryId: number) => void;
  setSelectedMapVisibility: (visibility: boolean) => void;
  toggleAlert: (alertType: AlertType) => void;
  loading: boolean;
  regionData?: FeatureCollection<Geometry, GeoJsonProperties>;
  countryData?: CountryData;
  countryIso3Data?: CountryIso3Data;
}
