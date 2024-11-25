import { LineChartDataType } from '@/domain/enums/LineChartDataType';

import { ChartData } from '../common/ChartData';

export interface InflationGraphs {
  type: LineChartDataType.INFLATION_GRAPHS;
  headline: {
    data: ChartData[];
  };
  food: {
    data: ChartData[];
  };
}
