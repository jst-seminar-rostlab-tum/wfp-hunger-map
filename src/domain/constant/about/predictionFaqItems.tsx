import React from 'react';

import StyledLink from '@/components/About/StyledLink';
import CustomTable from '@/components/Table/CustomTable';
import { accuracyTableColumns, accuracyTableContents } from '@/domain/constant/about/accuracyTableContents';
import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { SearchOperations } from '@/operations/Search/SearchOperations';

export const predictionFaqText = SearchOperations.makeTextElementsSearchable([
  <p>
    For first-level administrative areas where daily updated survey data is not available, the prevalence of people with
    poor or borderline{' '}
    <StyledLink href="https://documents.wfp.org/stellent/groups/public/documents/manual_guide_proced/wfp197216.pdf">
      food consumption (FCS)
    </StyledLink>{' '}
    and the prevalence of people with{' '}
    <StyledLink href="https://documents.wfp.org/stellent/groups/public/documents/manual_guide_proced/wfp211058.pdf">
      reduced coping strategy index (rCSI)
    </StyledLink>{' '}
    ≥ 19 is estimated with a predictive model.
  </p>,
]);

const predictionFaqItems: AccordionItemProps[] = [
  {
    title: 'What data are used for training the models?',
    content: (
      <>
        <p>
          The models were trained using FCS and rCSI data spanning over 70 countries across, aggregated at the level of
          first-order administrative divisions. The input variables used to make the predictions were built using
          information about population density, rainfall, vegetation status, conflict, market prices, macroeconomic
          indicators, and undernourishment. For areas where past FCS/rCSI measurements are available, the last available
          data point is also included as input variable.
        </p>
        <p>
          More details are listed in the{' '}
          <StyledLink href="/data_sources" isInternal>
            Data sources page
          </StyledLink>
          . Additional sources used only for the model but not for display purposes are:
        </p>
        <ul>
          <li>
            <StyledLink href="https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-count-rev11">
              Gridded Population of the World, Version 4 (GPWv4): Population Count, Revision 11
            </StyledLink>
          </li>
          <li>
            <StyledLink href="https://documents.wfp.org/stellent/groups/public/documents/manual_guide_proced/wfp264186.pdf">
              WFP’s Alert for Price Spikes (ALPS) indicator
            </StyledLink>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'Which algorithm is being used for training?',
    content: (
      <p>
        The predictive models are trained using <StyledLink href="https://xgboost.ai/">XGBoost</StyledLink> – a machine
        learning technique producing predictive models in the of an ensemble of regression trees. The model parameters
        were optimized by a cross-validated grid-search.
      </p>
    ),
  },
  {
    title: 'How accurate are the predictions?',
    content: (
      <>
        <p>
          The accuracy of the model was evaluated on a test set comprising 20% of the historical data, having trained
          100 models on subsamples (with replacement) of the remaining 80% of the historical data. The following results
          were obtained on the test sets.
        </p>
        <CustomTable
          columns={accuracyTableColumns}
          data={accuracyTableContents}
          format="grouped"
          ariaLabel="Performance measures of the prediction algorithms"
        />
      </>
    ),
  },
  {
    title: 'Which data are predicted by the model?',
    content: (
      <p>
        The model produces current estimates of the prevalence of people with poor or borderline FCS and rCSI for areas
        where no food security data is available; we call this nowcasting. For each first-level administrative boundary
        we report the median and 95% confidence intervals of a distribution of predictions obtained from 100-bootstrap
        models trained on subsamples (with replacement) of the training data.
      </p>
    ),
  },
  {
    title: "What are next steps in the development of WFP's predictions?",
    content: (
      <p>
        Moving forward, more features will be developed and made available to explain how predicted numbers are
        calculated. In tandem, a technical report on the predictive model will also be made available soon.
        Additionally, WFP aims to extend the scope of the system’s predictions from nowcasting the current food security
        situation to forecasting how the situation is likely to change in the next one, three or six months.
      </p>
    ),
  },
];

export default SearchOperations.makeAccordionItemsSearchable(predictionFaqItems);
