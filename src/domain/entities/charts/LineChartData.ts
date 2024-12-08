import { AxisTypeValue, DashStyleValue } from 'highcharts';

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
 *
 * Important: the range defined by the `dataPoints` `yRangeMin` and `yRangeMax` is only displayed if showRange==true
 *
 * Important: if the `dashStyle` is not defined or 'Solid' the bars are filled entirely,
 * if any other `dashStyle` is chosen the bars are always filled with a "striped" pattern.
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
    dashStyle?: DashStyleValue;
  }[];
  verticalLines?: {
    x: number;
    color?: string;
    dashStyle?: DashStyleValue;
  }[];
  verticalBands?: {
    xStart: number;
    xEnd: number;
    color?: string;
    label?: string;
  }[];
}
