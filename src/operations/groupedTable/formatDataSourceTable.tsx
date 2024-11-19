import { Chip } from '@nextui-org/chip';
import clsx from 'clsx';

import StyledLink from '@/components/About/StyledLink';
import { DataSourceTableData, GroupedTableData } from '@/domain/props/GroupedTableProps';

function formatDataSourceTable(dataSources: DataSourceTableData) {
  return dataSources.map(
    ({ label, description, updateInterval, updateDetails, dataSource, dataSourceLink, readMoreLink }) => {
      // remove leading http[s]:// and trailing slash
      const linkDisplayText = dataSourceLink?.split('//')?.pop()?.replace(/\/$/, '');
      return {
        groupKey: label,
        updateDetails,
        groupName: (
          <>
            <div className="text-base pb-3 block">
              <b className={clsx('block pt-0.5 pr-2', { 'float-left': updateInterval })}>{label}</b>{' '}
              {updateInterval && (
                <Chip size="sm" color="primary">
                  {updateInterval}
                </Chip>
              )}
            </div>
            <span>
              {description}
              {readMoreLink && (
                <>
                  {' '}
                  <StyledLink href={readMoreLink} className="text-sm">
                    Read more...
                  </StyledLink>
                </>
              )}
            </span>
            {updateDetails && (
              <ul className="mt-2 !pb-0">
                {updateDetails.map(({ label: detailLabel, interval }) => (
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
        ),
        attributeRows: [
          {
            source: (
              <>
                {dataSource}
                {dataSourceLink && (
                  <>
                    <br />
                    <StyledLink href={dataSourceLink} className="text-sm">
                      {linkDisplayText}
                    </StyledLink>
                  </>
                )}
              </>
            ),
          },
        ],
      };
    }
  ) as GroupedTableData;
}

export default formatDataSourceTable;
