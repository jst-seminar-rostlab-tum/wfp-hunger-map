import { LineChartDataType } from '@/domain/enums/LineChartDataType';

import { ChartData } from '../common/ChartData';

export interface BalanceOfTradeGraph {
  type: LineChartDataType.BALANCE_OF_TRADE_CHART;
  data: ChartData[];
}
