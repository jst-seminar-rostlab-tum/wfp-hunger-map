import StyledLink from '@/components/About/StyledLink';
import { CustomTableColumns, CustomTableData } from '@/domain/props/CustomTableProps';

export const accuracyTableColumns = [
  { columnId: 'keyColumn', label: 'Measure', alignLeft: true },
  { columnId: 'withPast', label: 'With past data' },
  { columnId: 'FCS', label: 'FCS' },
  { columnId: 'rCSI', label: 'rCSI' },
] as CustomTableColumns;

export const accuracyTableContents = [
  {
    groupKey: '1',
    groupName: (
      <>
        {' '}
        <StyledLink href="https://en.wikipedia.org/wiki/Coefficient_of_determination" className="text-sm">
          Coefficient of determination (R²)
        </StyledLink>{' '}
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
        <StyledLink href="https://en.wikipedia.org/wiki/Mean_absolute_error" className="text-sm">
          Mean Absolute Error
        </StyledLink>{' '}
        (lower is better)
      </span>
    ),
    attributeRows: [
      { withPast: true, FCS: 0.08, rCSI: 0.06 },
      { withPast: false, FCS: 0.09, rCSI: 0.07 },
    ],
  },
] as CustomTableData;
