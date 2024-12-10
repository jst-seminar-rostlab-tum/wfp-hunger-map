import Highcharts from 'highcharts';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export default interface ChartModalProps {
  chartOptions: Highcharts.Options;
  chartData: LineChartData | CategoricalChartData;

  title?: string;
  description?: string;

  disableDownload?: boolean;

  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;

  showSlider?: boolean;
  setShowSlider?: (b: boolean) => void;

  // alternative chart switch
  disableAlternativeChart?: boolean;
  showAlternativeChart?: boolean;
  setShowAlternativeChart?: (b: boolean) => void;

  // slider props
  disableSlider?: boolean;
  sliderTitle?: string;
  sliderMin?: number;
  sliderMax?: number;
  selectedSliderRange?: number[]; // [rangeMin, rangeMax]
  setSelectedSliderRange?: (ns: number[]) => void;
}
