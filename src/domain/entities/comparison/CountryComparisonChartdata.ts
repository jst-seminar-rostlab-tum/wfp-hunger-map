import { LineChartData } from '../charts/LineChartData';

export interface CountryComparisonChartData {
  fcsChartData?: LineChartData;
  rcsiChartData?: LineChartData;
  foodSecurityBarChartData?: LineChartData;
  importDependencyBarChartData?: LineChartData;
  balanceOfTradeData?: LineChartData;
  headlineInflationData?: LineChartData;
  foodInflationData?: LineChartData;
}
