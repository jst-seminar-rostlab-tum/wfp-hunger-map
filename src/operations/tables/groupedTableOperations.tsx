import { TableCell } from '@nextui-org/table';
import clsx from 'clsx';
import React from 'react';

import { GroupedTableRow } from '@/domain/props/GroupedTableProps';

// This function cannot be converted into a component because TableCell has to be the direct descendant of a TableRow.
export function getTableCell(row: GroupedTableRow, columnKey: string, center: boolean | undefined) {
  if (columnKey === 'mainColumn' && row.index > 0)
    // don't return null here because TableRow can't deal with that
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;

  let cellContent = row.cellContents[columnKey];
  if (typeof cellContent === 'boolean') cellContent = cellContent ? '✅' : '❎';
  const addBottomBorder = row.index === row.groupLength - 1 || columnKey === 'mainColumn';

  return (
    <TableCell
      className={clsx('align-top', {
        'border-b-2': addBottomBorder,
        'text-center': center,
      })}
      rowSpan={columnKey === 'mainColumn' ? row.groupLength : 1}
    >
      {cellContent}
    </TableCell>
  );
}
