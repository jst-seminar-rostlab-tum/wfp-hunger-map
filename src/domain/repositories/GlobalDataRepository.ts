import { Adm0Data } from '../entities/Adm0Data';
import { ChangeLogItem } from '../entities/ChangeLogItem';
import { CountryIpcData } from '../entities/country/CountryIpcData';
import { DisputedAreas } from '../entities/DisputedAreas';
import { YearInReview } from '../entities/YearInReview';

export interface GlobalDataRepository {
  /**
   * Returns the national IPC data of all the countries
   */
  getIpcData(): Promise<CountryIpcData[]>;

  /**
   * Not sure what this returns :/
   */
  getAdm0Data(): Promise<Adm0Data[]>;

  /**
   * Returns all the disputed areas around the world
   */
  getDisputedAreas(): Promise<DisputedAreas>;

  /**
   * Returns the change log of the WFP HungerMap
   */
  getChangeLog(): Promise<ChangeLogItem[]>;

  /**
   * Return the Year in Review reports of the WFP HungerMap
   */
  getYearInReviews(): Promise<YearInReview[]>;
}
