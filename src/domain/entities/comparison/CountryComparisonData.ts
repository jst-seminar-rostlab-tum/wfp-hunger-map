import { CountryDataRecord } from '../country/CountryData';
import { CountryIso3DataRecord } from '../country/CountryIso3Data';

export interface CountryComparisonData {
  countryDataList: CountryDataRecord[];
  countryIso3DataList: CountryIso3DataRecord[];
}
