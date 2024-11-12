import { AxisTypeValue } from 'highcharts';

export interface LineChartDataPoint {
  y: number;
  x: string;
  yRangeMin?: number;
  yRangeMax?: number;
}

/**
 * Important: it is expected that all line data in `LineChartData.lines` have the same `x` values and
 * provide a `y` value for each `x` value. For example, if one line has values for x=1, x=2, and x=3,
 * the second line must also provide `y` values for these exact `x` values and no more or less.
 */
export interface LineChartData {
  type: 'LineChartData';
  xAxisType: AxisTypeValue; // can be one of linear, logarithmic, datetime or category
  yAxisLabel?: string;
  roundLines?: boolean;
  lines: {
    name: string;
    dataPoints: LineChartDataPoint[];
    showRange?: boolean;
    color?: string;
  }[];
}
