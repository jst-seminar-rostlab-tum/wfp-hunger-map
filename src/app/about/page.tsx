'use client';

import React, { useEffect, useState } from 'react';

import AboutText from '@/components/About/AboutText';
import HungerMapLiveSuperscript from '@/components/About/HungerMapLiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import Accordion from '@/components/Accordions/Accordion';
import SearchBar from '@/components/Search/SearchBar';
import generalFaqItems from '@/domain/constant/about/generalFaqItems';
import predictionFaqItems from '@/domain/constant/about/predictionFaqItems';
import realTimeFaqItems from '@/domain/constant/about/realTimeFaqItems';
import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { filterAccordionItems } from '@/utils/searchUtils';

function Page() {
  const [search, setSearch] = useState('');
  const [filteredGeneralFaqItems, setFilteredGeneralFaqItems] = useState<AccordionItemProps[] | null>(null);
  const [filteredPredictionFaqItems, setFilteredPredictionFaqItems] = useState<AccordionItemProps[] | null>(null);
  const [filteredRealTimeFaqItems, setFilteredRealTimeFaqItems] = useState<AccordionItemProps[] | null>(null);

  useEffect(() => {
    setFilteredGeneralFaqItems(filterAccordionItems(generalFaqItems, search));
    setFilteredPredictionFaqItems(filterAccordionItems(predictionFaqItems, search));
    setFilteredRealTimeFaqItems(filterAccordionItems(realTimeFaqItems, search));
  }, [search, generalFaqItems, predictionFaqItems, realTimeFaqItems]);

  return (
    <>
      <SearchBar value={search} onValueChange={(v) => setSearch(v)} className="max-w-md mx-auto pb-5" />
      {!search && (
        <section>
          <h1>
            About <HungerMapLiveSuperscript />
          </h1>
          <AboutText />
        </section>
      )}
      {(!filteredGeneralFaqItems || !!filteredGeneralFaqItems.length) && (
        <section>
          <h2>General Questions</h2>
          <Accordion
            items={filteredGeneralFaqItems ?? generalFaqItems}
            multipleSelectionMode
            expandAll={!!filteredGeneralFaqItems}
          />
        </section>
      )}
      {(!filteredRealTimeFaqItems || !!filteredRealTimeFaqItems.length) && (
        <section>
          <h2> Near real-time food security continuous monitoring</h2>
          <Accordion
            items={filteredRealTimeFaqItems ?? realTimeFaqItems}
            multipleSelectionMode
            expandAll={!!filteredRealTimeFaqItems}
          />
        </section>
      )}
      {(!filteredPredictionFaqItems || !!filteredPredictionFaqItems.length) && (
        <section>
          <h2> Predictive analysis</h2>
          <p>
            For first-level administrative areas where daily updated survey data is not available, the prevalence of
            people with poor or borderline{' '}
            <StyledLink href="https://documents.wfp.org/stellent/groups/public/documents/manual_guide_proced/wfp197216.pdf">
              food consumption (FCS)
            </StyledLink>{' '}
            and the prevalence of people with{' '}
            <StyledLink href="https://documents.wfp.org/stellent/groups/public/documents/manual_guide_proced/wfp211058.pdf">
              reduced coping strategy index (rCSI)
            </StyledLink>{' '}
            ≥ 19 is estimated with a predictive model.
          </p>
          <Accordion
            items={filteredPredictionFaqItems ?? predictionFaqItems}
            multipleSelectionMode
            expandAll={!!filteredPredictionFaqItems}
          />
        </section>
      )}
    </>
  );
}

export default Page;
