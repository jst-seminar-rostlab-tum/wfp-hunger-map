import React from 'react';

import CustomTable from '@/components/Table/CustomTable';
import {
  contextAndNeedDescriptions,
  foodSecurityDescriptions,
  marketDescriptions,
  nutritionDescriptions,
  otherDescriptions,
  seasonalDescriptions,
} from '@/domain/constant/dataSources/dataSourceDescriptions';
import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { CustomTableColumns } from '@/domain/props/CustomTableProps';
import { SearchOperations } from '@/operations/Search/SearchOperations';

const dataSourceTableColumns = [
  { columnId: 'keyColumn', label: 'Data type', alignLeft: true },
  { columnId: 'source', label: 'Source' },
] as CustomTableColumns;

const dataSourceAccordionItems: AccordionItemProps[] = [
  {
    title: 'Context and Need',
    data: contextAndNeedDescriptions,
  },
  {
    title: 'Food Security',
    data: foodSecurityDescriptions,
  },
  {
    title: 'Nutrition',
    data: nutritionDescriptions,
  },
  {
    title: 'Markets',
    data: marketDescriptions,
  },
  {
    title: 'Seasonal Information',
    data: seasonalDescriptions,
  },
  {
    title: 'Other',
    data: otherDescriptions,
  },
].map(({ title, data }) => {
  return {
    title,
    content: <CustomTable columns={dataSourceTableColumns} data={data} format="dataSources" ariaLabel={title} />,
  };
});

export default SearchOperations.makeDataSourceAccordionSearchable(dataSourceAccordionItems);
