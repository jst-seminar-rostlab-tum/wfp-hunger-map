import { ReactNode } from 'react';

import { ColorsData } from './ColorsData';

export interface GradientLegendContainerItem {
  colorsData: ColorsData[];
  title: string;
  startLabel: string;
  endLabel: string;
  tooltipInfo?: string;
  popoverInfo?: ReactNode;
  hasNotAnalyzedPoint?: boolean;
}
