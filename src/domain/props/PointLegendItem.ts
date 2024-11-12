import PointLegendRecord from './PointLegendRecord';

export default interface PointLegendItem {
  title: string;
  records: PointLegendRecord[];
  tooltipInfo?: string;
}
