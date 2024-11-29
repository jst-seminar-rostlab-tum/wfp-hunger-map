export interface AccordionItemProps {
  title: string | React.ReactNode;
  infoIcon?: React.ReactNode;
  tooltipInfo?: string;
  description?: string;
  content?: React.ReactNode | string;
  hideIndicator?: boolean;
}
