import React from 'react';

import GroupedTable from '@/components/GroupedTable/GroupedTable';
import { accuracyTableColumns, accuracyTableData } from '@/domain/constant/about/accuracyTableData';

const accordionItems = [
  {
    title: 'How accurate are the prediction algorithms?',
    content: (
      <GroupedTable
        columns={accuracyTableColumns}
        data={accuracyTableData}
        ariaLabel="Performance measures of the prediction algorithms"
      />
    ),
  },
];

export default accordionItems;
