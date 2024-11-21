import { GroupedTableData, SimpleTableData } from '@/domain/props/GroupedTableProps';

function formatSimpleTable(dataSources: SimpleTableData) {
  return dataSources.map(({ keyColumn, ...otherColumns }) => ({
    groupKey: keyColumn,
    groupName: keyColumn,
    attributeRows: [{ ...otherColumns }],
  })) as GroupedTableData;
}

export default formatSimpleTable;
