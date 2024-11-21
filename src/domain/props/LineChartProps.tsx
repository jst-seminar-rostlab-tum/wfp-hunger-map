import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export default interface LineChartProps {
  title?: string;
  description?: string;
  expandable?: boolean;
  small?: boolean;
  barChartSwitch?: boolean;
  xAxisSlider?: boolean;
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

export interface LineChartXAxisSlider {
  selectedXAxisRange: number[]; // [xAxisRangeMinIndex, xAxisRangeMaxIndex]
  setSelectedXAxisRange: (ns: number[]) => void;
  data: LineChartData;
}
