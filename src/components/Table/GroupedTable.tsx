import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import React from 'react';

import GroupedTableProps, { GroupedTableRow } from '@/domain/props/GroupedTableProps';

// This function cannot be converted into a component because TableCell has to be the direct descendant of a TableRow.
function getTableCell(row: GroupedTableRow, columnKey: string) {
  if (columnKey === 'mainColumn' && row.index > 0)
    // don't return null here because TableRow can't deal with that
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;

  let cellContent = row.cellContents[columnKey];
  if (typeof cellContent === 'boolean') cellContent = cellContent ? '✅' : '❎';
  const addBottomBorder = row.index === row.groupLength - 1 || columnKey === 'mainColumn';

  return (
    <TableCell
      className={`${addBottomBorder ? 'border-b-2' : ''} ${columnKey === 'mainColumn' ? 'text-left' : 'text-center'} align-top`}
      rowSpan={columnKey === 'mainColumn' ? row.groupLength : 1}
    >
      {cellContent}
    </TableCell>
  );
}

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
            className={`border-b-2 ${columnId === 'mainColumn' ? 'text-left' : 'text-center'} text-wrap mb-20`}
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
