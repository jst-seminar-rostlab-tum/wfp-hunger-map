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
    const response = await fetch(`${process.env.NEXT_PUBLIC_V3_API_URL}/adm0/alertsAndCentroids.json`, {
      next: { revalidate: 3600 * 12 },
    });
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
    const [response1, response2] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_V3_API_URL}/adm0data1.json`, {
        next: { revalidate: 3600 * 12 },
      }),
      fetch(`${process.env.NEXT_PUBLIC_V3_API_URL}/adm0data2.json`, {
        next: { revalidate: 3600 * 12 },
      }),
    ]);
    const [data1, data2]: ResponseWrapper<CountryMapDataWrapper>[] = await Promise.all([
      response1.json(),
      response2.json(),
    ]);
    return { type: data1.body.type, features: [...data1.body.features, ...data2.body.features] };
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
