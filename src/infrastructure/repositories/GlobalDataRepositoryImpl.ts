import { Adm0Data } from '@/domain/entities/Adm0Data';
import { ChangeLogItem } from '@/domain/entities/ChangeLogItem';
import { ResponseWrapper } from '@/domain/entities/common/ResponseWrapper';
import { CountryIpcData } from '@/domain/entities/country/CountryIpcData';
import { DisputedAreas } from '@/domain/entities/DisputedAreas';
import { YearInReview } from '@/domain/entities/YearInReview';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default class GlobalDataRepositoryImpl implements GlobalDataRepository {
  async getYearInReviews(): Promise<YearInReview[]> {
    const response = await fetch(`https://static.hungermapdata.org/year-in-review/config.json`);
    return response.json();
  }

  async getChangeLog(): Promise<ChangeLogItem[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/changelog.json`);
    const data: ResponseWrapper<ChangeLogItem> = await response.json();
    return data.body;
  }

  async getDisputedAreas(): Promise<DisputedAreas> {
    const response = await fetch(`https://cdn.hungermapdata.org/hungermap/adm0_disputed_areas_lowres.json`);
    return response.json();
  }

  async getAdm0Data(): Promise<Adm0Data[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adm0data.json`);
    const data: ResponseWrapper<Adm0Data> = await response.json();
    return data.body;
  }

  async getIpcData(): Promise<CountryIpcData[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ipc.json`);
    const data: ResponseWrapper<CountryIpcData> = await response.json();
    return data.body;
  }
}
