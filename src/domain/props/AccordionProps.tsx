import { AccordionItemProps } from '../entities/accordions/Accordions';

export interface AccordionsProps {
  items: AccordionItemProps[];
  title?: string;
  loading?: boolean;
  multipleSelectionMode?: boolean;
  noSelectionMode?: boolean;
  color?: string;
  accordionModalActive?: boolean;
}
