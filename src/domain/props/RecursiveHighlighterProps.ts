import { ExoticComponent, ReactElement } from 'react';

export interface RecursiveHighlighterProps {
  type?: string | ExoticComponent;
  children?: ReactElement | string[] | string;
}
