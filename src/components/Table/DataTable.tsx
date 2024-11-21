import { Pagination } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';

import GroupedTable from '@/components/Table/GroupedTable';
import { GroupedTableColumns, SimpleTableData } from '@/domain/props/GroupedTableProps';
import formatSimpleTable from '@/operations/tables/formatSimpleTable';

export default function DataTable({ rows, columns }: { rows: SimpleTableData; columns: GroupedTableColumns }) {
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
      <GroupedTable columns={columns} data={formatSimpleTable(paginatedRows)} />
      <Pagination isCompact showControls page={page} total={totalPages} onChange={(newPage) => setPage(newPage)} />
    </div>
  );
}
