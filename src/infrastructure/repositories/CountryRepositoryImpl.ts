import { AdditionalCountryData } from '@/domain/entities/country/AdditionalCountryData';
import { CountryData } from '@/domain/entities/country/CountryData';
import CountryRepository from '@/domain/repositories/CountryRepository';

export default class CountryRepositoryImpl implements CountryRepository {
  async getCountryData(countryCode: number): Promise<CountryData> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adm0/${countryCode}/countryData.json`);
    return response.json();
  }

  async getRegionDataForCountry(countryCode: number): Promise<AdditionalCountryData> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adm0/${countryCode}/adm1data.json`);
    return response.json();
  }
}
