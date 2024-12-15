import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export default interface LineChartProps {
  data: LineChartData | BalanceOfTradeGraph | CurrencyExchangeGraph | InflationGraphs;

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
