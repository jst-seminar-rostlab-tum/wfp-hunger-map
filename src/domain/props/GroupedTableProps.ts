import { ReactNode } from 'react';

export type GroupedTableRow = {
  index: number;
  groupKey: string;
  groupLength: number;
  cellContents: {
    mainColumn: ReactNode;
    [columnKey: string]: ReactNode;
  };
};

export type GroupedTableColumns = { columnId: string; label: ReactNode; alignLeft?: boolean }[] & {
  // the first described column should be mainColumn
  0: { columnId: 'mainColumn'; label: ReactNode; alignLeft?: boolean };
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
  mainColumn: ReactNode;
  [columnId: string]: ReactNode;
}[];
