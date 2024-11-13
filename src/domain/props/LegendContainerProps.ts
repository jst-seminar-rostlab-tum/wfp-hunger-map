import { GradientLegendContainerItem } from './GradientLegendContainerItem';
import PointLegendContainerItem from './PointLegendContainerItem';

export default interface LegendContainerProps {
  items: (PointLegendContainerItem | GradientLegendContainerItem)[];
  loading?: boolean;
}
