import { GradientLegendItem } from './GradientLegendItem';
import PointLegendItem from './PointLegendItem';

export default interface LegendContainerProps {
  items: (PointLegendItem | GradientLegendItem)[];
}
