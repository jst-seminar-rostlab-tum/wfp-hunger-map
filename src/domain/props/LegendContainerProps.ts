import { GradientLegendContainerItem } from './GradientLegendItem';
import PointLegendItem from './PointLegendItem';

export default interface LegendContainerProps {
  items: (PointLegendItem | GradientLegendContainerItem)[];
}
