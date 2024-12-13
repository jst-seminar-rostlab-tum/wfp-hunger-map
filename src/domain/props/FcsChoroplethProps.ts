import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '@/domain/entities/country/CountryData.ts';
import { CountryFcsData } from '@/domain/entities/country/CountryFcsData.ts';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data.ts';

export default interface FcsChoroplethProps {
  data: FeatureCollection<Geometry, GeoJsonProperties>;
  countryId: number;
  selectedCountryId: number | null;
  setSelectedCountryId: (countryId: number | null) => void;
  loading: boolean;
  regionData?: FeatureCollection<Geometry, GeoJsonProperties>;
  countryData?: CountryData;
  countryIso3Data?: CountryIso3Data;
  selectedCountryName?: string;
  fcsData: Record<string, CountryFcsData>;
  regionLabelData?: FeatureCollection<Geometry, GeoJsonProperties>;
}
