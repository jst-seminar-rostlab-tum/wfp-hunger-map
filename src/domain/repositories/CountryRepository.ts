import { AdditionalCountryData } from '../entities/country/AdditionalCountryData';
import { CountryData } from '../entities/country/CountryData';

export default interface CountryRepository {
  getCountryData(countryCode: number): Promise<CountryData>;
  getRegionDataForCountry(countryCode: number): Promise<AdditionalCountryData>;
}
