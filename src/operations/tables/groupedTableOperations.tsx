import { TableCell } from '@nextui-org/table';
import clsx from 'clsx';
import React from 'react';

import { CustomTableRow } from '@/domain/props/CustomTableProps';

// This function cannot be converted into a component because TableCell has to be the direct descendant of a TableRow.
export function getTableCell(row: CustomTableRow, columnKey: string, center: boolean | undefined) {
  if (columnKey === 'keyColumn' && row.index > 0)
    // don't return null here because TableRow can't deal with that
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;

  let cellContent = row.cellContents[columnKey];
  if (typeof cellContent === 'boolean') cellContent = cellContent ? '✅' : '❎';
  const addBottomBorder = row.index === row.groupLength - 1 || columnKey === 'keyColumn';

  return (
    <TableCell
      className={clsx({
        'border-b-2': addBottomBorder,
        'text-center': center,
      })}
      rowSpan={columnKey === 'keyColumn' ? row.groupLength : 1}
    >
      {cellContent}
    </TableCell>
  );
}
