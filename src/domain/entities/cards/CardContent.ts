export interface CardContent {
  imageSrc?: string;
  svgIcon?: React.ReactNode;
  text?: string;
  value?: string | number; // Added for main value like `countryData.fcs`
  content?: React.ReactNode;
  timeText?: string;
  altText?: string;
  deltas?: {
    imageSrc: string;
    text: string;
    timeText: string;
    altText: string;
  }[]; // Array for time-based data
  textClass?: string;
}
