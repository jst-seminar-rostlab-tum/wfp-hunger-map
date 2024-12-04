'use client';

import React, { Suspense, useState } from 'react';

import DocsSearchBar from '@/components/Search/DocsSearchBar';
import SearchableSection from '@/components/Search/SearchableSection';
import wikiEntries from '@/domain/constant/wiki/wikiEntries';
import { wikiTextElements } from '@/domain/constant/wiki/wikiTextElements';

function Page() {
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [sectionIsVisible, setSectionIsVisible] = useState(true);

  return (
    <Suspense>
      <DocsSearchBar setSearchWords={setSearchWords} />
      {!searchWords.length && <h1 className="!mb-0">Wiki</h1>}
      <SearchableSection
        textElements={wikiTextElements}
        searchWords={searchWords}
        accordionItems={wikiEntries}
        onVisibilityChange={setSectionIsVisible}
      />
      {!sectionIsVisible && !!searchWords.length && <p className="text-center">No results</p>}
    </Suspense>
  );
}

export default Page;
