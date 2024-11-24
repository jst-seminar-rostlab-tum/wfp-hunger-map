import { LineChartDataType } from '@/domain/enums/LineChartDataType';

import { ChartData } from '../common/ChartData';

export interface CurrencyExchangeGraph {
  type: LineChartDataType.CURRENCY_EXCHANGE_GRAPH;
  name: string;
  source: string;
  updated: string;
  data: ChartData[];
}
