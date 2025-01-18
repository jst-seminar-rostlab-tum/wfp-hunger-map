import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';

import { CategoricalChartData } from '../entities/charts/CategoricalChartData';

export interface NoDataHintProps {
  chartData: ContinuousChartData | CategoricalChartData;
  requestedChartCategories: string[];
  isLoading?: boolean;
}
