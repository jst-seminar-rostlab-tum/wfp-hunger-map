import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';

export default interface ContinuousChartProps {
  data: ContinuousChartData | BalanceOfTradeGraph | CurrencyExchangeGraph | InflationGraphs;

  title?: string;
  description?: string;

  small?: boolean;
  noPadding?: boolean;
  transparentBackground?: boolean;

  disableExpandable?: boolean;
  disableBarChartSwitch?: boolean;
  disableXAxisSlider?: boolean;
  disableDownload?: boolean;
}
