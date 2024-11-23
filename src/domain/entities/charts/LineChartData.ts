import { AxisTypeValue } from 'highcharts';

import { LineChartDataType } from '@/domain/enums/LineChartDataType';

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
 *
 * Important: if xAxisType=AxisTypeValue.datetime is selected
 * the lines.dataPoints x values should be formatted as follows: 'YYYY-mm-dd' (example: '2024-06-14')
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
