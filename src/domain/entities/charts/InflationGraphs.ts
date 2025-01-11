import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType.ts';

import { ChartData } from '../common/ChartData';

export interface InflationGraphs {
  type: ContinuousChartDataType.INFLATION_CHARTS;
  headline: {
    data: ChartData[] | undefined;
  };
  food: {
    data: ChartData[] | undefined;
  };
}
