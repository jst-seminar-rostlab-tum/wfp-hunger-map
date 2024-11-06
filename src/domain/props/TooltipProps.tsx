import { ReactNode } from 'react';

export default interface TooltipProps {
  children: ReactNode;
  title?: string;
  text: string;
  warning?: boolean;
}
