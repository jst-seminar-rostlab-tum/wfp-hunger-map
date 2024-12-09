import { AxisTypeValue, DashStyleValue } from 'highcharts';

import { LineChartDataType } from '@/domain/enums/LineChartDataType';

export interface LineChartDataPoint {
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
  xStart?: number; // if null -> band extends to the end of the axis dynamically
  xEnd?: number; // if null -> band extends to the end of the axis dynamically
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
 * If a line is marked as `prediction` the color and dash-style are automatically set by the LineChart component.
 * If a `predictionVerticalLineX` is chosen a vertical band, titled with "Future" is added automatically,
 * starting from `predictionVerticalLineX` and spanning to the end of the chart.
 */
export interface LineChartData {
  type: LineChartDataType.LINE_CHART_DATA;
  xAxisType: AxisTypeValue;
  yAxisLabel?: string;
  roundLines?: boolean;
  predictionVerticalLineX?: number;
  lines: {
    name: string;
    dataPoints: LineChartDataPoint[];
    showRange?: boolean;
    color?: string;
    dashStyle?: DashStyleValue;
    prediction?: boolean;
  }[];
  verticalLines?: ChartVerticalLine[];
  verticalBands?: ChartVerticalBand[];
}
