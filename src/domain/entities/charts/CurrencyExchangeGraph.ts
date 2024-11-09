import { ChartData } from '../common/ChartData';

export interface CurrencyExchangeGraph {
  type: 'CurrencyExchangeGraph';
  name: string;
  source: string;
  updated: string;
  data: ChartData[];
}
