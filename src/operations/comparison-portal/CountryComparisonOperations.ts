import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { CountryDataRecord } from '@/domain/entities/country/CountryData';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { LineChartDataType } from '@/domain/enums/LineChartDataType';

export class CountryComparisonOperations {
  static getFcsChartData(countryDataList: CountryDataRecord[], countryMapData: CountryMapData[]): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name:
          countryMapData.find((country) => country.properties.adm0_id === countryData.id)?.properties.adm0_name || '',
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
          y: rcsiChartData.rcsi,
          yRangeMin: rcsiChartData.rcsiLow,
          yRangeMax: rcsiChartData.rcsiHigh,
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
}
