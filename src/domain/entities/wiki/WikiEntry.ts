import { ReactNode } from 'react';

export interface WikiEntry {
  key: string;
  title: string;
  content: ReactNode;
}
