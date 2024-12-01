import React from 'react';

import AboutText from '@/components/About/AboutText';
import HungerMapLiveSuperscript from '@/components/About/HungerMapLiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import AccordionContainer from '@/components/Accordions/AccordionContainer';
import generalFaqItems from '@/domain/constant/about/generalFaqItems';
import predictionFaqItems from '@/domain/constant/about/predictionFaqItems';
import realTimeFaqItems from '@/domain/constant/about/realTimeFaqItems';

function Page() {
  return (
    <>
      <section>
        <h1>
          About <HungerMapLiveSuperscript />
        </h1>
        <AboutText />
      </section>
      <section>
        <h2>General Questions</h2>
        <AccordionContainer items={generalFaqItems} multipleSelectionMode />
      </section>
      <section>
        <h2> Near real-time food security continuous monitoring</h2>
        <AccordionContainer items={realTimeFaqItems} multipleSelectionMode />
      </section>
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
        <AccordionContainer items={predictionFaqItems} multipleSelectionMode />
      </section>
    </>
  );
}

export default Page;
