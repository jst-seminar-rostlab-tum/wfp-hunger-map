import { CategoricalChartData } from '../charts/CategoricalChartData';
import { LineChartData } from '../charts/LineChartData';

export interface CountryComparisonChartData {
  fcsChartData?: LineChartData;
  rcsiChartData?: LineChartData;
  foodSecurityBarChartData?: CategoricalChartData;
  populationBarChartData?: CategoricalChartData;
  importDependencyBarChartData?: CategoricalChartData;
  balanceOfTradeData?: LineChartData;
  headlineInflationData?: LineChartData;
  foodInflationData?: LineChartData;
}
