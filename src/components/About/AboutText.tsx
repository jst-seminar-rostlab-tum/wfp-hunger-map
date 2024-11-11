import { Link } from '@nextui-org/link';
import React from 'react';

import HungerMapLiveSuperscript from '@/components/About/HungerMapLiveSuperscript';

export function AboutText() {
  return (
    <section>
      <p>
        <b>
          <HungerMapLiveSuperscript /> is the World Food Programme (WFP)’s global hunger monitoring system.
        </b>{' '}
        It combines key metrics from various data sources – such as food security information, weather, population size,
        conflict, hazards, nutrition information and macro-economic data – to help assess, monitor and predict the
        magnitude and severity of hunger in near real-time. The resulting analysis is displayed on an interactive map
        that helps WFP staff, key decision makers and the broader humanitarian community to make more informed and
        timely decisions relating to food security.
      </p>
      <p>
        The platform covers 94 countries, including countries where WFP has operations as well as most{' '}
        <Link
          isExternal
          size="lg"
          underline="hover"
          href="https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups"
          className="inline"
        >
          lower and lower-middle income countries
        </Link>{' '}
        (as classified by the World Bank). For any questions, comments, or if you would like further information, please
        get in touch by sending an email to{' '}
        <Link isExternal size="lg" underline="hover" href="mailto:wfp.mvam@wfp.org" className="inline">
          wfp.mvam@wfp.org
        </Link>
        .
      </p>
    </section>
  );
}

export default AboutText;
