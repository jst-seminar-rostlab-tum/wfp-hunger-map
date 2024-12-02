import { ReactNode } from 'react';

import tableFormatters from '@/operations/tables/tableFormatters';

export type CustomTableRow = {
  index: number;
  groupKey: string;
  groupLength: number;
  cellContents: {
    keyColumn: ReactNode;
    [columnKey: string]: ReactNode;
  };
};

export type CustomTableColumns = { columnId: string; label: ReactNode; alignLeft?: boolean }[] & {
  // the first described column should be keyColumn
  0: { columnId: 'keyColumn'; label: ReactNode; alignLeft?: boolean };
};

export type CustomTableData = {
  groupKey: string | number;
  groupName: ReactNode;
  attributeRows: readonly { [columnId: string]: ReactNode }[];
}[];

export default interface CustomTableProps<D> {
  columns: CustomTableColumns;
  data: D;
  format?: keyof typeof tableFormatters;
  ariaLabel?: string;
  className?: string;
  zebraRows?: boolean;
  showBorders?: boolean;
}

export type DataSourceTableRow = {
  label: string;
  description: ReactNode;
  readMoreLink?: string;
  dataSource: ReactNode;
  dataSourceLink?: string;
  updateInterval?: string;
  updateDetails?: readonly { label: ReactNode; interval: string }[];
};

export type DataSourceTableData = DataSourceTableRow[];

export type SimpleTableData = {
  keyColumn: ReactNode;
  [columnId: string]: ReactNode;
}[];
