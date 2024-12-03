'use client';

import React, { Suspense, useState } from 'react';

import DocsSearchBar from '@/components/Search/DocsSearchBar';
import SearchableSection from '@/components/Search/SearchableSection';
import dataSourceAccordionItems from '@/domain/constant/dataSources/dataSourceAccordionItems';
import { dataSourcesTextElements } from '@/domain/constant/dataSources/dataSourcesTextElements';

function Page() {
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [nVisibleAccordions, setNVisibleAccordions] = useState(0);

  return (
    <Suspense>
      <DocsSearchBar setSearchWords={setSearchWords} />
      {!searchWords.length && <h1 className="!mb-0">Data Sources</h1>}
      <SearchableSection
        textElements={dataSourcesTextElements}
        searchWords={searchWords}
        accordionItems={dataSourceAccordionItems}
        setVisibilityCount={setNVisibleAccordions}
      />
      {!nVisibleAccordions && !!searchWords.length && <p className="text-center">No results</p>}
    </Suspense>
  );
}

export default Page;
