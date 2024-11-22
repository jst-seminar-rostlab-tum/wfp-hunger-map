import { ReactNode } from 'react';

export type GroupedTableRow = {
  index: number;
  groupKey: string;
  groupLength: number;
  cellContents: {
    keyColumn: ReactNode;
    [columnKey: string]: ReactNode;
  };
};

export type GroupedTableColumns = { columnId: string; label: ReactNode; alignLeft?: boolean }[] & {
  // the first described column should be keyColumn
  0: { columnId: 'keyColumn'; label: ReactNode; alignLeft?: boolean };
};

export type GroupedTableData = {
  groupKey: string | number;
  groupName: ReactNode;
  attributeRows: readonly { [columnId: string]: ReactNode }[];
}[];

export default interface GroupedTableProps {
  columns: GroupedTableColumns;
  data: GroupedTableData;
  ariaLabel?: string;
  className?: string;
}

export type DataSourceTableData = {
  label: string;
  description: ReactNode;
  readMoreLink?: string;
  dataSource: ReactNode;
  dataSourceLink?: string;
  updateInterval?: string;
  updateDetails?: readonly { label: ReactNode; interval: string }[];
}[];

export type SimpleTableData = {
  keyColumn: ReactNode;
  [columnId: string]: ReactNode;
}[];
