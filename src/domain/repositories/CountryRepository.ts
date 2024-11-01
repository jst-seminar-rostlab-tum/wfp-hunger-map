import { AdditionalCountryData } from '../entities/country/AdditionalCountryData';
import { CountryCodesData } from '../entities/country/CountryCodesData';
import { CountryData } from '../entities/country/CountryData';
import { CountryIso3Data } from '../entities/country/CountryIso3Data';
import { CountryIso3Notes } from '../entities/country/CountryIso3Notes';
import { CountryMimiData } from '../entities/country/CountryMimiData';

export default interface CountryRepository {
  getCountryCodes(): Promise<CountryCodesData[]>;
  getCountryData(countryId: number): Promise<CountryData>;
  getRegionData(countryId: number): Promise<AdditionalCountryData>;
  getCountryIso3Data(countryCode: string): Promise<CountryIso3Data>;
  getCountryIso3Notes(countryCode: string): Promise<CountryIso3Notes>; // probably unused
  getRegionNutritionData(countryId: number): Promise<CountryMimiData>; // probably unused
}
