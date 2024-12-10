import HighchartsReact from 'highcharts-react-official';
import { MutableRefObject } from 'react';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export default interface ChartContainerProps {
  chartOptions: Highcharts.Options;
  chartData: LineChartData | CategoricalChartData;

  title?: string;
  description?: string;
  small?: boolean;
  noPadding?: boolean;

  disableExpandable?: boolean;
  disableDownload?: boolean;
  transparentBackground?: boolean;

  // alternative chart switch
  disableAlternativeChart?: boolean;
  showAlternativeChart?: boolean;
  setShowAlternativeChart?: (b: boolean) => void;

  // slider props
  disableSlider?: boolean;
  sliderTitle?: string;
  sliderMin?: number;
  sliderMax?: number;
  selectedSliderRange: number[]; // [rangeMin, rangeMax]
  setSelectedSliderRange: (ns: number[]) => void;
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
