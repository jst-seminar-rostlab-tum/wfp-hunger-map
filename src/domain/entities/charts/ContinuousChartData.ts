import { AxisTypeValue, DashStyleValue } from 'highcharts';

import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType.ts';

export interface ContinuousChartDataPoint {
  x: number;
  y?: number;
  yRangeMin?: number;
  yRangeMax?: number;
}

export interface ChartVerticalLine {
  x: number;
  color?: string;
  dashStyle?: DashStyleValue;
}

export interface ChartVerticalBand {
  xStart?: number;
  xEnd?: number;
  color?: string;
  label?: string;
}

/**
 * Important: if xAxisType=AxisTypeValue.datetime is selected the lines.dataPoints x values should be
 * formatted as milliseconds: new Date(x).getTime() (example: new Date('2024-06-14').getTime()
 *
 * Important: the range defined by the `dataPoints` `yRangeMin` and `yRangeMax` is only displayed if showRange==true
 *
 * Important: if the `dashStyle` is not defined or 'Solid' the bars are filled entirely,
 * if any other `dashStyle` is chosen the bars are always filled with a "striped" pattern.
 *
 * If a line is marked as `prediction` the color and dash-style are automatically set by the ContinuousChart component.
 * If a `predictionVerticalLineX` is chosen a vertical band, titled with "Future" is added automatically,
 * starting from `predictionVerticalLineX` and spanning to the end of the chart.
 */
export interface ContinuousChartData {
  type: ContinuousChartDataType.LINE_CHART_DATA;
  xAxisType: AxisTypeValue;
  yAxisLabel?: string;
  predictionVerticalLineX?: number;
  lines: {
    name: string;
    dataPoints: ContinuousChartDataPoint[];
    showRange?: boolean;
    color?: string;
    dashStyle?: DashStyleValue;
    prediction?: boolean;
  }[];
  verticalLines?: ChartVerticalLine[];
  verticalBands?: ChartVerticalBand[];
}

export function isContinuousChartData(data: unknown): data is ContinuousChartData {
  return (data as ContinuousChartData).type === ContinuousChartDataType.LINE_CHART_DATA;
}
