import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { CountryDataRecord } from '@/domain/entities/country/CountryData';
import { LineChartDataType } from '@/domain/enums/LineChartDataType';

export class CountryComparisonOperations {
  static getFcsChartData(countryDataList: CountryDataRecord[]): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name: countryData.id,
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
        name: countryData.id,
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
