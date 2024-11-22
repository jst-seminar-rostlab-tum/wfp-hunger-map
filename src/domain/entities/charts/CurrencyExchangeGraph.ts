import { LineChartDataType } from '@/domain/enums/LineChartDataType';

import { ChartData } from '../common/ChartData';

export interface CurrencyExchangeGraph {
  type: LineChartDataType.CurrencyExchangeGraph;
  name: string;
  source: string;
  updated: string;
  data: ChartData[];
}
