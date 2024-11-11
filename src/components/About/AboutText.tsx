import React from 'react';

import ExternalLink from '@/components/About/ExternalLink';
import HungerMapLiveSuperscript from '@/components/About/HungerMapLiveSuperscript';

export function AboutText() {
  return (
    <>
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
        WFP’s Hunger Monitoring Unit in the Research, Assessment and Monitoring Division conducts real-time food
        security monitoring to track the latest food security trends. In areas where limited or no data is available, we
        use machine learning-based predictive models to estimate the food security situation.
      </p>
      <p>
        The platform covers 94 countries, including countries where WFP has operations as well as most{' '}
        <ExternalLink href="https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups">
          lower and lower-middle income countries
        </ExternalLink>{' '}
        (as classified by the World Bank). For any questions, comments, or if you would like further information, please
        get in touch by sending an email to <ExternalLink href="mailto:wfp.mvam@wfp.org">wfp.mvam@wfp.org</ExternalLink>
        .
      </p>
    </>
  );
}

export default AboutText;
