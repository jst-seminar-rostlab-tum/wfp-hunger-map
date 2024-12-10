import Highcharts from 'highcharts';

import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export default interface LineChartModalProps {
  title?: string;
  description?: string;
  disableDownload?: boolean;
  barChartSwitch?: boolean;
  xAxisSlider?: boolean;

  lineChartData: LineChartData;
  chartOptions: Highcharts.Options;

  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;

  showXAxisSlider: boolean;
  setShowXAxisSlider: (b: boolean) => void;
  showBarChart: boolean;
  setShowBarChart: (b: boolean) => void;
  selectedXAxisRange: number[];
  setSelectedXAxisRange: (r: number[]) => void;
}
