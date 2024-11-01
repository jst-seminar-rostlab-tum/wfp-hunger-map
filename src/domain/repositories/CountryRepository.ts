import { AdditionalCountryData } from '../entities/country/AdditionalCountryData';
import { CountryData } from '../entities/country/CountryData';
import { CountryIso3Data } from '../entities/country/CountryIso3Data';
import { CountryIso3Notes } from '../entities/country/CountryIso3Notes';

export default interface CountryRepository {
  getCountryData(countryId: number): Promise<CountryData>;
  getRegionDataForCountry(countryId: number): Promise<AdditionalCountryData>;
  getCountryIso3Data(countryCode: string): Promise<CountryIso3Data>;
  getCountryIso3Notes(countryCode: string): Promise<CountryIso3Notes>; // probably unused
}
