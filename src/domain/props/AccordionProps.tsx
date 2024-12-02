import { AccordionItemProps } from '../entities/accordions/Accordions';

export interface AccordionProps {
  items: AccordionItemProps[];
  title?: string;
  loading?: boolean;
  multipleSelectionMode?: boolean;
  noSelectionMode?: boolean;
  color?: string;
}
