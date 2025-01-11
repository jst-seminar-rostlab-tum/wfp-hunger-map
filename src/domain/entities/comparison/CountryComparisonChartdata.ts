import { CategoricalChartData } from '../charts/CategoricalChartData';
import { ContinuousChartData } from '../charts/ContinuousChartData.ts';

export interface CountryComparisonChartData {
  fcsChartData?: ContinuousChartData;
  rcsiChartData?: ContinuousChartData;
  foodSecurityBarChartData?: CategoricalChartData;
  populationBarChartData?: CategoricalChartData;
  importDependencyBarChartData?: CategoricalChartData;
  balanceOfTradeData?: ContinuousChartData;
  headlineInflationData?: ContinuousChartData;
  foodInflationData?: ContinuousChartData;
}
