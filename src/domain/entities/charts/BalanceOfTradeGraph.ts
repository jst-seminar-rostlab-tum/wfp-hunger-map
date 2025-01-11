import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType.ts';

import { ChartData } from '../common/ChartData';

export interface BalanceOfTradeGraph {
  type: ContinuousChartDataType.BALANCE_OF_TRADE_CHART;
  data: ChartData[];
}
