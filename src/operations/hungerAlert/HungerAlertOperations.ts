import { CountryMapDataWrapper } from '@/domain/entities/country/CountryMapData';
import { CustomTableColumns, SimpleTableData } from '@/domain/props/CustomTableProps';

export default class HungerAlertOperations {
  static getHungerAlertData(countryMapData: CountryMapDataWrapper): SimpleTableData {
    try {
      return countryMapData.features
        .filter(({ properties: { fcs } }) => typeof fcs === 'number' && fcs >= 0.4)
        .sort((country1, country2) => (country2.properties.fcs as number) - (country1.properties.fcs as number))
        .map(({ properties: { adm0_name: countryName, fcs } }, index) => ({
          keyColumn: index + 1,
          country: countryName,
          fcs: `${Math.floor((fcs as number) * 100)}%`,
        }));
    } catch {
      return [];
    }
  }

  static getHungerAlertModalColumns() {
    return [
      { columnId: 'keyColumn', label: 'Rank' },
      { columnId: 'country', label: 'Country' },
      { columnId: 'fcs', label: 'FCS' },
    ] as CustomTableColumns;
  }

  static getPulseClasses(): string {
    return 'pulse w-48 h-48 rounded-full flex flex-col items-center justify-center text-center text-sm bg-content1 relative p-5';
  }
}
