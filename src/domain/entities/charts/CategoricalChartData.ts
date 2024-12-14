export interface CategoricalDataPoint {
  y: number;
}

export interface CategoricalChartData {
  yAxisLabel?: string;
  categories: {
    name: string;
    dataPoint: CategoricalDataPoint;
    color?: string;
  }[];
}
