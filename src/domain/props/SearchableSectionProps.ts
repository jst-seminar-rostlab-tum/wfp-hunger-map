import { ReactNode } from 'react';

import { SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';

export interface SearchableElement {
  element: ReactNode;
  containedWords: string;
}

export interface SearchableSectionProps {
  heading?: string;
  textElements?: SearchableElement[];
  accordionItems?: SearchableAccordionItemProps[];
  searchWords: string[];
  setVisibilityCount?: (updateFn: (prevCount: number) => number) => void;
}
