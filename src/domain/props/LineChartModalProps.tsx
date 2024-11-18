import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import Highcharts from 'highcharts';

export default interface LineChartModalProps {
  title?: string;
  description?: string;
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
}
