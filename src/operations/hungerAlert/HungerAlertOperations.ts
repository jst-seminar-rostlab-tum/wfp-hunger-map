import { GlobalFcsData } from '@/domain/entities/country/CountryFcsData';
import { CustomTableColumns, SimpleTableData } from '@/domain/props/CustomTableProps';

export default class HungerAlertOperations {
  static getHungerAlertData(countryFcsData: GlobalFcsData): SimpleTableData {
    try {
      return Object.keys(countryFcsData)
        .map((countryCode) => parseInt(countryCode, 10))
        .filter((countryCode) => countryFcsData[countryCode].fcs >= 0.4)
        .sort((countryCode1, countryCode2) => countryFcsData[countryCode2].fcs - countryFcsData[countryCode1].fcs)
        .map((countryCode, index) => ({
          keyColumn: index + 1,
          country: countryFcsData[countryCode].country_name,
          fcs: `${Math.floor(countryFcsData[countryCode].fcs * 100)}%`,
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
    return 'pulse w-12 h-12 rounded-full flex flex-col items-center justify-center text-center text-sm bg-content1 relative p-5 m-2';
  }
}
