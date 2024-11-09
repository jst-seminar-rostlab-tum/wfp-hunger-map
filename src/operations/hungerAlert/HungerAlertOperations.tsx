import container from '@/container';
import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import HungerLevel from '@/domain/entities/HungerLevel';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default class HungerAlertOperations {
  static async getHungerAlertData(countryMapData?: CountryMapDataWrapper): Promise<HungerLevel[]> {
    try {
      let data = countryMapData;
      if (!data || 'error' in data) {
        const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
        data = await globalRepo.getMapDataForCountries();
      }
      return data.features
        .filter(({ properties: { fcs } }) => typeof fcs === 'number' && fcs >= 0.4)
        .sort((a, b) => (b.properties.fcs as number) - (a.properties.fcs as number))
        .map(({ properties: { adm0_name: countryName, fcs } }, index) => ({
          rank: index + 1,
          country: countryName,
          fcs: `${Math.floor((fcs as number) * 100)}%`,
        }));
    } catch (error) {
      console.error('Error fetching or processing high hunger countries:', error);
      return [];
    }
  }

  static getHungerAlertModalColumns() {
    return [
      { label: 'Rank', key: 'rank' },
      { label: 'Country', key: 'country' },
      { label: 'FCS', key: 'fcs' },
    ];
  }
}
