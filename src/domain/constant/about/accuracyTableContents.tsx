import ExternalLink from '@/components/About/ExternalLink';
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
        <ExternalLink href="https://en.wikipedia.org/wiki/Coefficient_of_determination" className="text-sm">
          Coefficient of determination (R²)
        </ExternalLink>{' '}
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
      <span className="text-small">
        <ExternalLink href="https://en.wikipedia.org/wiki/Mean_absolute_error" className="text-sm">
          Mean Absolute Error
        </ExternalLink>{' '}
        (lower is better)
      </span>
    ),
    attributeRows: [
      { withPast: true, FCS: 0.08, rCSI: 0.06 },
      { withPast: false, FCS: 0.09, rCSI: 0.07 },
    ],
  },
] as GroupedTableData;
