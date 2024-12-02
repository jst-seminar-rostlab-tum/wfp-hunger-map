import React from 'react';

import HungerMapLiveSuperscript from '@/components/About/HungerMapLiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import AccordionContainer from '@/components/Accordions/AccordionContainer';
import dataSourceAccordionItems from '@/domain/constant/dataSources/dataSourceAccordionItems';

function Page() {
  return (
    <section>
      <h1>Data Sources</h1>
      <p>
        <b>
          This section includes all indicators and data sources displayed on <HungerMapLiveSuperscript /> (global and
          country pages).
        </b>{' '}
        Additional sources used as input variables for the predictive model but not for display purposes are listed on
        the{' '}
        <StyledLink href="/about" isInternal>
          About page
        </StyledLink>
        .
      </p>
      <AccordionContainer items={dataSourceAccordionItems} multipleSelectionMode />
    </section>
  );
}

export default Page;
