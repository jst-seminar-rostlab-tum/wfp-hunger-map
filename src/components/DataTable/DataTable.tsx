import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';

import DataTableProps from '@/domain/props/DataTableProps';

export default function DataTable<T>({ rows, columns }: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rows.slice(start, end);
  }, [page, rows]);

  return (
    <div className="flex-1 flex flex-col justify-between items-center">
      <Table removeWrapper>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key} className="font-bold">
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {paginatedRows.map((row, index) => {
            const uniqueRowKey = `${index}-${String(row[columns[0].key as keyof T])}`;
            return (
              <TableRow key={uniqueRowKey}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{String(row[column.key as keyof T])}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Pagination isCompact showControls page={page} total={totalPages} onChange={(newPage) => setPage(newPage)} />
    </div>
  );
}
