import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '../entities/country/CountryData';
import { CountryIso3Data } from '../entities/country/CountryIso3Data';

export default interface FscCountryChoroplethProps {
  regionData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryData?: CountryData;
  countryIso3Data?: CountryIso3Data;
  countryName: string | null;
  loading: boolean;
  handleBackButtonClick?: () => void;
}
