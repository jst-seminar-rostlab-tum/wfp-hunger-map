import LiveSuperscript from '@/components/About/LiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import { WikiEntry } from '@/domain/entities/wiki/WikiEntry';
import { SearchOperations } from '@/operations/Search/SearchOperations';

const wikiEntries = (
  [
    {
      key: 'fcs',
      title: 'Food Consumption Score (FCS)',
      content: (
        <>
          <p>
            The Food Consumption Score (FCS) measures the adequacy of the foods consumed in the week prior to being
            surveyed. It is calculated using the frequency of consumption of eight food groups by a household. Each of
            the food groups is weighted to reflect its respective nutrient density.
          </p>
          <p>
            Based on the FCS, the food consumption is classified as listed below. The map of insufficient food
            consumption shows the prevalence of poor or borderline food consumption in a region.
          </p>
          <ul>
            <li>
              <b>Poor food consumption:</b> Typically refers to households that are not consuming staples and vegetables
              every day and never or very seldom consume protein-rich food such as meat and dairy (FCS of less than 21
              or 28).
            </li>
            <li>
              <b>Borderline food consumption:</b> Typically refers to households that are consuming staples and
              vegetables every day, accompanied by oil and pulses a few times a week (FCS of less than 35 or 42).
            </li>
            <li>
              <b>Acceptable food consumption:</b> Typically refers to households that are consuming staples and
              vegetables every day, frequently accompanied by oil and pulses, and occasionally meat, fish and dairy (FCS
              greater than 42).
            </li>
          </ul>
        </>
      ),
    },
    {
      key: 'malnutrition-acute',
      title: 'Malnutrition, acute',
      content: (
        <>
          <p>
            Also known as ‘wasting’, acute malnutrition is characterized by a rapid deterioration in nutritional status
            over a short period of time. In children, it can be measured using the weight-for-height nutritional index
            or mid-upper arm circumference.
          </p>
          <p>There are different levels of severity of acute malnutrition:</p>
          <ul>
            <li>
              <b>Severe Acute Malnutrition (SAM)</b>: Also known as severe wasting, SAM is defined by a very low weight
              for height (below -3z scores of the median WHO child growth standards), or by a mid-upper arm
              circumference (MUAC) less than 115 mm or by visible signs of severe wasting, or by the presence of
              nutritional oedema.
            </li>
            <li>
              <b>Moderate Acute Malnutrition (MAM):</b> Also known as moderate wasting, MAM is defined by a weight for
              height between -3 and -2 z-scores of the median WHO child growth standards or by a mid-upper arm
              circumference (MUAC) between 115 mm and 125 mm.
            </li>
          </ul>
        </>
      ),
    },
    {
      key: 'malnutrition-chronic',
      title: 'Malnutrition, chronic',
      content: (
        <>
          <p>
            Also known as ‘stunting’, chronic malnutrition is a form of growth failure which develops over a long period
            of time. It is a result of inadequate nutrition (including poor maternal nutrition and poor infant and young
            child feeding practices) and/or repeated infections.
          </p>
          <p>
            Chronic malnutrition is defined as the percentage of children, aged less than 5 years, who have low height
            for age.
          </p>
          <ul>
            <li>
              <b>Stunting:</b> Height is lower by &gt; 2{' '}
              <StyledLink href="https://en.wikipedia.org/wiki/Standard_deviation">standard deviations</StyledLink> from
              the median height for age of reference population
            </li>
            <li>
              <b>Severe stunting:</b> Height is lower by &gt; 3 standard deviations from the median height for age of
              reference population
            </li>
          </ul>
        </>
      ),
    },
    {
      key: 'rain',
      title: 'Rainfall',
      content: (
        <p>
          The rainfall layer shows the cumulative rainfall in the previous month compared to the 20-year average.
          Variations between 90% and 110% are considered as having an inconsequential impact for crops or pasture and
          these are represented in white. Brown shades indicate below-average rainfall and blue shades indicate
          above-average seasonal rainfall.
        </p>
      ),
    },
    {
      key: 'rcsi',
      title: 'reduced Coping Strategies Index (rSCI)',
      content: (
        <>
          <p>
            The reduced Coping Strategies Index (rCSI) measures the frequency and severity of the behaviours households
            engage in when faced with shortages of food or financial resources to buy food. It assesses whether there
            has been a change in the consumption patterns of a given household.
          </p>
          <p>
            The rCSI is calculated using standard food consumption-based strategies and severity weighting. A higher
            score indicates that households are employing more frequent and/or extreme negative coping strategies.
          </p>
        </>
      ),
    },
    {
      key: 'undernourishment',
      title: 'Undernourishment',
      content: (
        <>
          <p>
            Undernourishment is the condition in which an individual’s habitual food consumption is insufficient to
            provide the dietary energy required to maintain a normal, active and healthy life.
          </p>
          <p>
            HungerMap
            <LiveSuperscript /> is reporting an estimate for the percentage of individuals in a condition of
            undernourishment (Prevalence of undernourishment/PoU). To reduce the influence of estimation errors in the
            underlying parameters, national estimates are reported as a three-year{' '}
            <StyledLink href="https://en.wikipedia.org/wiki/Moving_average">moving average</StyledLink>.
          </p>
        </>
      ),
    },
    {
      key: 'vegetation',
      title: 'Vegetation',
      content: (
        <p>
          Vegetation is reported using the <b>Normalized Difference Vegetation Index (NDVI)</b>, which shows the recent
          vegetation development compared to the average. Green shades show areas where vegetation cover is above
          average, whilst orange and brown shades identify areas where vegetation cover is below normal. Values between
          90% and 110% are considered as being within the range of normal variability.
        </p>
      ),
    },
  ] as WikiEntry[]
).sort((a, b) => a.title?.localeCompare(b.title));

export default SearchOperations.makeAccordionItemsSearchable(wikiEntries);
