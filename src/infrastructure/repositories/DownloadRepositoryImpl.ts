import { CalendarDate } from '@internationalized/date';

import { ICountryData } from '@/domain/entities/download/Country';
import DownloadRepository from '@/domain/repositories/DownloadRepository';

export default class DownloadRepositoryImpl implements DownloadRepository {
  async getDownLoadCountryData(
    country: string,
    startDate: CalendarDate,
    endDate: CalendarDate
  ): Promise<ICountryData[]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/foodsecurity/country/${country}/region?date_start=${startDate.toString()}&date_end=${endDate.toString()}`
      );
      const data = await response.json();
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
