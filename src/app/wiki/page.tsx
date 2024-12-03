'use client';

import React, { Suspense, useState } from 'react';

import DocsSearchBar from '@/components/Search/DocsSearchBar';
import SearchableSection from '@/components/Search/SearchableSection';
import wikiEntries from '@/domain/constant/wiki/wikiEntries';
import { wikiTextElements } from '@/domain/constant/wiki/wikiTextElements';

function Page() {
  const [searchWords, setSearchWords] = useState<string[]>([]);

  return (
    <Suspense>
      <DocsSearchBar setSearchWords={setSearchWords} />
      <div>
        {!searchWords.length && <h1>Wiki</h1>}
        <SearchableSection textElements={wikiTextElements} searchWords={searchWords} accordionItems={wikiEntries} />
      </div>
    </Suspense>
  );
}

export default Page;
