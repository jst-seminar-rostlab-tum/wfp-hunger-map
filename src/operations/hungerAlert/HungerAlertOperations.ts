import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import HungerLevel from '@/domain/entities/HungerLevel';

export default class HungerAlertOperations {
  static getHungerAlertData(countryMapData: CountryMapDataWrapper): HungerLevel[] {
    try {
      return countryMapData.features
        .filter(({ properties: { fcs } }) => typeof fcs === 'number' && fcs >= 0.4)
        .sort((country1, country2) => (country2.properties.fcs as number) - (country1.properties.fcs as number))
        .map(({ properties: { adm0_name: countryName, fcs } }, index) => ({
          rank: index + 1,
          country: countryName,
          fcs: `${Math.floor((fcs as number) * 100)}%`,
        }));
    } catch {
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

  static getPulseClasses(): string {
    return 'pulse w-48 h-48 rounded-full flex flex-col items-center justify-center text-center bg-white dark:bg-content2 relative p-5';
  }
}
