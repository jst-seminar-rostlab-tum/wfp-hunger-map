import PointLegendRecord from './PointLegendRecord';

export default interface PointLegendContainerItem {
  title: string;
  records: PointLegendRecord[];
  tooltipInfo?: string;
}
