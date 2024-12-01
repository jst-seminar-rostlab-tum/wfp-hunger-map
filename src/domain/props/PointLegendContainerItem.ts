import { ReactNode } from 'react';

import PointLegendRecord from './PointLegendRecord';

export default interface PointLegendContainerItem {
  title: string;
  records: PointLegendRecord[];
  tooltipInfo?: string;
  popoverInfo?: ReactNode;
  renderItem?: (props: { record: PointLegendRecord }) => ReactNode;
}
