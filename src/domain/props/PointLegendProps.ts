import PointLegendItem from './PointLegendItem';

export interface PointLegendProps {
  title: string | null;
  items: PointLegendItem[];
  tooltipInfo: string | null;
}
