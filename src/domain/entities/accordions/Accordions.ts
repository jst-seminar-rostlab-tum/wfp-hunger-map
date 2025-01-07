import { ReactElement, ReactNode } from 'react';

export interface AccordionItemProps {
  // there must not exist equal titles in the same Accordion
  title: string;
  infoIcon?: ReactNode;
  tooltipInfo?: string;
  popoverInfo?: ReactNode;
  description?: string;
  content?: string | ReactElement;
  hideIndicator?: boolean;
  containedWords?: string;
}

export interface SearchableAccordionItemProps extends AccordionItemProps {
  // string of lowercase words seperated by single spaces and without duplicates
  containedWords: string;
}
