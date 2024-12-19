import { Chip } from '@nextui-org/chip';

import StyledLink from '@/components/About/StyledLink';
import DataSourceDescription from '@/domain/entities/dataSources/DataSourceDescription';
import { prettifyURL } from '@/utils/formatting';

export function PopoverInfo({ dataSourceDescription }: { dataSourceDescription: DataSourceDescription }) {
  const { summary, description, updateInterval, dataSource, dataSourceLink, updateDetails } = dataSourceDescription;
  return (
    <>
      {summary && (
        <div>
          {summary}
          {updateInterval && (
            <Chip size="sm" color="primary" className="ml-1">
              {updateInterval}
            </Chip>
          )}
        </div>
      )}
      {updateDetails && (
        <>
          <p>
            <b>Update Interval:</b>
          </p>
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
        </>
      )}
      {dataSource && (
        <p>
          <b>Data Source: </b>
          {dataSource}
        </p>
      )}
      {dataSourceLink && (
        <StyledLink href={dataSourceLink} className="text-sm">
          {prettifyURL(dataSourceLink)}
        </StyledLink>
      )}
      {description}
    </>
  );
}
