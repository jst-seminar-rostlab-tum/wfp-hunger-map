import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { FcsChartData } from '@/domain/entities/charts/FcsChartData';
import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType.ts';
import { formatToMillion } from '@/utils/formatting';

export class FcsRegionTooltipOperations {
  static getFcsChartData(chartData: FcsChartData[]): ContinuousChartData {
    return {
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: [
        {
          name: 'People with insufficient food consumption',
          dataPoints: chartData.map((fcsChartData) => ({
            x: new Date(fcsChartData.x).getTime(),
            y: formatToMillion(fcsChartData.fcs),
          })),
        },
      ],
    };
  }
}
