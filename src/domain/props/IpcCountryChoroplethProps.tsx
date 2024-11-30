import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import { CountryData } from '../entities/country/CountryData';

export default interface IpcCountryChoroplethProps {
  regionIpcData: FeatureCollection<Geometry, GeoJsonProperties>;
  countryData: CountryData | undefined;
  countryName: string | null;
  handleBackButtonClick?: () => void;
}
