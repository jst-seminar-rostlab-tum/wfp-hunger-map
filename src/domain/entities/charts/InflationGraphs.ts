import { LineChartDataType } from '@/domain/enums/LineChartDataType';

import { ChartData } from '../common/ChartData';

export interface InflationGraphs {
  type: LineChartDataType.INFLATION_CHARTS;
  headline: {
    data: ChartData[] | undefined;
  };
  food: {
    data: ChartData[] | undefined;
  };
}
