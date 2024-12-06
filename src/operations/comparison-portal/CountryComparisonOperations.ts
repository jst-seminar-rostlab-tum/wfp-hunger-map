import container from '@/container';
import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { LineChartDataType } from '@/domain/enums/LineChartDataType';
import CountryRepository from '@/domain/repositories/CountryRepository';

export type CountryDataRecord = CountryData & { name: string };
export type CountryIso3DataRecord = CountryIso3Data & { name: string };

export class CountryComparisonOperations {
  static async fetchComparisonData(
    selectedCountries: CountryMapData[],
    setCountryDataList: (countryData: CountryDataRecord[] | undefined) => void,
    setCountryIso3DataList: (iso3Data: CountryIso3DataRecord[] | undefined) => void,
    setIsLoading: (isLoading: boolean) => void
  ) {
    setIsLoading(true);
    const countryRepo = container.resolve<CountryRepository>('CountryRepository');
    const countryDataPromises = selectedCountries.map((country) =>
      countryRepo.getCountryData(country.properties.adm0_id)
    );
    const countryIso3DataPromises = selectedCountries.map((country) =>
      countryRepo.getCountryIso3Data(country.properties.iso3)
    );

    const countryDataList = await Promise.all(countryDataPromises);
    const iso3DataList = await Promise.all(countryIso3DataPromises);

    setCountryDataList(
      countryDataList.map((countryData, index) => ({
        ...countryData,
        name: selectedCountries[index].properties.adm0_name,
      }))
    );
    setCountryIso3DataList(
      iso3DataList.map((iso3Data, index) => ({
        ...iso3Data,
        name: selectedCountries[index].properties.adm0_name,
      }))
    );
    setIsLoading(false);
  }

  static getFcsChartData(countryDataList: CountryDataRecord[]): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name: countryData.name,
        showRange: true,
        dataPoints: countryData.fcsGraph.map((fcsChartData) => ({
          x: new Date(fcsChartData.x).getTime(),
          y: fcsChartData.fcs,
          yRangeMin: fcsChartData.fcsLow,
          yRangeMax: fcsChartData.fcsHigh,
        })),
      })),
    };
  }

  static getRcsiChartData(countryDataList: CountryDataRecord[]): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name: countryData.name,
        showRange: true,
        dataPoints: countryData.rcsiGraph.map((rcsiChartData) => ({
          x: new Date(rcsiChartData.x).getTime(),
          y: rcsiChartData.rcsi,
          yRangeMin: rcsiChartData.rcsiLow,
          yRangeMax: rcsiChartData.rcsiHigh,
        })),
      })),
    };
  }
}
