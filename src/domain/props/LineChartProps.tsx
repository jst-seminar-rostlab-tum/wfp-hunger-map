import HighchartsReact from 'highcharts-react-official';
import { MutableRefObject } from 'react';

import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
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
  showSlider: boolean;
  setShowSlider: (b: boolean) => void;
  size: number;
}

export interface ChartTypeSwitchButtonProps {
  showAlternativeChart: boolean;
  setShowAlternativeChart: (b: boolean) => void;
  size: number;
}

export interface ChartSliderProps {
  title?: string;
  sliderMin: number;
  sliderMax: number;
  selectedSliderRange: number[]; // [rangeMin, rangeMax]
  setSelectedSliderRange: (ns: number[]) => void;
}

export interface ChartDownloadButtonProps {
  chartRef: MutableRefObject<HighchartsReact.RefObject | null>;
  chartData: LineChartData | CategoricalChartData;
}
