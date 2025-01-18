import { Chip } from '@nextui-org/chip';

import StyledLink from '@/components/About/StyledLink';
import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import DataSourceDescription from '@/domain/entities/dataSources/DataSourceDescription';
import { prettifyURL } from '@/utils/formatting';

/**
 * Renders the popover content for a single or multiple data sources.
 * * Pass a `string` to render the descriptions of the respective data source without a heading.
 * * Pass a `string[]` to render descriptions of all given data sources, preceded by headings and seperated with `<hr />` elements.
 * * If you want to add a heading to a single data source, pass it as one-element array.
 *
 * @param {keyof typeof descriptions | (keyof typeof descriptions)[]} dataSourceKeys The keys of the data sources to render a description for.
 */
export function DataSourcePopover({
  dataSourceKeys,
}: {
  dataSourceKeys: keyof typeof descriptions | (keyof typeof descriptions)[];
}) {
  if (Array.isArray(dataSourceKeys)) {
    return (
      <>
        {dataSourceKeys.map((dataSourceKey, index) => (
          <div key={dataSourceKey}>
            {index ? <hr /> : null}
            <h1>{descriptions[dataSourceKey]?.title}</h1>
            <DataSourcePopover dataSourceKeys={dataSourceKey} />
          </div>
        ))}
      </>
    );
  }

  const { summary, description, updateInterval, dataSource, dataSourceLink, updateDetails } = descriptions[
    dataSourceKeys
  ] as DataSourceDescription;

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
