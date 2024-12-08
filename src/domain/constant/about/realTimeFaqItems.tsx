import React from 'react';

import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { SearchOperations } from '@/operations/Search/SearchOperations';

const generalQuestionItems: AccordionItemProps[] = [
  {
    title: 'How does the near real-time food security monitoring work?',
    content: (
      <>
        <p>
          WFP conducts continuous food security monitoring via <b>computer assisted telephone interviewing (CATI)</b>{' '}
          through call centers. Data is collected on a rolling basis, spread evenly over a past 28/30 calendar days or
          over a three-month period. The main advantage of this approach is that data is available more frequently and
          processed daily through <b>automated statistical engines</b>. Daily updates are then produced showing a
          snapshot of the current food security situation (with a slight time lag of 2-4 days to ensure data quality)
          over the past 28/30 calendar days.
        </p>
        <p>
          The questionnaire includes questions on household demographics, households’ food consumption, coping
          strategies used (food-based and livelihood-based), access to food, market and health services, and other
          country-specific livelihood-related questions. In addition, at the end of the survey, respondents are given
          the opportunity to share additional information on the food situation in their communities.
        </p>
      </>
    ),
  },
  {
    title: 'How does the WFP strive for representative monitoring results?',
    content: (
      <>
        <p>
          The call interviews aim to cover all mobile service providers, and telephone numbers are randomly selected
          from a database of phone numbers or generated using random-digit dialling (RDD) method. To ensure a more
          representative sample, WFP uses various types of <b>pre/post-stratification and sampling methods</b>,
          including by weighting results by population at the first or second administrative level and by a demographic
          variable such as the level of education or water sources which could impact food security, in order to account
          for the fact that households with more phones are more likely to be selected (e.g. younger, somewhat
          better-off households who live in urban areas).
        </p>
        <p>
          In order to compensate for non-response and attrition, key challenges for high frequency mobile phone surveys,
          new observations are added in each administrative area following the sample design specific for each of the
          country.
        </p>
      </>
    ),
  },
  {
    title: 'Where is near real-time data available?',
    content: (
      <p>
        The countries where near-real time data is currently displayed are: Afghanistan, Angola, Benin, Burkina Faso,
        Cameroon, Central African Republic, Chad, Colombia, Congo, Democratic Republic of the Congo, El Salvador,
        Ethiopia, Guatemala, Guinea, Haiti, Honduras, Iraq, Ivory Coast, Kenya, Madagascar, Malawi, Mali, Mauritania,
        Mozambique, Nicaragua, Niger, Nigeria, Sierra Leone, Somalia, Syrian Arab Republic, United Republic of Tanzania,
        Yemen, Zambia, and Zimbabwe (as of January April 2021).
      </p>
    ),
  },
];

export default SearchOperations.makeAccordionItemsSearchable(generalQuestionItems);
