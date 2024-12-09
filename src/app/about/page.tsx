'use client';

import React, { Suspense, useCallback, useState } from 'react';

import LiveSuperscript from '@/components/About/LiveSuperscript';
import DocsSearchBar from '@/components/Search/DocsSearchBar';
import DocsSearchBarSkeleton from '@/components/Search/DocsSearchBarSkeleton';
import SearchableSection from '@/components/Search/SearchableSection';
import aboutTextElements from '@/domain/constant/about/aboutTextElements';
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
  const [visibleAccordions, setVisibleAccordions] = useState<Set<string>>(new Set());

  const handleVisibilityChange = useCallback(
    (key: string, isVisible: boolean) =>
      setVisibleAccordions((prevState) => {
        if (isVisible) prevState.add(key);
        else prevState.delete(key);
        return prevState;
      }),
    []
  );

  return (
    <>
      <Suspense fallback={<DocsSearchBarSkeleton />}>
        <DocsSearchBar setSearchWords={setSearchWords} />
      </Suspense>
      {!searchWords.length && (
        <h1 className="!mb-0">
          About HungerMap
          <LiveSuperscript />
        </h1>
      )}
      {SECTIONS.map(({ heading, textElements, accordionItems }, index) => {
        const key = heading ?? `section-${index}`;
        return (
          <SearchableSection
            key={key}
            heading={heading}
            textElements={textElements}
            accordionItems={accordionItems}
            searchWords={searchWords}
            onVisibilityChange={(isVisible) => handleVisibilityChange(key, isVisible)}
          />
        );
      })}
      {!visibleAccordions.size && !!searchWords.length && <p className="text-center">No results</p>}
    </>
  );
}

export default Page;
