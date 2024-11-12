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

export type GroupedTableColumns = { columnId: string; label: ReactNode }[] & {
  // the first described column should be mainColumn
  0: { columnId: 'mainColumn'; label: ReactNode };
};

export type GroupedTableData = {
  groupKey: string;
  groupName: ReactNode;
  attributeRows: readonly { [columnId: string]: ReactNode }[];
}[];

export default interface GroupedTableProps {
  columns: GroupedTableColumns;
  data: GroupedTableData;
  ariaLabel?: string;
}
