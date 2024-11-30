import { AccordionItemProps } from '../entities/accordions/Accordions';

export interface AccordionsProps {
  items: AccordionItemProps[];
  loading?: boolean;
  multipleSelectionMode?: boolean;
  noSelectionMode?: boolean;
  color?: string;
}
