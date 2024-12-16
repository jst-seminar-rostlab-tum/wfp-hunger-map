import { Chip } from '@nextui-org/chip';
import clsx from 'clsx';

import StyledLink from '@/components/About/StyledLink';
import RecursiveHighlighter from '@/components/Search/RecursiveHighlighter';
import { DataSourceDescriptionItems } from '@/domain/entities/dataSources/DataSourceDescription';
import { CustomTableData } from '@/domain/props/CustomTableProps';
import { SearchOperations } from '@/operations/Search/SearchOperations';

function formatDataSourceTable(dataSources: DataSourceDescriptionItems) {
  return Object.entries(dataSources).map(([key, tableRow]) => {
    // remove leading http[s]:// and trailing slash
    const linkDisplayText = tableRow.dataSourceLink?.split('//')?.pop()?.replace(/\/$/, '');
    return {
      groupKey: key,
      updateDetails: tableRow.updateDetails,
      groupName: (
        <RecursiveHighlighter>
          <>
            <div className="text-base pb-3 block">
              <b className={clsx('block pt-0.5 pr-2', { 'float-left': tableRow.updateInterval })}>
                {tableRow.legendLabel ?? tableRow.title}
              </b>{' '}
              {tableRow.updateInterval && (
                <Chip size="sm" color="primary">
                  {tableRow.updateInterval}
                </Chip>
              )}
            </div>
            <span>
              {tableRow.summary}
              {tableRow.readMoreLink && (
                <>
                  {' '}
                  <StyledLink href={tableRow.readMoreLink} className="text-sm">
                    Read more...
                  </StyledLink>
                </>
              )}
            </span>
            {tableRow.updateDetails && (
              <ul className="mt-2 !pb-0">
                {tableRow.updateDetails.map(({ label: detailLabel, interval }) => (
                  <li className="text-sm" key={JSON.stringify(detailLabel)}>
                    {detailLabel}{' '}
                    <Chip className="my-1" color="primary" size="sm">
                      {interval}
                    </Chip>
                  </li>
                ))}
              </ul>
            )}
          </>
        </RecursiveHighlighter>
      ),
      attributeRows: [
        {
          source: (
            <RecursiveHighlighter>
              <>
                {tableRow.dataSource}
                {tableRow.dataSourceLink && (
                  <>
                    <br />
                    <StyledLink href={tableRow.dataSourceLink} className="text-sm">
                      {linkDisplayText}
                    </StyledLink>
                  </>
                )}
              </>
            </RecursiveHighlighter>
          ),
        },
      ],
      containedWords: SearchOperations.sanitizeTableRow(tableRow),
    };
  }) as CustomTableData;
}

export default formatDataSourceTable;
