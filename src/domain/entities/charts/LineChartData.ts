import { AxisTypeValue } from 'highcharts';

export interface LineChartDataPoint {
  y: number;
  x: string;
  yRangeMin?: number;
  yRangeMax?: number;
}

export interface LineChartData {
  type: 'LineChartData';
  title?: string;
  xAxisType: AxisTypeValue; // can be one of linear, logarithmic, datetime or category
  yAxisLabel: string;
  line: {
    name: string;
    dataPoints: LineChartDataPoint[];
    showRange?: boolean;
    color?: string;
  }[];
}
