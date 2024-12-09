import { ReactElement } from 'react';

export interface WikiEntry {
  key: string;
  title: string;
  content: string | ReactElement;
}
