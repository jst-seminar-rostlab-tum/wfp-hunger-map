import { ChartData } from '../common/ChartData';

export interface InflationGraphs {
  headline: {
    data: ChartData[];
  };
  food: {
    data: ChartData[];
  };
}
