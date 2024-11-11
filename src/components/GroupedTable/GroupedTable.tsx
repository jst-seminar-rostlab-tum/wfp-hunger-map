import { Table, TableBody, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import clsx from 'clsx';
import React from 'react';

import GroupedTableProps, { GroupedTableRow } from '@/domain/props/GroupedTableProps';
import { getTableCell } from '@/operations/groupedTable/groupedTableOperations';

/**
 * A table with its rows grouped by the values in the first column.
 *
 * Rows belonging to different groups are visually seperated by a divider.
 */
function GroupedTable({ columns, data, ariaLabel }: GroupedTableProps) {
  const rows = data.flatMap(({ groupKey, groupName, attributeRows }) =>
    attributeRows.map((row, index) => ({
      index,
      groupKey,
      groupLength: attributeRows.length,
      cellContents: {
        mainColumn: groupName,
        ...row,
      },
    }))
  ) as GroupedTableRow[];

  return (
    <Table removeWrapper aria-label={ariaLabel} classNames={{ thead: '[&>tr:last-child]:hidden' }}>
      <TableHeader columns={columns}>
        {({ columnId, label }) => (
          <TableColumn
            key={columnId}
            className={clsx('border-b-2 text-wrap', { 'text-center': columnId !== 'mainColumn' })}
          >
            {label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(row) => {
          return (
            <TableRow key={`${row.groupKey}×${row.index}`}>
              {(columnKey) => getTableCell(row, columnKey as string)}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}

export default GroupedTable;
