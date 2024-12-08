import { Chip } from '@nextui-org/chip';
import clsx from 'clsx';

import StyledLink from '@/components/About/StyledLink';
import RecursiveHighlighter from '@/components/Search/RecursiveHighlighter';
import { CustomTableData, DataSourceTableData } from '@/domain/props/CustomTableProps';
import { SearchOperations } from '@/operations/Search/SearchOperations';

function formatDataSourceTable(dataSources: DataSourceTableData) {
  return dataSources.map((item) => {
    // remove leading http[s]:// and trailing slash
    const linkDisplayText = item.dataSourceLink?.split('//')?.pop()?.replace(/\/$/, '');
    return {
      groupKey: item.label,
      updateDetails: item.updateDetails,
      groupName: (
        <RecursiveHighlighter>
          <>
            <div className="text-base pb-3 block">
              <b className={clsx('block pt-0.5 pr-2', { 'float-left': item.updateInterval })}>{item.label}</b>{' '}
              {item.updateInterval && (
                <Chip size="sm" color="primary">
                  {item.updateInterval}
                </Chip>
              )}
            </div>
            <span>
              {item.description}
              {item.readMoreLink && (
                <>
                  {' '}
                  <StyledLink href={item.readMoreLink} className="text-sm">
                    Read more...
                  </StyledLink>
                </>
              )}
            </span>
            {item.updateDetails && (
              <ul className="mt-2 !pb-0">
                {item.updateDetails.map(({ label: detailLabel, interval }) => (
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
                {item.dataSource}
                {item.dataSourceLink && (
                  <>
                    <br />
                    <StyledLink href={item.dataSourceLink} className="text-sm">
                      {linkDisplayText}
                    </StyledLink>
                  </>
                )}
              </>
            </RecursiveHighlighter>
          ),
        },
      ],
      containedWords: SearchOperations.sanitizeTableRow(item),
    };
  }) as CustomTableData;
}

export default formatDataSourceTable;
