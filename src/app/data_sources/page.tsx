import React from 'react';

import LiveSuperscript from '@/components/About/LiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import CustomAccordion from '@/components/Accordions/Accordion';
import dataSourceAccordionItems from '@/domain/constant/dataSources/dataSourceAccordionItems';

function Page() {
  return (
    <section>
      <h1>Data Sources</h1>
      <p>
        <b>
          This section includes all indicators and data sources displayed on HungerMap
          <LiveSuperscript /> (global and country pages).
        </b>{' '}
        Additional sources used as input variables for the predictive model but not for display purposes are listed on
        the{' '}
        <StyledLink href="/about" isInternal>
          About page
        </StyledLink>
        .
      </p>
      <CustomAccordion items={dataSourceAccordionItems} multipleSelectionMode />
    </section>
  );
}

export default Page;
