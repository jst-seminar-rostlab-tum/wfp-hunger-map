import { Link } from '@nextui-org/link';

import { GroupedTableColumns, GroupedTableData } from '@/domain/props/GroupedTableProps';

export const accuracyTableColumns = [
  { columnId: 'mainColumn', label: 'Measure' },
  { columnId: 'withPast', label: 'With past data' },
  { columnId: 'FCS', label: 'FCS' },
  { columnId: 'rCSI', label: 'rCSI' },
] as GroupedTableColumns;
export const accuracyTableData = [
  {
    groupKey: '1',
    groupName: (
      <>
        {' '}
        <Link href="https://en.wikipedia.org/wiki/Coefficient_of_determination" size="md">
          Coefficient of determination (R²)
        </Link>{' '}
        (higher is better)
      </>
    ),
    attributeRows: [
      { withPast: true, FCS: 0.75, rCSI: 0.78 },
      { withPast: false, FCS: 0.63, rCSI: 0.73 },
    ],
  },
  {
    groupKey: '2',
    groupName: (
      <>
        <Link href="https://en.wikipedia.org/wiki/Mean_absolute_error" size="md">
          Mean Absolute Error
        </Link>{' '}
        (lower is better)
      </>
    ),
    attributeRows: [
      { withPast: true, FCS: 0.08, rCSI: 0.06 },
      { withPast: false, FCS: 0.09, rCSI: 0.07 },
    ],
  },
] as GroupedTableData;
