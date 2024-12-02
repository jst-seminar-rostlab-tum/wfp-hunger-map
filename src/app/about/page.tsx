'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import LiveSuperscript from '@/components/About/LiveSuperscript';
import SearchableSection from '@/components/Search/SearchableSection';
import SearchBar from '@/components/Search/SearchBar';
import { aboutTextItems } from '@/domain/constant/about/aboutTextItems';
import generalFaqItems from '@/domain/constant/about/generalFaqItems';
import predictionFaqItems, { predictionFaqText } from '@/domain/constant/about/predictionFaqItems';
import realTimeFaqItems from '@/domain/constant/about/realTimeFaqItems';
import { getSearchWords } from '@/utils/searchUtils';

function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(params.get('search') ?? '');
  const [searchWords, setSearchWords] = useState<string[]>([]);

  useEffect(() => {
    setSearchWords(getSearchWords(search));
  }, [search]);

  return (
    <>
      <SearchBar
        value={search}
        onValueChange={(v) => {
          setSearch(v);
          router.push(`${pathname}?search=${v}`);
        }}
        className="max-w-md mx-auto pb-5"
      />
      <div>
        {!search && (
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
