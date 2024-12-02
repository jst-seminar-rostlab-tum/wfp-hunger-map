import { ReactNode } from 'react';

export interface GradientLegendContainerItem {
  colors: string[];
  title: string;
  startLabel: string;
  endLabel: string;
  tooltipInfo?: string;
  popoverInfo?: ReactNode;
  hasNotAnalyzedPoint?: boolean;
}
