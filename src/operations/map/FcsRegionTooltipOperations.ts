import { FcsChartData } from '@/domain/entities/charts/FcsChartData';
import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { LineChartDataType } from '@/domain/enums/LineChartDataType';
import { formatToMillion } from '@/utils/formatting';

export class FcsRegionTooltipOperations {
  static getFcsChartData(chartData: FcsChartData[]): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      roundLines: false,
      lines: [
        {
          name: 'People with insufficient food consumption',
          dataPoints: chartData.map((fcsChartData) => ({
            x: fcsChartData.x,
            y: formatToMillion(fcsChartData.fcs),
          })),
        },
      ],
    };
  }
}
