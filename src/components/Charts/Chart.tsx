/* eslint-disable react/destructuring-assignment */

'use client';

import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

import ChartProps from '@/domain/props/ChartProps';
import ChartOperations from '@/operations/charts/ChartOperations';

export function Chart({ chartData }: ChartProps) {
  const options: Highcharts.Options = ChartOperations.getChartData(chartData);
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
