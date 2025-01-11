import { ReactNode } from 'react';

import { SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';

export interface SearchableElement {
  element: ReactNode;
  // string of lowercase words seperated by single spaces and without duplicates
  containedWords: string;
}

export interface SearchableSectionProps {
  heading?: string;
  textElements?: SearchableElement[];
  accordionItems?: SearchableAccordionItemProps[];
  searchWords: string[];
  onVisibilityChange?: (isVisible: boolean) => void;
}
