import { AccordionItemProps } from '../entities/accordions/Accordions';

export interface AccordionContainerProps {
  items: AccordionItemProps[];
  title?: string;
  loading?: boolean;
  multipleSelectionMode?: boolean;
  noSelectionMode?: boolean;
  color?: string;
  accordionModalActive?: boolean;
  maxWidth?: number;
  expandAll?: boolean;
  highlightedTitleWords?: string[];
}
