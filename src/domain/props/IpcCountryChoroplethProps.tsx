import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '../entities/country/CountryData';
import { CountryIso3Data } from '../entities/country/CountryIso3Data';

export default interface IpcCountryChoroplethProps {
  regionIpcData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryData: CountryData | undefined;
  countryName?: string;
  countryIso3Data: CountryIso3Data | undefined;
}
