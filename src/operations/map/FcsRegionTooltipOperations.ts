import { FcsChartData } from '@/domain/entities/charts/FcsChartData';
import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { formatToMillion } from '@/utils/formatting';

export class FcsRegionTooltipOperations {
  static getFcsChartData(chartData: FcsChartData[]): LineChartData {
    return {
      type: 'LineChartData',
      xAxisType: 'linear',
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
