import React from 'react';

import LiveSuperscript from '@/components/About/LiveSuperscript';
import StyledLink from '@/components/About/StyledLink';
import Abbreviation from '@/components/Tooltip/Abbreviation';
import { DataSourceDescriptionItems } from '@/domain/entities/dataSources/DataSourceDescription';

export const contextAndNeedDescriptions = {
  conflicts: {
    title: 'Conflicts',
    summary:
      'All reported violence and conflicts in the last 30 days across Africa, the Middle East, South and South East ' +
      'Asia, Eastern and Southeastern Europe and the Balkans.',
    dataSource: 'Armed Conflict Location & Event Data Project (ACLED)',
    dataSourceLink: 'https://acleddata.com/',
    updateInterval: 'daily',
  },
  hazards: {
    title: 'Hazards',
    summary: 'Hazards such as storms, earthquakes, wildfires or landslides.',
    description: (
      <>
        <p>Current hazards information:</p>
        <ul>
          <li>Active Volcanoes</li>
          <li>Active/Forecast Wind Radii (39, 58, 74)</li>
          <li>Previous, Current and Forecast Storm Positions</li>
          <li>3- and 5-day Potential Track Area of Storms</li>
          <li>Recent Earthquakes</li>
          <li>MODIS Hotspots</li>
          <li>Tsunami Travel Time</li>
          <li>GLIDE Events</li>
          <li>H1N1 Affected Countries</li>
          <li>Country Boundaries and Labels</li>
          <li>Global Shaded Relief</li>
          <li>Global Population Density</li>
          <li>PDC integrated hazards</li>
        </ul>
      </>
    ),
    dataSource: 'Pacific Disaster Centre (PDC) - Active Hazards Map Service',
    updateInterval: 'hourly',
    readMoreLink: '/wiki',
  },
  population: {
    title: 'Population',
    summary:
      'Total population counts all residents, regardless of legal status or citizenship (the values shown are mid-year estimates).',
    dataSource: 'World Bank',
  },
} satisfies DataSourceDescriptionItems;

export const foodSecurityDescriptions = {
  fcs: {
    title: 'Food Consumption Score (FCS)',
    legendTitle: 'People with Insufficient Food Consumption',
    forecastLegendTitle: 'Forecasted People with Insufficient Food Consumption',
    summary: 'Number of people with poor or borderline food consumption according to the Food Consumption Score (FCS).',
    description: (
      <>
        <p>
          The Food Consumption Score (FCS) measures the adequacy of the foods consumed in the week prior to being
          surveyed. It is calculated using the frequency of consumption of eight food groups by a household. Each of the
          food groups is weighted to reflect its respective nutrient density.
        </p>
        <p>
          Based on the FCS, the food consumption is classified as listed below. The map of insufficient food consumption
          shows the prevalence of poor or borderline food consumption in a region.
        </p>
        <ul>
          <li>
            <b>Poor food consumption:</b> Typically refers to households that are not consuming staples and vegetables
            every day and never or very seldom consume protein-rich food such as meat and dairy (FCS of less than 21 or
            28).
          </li>
          <li>
            <b>Borderline food consumption:</b> Typically refers to households that are consuming staples and vegetables
            every day, accompanied by oil and pulses a few times a week (FCS of less than 35 or 42).
          </li>
          <li>
            <b>Acceptable food consumption:</b> Typically refers to households that are consuming staples and vegetables
            every day, frequently accompanied by oil and pulses, and occasionally meat, fish and dairy (FCS greater than
            42).
          </li>
        </ul>
      </>
    ),
    readMoreLink: '/wiki',
    dataSource: (
      <span>
        <Abbreviation abbreviation="WFP" />: representative face-to-face household surveys (e.g.{' '}
        <Abbreviation abbreviation="CFSVA" />, <Abbreviation abbreviation="EFSA" />) and{' '}
        <Abbreviation abbreviation="mVAM" /> surveys
      </span>
    ),
    updateDetails: [
      {
        label: (
          <>
            <Abbreviation abbreviation="mVAM" /> surveys
          </>
        ),
        interval: 'daily or monthly',
      },
      { label: 'face-to-face surveys', interval: 'biyearly or less' },
    ],
  },
  ipcCh: {
    title: 'Integrated Food Security Phase Classification (IPC) / Cadre Harmonisé (CH)',
    summary:
      'Developed by a global partnership, the IPC/CH is a set of tools and procedures to classify food insecurity. ' +
      'It classifies the populations in five different phases according to the severity of the food insecurity and ' +
      'malnutrition situation: Minimal, Stressed, Crisis, Emergency, and Catastrophe/Famine.',
    dataSource: 'Integrated Phase Classification (IPC) / Cadre Harmonisé (CH)',
    dataSourceLink: 'https://www.ipcinfo.org/',
  },
  rCsi: {
    title: 'reduced Coping Strategies Index (rCSI)',
    legendTitle: 'People Using Crisis or Above Crisis Food-Based Coping',
    forecastLegendTitle: 'Forecasted People Using Crisis or Above Crisis Food-Based Coping',
    summary: 'Frequency and severity of behaviors when faced with shortages of food.',
    description: (
      <>
        <p>
          The reduced Coping Strategies Index (rCSI) measures the frequency and severity of the behaviours households
          engage in when faced with shortages of food or financial resources to buy food. It assesses whether there has
          been a change in the consumption patterns of a given household.
        </p>
        <p>
          The rCSI is calculated using standard food consumption-based strategies and severity weighting. A higher score
          indicates that households are employing more frequent and/or extreme negative coping strategies.
        </p>
      </>
    ),
    readMoreLink: '/wiki',
    dataSource: (
      <span>
        <Abbreviation abbreviation="WFP" />: representative face-to-face household surveys (e.g.{' '}
        <Abbreviation abbreviation="CFSVA" />, <Abbreviation abbreviation="EFSA" />) and{' '}
        <Abbreviation abbreviation="mVAM" /> surveys
      </span>
    ),
    updateDetails: [
      {
        label: (
          <>
            <Abbreviation abbreviation="mVAM" /> surveys
          </>
        ),
        interval: 'daily or monthly',
      },
      { label: 'face-to-face surveys', interval: 'biyearly or less' },
    ],
  },
  undernourishment: {
    title: 'Under­nourish­ment',
    summary:
      'Estimate of the percentage of individuals in the total populations that are in a condition of undernourishment',
    description: (
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
    dataSource: (
      <>
        FAO, IFAD, UNICEF, <Abbreviation abbreviation="WFP" /> and WHO: &ldquo;The State of Food Security and Nutrition
        in the World&rdquo;
      </>
    ),
    dataSourceLink:
      'https://www.wfp.org/publications/2019-state-food-security-and-nutrition-world-sofi-safeguarding-against-economic',
    updateInterval: 'yearly',
    readMoreLink: '/wiki',
  },
} satisfies DataSourceDescriptionItems;

export const nutritionDescriptions = {
  malnutritionAcute: {
    title: 'Malnutrition, Acute',
    legendTitle: 'Acute Malnutrition',
    summary: 'Characterized by a rapid deterioration in nutritional status over a short period of time.',
    description: (
      <>
        <p>
          Also known as ‘wasting’, acute malnutrition is characterized by a rapid deterioration in nutritional status
          over a short period of time. In children, it can be measured using the weight-for-height nutritional index or
          mid-upper arm circumference.
        </p>
        <p>There are different levels of severity of acute malnutrition:</p>
        <ul>
          <li>
            <b>Severe Acute Malnutrition (SAM)</b>: Also known as severe wasting, SAM is defined by a very low weight
            for height (below -3z scores of the median WHO child growth standards), or by a mid-upper arm circumference
            (MUAC) less than 115 mm or by visible signs of severe wasting, or by the presence of nutritional oedema.
          </li>
          <li>
            <b>Moderate Acute Malnutrition (MAM):</b> Also known as moderate wasting, MAM is defined by a weight for
            height between -3 and -2 z-scores of the median WHO child growth standards or by a mid-upper arm
            circumference (MUAC) between 115 mm and 125 mm.
          </li>
        </ul>
      </>
    ),
    readMoreLink: '/wiki',
    dataSource: 'Joint Malnutrition Estimates – UNICEF, WHO, World Bank',
    updateInterval: 'yearly or less',
  },
  malnutritionChronic: {
    title: 'Malnutrition, Chronic',
    legendTitle: 'Chronic Malnutrition',
    summary:
      'A form of growth failure which develops as a result of inadequate nutrition and/or repeated infections over long periods of time.',
    description: (
      <>
        <p>
          Also known as ‘stunting’, chronic malnutrition is a form of growth failure which develops over a long period
          of time. It is a result of inadequate nutrition (including poor maternal nutrition and poor infant and young
          child feeding practices) and/or repeated infections.
        </p>
        <p>
          Chronic malnutrition is defined as the percentage of children, aged less than 5 years, who have low height for
          age.
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
    readMoreLink: '/wiki',
    dataSource: 'Joint Malnutrition Estimates – UNICEF, WHO, World Bank',
    updateInterval: 'yearly or less',
  },
  micronutrients: {
    title: 'Micronutrients',
    legendTitle: 'Risk of Inadequate Micronutrient Intake',
    summary: (
      <span>
        The MIMI project is modelling and mapping the risk of inadequate micronutrient intake to inform decision making
        in the short-medium term.
      </span>
    ),
    description: (
      <>
        <p>
          <Abbreviation abbreviation="MIMI" /> is helping to close gaps in the nutrition data landscape by applying
          novel approaches to model and map the risk of inadequate micronutrient intake and potential contribution from
          fortification scenarios, to inform decision making and advocacy for fortification and other micronutrient
          programmes in the short-medium term.
        </p>
        <p>
          <b>Key components of the current MIMI project:</b>
        </p>
        <ul>
          <li>
            Qualitative research to understand key policy questions and evidence needs for food fortification policy and
            programmes
          </li>
          <li>
            Preparation and analysis of secondary household survey data to estimate risk of inadequate intake in
            Ethiopia, India and Nigeria
          </li>
          <li>
            Training machine-learning (ML) models to predict risk of inadequate micronutrient intake and potential
            contribution to improving intake
          </li>
          <li>
            Interactive, subnational map visualisations to make data outputs relevant and accessible to decision-makers
            and advisors
          </li>
          <li>
            Workshops and Capacity Strengthening to ensure outputs are policy-relevant and can inform advocacy and
            decision-making
          </li>
        </ul>
      </>
    ),
    readMoreLink: '/wiki',
    // the original WFP website does not give info on the source (it does not even list micronutrients)
  },
} satisfies DataSourceDescriptionItems;

export const marketDescriptions = {
  importDependency: {
    title: 'Import Dependency',
    summary: (
      <span>
        Percentage of a country’s imported food for domestic supply versus its own food production for domestic supply.
        <br />
        Calculation: Imports ÷ (local production + imports – exports) × 100%
      </span>
    ),
    dataSource: (
      <>
        <Abbreviation abbreviation="WFP" />
        ’s calculation based on USDA data
      </>
    ),
    updateInterval: 'daily',
  },
  currencyExchange: {
    title: 'Currency Exchange',
    summary: 'Price of a unit of domestic currency in terms of USD.',
    dataSource: 'Trading Economics',
    updateInterval: 'yearly',
  },
  balanceOfTrade: {
    title: 'Balance of Trade',
    summary:
      'The balance of trade is the difference between exports and imports of goods and services. ' +
      'It is usually the largest component of the current account.',
    dataSource: 'Trading Economics',
    updateInterval: 'monthly or less',
  },
  foodInflation: {
    title: 'Food Inflation',
    summary:
      'Year-on-year percentage change in the price of a standard basket of food as calculated from the national Consumer Price Index.',
    dataSource: 'Trading Economics',
    updateInterval: 'monthly',
  },
  headlineInflation: {
    title: 'Headline Inflation',
    summary:
      'Year on year percentage change in the price of a standard basket of goods and services as calculated from the national Consumer Price Index.',
    dataSource: 'Trading Economics',
    updateInterval: 'monthly',
  },
} satisfies DataSourceDescriptionItems;

export const seasonalDescriptions = {
  rainfall: {
    title: 'Rainfall',
    summary: 'The rainfall layer shows the cumulative rainfall in the previous month compared to the 20-year average.',
    description: (
      <p>
        The rainfall layer shows the cumulative rainfall in the previous month compared to the 20-year average.
        Variations between 90% and 110% are considered as having an inconsequential impact for crops or pasture and
        these are represented in white. Brown shades indicate below-average rainfall and blue shades indicate
        above-average seasonal rainfall.
      </p>
    ),
    dataSource: (
      <>
        CHIRPS rainfall estimates, Climate Hazards Group, University of California at Santa Barbara; data processed by{' '}
        <Abbreviation abbreviation="WFP" /> <Abbreviation abbreviation="VAM" />
      </>
    ),
    readMoreLink: '/wiki',
    updateInterval: 'every 10 days',
  },
  vegetation: {
    title: 'Vegetation',
    summary:
      'Recent vegetation development compared to the average. Values between 90% and 110% are considered as being within the range of normal variability.',
    description: (
      <p>
        Vegetation is reported using the <b>Normalized Difference Vegetation Index (NDVI)</b>, which shows the recent
        vegetation development compared to the average. Green shades show areas where vegetation cover is above average,
        whilst orange and brown shades identify areas where vegetation cover is below normal. Values between 90% and
        110% are considered as being within the range of normal variability.
      </p>
    ),
    dataSource:
      'MODIS platforms Terra and Aqua. MODIS NDVI CMG data product retrieved from Earthdata Search, courtesy of NASA ' +
      'EOSDIS Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth Resources Observation and ' +
      'Science (EROS) Center.',
    readMoreLink: '/wiki',
    updateInterval: 'every 8 days',
  },
  riverBaisins: {
    title: 'River Baisins',
    summary:
      'The river basins visualization provides rainfall data for the last 35+ years for five of the world’s major ' +
      'rivers (Limpopo, Nile, Orange, Shabelli-Juba, and Zambesi), allowing users to track whether the current ' +
      'basin-wide rainfall is within the normal range, or whether there is a risk of drought and lower river flows ' +
      'or flooding and high river flows.',
    dataSource: (
      <>
        CHIRPS rainfall estimates, Climate Hazards Group, University of California at Santa Barbara; data processed by{' '}
        <Abbreviation abbreviation="WFP" /> <Abbreviation abbreviation="VAM" />
      </>
    ),
    updateInterval: 'every 5-10 days',
  },
} satisfies DataSourceDescriptionItems;

export const otherDescriptions = {
  news: {
    title: 'News Feed',
    summary:
      'News articles retrieved from news sources all over the web. Topics include recent events or developments ' +
      'relating to hazards and conflict. The news feed is country-specific and serves to provide further context to ' +
      'the food security situation in a country.',
    dataSource: 'NewsAPI',
    dataSourceLink: 'https://newsapi.org',
    updateInterval: 'live',
  },
} satisfies DataSourceDescriptionItems;

const descriptions = {
  ...contextAndNeedDescriptions,
  ...foodSecurityDescriptions,
  ...nutritionDescriptions,
  ...marketDescriptions,
  ...seasonalDescriptions,
  ...otherDescriptions,
};
export default descriptions;
