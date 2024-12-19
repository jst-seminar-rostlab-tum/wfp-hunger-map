import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import { ChartType } from '@/domain/enums/ChartType.ts';

/**
 * helpers props
 */

export interface LineChartSliderButtonProps {
  showSlider: boolean;
  setShowSlider: Dispatch<SetStateAction<boolean>>;
  size?: number;
}

export interface ChartAlternativeSwitchButtonProps {
  defaultChartType: ChartType;
  alternativeChartType: ChartType;
  showAlternativeChart: boolean;
  setShowAlternativeChart: Dispatch<SetStateAction<boolean>>;
  size?: number;
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
  size?: number;
}

/**
 * main `ChartContainer` props
 */

export default interface ChartContainerProps {
  chartData: LineChartData | CategoricalChartData;
  chartOptions?: Highcharts.Options;
  recalculateChartOptions: () => void;

  title?: string;
  description?: string;
  small?: boolean;
  noPadding?: boolean;
  transparentBackground?: boolean;

  disableExpandable?: boolean;
  disableDownload?: boolean;

  alternativeSwitchButtonProps?: ChartAlternativeSwitchButtonProps;

  sliderProps?: ChartSliderProps;
}
