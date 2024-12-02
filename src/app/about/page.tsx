'use client';

import React, { useState } from 'react';

import LiveSuperscript from '@/components/About/LiveSuperscript';
import DocsSearchBar from '@/components/Search/DocsSearchBar';
import SearchableSection from '@/components/Search/SearchableSection';
import { aboutTextItems } from '@/domain/constant/about/aboutTextItems';
import generalFaqItems from '@/domain/constant/about/generalFaqItems';
import predictionFaqItems, { predictionFaqText } from '@/domain/constant/about/predictionFaqItems';
import realTimeFaqItems from '@/domain/constant/about/realTimeFaqItems';

function Page() {
  const [searchWords, setSearchWords] = useState<string[]>([]);

  return (
    <>
      <DocsSearchBar setSearchWords={setSearchWords} />
      <div>
        {!searchWords.length && (
          <h1>
            About HungerMap
            <LiveSuperscript />
          </h1>
        )}
        <SearchableSection textElements={aboutTextItems} searchWords={searchWords} />
      </div>
      <SearchableSection heading="General Questions" accordionItems={generalFaqItems} searchWords={searchWords} />
      <SearchableSection
        heading="Near real-time food security continuous monitoring"
        accordionItems={realTimeFaqItems}
        searchWords={searchWords}
      />
      <SearchableSection
        heading="Predictive analysis"
        textElements={predictionFaqText}
        accordionItems={predictionFaqItems}
        searchWords={searchWords}
      />
    </>
  );
}

export default Page;
