import { ReactNode } from 'react';

export interface AccordionItemProps {
  // there must not exist equal titles in the same Accordion
  title: string;
  infoIcon?: ReactNode;
  tooltipInfo?: string;
  description?: ReactNode;
  content: ReactNode;
  containedWords?: string;
}

export interface SearchableAccordionItemProps extends AccordionItemProps {
  containedWords: string;
}
