import HighchartsReact from 'highcharts-react-official';
import { MutableRefObject } from 'react';

import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export default interface LineChartProps {
  title?: string;
  description?: string;
  expandable?: boolean;
  barChartSwitch?: boolean;
  xAxisSlider?: boolean;
  small?: boolean;
  disableDownload?: boolean;
  roundLines?: boolean;
  noPadding?: boolean;
  transparentBackground?: boolean;
  data: LineChartData | BalanceOfTradeGraph | CurrencyExchangeGraph | InflationGraphs;
}

/**
 * following: helpers props
 */

export interface LineChartSliderButtonProps {
  showXAxisSlider: boolean;
  setShowXAxisSlider: (b: boolean) => void;
  size: number;
}

export interface LineChartBarLineSwitchButtonProps {
  showBarChart: boolean;
  setShowBarChart: (b: boolean) => void;
  size: number;
}

export interface LineChartXAxisSliderProps {
  selectedXAxisRange: number[]; // [xAxisRangeMinIndex, xAxisRangeMaxIndex]
  setSelectedXAxisRange: (ns: number[]) => void;
  data: LineChartData;
}

export interface LineChartDownloadButtonProps {
  chartRef: MutableRefObject<HighchartsReact.RefObject | null>;
  lineChartData: LineChartData;
}
