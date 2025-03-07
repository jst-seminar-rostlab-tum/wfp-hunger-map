'use client';

import React, { Suspense, useState } from 'react';

import DocsSearchBar from '@/components/Search/DocsSearchBar';
import DocsSearchBarSkeleton from '@/components/Search/DocsSearchBarSkeleton';
import SearchableSection from '@/components/Search/SearchableSection';
import dataSourceAccordionItems from '@/domain/constant/dataSources/dataSourceAccordionItems';
import dataSourcesTextElements from '@/domain/constant/dataSources/dataSourcesTextElements';

function Page() {
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [sectionIsVisible, setSectionIsVisible] = useState(true);

  return (
    <>
      <Suspense fallback={<DocsSearchBarSkeleton />}>
        <DocsSearchBar setSearchWords={setSearchWords} />
      </Suspense>
      {!searchWords.length && <h1 className="!mb-0">Data Sources</h1>}
      <SearchableSection
        textElements={dataSourcesTextElements}
        searchWords={searchWords}
        accordionItems={dataSourceAccordionItems}
        onVisibilityChange={setSectionIsVisible}
      />
      {!sectionIsVisible && !!searchWords.length && <p className="text-center">No results</p>}
    </>
  );
}

export default Page;
