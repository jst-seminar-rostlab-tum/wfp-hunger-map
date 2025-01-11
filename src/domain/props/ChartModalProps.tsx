import Highcharts from 'highcharts';
import { Dispatch, SetStateAction } from 'react';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { ChartAlternativeSwitchButtonProps, ChartSliderProps } from '@/domain/props/ChartContainerProps';

export default interface ChartModalProps {
  chartOptions?: Highcharts.Options;
  chartData: ContinuousChartData | CategoricalChartData;

  title?: string;
  description?: string;
  disableDownload?: boolean;

  // modal open/close control
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;

  // alternative chart switch
  alternativeSwitchButtonProps?: ChartAlternativeSwitchButtonProps;

  // slider props
  sliderProps?: ChartSliderProps;
  showSlider?: boolean;
  setShowSlider?: Dispatch<SetStateAction<boolean>>;
}
