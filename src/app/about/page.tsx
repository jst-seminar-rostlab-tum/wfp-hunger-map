'use client';

import React, { Suspense, useState } from 'react';

import LiveSuperscript from '@/components/About/LiveSuperscript';
import DocsSearchBar from '@/components/Search/DocsSearchBar';
import SearchableSection from '@/components/Search/SearchableSection';
import { aboutTextElements } from '@/domain/constant/about/aboutTextElements';
import generalFaqItems from '@/domain/constant/about/generalFaqItems';
import predictionFaqItems, { predictionFaqText } from '@/domain/constant/about/predictionFaqItems';
import realTimeFaqItems from '@/domain/constant/about/realTimeFaqItems';

function Page() {
  const SECTIONS = [
    { textElements: aboutTextElements },
    { heading: 'General Questions', accordionItems: generalFaqItems },
    { heading: 'Near real-time food security continuous monitoring', accordionItems: realTimeFaqItems },
    { heading: 'Predictive analysis', textElements: predictionFaqText, accordionItems: predictionFaqItems },
  ];

  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [nVisibleAccordions, setNVisibleAccordions] = useState(0);

  return (
    <Suspense>
      <DocsSearchBar setSearchWords={setSearchWords} />
      {!searchWords.length && (
        <h1 className="!mb-0">
          About HungerMap
          <LiveSuperscript />
        </h1>
      )}
      {SECTIONS.map(({ heading, textElements, accordionItems }) => (
        <SearchableSection
          heading={heading}
          textElements={textElements}
          accordionItems={accordionItems}
          searchWords={searchWords}
          setVisibilityCount={setNVisibleAccordions}
        />
      ))}
      {!nVisibleAccordions && !!searchWords.length && <p className="text-center">No results</p>}
    </Suspense>
  );
}

export default Page;
