import { FeatureCollection, Geometry } from 'geojson';

import { CountryProps } from '../entities/country/CountryMapData';

export default interface IpcCountryChoroplethProps {
  countryMapData: FeatureCollection<Geometry, CountryProps>;
  onDataUnavailable: () => void;
}
