'use client';

import React, { Suspense, useState } from 'react';

import DocsSearchBar from '@/components/Search/DocsSearchBar';
import SearchableSection from '@/components/Search/SearchableSection';
import dataSourceAccordionItems from '@/domain/constant/dataSources/dataSourceAccordionItems';
import { dataSourcesTextElements } from '@/domain/constant/dataSources/dataSourcesTextElements';

function Page() {
  const [searchWords, setSearchWords] = useState<string[]>([]);

  return (
    <Suspense>
      <DocsSearchBar setSearchWords={setSearchWords} />
      <div>
        {!searchWords.length && <h1>Data Sources</h1>}
        <SearchableSection
          textElements={dataSourcesTextElements}
          searchWords={searchWords}
          accordionItems={dataSourceAccordionItems}
        />
      </div>
    </Suspense>
  );
}

export default Page;
