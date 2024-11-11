import PointLegendItem from './PointLegendItem';

export interface PointLegendProps {
  title: string;
  items: PointLegendItem[];
  tooltipInfo: string | null;
}
