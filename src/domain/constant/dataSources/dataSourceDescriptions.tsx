import React from 'react';

import Abbreviation from '@/components/Tooltip/Abbreviation';

export const contextAndNeedDescriptions = {
  conflict: {
    label: 'Conflict',
    description:
      'All reported violence and conflicts in the last 30 days across Africa, the Middle East, South and South East ' +
      'Asia, Eastern and Southeastern Europe and the Balkans.',
    dataSource: 'Armed Conflict Location & Event Data Project (ACLED)',
    dataSourceLink: 'https://acleddata.com/',
    updateInterval: 'daily',
  },
  hazards: {
    label: 'Hazards',
    description:
      'Current hazards information: Active Volcanoes; Active/Forecast Wind Radii (39, 58, 74); Previous, Current and ' +
      'Forecast Storm Positions; 3- and 5-day Potential Track Area of Storms; Recent Earthquakes; MODIS Hotspots; ' +
      'Tsunami Travel Time; GLIDE Events; H1N1 Affected Countries; Country Boundaries and Labels; Global Shaded ' +
      'Relief; Global Population Density; and PDC integrated hazards.',
    dataSource: 'Pacific Disaster Centre (PDC) - Active Hazards Map Service',
    updateInterval: 'hourly',
  },
  population: {
    label: 'Population',
    description:
      'Total population counts all residents, regardless of legal status or citizenship (the values shown are mid-year estimates).',
    dataSource: 'World Bank',
  },
};

export const foodSecurityDescriptions = {
  fcs: {
    label: 'People with insufficient food consumption',
    description:
      'Number of people with poor or borderline food consumption according to the Food Consumption Score (FCS).',
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
    label: 'Integrated Food Security Phase Classification (IPC) / Cadre Harmonisé (CH)',
    description:
      'Developed by a global partnership, the IPC/CH is a set of tools and procedures to classify food insecurity. ' +
      'It classifies the populations in five different phases according to the severity of the food insecurity and ' +
      'malnutrition situation: Minimal, Stressed, Crisis, Emergency, and Catastrophe/Famine.',
    dataSource: 'Integrated Phase Classification (IPC) / Cadre Harmonisé (CH)',
    dataSourceLink: 'https://www.ipcinfo.org/',
  },
  rCsi: {
    label: 'reduced Coping Strategies Index (rCSI)',
    description: 'Frequency and Severity of behaviors when faced with shortages of food.',
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
    label: 'Under­nourish­ment',
    description:
      'Estimate of the percentage of individuals in the total populations that are in a condition of undernourishment',
    dataSource: (
      <>
        FAO, IFAD, UNICEF, <Abbreviation abbreviation="WFP" /> and WHO: &ldquo;The State of Food Security and Nutrition
        in the World&rdquo;
      </>
    ),
    dataSourceLink:
      'https://www.wfp.org/publications/2019-state-food-security-and-nutrition-world-sofi-safeguarding-against-economic',
    updateInterval: 'yearly',
  },
};

export const nutritionDescriptions = {
  malnutritionAcute: {
    label: 'Acute malnutrition',
    description: 'Characterized by a rapid deterioration in nutritional status over a short period of time.',
    readMoreLink: '/wiki',
    dataSource: 'Joint Malnutrition Estimates – UNICEF, WHO, World Bank',
    updateInterval: 'yearly or less',
  },
  malnutritionChronic: {
    label: 'Chronic malnutrition',
    description:
      'A form of growth failure which develops as a result of inadequate nutrition and/or repeated infections over long periods of time.',
    readMoreLink: '/wiki',
    dataSource: 'Joint Malnutrition Estimates – UNICEF, WHO, World Bank',
    updateInterval: 'yearly or less',
  },
};

export const marketDescriptions = {
  importDependency: {
    label: 'Import dependency',
    description: (
      <span>
        Percentage of a country’s imported food for domestic supply versus its own food production for domestic supply.
        <br />
        IDR = Imports ÷ (local production + imports – exports) × 100%
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
    label: 'Currency exchange',
    description: 'Price of a unit of domestic currency in terms of USD.',
    dataSource: 'Trading Economics',
    updateInterval: 'yearly',
  },
  balanceOfTrade: {
    label: 'Balance of trade',
    description:
      'The balance of trade is the value of exports of goods and services less imports of goods and services. ' +
      'It is usually the largest component of the current account.',
    dataSource: 'Trading Economics',
    updateInterval: 'monthly or less',
  },
  foodInflation: {
    label: 'Food inflation',
    description:
      'Year-on-year percentage change in the price of a standard basket of food as calculated from the national Consumer Price Index.',
    dataSource: 'Trading Economics',
    updateInterval: 'monthly',
  },
  headlineInflation: {
    label: 'Headline inflation',
    description:
      'Year on year percentage change in the price of a standard basket of goods and services as calculated from the national Consumer Price Index.',
    dataSource: 'Trading Economics',
    updateInterval: 'monthly',
  },
};

export const seasonalDescriptions = {
  rainfall: {
    label: 'Rainfall',
    description:
      'The rainfall layer shows the cumulative rainfall in the previous month compared to the 20-year average.',
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
    label: 'Vegetation',
    description:
      'Recent vegetation development compared to the average. Values between 90% and 110% are considered as being within the range of normal variability.',
    dataSource:
      'MODIS platforms Terra and Aqua. MODIS NDVI CMG data product retrieved from Earthdata Search, courtesy of NASA ' +
      'EOSDIS Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth Resources Observation and ' +
      'Science (EROS) Center.',
    readMoreLink: '/wiki',
    updateInterval: 'every 8 days',
  },
  riverBaisins: {
    label: 'River baisins',
    description:
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
};

export const otherDescriptions = {
  news: {
    label: 'News feed',
    description:
      'News articles retrieved from news sources all over the web. Topics include recent events or developments ' +
      'relating to hazards and conflict. The news feed is country-specific and serves to provide further context to ' +
      'the food security situation in a country.',
    dataSource: 'NewsAPI',
    dataSourceLink: 'https://newsapi.org',
    updateInterval: 'live',
  },
};
