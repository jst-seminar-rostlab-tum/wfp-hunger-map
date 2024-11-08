import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@nextui-org/react';

interface Column {
  label: string;
  key: string;
}

interface DataTableProps<T> {
  rows: T[];
  columns: Column[];
}

export default function DataTable<T extends { [key: string]: any }>({ rows = [], columns }: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rows.slice(start, end);
  }, [page, rows]);

  return (
    <Table
      removeWrapper
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            color="secondary"
            page={page}
            total={totalPages}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      }
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key} className="font-bold">
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {paginatedRows.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.key}>{row[column.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
