import { AxisTypeValue } from 'highcharts';

import { LineChartDataType } from '@/domain/enums/LineChartDataType';

export interface LineChartDataPoint {
  x: number;
  y?: number;
  yRangeMin?: number;
  yRangeMax?: number;
}

/**
 * Important: if xAxisType=AxisTypeValue.datetime is selected the lines.dataPoints x values should be
 * formatted as milliseconds: new Date(x).getTime() (example: new Date('2024-06-14').getTime()
 */
export interface LineChartData {
  type: LineChartDataType.LINE_CHART_DATA;
  xAxisType: AxisTypeValue;
  yAxisLabel?: string;
  roundLines?: boolean;
  lines: {
    name: string;
    dataPoints: LineChartDataPoint[];
    showRange?: boolean;
    color?: string;
  }[];
}
