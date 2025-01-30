import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData';

import { CategoricalChartData } from '../charts/CategoricalChartData';

export interface RegionComparisonChartData {
  fcsBarChartData?: CategoricalChartData;
  rcsiBarChartData?: CategoricalChartData;
  fcsGraphData?: ContinuousChartData;
}
