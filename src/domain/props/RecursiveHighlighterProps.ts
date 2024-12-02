import { ReactElement } from 'react';

export interface RecursiveHighlighterProps {
  type?: string;
  keyCopy?: string;
  children?: ReactElement | string[] | string;
}
