import React from 'react';

import LiveSuperscript from '@/components/About/LiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import { SearchOperations } from '@/operations/Search/SearchOperations';

const wikiTextElements = [
  <p>
    This page contains more detailed explanations for some of the concepts behind the HungerMap
    <LiveSuperscript />. See{' '}
    <StyledLink href="/about" isInternal>
      About
    </StyledLink>{' '}
    for a broader overview.
  </p>,
];

export default SearchOperations.makeTextElementsSearchable(wikiTextElements);
