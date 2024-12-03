import React from 'react';

import LiveSuperscript from '@/components/About/LiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import { SearchOperations } from '@/operations/Search/SearchOperations';

export const dataSourcesTextElements = SearchOperations.makeTextElementsSearchable([
  <p>
    <b>
      This section includes all indicators and data sources displayed on HungerMap
      <LiveSuperscript /> (global and country pages).
    </b>{' '}
    Additional sources used as input variables for the predictive model but not for display purposes are listed on the{' '}
    <StyledLink href="/about" isInternal>
      About page
    </StyledLink>
    .
  </p>,
]);
