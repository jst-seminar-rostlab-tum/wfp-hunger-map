import { TooltipPlacement } from '@nextui-org/tooltip';
import { ReactNode } from 'react';

export default interface TooltipProps {
  children: ReactNode | ReactNode[];
  title?: string;
  text: string;
  delay?: number;
  warning?: boolean;
  titleStyle?: string;
  textStyle?: string;
  offset?: number;
  placement?: TooltipPlacement;
}
