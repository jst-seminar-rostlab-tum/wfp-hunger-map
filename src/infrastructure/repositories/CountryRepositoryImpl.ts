import { FeatureCollection } from 'geojson';

import { AdditionalCountryData } from '@/domain/entities/country/AdditionalCountryData';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { CountryIso3Notes } from '@/domain/entities/country/CountryIso3Notes';
import { CountryMimiData } from '@/domain/entities/country/CountryMimiData';
import { RegionIpc } from '@/domain/entities/region/RegionIpc';
import CountryRepository from '@/domain/repositories/CountryRepository';

export default class CountryRepositoryImpl implements CountryRepository {
  async getCountryData(countryId: number): Promise<CountryData> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adm0/${countryId}/countryData.json`);
    return response.json();
  }

  async getRegionData(countryId: number): Promise<AdditionalCountryData> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adm0/${countryId}/adm1data.json`);
    return response.json();
  }

  async getCountryIso3Data(countryCode: string): Promise<CountryIso3Data> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/iso3/${countryCode}/countryIso3Data.json`);
    return response.json();
  }

  async getCountryIso3Notes(countryCode: string): Promise<CountryIso3Notes> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/iso3/${countryCode}/countryIso3Notes.json`);
    return response.json();
  }

  async getRegionNutritionData(countryId: number): Promise<CountryMimiData> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adm0Id/${countryId}/mimiAdm1CountryData.json`);
    return response.json();
  }

  async getRegionIpcData(countryId: number): Promise<RegionIpc> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adm0/${countryId}/ipc.geojson`);
    return response.json();
  }

  async getRegionLabelData(): Promise<FeatureCollection> {
    const response = await fetch('https://cdn.hungermapdata.org/hungermap/adm1_labels.geojson');
    return response.json();
  }
}
