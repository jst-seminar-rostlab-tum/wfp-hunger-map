import formatDataSourceTable from '@/operations/tables/formatDataSourceTable';
import formatGroupedTable from '@/operations/tables/formatGroupedTable';
import formatSimpleTable from '@/operations/tables/formatSimpleTable';

const tableFormatters = {
  simple: formatSimpleTable,
  grouped: formatGroupedTable,
  dataSources: formatDataSourceTable,
};

export default tableFormatters;
