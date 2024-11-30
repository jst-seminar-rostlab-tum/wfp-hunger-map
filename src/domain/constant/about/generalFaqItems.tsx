import React from 'react';

import HungerMapLiveSuperscript from '@/components/About/HungerMapLiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { SearchOperations } from '@/operations/Search/SearchOperations';

const generalFaqItems: AccordionItemProps[] = [
  {
    title: 'What is shown on the "Current food consumption" map?',
    content: (
      <>
        <p>
          The global view of the <HungerMapLiveSuperscript /> visualizes two data streams:
        </p>
        <ul>
          <li>Prevalence of insufficient food intake at administrative level 1 (green, yellow, and red color)</li>
          <li>Population density (brightness of a region)</li>
        </ul>
        <p>
          Therefore, the color indicates the level of food insufficiency in a given country - wherein red signals areas
          where people are not meeting the required food intake levels and thus require urgent assistance. At the same
          time, the brightness of a region or country indicates how populated the area is - wherein brighter areas
          signal the presence of more people.
        </p>
        <p>
          More so, in areas where we do not have data on the prevalence of people with insufficient food intake - and
          are therefore not clickable - we use the{' '}
          <StyledLink href="https://www.sciencedirect.com/science/article/abs/pii/S0305750X19303572">
            Proteus index
          </StyledLink>
          , which measures food security in 185 countries over 28 years and is published annually.
        </p>
      </>
    ),
  },
  {
    title: 'Why are the numbers different from last time I checked?',
    content: (
      <>
        <p>
          You might notice that the figures in the trends of the number of people with insufficient food consumption and
          of the number of people using crisis or above crisis food-based coping might have changed from the last time
          you accessed the <HungerMapLiveSuperscript />. These are several reasons why this might have happened.
        </p>
        <ul>
          <li>
            We are constantly looking at improving our predictive model. <b>We regularly re-train the model</b> as new
            food insecurity data comes in from our near-real time food security continuous monitoring systems and from
            face-to-face or mVAM surveys carried out by WFP Country Offices. Sometimes we also add new features to the
            model to improve its accuracy. Overall, any change we make to the model is meant to improve the predictions
            and make them closer to the truth. For consistency, every time we improve the model, we re-run the
            predictions for the last 90 days, and this is why you might see numbers changing for dates in the past as
            well.
          </li>
          <li>
            As we expand our continuous monitoring systems, and as data becomes available for a new country, we{' '}
            <b>switch from showing predictions to showing actual data estimates</b> obtained from daily mVAM surveys.
            So, when this happens, we replace the historical, prediction-based series of data with the actual, live data
            being collected daily.
          </li>
          <li>
            We are constantly working to <b>improve our survey aggregation methodology</b>, exploring the best ways to
            weight the contribution of each household and of each geographical area. As we improve how we compute the
            aggregates, we apply the new methods across the entire historical series of data, and this may be why the
            trends may show different numbers sometimes.
          </li>
          <li>
            Finally, another reason might be because we obtained <b>updated population estimates</b> from WFP Country
            Offices. In this case, the existing numbers computed from the predictive models or the continuous monitoring
            data are recalculated with the new population estimates, causing changes in the number of people with
            insufficient food consumption and using negative coping strategies.
          </li>
        </ul>
      </>
    ),
  },
];

export default SearchOperations.makeAccordionItemsSearchable(generalFaqItems);
