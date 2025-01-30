export interface CategoricalDataPoint {
  y: number;
  yRangeMin?: number;
  yRangeMax?: number;

  yRelative?: number;
  yRangeMinRelative?: number;
  yRangeMaxRelative?: number;
}

export interface CategoricalChartData {
  yAxisLabel?: string;
  categories: {
    name: string;
    dataPoint: CategoricalDataPoint;
    color?: string;
  }[];
}
