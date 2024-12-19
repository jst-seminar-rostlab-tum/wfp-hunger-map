import { ReactElement, ReactNode } from 'react';

export default interface DataSourceDescription {
  title: string;
  legendTitle?: string;
  summary: ReactNode;
  description?: string | ReactElement;
  readMoreLink?: string;
  dataSource?: ReactNode;
  dataSourceLink?: string;
  updateInterval?: string;
  updateDetails?: readonly { label: ReactNode; interval: string }[];
}

export type DataSourceDescriptionItems = { [key: string]: DataSourceDescription };
