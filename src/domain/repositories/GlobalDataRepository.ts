import { Adm0Data } from '../entities/Adm0Data';
import { ChangeLogItem } from '../entities/ChangeLogItem';
import { CountryIpcData } from '../entities/country/CountryIpcData';
import { DisputedAreas } from '../entities/DisputedAreas';
import { YearInReview } from '../entities/YearInReview';

export interface GlobalDataRepository {
  getIpcData(): Promise<CountryIpcData[]>;
  getAdm0Data(): Promise<Adm0Data[]>;
  getDisputedAreas(): Promise<DisputedAreas>;
  getChangeLog(): Promise<ChangeLogItem[]>;
  getYearInReviews(): Promise<YearInReview[]>;
}
