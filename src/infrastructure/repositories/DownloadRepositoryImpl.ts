import { CalendarDate } from '@internationalized/date';

import { ICountryData } from '@/domain/entities/download/Country';
import DownloadRepository from '@/domain/repositories/DownloadRepository';

export default class DownloadRepositoryImpl implements DownloadRepository {
  async getDownLoadCountryData(
    country: string,
    startDate: CalendarDate,
    endDate: CalendarDate
  ): Promise<ICountryData[] | undefined> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_V1}/foodsecurity/country/${country}/region?date_start=${startDate.toString()}&date_end=${endDate.toString()}`
      );

      // ensure the response is ok and there is data in the body
      if (response.ok) {
        const data = await response.json();
        if (data?.body && data?.body.length > 0) {
          return Promise.resolve(data.body);
        }
      }

      return Promise.resolve(undefined);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
