import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export default interface ChartContainerProps {
  chartOptions: Highcharts.Options;
  chartData: LineChartData | CategoricalChartData;
  title?: string;
  description?: string;
  small?: boolean;
  noPadding?: boolean;
  expandable?: boolean;
  transparentBackground?: boolean;
  chartTypeSwitchHandle?: () => void;

  // alternative chart switch
  showAlternativeChart?: boolean;
  setShowAlternativeChart?: (b: boolean) => void;

  // slider props
  sliderTitle?: string;
  sliderMin?: number;
  sliderMax?: number;
  selectedSliderRange: number[]; // [rangeMin, rangeMax]
  setSelectedSliderRange: (ns: number[]) => void;
}
