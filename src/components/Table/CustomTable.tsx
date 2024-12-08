'use client';

// 'use client' is necessary because of an unresolved bug in NextUI (affects Table & Accordion)
// https://github.com/nextui-org/nextui/issues/1403#issuecomment-1678863519

import { Table, TableBody, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

import CustomTableProps, { CustomTableData, CustomTableRow } from '@/domain/props/CustomTableProps';
import { getTableCell } from '@/operations/tables/groupedTableOperations';
import tableFormatters from '@/operations/tables/tableFormatters';
import { getSearchWords } from '@/utils/searchUtils';

function CustomTable<D>({
  columns,
  data,
  ariaLabel,
  className,
  format = 'simple',
  showBorders = true,
  zebraRows = true,
}: CustomTableProps<D>) {
  const searchWords = getSearchWords(useSearchParams().get('search') ?? '');
  const formattingFunction = tableFormatters[format] as (d: D) => CustomTableData;

  let rows = formattingFunction(data).flatMap(({ groupKey, groupName, attributeRows, containedWords }) =>
    attributeRows.map((row, index) => ({
      index,
      groupKey,
      groupLength: attributeRows.length,
      cellContents: {
        keyColumn: groupName,
        ...row,
      },
      containedWords,
    }))
  ) as CustomTableRow[];

  if (format === 'dataSources' && searchWords.length) {
    const noLabelMatch = searchWords.every((w) => !ariaLabel?.toLowerCase().includes(w));
    if (noLabelMatch) {
      rows = rows.filter((row) => searchWords.some((w) => row.containedWords?.includes(w)));
    }
  }

  const leftAlignedColumns = new Set(columns.filter((c) => c.alignLeft).map((c) => c.columnId));

  return (
    <div className="w-full overflow-x-auto">
      <Table
        removeWrapper
        aria-label={ariaLabel}
        className={clsx(className, {
          'overflow-hidden': showBorders,
        })}
        classNames={{
          base: clsx({
            'border-2 rounded-xl dark:border-default-200': showBorders,
            'min-w-[400px]': true, // Force horizontal scroll by setting a large min-width
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
        <TableBody items={rows} emptyContent={format === 'dataSources' ? 'Searching...' : 'No rows to display'}>
          {(row) => {
            return (
              <TableRow key={`${row.groupKey}×${row.index}`}>
                {(columnKey) => getTableCell(row, columnKey as string, !leftAlignedColumns.has(columnKey as string))}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </div>
  );
}

export default CustomTable;
