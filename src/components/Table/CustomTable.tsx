'use client';

// 'use client' is necessary because of an unresolved bug in NextUI (affects Table & Accordion)
// https://github.com/nextui-org/nextui/issues/1403#issuecomment-1678863519

import { Table, TableBody, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import clsx from 'clsx';

import CustomTableProps, { CustomTableData, CustomTableRow } from '@/domain/props/CustomTableProps';
import { getTableCell } from '@/operations/tables/groupedTableOperations';
import tableFormatters from '@/operations/tables/tableFormatters';

function CustomTable<D>({
  columns,
  data,
  ariaLabel,
  className,
  format = 'simple',
  showBorders = true,
  zebraRows = true,
}: CustomTableProps<D>) {
  // Formatting and data preparation
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
      className={clsx(className, {
        'overflow-hidden': showBorders,
      })}
      classNames={{
        base: clsx({
          'border-2 rounded-xl dark:border-default-200': showBorders,
        }),
        thead: clsx({
          '[&>tr:last-child]:hidden': true,
          'bg-background dark:bg-chatbotUserMsg': zebraRows,
        }),
        tr: clsx({
          'even:bg-background dark:even:bg-chatbotUserMsg': zebraRows,
        }),
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.columnId}
            className={clsx('text-wrap', {
              'text-center': !leftAlignedColumns.has(column.columnId),
              'border-b-2 dark:border-default-200': showBorders,
            })}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows} emptyContent="No rows to display">
        {(row) => (
          <TableRow key={`${row.groupKey}×${row.index}`}>
            {(columnKey) => getTableCell(row, columnKey as string, !leftAlignedColumns.has(columnKey as string))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default CustomTable;
