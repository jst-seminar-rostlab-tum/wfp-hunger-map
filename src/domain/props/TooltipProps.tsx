import { ReactNode } from 'react';

export default interface TooltipProps {
  children: ReactNode | ReactNode[];
  title?: string;
  text: string;
  warning?: boolean;
}
