import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';

export default interface ContinuousChartProps {
  data: ContinuousChartData | CurrencyExchangeGraph | InflationGraphs;

  title?: string;
  description?: string;

  small?: boolean;
  noPadding?: boolean;
  transparentBackground?: boolean;
  chartHeight?: number;

  disableExpandable?: boolean;
  disableBarChartSwitch?: boolean;
  disableXAxisSlider?: boolean;
  disableDownload?: boolean;
  simplifyTooltip?: boolean;
}
