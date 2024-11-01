import { CountryData } from '@/domain/entities/country/CountryData';
import CountryRepository from '@/domain/repositories/CountryRepository';

export default class CountryRepositoryImpl implements CountryRepository {
  async getCountryData(countryCode: number): Promise<CountryData> {
    const response = await fetch(`https://api.hungermapdata.org/v2/adm0/${countryCode}/countryData.json`);
    return response.json();
  }
}
