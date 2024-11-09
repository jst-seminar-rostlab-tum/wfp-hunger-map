import { AxisTypeValue } from 'highcharts';

export interface LineChartDataPoint {
  y: number;
  x: string;
  yRangeMin: number;
  yRangeMax: number;
}

export interface LineChartData {
  type: 'LineChartData';
  title?: string;
  xAxisType: AxisTypeValue;
  yAxisLabel: AxisTypeValue;
  line: {
    name: string;
    dataPoints: LineChartDataPoint[];
    showRange?: boolean;
    color?: string;
  }[];
}
