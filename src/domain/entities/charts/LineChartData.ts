import { AxisTypeValue } from 'highcharts';

export interface LineChartDataPoint {
  y: number;
  x: string;
  yRangeMin?: number;
  yRangeMax?: number;
}

export interface LineChartData {
  type: 'LineChartData';
  xAxisType: AxisTypeValue; // can be one of linear, logarithmic, datetime or category
  yAxisLabel: string;
  lines: {
    name: string;
    dataPoints: LineChartDataPoint[];
    showRange?: boolean;
    color?: string;
  }[];
}
