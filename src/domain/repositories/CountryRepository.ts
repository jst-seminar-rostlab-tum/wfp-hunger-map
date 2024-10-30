import { CountryData } from '../entities/country/CountryData';

export default interface CountryRepository {
  getCountryData(countryCode: number): Promise<CountryData>;
}
