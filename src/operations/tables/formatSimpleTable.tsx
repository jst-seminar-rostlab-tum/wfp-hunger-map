import { GroupedTableData, SimpleTableData } from '@/domain/props/GroupedTableProps';

function formatSimpleTable(dataSources: SimpleTableData) {
  return dataSources.map(({ mainColumn, ...otherColumns }) => ({
    groupKey: mainColumn,
    groupName: mainColumn,
    attributeRows: [{ ...otherColumns }],
  })) as GroupedTableData;
}

export default formatSimpleTable;
