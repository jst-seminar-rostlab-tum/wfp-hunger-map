import React from 'react';

import AboutText from '@/components/About/AboutText';
import ExternalLink from '@/components/About/ExternalLink';
import HungerMapLiveSuperscript from '@/components/About/HungerMapLiveSuperscript';
import Accordion from '@/components/Accordions/Accordion';
import generalFaqItems from '@/domain/constant/about/generalFaqItems';
import predictionFaqItems from '@/domain/constant/about/predictionFaqItems';
import realTimeFaqItems from '@/domain/constant/about/realTimeFaqItems';

function Page() {
  return (
    <main className="flex flex-col gap-6 lg:gap-10 p-5 lg:p-10 about-page">
      <section>
        <h1>
          About <HungerMapLiveSuperscript />
        </h1>
        <AboutText />
      </section>
      <section>
        <h2>General Questions</h2>
        <Accordion items={generalFaqItems} />
      </section>
      <section>
        <h2> Near real-time food security continuous monitoring</h2>
        <Accordion items={realTimeFaqItems} />
      </section>
      <section>
        <h2> Predictive analysis</h2>
        <p>
          For first-level administrative areas where daily updated survey data is not available, the prevalence of
          people with poor or borderline{' '}
          <ExternalLink href="https://documents.wfp.org/stellent/groups/public/documents/manual_guide_proced/wfp197216.pdf">
            food consumption (FCS)
          </ExternalLink>{' '}
          and the prevalence of people with{' '}
          <ExternalLink href="https://documents.wfp.org/stellent/groups/public/documents/manual_guide_proced/wfp211058.pdf">
            reduced coping strategy index (rCSI)
          </ExternalLink>{' '}
          ≥ 19 is estimated with a predictive model.
        </p>
        <Accordion items={predictionFaqItems} />
      </section>
    </main>
  );
}

export default Page;
