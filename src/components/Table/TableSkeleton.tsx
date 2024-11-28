import { Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { v4 as uuid } from 'uuid';

interface TableSkeletonProps {
  columnsCount: number;
  rowsCount: number;
}

export default function TableSkeleton({ columnsCount, rowsCount }: TableSkeletonProps) {
  return (
    <Table removeWrapper aria-label="Loading table" className="w-full">
      <TableHeader>
        {Array.from({ length: columnsCount }).map(() => (
          <TableColumn key={uuid()}>
            <Skeleton className="h-4 w-full" />
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowsCount }).map(() => (
          <TableRow key={uuid()}>
            {Array.from({ length: columnsCount }).map(() => (
              <TableCell key={uuid()}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
