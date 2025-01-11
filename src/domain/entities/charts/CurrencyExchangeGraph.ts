import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType.ts';

import { ChartData } from '../common/ChartData';

export interface CurrencyExchangeGraph {
  type: ContinuousChartDataType.CURRENCY_EXCHANGE_CHART;
  name: string;
  source: string;
  updated: string;
  data: ChartData[];
}
