import React from 'react';

import LiveSuperscript from '@/components/About/LiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import AccordionContainer from '@/components/Accordions/AccordionContainer';
import wikiEntries from '@/domain/constant/wiki/wikiEntries';

function Page() {
  return (
    <section>
      <h1>Wiki</h1>
      <p>
        This page contains more detailed explanations for some of the concepts behind the HungerMap
        <LiveSuperscript />. See{' '}
        <StyledLink href="/about" isInternal>
          About
        </StyledLink>{' '}
        for a broader overview.
      </p>
      <AccordionContainer items={wikiEntries} />
    </section>
  );
}

export default Page;
