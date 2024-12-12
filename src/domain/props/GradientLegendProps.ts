import { ColorsData } from './ColorsData';

export default interface GradientLegendProps {
  colorsData: ColorsData[];
  startLabel: string;
  endLabel: string;
  hasNotAnalyzedPoint?: boolean;
}
