import React from 'react';

import AboutText from '@/components/About/AboutText';
import HungerMapLiveSuperscript from '@/components/About/HungerMapLiveSuperscript';
import Accordion from '@/components/Accordions/Accordion';
import accordionItems from '@/domain/constant/about/accordionItems';

function Page() {
  return (
    <main className="flex flex-col gap-6 lg:gap-10 p-5 lg:p-10">
      <h1>
        About <HungerMapLiveSuperscript />
      </h1>
      <AboutText />
      <Accordion items={accordionItems} />
    </main>
  );
}

export default Page;
