import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { CountryDataRecord } from '@/domain/entities/country/CountryData';
import { CountryIso3DataRecord } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { LineChartDataType } from '@/domain/enums/LineChartDataType';
import { formatToMillion } from '@/utils/formatting.ts';

export class CountryComparisonOperations {
  static getFcsChartData(countryDataList: CountryDataRecord[], countryMapData: CountryMapData[]): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name:
          // TODO: extract this into a helper function, e.g. getName(country, fallback='')
          countryMapData.find((country) => country.properties.adm0_id === countryData.id)?.properties.adm0_name || '',
        showRange: true,
        dataPoints: countryData.fcsGraph.map((fcsChartData) => ({
          x: new Date(fcsChartData.x).getTime(),
          y: formatToMillion(fcsChartData.fcs),
          yRangeMin: formatToMillion(fcsChartData.fcsLow),
          yRangeMax: formatToMillion(fcsChartData.fcsHigh),
        })),
      })),
    };
  }

  static getRcsiChartData(countryDataList: CountryDataRecord[], countryMapData: CountryMapData[]): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name:
          countryMapData.find((country) => country.properties.adm0_id === countryData.id)?.properties.adm0_name || '',
        showRange: true,
        dataPoints: countryData.rcsiGraph.map((rcsiChartData) => ({
          x: new Date(rcsiChartData.x).getTime(),
          y: formatToMillion(rcsiChartData.rcsi),
          yRangeMin: formatToMillion(rcsiChartData.rcsiLow),
          yRangeMax: formatToMillion(rcsiChartData.rcsiHigh),
        })),
      })),
    };
  }

  static getFoodSecurityBarChartData(
    countryDataList: CountryDataRecord[],
    countryMapData: CountryMapData[]
  ): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'category',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name:
          countryMapData.find((country) => country.properties.adm0_id === countryData.id)?.properties.adm0_name || '',
        showRange: false,
        dataPoints: [
          {
            x: 0, // TODO: f-165 this should be 'population'
            y: countryData.population,
          },
          {
            x: 1, // TODO: f-165 this should be 'people with insufficient food consumption'
            y: countryData.fcs,
          },
        ],
      })),
    };
  }

  static getImportDependencyBarChartData(
    countryDataList: CountryDataRecord[],
    selectedCountries: CountryMapData[]
  ): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'category',
      yAxisLabel: '% of Cereals',
      lines: countryDataList.map((countryData) => ({
        name:
          selectedCountries.find((country) => country.properties.adm0_id === countryData.id)?.properties.adm0_name ||
          '',
        showRange: false,
        dataPoints: [
          {
            x: 0, // TODO: f-165: should be the individual value of the country variable
            y: countryData.importDependency,
          },
        ],
      })),
    };
  }

  static getBalanceOfTradeData(
    countryIso3DataList: CountryIso3DataRecord[],
    selectedCountries: CountryMapData[]
  ): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      // TODO: What's the unit here? Million Dollars?
      yAxisLabel: 'Mill',
      lines: countryIso3DataList.map((countryIso3Data) => ({
        name:
          selectedCountries.find((country) => country.properties.iso3 === countryIso3Data.id)?.properties.adm0_name ||
          '',
        dataPoints: countryIso3Data.balanceOfTradeGraph.data.map((p) => {
          return { x: new Date(p.x).getTime(), y: formatToMillion(p.y) };
        }),
      })),
    };
  }

  static getInflationData(
    countryIso3DataList: CountryIso3DataRecord[],
    selectedCountries: CountryMapData[],
    type: 'headline' | 'food'
  ): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Rate in %',
      lines: countryIso3DataList.map((countryIso3Data) => ({
        name:
          selectedCountries.find((country) => country.properties.iso3 === countryIso3Data.id)?.properties.adm0_name ||
          '',
        dataPoints: countryIso3Data.inflationGraphs[type].data.map((p) => {
          return { x: new Date(p.x).getTime(), y: p.y };
        }),
      })),
    };
  }
}
