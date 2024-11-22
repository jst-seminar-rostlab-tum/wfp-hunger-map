'use client';

// 'use client' is necessary because of an unresolved bug in NextUI (affects Table & Accordion)
// https://github.com/nextui-org/nextui/issues/1403#issuecomment-1678863519

import { Table, TableBody, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import clsx from 'clsx';
import React from 'react';

import CustomTableProps, { CustomTableData, CustomTableRow } from '@/domain/props/CustomTableProps';
import { getTableCell } from '@/operations/tables/groupedTableOperations';
import tableFormatters from '@/operations/tables/tableFormatters';

/**
 * A table with its rows grouped by the values in the first column.
 * For simple tables, each group has one row, i.e. 'groups' and 'rows' are equal.
 */
function CustomTable<D>({ columns, data, ariaLabel, className, format = 'simple' }: CustomTableProps<D>) {
  const formattingFunction = tableFormatters[format] as (d: D) => CustomTableData;
  const rows = formattingFunction(data).flatMap(({ groupKey, groupName, attributeRows }) =>
    attributeRows.map((row, index) => ({
      index,
      groupKey,
      groupLength: attributeRows.length,
      cellContents: {
        keyColumn: groupName,
        ...row,
      },
    }))
  ) as CustomTableRow[];

  const leftAlignedColumns = new Set(columns.filter((c) => c.alignLeft).map((c) => c.columnId));

  return (
    <Table
      removeWrapper
      aria-label={ariaLabel}
      classNames={{ thead: '[&>tr:last-child]:hidden' }}
      className={className}
    >
      <TableHeader columns={columns}>
        {({ columnId, label, alignLeft }) => (
          <TableColumn key={columnId} className={clsx('border-b-2 text-wrap', { 'text-center': !alignLeft })}>
            {label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(row) => {
          return (
            <TableRow key={`${row.groupKey}×${row.index}`}>
              {(columnKey) => getTableCell(row, columnKey as string, !leftAlignedColumns.has(columnKey as string))}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}

export default CustomTable;
