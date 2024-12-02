import { ChangeLogItem } from '@/domain/entities/ChangeLogItem';
import { ResponseWrapper } from '@/domain/entities/common/ResponseWrapper';
import { CountryAlertData } from '@/domain/entities/country/CountryAlertData';
import { CountryCodesData } from '@/domain/entities/country/CountryCodesData';
import { GlobalFcsData } from '@/domain/entities/country/CountryFcsData';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { CountryNutrition } from '@/domain/entities/country/CountryNutrition';
import { DisputedAreas } from '@/domain/entities/DisputedAreas';
import { YearInReview } from '@/domain/entities/YearInReview';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default class GlobalDataRepositoryImpl implements GlobalDataRepository {
  async getCountryCodes(): Promise<CountryCodesData[]> {
    const response = await fetch(`https://static.hungermapdata.org/insight-reports/latest/country.json`);
    return response.json();
  }

  async getYearInReviews(): Promise<YearInReview[]> {
    const response = await fetch(`https://static.hungermapdata.org/year-in-review/config.json`);
    return response.json();
  }

  async getChangeLog(): Promise<ChangeLogItem[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/changelog.json`);
    const data: ResponseWrapper<ChangeLogItem[]> = await response.json();
    return data.body;
  }

  async getAlertData(): Promise<CountryAlertData[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_V3_API_URL}/adm0/alertsAndCentroids.json`);
    const data: ResponseWrapper<CountryAlertData[]> = await response.json();
    return data.body;
  }

  async getDisputedAreas(): Promise<DisputedAreas> {
    const response = await fetch(`https://cdn.hungermapdata.org/hungermap/adm0_disputed_areas_lowres.json`, {
      next: { revalidate: 3600 * 12 },
    });
    return response.json();
  }

  async getMapDataForCountries(): Promise<CountryMapDataWrapper> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_V3_API_URL}/adm0data.json`, {
      next: { revalidate: 3600 * 12 }, // Next can't actually cache this, because the response is larger than 2MB
    });
    const data: ResponseWrapper<CountryMapDataWrapper> = await response.json();
    return data.body;
  }

  async getFcsData(): Promise<GlobalFcsData> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_V3_API_URL}/adm0/fcs.json`, {
      next: { revalidate: 3600 * 12 },
    });
    const data: ResponseWrapper<GlobalFcsData> = await response.json();
    return data.body;
  }

  async getIpcData(): Promise<CountryIpcData[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ipc.json`);
    const data: ResponseWrapper<CountryIpcData[]> = await response.json();
    return data.body;
  }

  async getNutritionData(): Promise<CountryNutrition> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mimiCountries.json`);
    return response.json();
  }
}
