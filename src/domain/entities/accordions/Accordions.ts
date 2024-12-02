export interface AccordionItemProps {
  // there must not exist equal titles in the same Accordion
  title: string;
  infoIcon?: React.ReactNode;
  tooltipInfo?: string;
  description?: string;
  content: React.ReactNode | string;
  containedWords?: string;
}

export interface SearchableAccordionItemProps extends AccordionItemProps {
  containedWords: string;
}
