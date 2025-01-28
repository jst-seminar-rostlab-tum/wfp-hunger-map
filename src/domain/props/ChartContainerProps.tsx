import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { ChartType } from '@/domain/enums/ChartType.ts';

/**
 * helpers props
 */

export interface ChartSliderButtonProps {
  showSlider: boolean;
  setShowSlider: Dispatch<SetStateAction<boolean>>;
  small?: boolean;
}

export interface ChartAlternativeSwitchButtonProps {
  defaultChartType: ChartType;
  alternativeChartType: ChartType;
  showAlternativeChart: boolean;
  setShowAlternativeChart: Dispatch<SetStateAction<boolean>>;
  small?: boolean;
}

export interface ChartRelativeNumbersSwitchButtonProps {
  showRelativeNumbers: boolean;
  setShowRelativeNumbers: Dispatch<SetStateAction<boolean>>;
  small?: boolean;
}

export interface ChartDownloadButtonProps {
  chartRef: MutableRefObject<HighchartsReact.RefObject | null>;
  chartData: ContinuousChartData | CategoricalChartData;
  small?: boolean;
}

export interface ChartSliderProps {
  title?: string;
  sliderMin: number;
  sliderMax: number;
  selectedSliderRange: number[]; // [rangeMin, rangeMax]
  setSelectedSliderRange: Dispatch<SetStateAction<number[]>>;
}

/**
 * main `ChartContainer` props
 */

export default interface ChartContainerProps {
  chartData: ContinuousChartData | CategoricalChartData;
  chartOptions?: Highcharts.Options;
  recalculateChartOptions: () => void;

  title?: string;
  description?: string;
  small?: boolean;
  noPadding?: boolean;
  transparentBackground?: boolean;
  chartHeight?: number;

  disableExpandable?: boolean;
  disableDownload?: boolean;

  relativeNumbersSwitchButtonProps?: ChartRelativeNumbersSwitchButtonProps;

  alternativeSwitchButtonProps?: ChartAlternativeSwitchButtonProps;

  sliderProps?: ChartSliderProps;
}
