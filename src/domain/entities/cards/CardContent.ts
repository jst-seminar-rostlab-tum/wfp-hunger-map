export interface CardContent {
  imageSrc?: string;
  svgIcon?: React.ReactNode;
  text?: string;
  value?: string | number;
  content?: React.ReactNode;
  timeText?: string;
  altText?: string;
  changeValues?: {
    imageSrc: string;
    text: string;
    timeText: string;
    altText: string;
  }[];
  textClass?: string;
}
