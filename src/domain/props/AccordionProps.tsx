import { AccordionItemProps } from '../entities/accordions/Accordions';

export interface AccordionsProps {
  items: AccordionItemProps[];
  loading?: boolean;
  multipleSelectionMode?: boolean;
  searchWords?: string[];
}
