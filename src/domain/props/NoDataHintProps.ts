import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';

import { CategoricalChartData } from '../entities/charts/CategoricalChartData';

export interface NoDataHintProps {
  chartData: ContinuousChartData | CategoricalChartData;
  selectedCountryNames: string[];
  isLoading: boolean;
}
