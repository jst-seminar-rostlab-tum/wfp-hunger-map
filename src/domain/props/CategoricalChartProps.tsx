import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';

export default interface CategoricalChartProps {
  data: CategoricalChartData;

  title?: string;
  description?: string;

  small?: boolean;
  noPadding?: boolean;
  transparentBackground?: boolean;
  chartHeight?: number;

  disableExpandable?: boolean;
  disablePieChartSwitch?: boolean;
  disableDownload?: boolean;
  disableRelativeNumbersSwitch?: boolean;
  disableSorting?: boolean;
}
