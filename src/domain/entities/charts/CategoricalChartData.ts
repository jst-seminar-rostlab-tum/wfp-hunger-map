export interface CategoricalDataPoint {
  y: number;
  yRangeMin?: number;
  yRangeMax?: number;
}

export interface CategoricalChartData {
  yAxisLabel?: string;
  categories: {
    name: string;
    dataPoint: CategoricalDataPoint;
    color?: string;
  }[];
}
