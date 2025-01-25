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

/**
 * Renders a customizable table component with support for advanced features such as
 * grouped data, zebra rows, borders, and search filtering. Utilizes the `@nextui-org/table`
 * library for the base table structure.
 *
 * @template D - The type of the data used in the table rows.
 *
 * @param {Array<{ columnId: string, label: string, alignLeft?: boolean }>} props.columns The configuration for the table columns. Each column must have a unique `columnId` and a display `label`. Optionally, `alignLeft` can be set to true for left alignment.
 * @param {D[]} props.data - The raw data used to generate the table rows.
 * @param {string} props.ariaLabel - The accessibility label for the table.
 * @param {string} [props.className] - An optional custom CSS class for the table container.
 * @param {string} [props.format='simple'] - The formatting mode for the table. Should be a key of `tableFormatters`. Defaults to `simple`.
 * @param {boolean} [props.showBorders=true] - A flag to enable or disable borders around the table.
 *   Defaults to `true`.
 * @param {boolean} [props.zebraRows=true] - A flag to enable zebra striping for table rows.
 *   Defaults to `true`.
 *
 * @returns {JSX.Element} A fully styled and interactive table component.
 *
 * @example
 * // Basic usage
 * const columns = [
 *   { columnId: 'name', label: 'Name' },
 *   { columnId: 'age', label: 'Age', alignLeft: true },
 * ];
 * const data = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 * ];
 * <CustomTable columns={columns} data={data} ariaLabel="User Data" />;
 */
function CustomTable<D>({
  columns,
  data,
  ariaLabel,
  className,
  format = 'simple',
  showBorders = true,
  zebraRows = true,
  minTableWidth = 400,
}: CustomTableProps<D>) {
  // Extract search terms from the URL query parameters
  const searchWords = getSearchWords(useSearchParams().get('search') ?? '');

  // Determine the formatting function based on the provided format
  const formattingFunction = tableFormatters[format] as (d: D) => CustomTableData;

  // Process the data into rows, applying group and formatting logic
  let rows = formattingFunction(data).flatMap(({ groupKey, groupName, attributeRows, containedWords }) =>
    attributeRows.map((row, index) => ({
      index, // Row index within the group
      groupKey, // Identifier for the group the row belongs to
      groupLength: attributeRows.length, // Total rows in the group
      cellContents: {
        keyColumn: groupName, // Group name for the key column
        ...row, // Spread other row data
      },
      containedWords, // Words contained in the group
    }))
  ) as CustomTableRow[];

  if (format === 'dataSources' && searchWords.length) {
    // If this is a data sources table and a search is ongoing:
    // a) Show the whole table if the aria label is matching with the search
    // b) Filter to the rows with matches otherwise
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
            'border-2 rounded-xl dark:border-default-200': showBorders, // Add border styles if enabled
            [`min-w-[${minTableWidth}px]`]: true, // Force horizontal scroll by setting a large min-width
          }),
          thead: clsx({
            '[&>tr:last-child]:hidden': true, // Hide the last child row in the header
            'bg-background dark:bg-chatbotUserMsg': zebraRows, // Add zebra styling for headers
          }),
          tr: clsx({
            'even:bg-background dark:even:bg-chatbotUserMsg': zebraRows, // Apply zebra striping to rows
          }),
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.columnId}
              className={clsx('text-wrap', {
                'text-center': !leftAlignedColumns.has(column.columnId), // Center align if not left-aligned
                'border-b-2 dark:border-default-200': showBorders, // Add border if enabled
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
