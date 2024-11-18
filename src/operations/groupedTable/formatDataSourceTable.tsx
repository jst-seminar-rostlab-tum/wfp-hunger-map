import { Chip } from '@nextui-org/chip';

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
            <span className="text-large flex items-center gap-2 pb-3 my-1">
              <b>{label}</b> {updateInterval && <Chip color="primary">{updateInterval}</Chip>}
            </span>
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
                    <Chip className="my-1" color="primary">
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
