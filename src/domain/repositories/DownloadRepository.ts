import { CalendarDate } from '@internationalized/date';

import { ICountryData } from '../entities/download/Country';

export default interface DownloadRepository {
  /**
   * Get the related data for a country
   * @param country is the country to get data for
   * @param startDate is the start date of the data
   * @param endDate is the end date of the data
   */
  getDownLoadCountryData(
    country: string,
    startDate: CalendarDate,
    endDate: CalendarDate
  ): Promise<ICountryData[] | undefined>;
}
