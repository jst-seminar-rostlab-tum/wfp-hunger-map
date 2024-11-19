import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '../entities/country/CountryData';
import { CountryIso3Data } from '../entities/country/CountryIso3Data';

export default interface FscCountryChoroplethProps {
  regionData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryData: CountryData | undefined;
  countryIso3Data: CountryIso3Data | undefined;
  loading: boolean;
}
