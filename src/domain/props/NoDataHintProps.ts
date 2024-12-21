import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

import { CategoricalChartData } from '../entities/charts/CategoricalChartData';

export interface NoDataHintProps {
  chartData: LineChartData | CategoricalChartData;
  selectedCountryNames: string[];
  isLoading: boolean;
}
