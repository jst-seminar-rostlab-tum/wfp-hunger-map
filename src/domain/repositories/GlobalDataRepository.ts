import { CountryNutrition } from '@/domain/entities/country/CountryNutrition';

import { ChangeLogItem } from '../entities/ChangeLogItem';
import { CountryAlertData } from '../entities/country/CountryAlertData';
import { CountryCodesData } from '../entities/country/CountryCodesData';
import { GlobalFcsData } from '../entities/country/CountryFcsData';
import { CountryIpcData } from '../entities/country/CountryIpcData';
import { CountryMapDataWrapper } from '../entities/country/CountryMapData';
import { DisputedAreas } from '../entities/DisputedAreas';
import { YearInReview } from '../entities/YearInReview';

export interface GlobalDataRepository {
  /**
   * Returns the ID and ISO codes of all the countries, plus a summary report for each.
   */
  getCountryCodes(): Promise<CountryCodesData[]>;
  /**
   * Returns the national FCS data of all the countries
   */
  getFcsData(): Promise<GlobalFcsData>;
  /**
   * Returns the national IPC data of all the countries
   */
  getIpcData(): Promise<CountryIpcData[]>;

  /**
   * Returns the alert and centroid data of all the countries
   */
  getAlertData(): Promise<CountryAlertData[]>;

  /**
   * Returns the polygons for the countries and whether any alerts are active in the country
   * (The alerts shown on the Current Food Consuption map, e.g. countries with >=1 fatality...)
   */
  getMapDataForCountries(): Promise<CountryMapDataWrapper>;

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

  getNutritionData(): Promise<CountryNutrition>;
}
