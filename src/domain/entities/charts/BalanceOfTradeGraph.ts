import { LineChartDataType } from '@/domain/enums/LineChartDataType';

import { ChartData } from '../common/ChartData';

export interface BalanceOfTradeGraph {
  type: LineChartDataType.BalanceOfTradeGraph;
  data: ChartData[];
}
