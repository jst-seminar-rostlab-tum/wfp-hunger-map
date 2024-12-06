import container from '@/container';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import CountryRepository from '@/domain/repositories/CountryRepository';

export class CountryComparisonOperations {
  static async fetchComparisonData(
    selectedCountries: CountryMapData[],
    setCountryData: (countryData: CountryData[] | undefined) => void,
    setCountryIso3Data: (iso3Data: CountryIso3Data[] | undefined) => void
  ) {
    const countryRepository = container.resolve<CountryRepository>('CountryRepository');
    const countryDataPromises = selectedCountries.map((selectedCountry) =>
      countryRepository.getCountryData(selectedCountry.properties.adm0_id)
    );
    const countryIso3DataPromises = selectedCountries.map((selectedCountry) =>
      countryRepository.getCountryIso3Data(selectedCountry.properties.iso3)
    );
    const [countryData, countryIso3Data] = await Promise.all([
      Promise.all(countryDataPromises),
      Promise.all(countryIso3DataPromises),
    ]);
    setCountryData(countryData);
    setCountryIso3Data(countryIso3Data);
  }
}
