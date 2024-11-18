import { ReactNode } from 'react';

import PointLegendRecord from './PointLegendRecord';

export interface PointLegendProps {
  records: PointLegendRecord[];
  children?: (props: { record: PointLegendRecord }) => ReactNode;
}
