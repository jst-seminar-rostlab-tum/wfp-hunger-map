import { FcsChartData } from '../charts/FcsChartData';
import { RcsiChartData } from '../charts/RcsiChartData';

export interface CountryForecastData {
  rcsiGraph: RcsiChartData[];
  fcsGraph: FcsChartData[];
}
