import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export interface NoDataHintProps {
  lineChartData: LineChartData;
  selectedCountryNames: string[];
  isLoading: boolean;
}
