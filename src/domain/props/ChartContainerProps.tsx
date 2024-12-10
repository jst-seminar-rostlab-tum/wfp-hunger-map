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
  sliderHandle?: (xStart: number, xEnd: number) => void;
  sliderMin?: number;
  sliderMax?: number;
}
