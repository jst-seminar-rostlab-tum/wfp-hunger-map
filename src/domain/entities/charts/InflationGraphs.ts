import { ChartData } from '../common/ChartData';

export interface InflationGraphs {
  type: 'InflationGraphs';
  headline: {
    data: ChartData[];
  };
  food: {
    data: ChartData[];
  };
}
