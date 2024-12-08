import { ReactElement, ReactNode } from 'react';

export interface AccordionItemProps {
  // there must not exist equal titles in the same Accordion
  title: string;
  infoIcon?: ReactNode;
  tooltipInfo?: string;
  popoverInfo?: ReactNode;
  description?: ReactNode;
  content?: string | ReactElement;
  hideIndicator?: boolean;
  containedWords?: string;
}

export interface SearchableAccordionItemProps extends AccordionItemProps {
  containedWords: string;
}
