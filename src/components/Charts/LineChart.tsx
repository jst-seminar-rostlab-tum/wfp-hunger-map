'use client';

import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

import LineChartProps from '@/domain/props/LineChartProps';
import LineChartOperations from '@/operations/charts/LineCharOperations.ts';

export function LineChart({ title, description, expandable, data }: LineChartProps) {
  const options: Highcharts.Options = LineChartOperations.getHighChartData(data);
  return (
    <div>
      {title} {description} {expandable}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
