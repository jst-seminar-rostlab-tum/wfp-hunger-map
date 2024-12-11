import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

/**
 * helpers props
 */

export interface LineChartSliderButtonProps {
  showSlider: boolean;
  setShowSlider: Dispatch<SetStateAction<boolean>>;
  size: number;
}

export interface ChartAlternativeSwitchButtonProps {
  showAlternativeChart: boolean;
  setShowAlternativeChart: Dispatch<SetStateAction<boolean>>;
  size: number;
}

export interface ChartSliderProps {
  title?: string;
  sliderMin: number;
  sliderMax: number;
  selectedSliderRange: number[]; // [rangeMin, rangeMax]
  setSelectedSliderRange: Dispatch<SetStateAction<number[]>>;
}

export interface ChartDownloadButtonProps {
  chartRef: MutableRefObject<HighchartsReact.RefObject | null>;
  chartData: LineChartData | CategoricalChartData;
  size: number;
}

/**
 * main `ChartContainer` props
 */

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
  setShowAlternativeChart?: Dispatch<SetStateAction<boolean>>;

  // slider props
  disableSlider?: boolean; // todo removable ?
  sliderProps?: ChartSliderProps;
}
