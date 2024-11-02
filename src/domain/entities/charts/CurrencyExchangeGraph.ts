import { ChartData } from '../common/ChartData';

export interface CurrencyExchangeGraph {
  name: string;
  source: string;
  updated: string;
  data: ChartData[];
}
