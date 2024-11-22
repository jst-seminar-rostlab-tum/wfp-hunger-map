import { CustomTableData, SimpleTableData } from '@/domain/props/CustomTableProps';

function formatSimpleTable(dataSources: SimpleTableData) {
  return dataSources.map(({ keyColumn, ...otherColumns }) => ({
    groupKey: keyColumn,
    groupName: keyColumn,
    attributeRows: [{ ...otherColumns }],
  })) as CustomTableData;
}

export default formatSimpleTable;
