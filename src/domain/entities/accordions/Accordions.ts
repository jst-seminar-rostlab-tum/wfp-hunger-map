export interface AccordionItemProps {
  title: string | React.ReactNode;
  infoIcon?: React.ReactNode;
  tooltipInfo?: string;
  popoverInfo?: React.ReactNode;
  description?: string;
  content?: React.ReactNode | string;
  hideIndicator?: boolean;
}
