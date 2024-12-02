import { ReactNode } from 'react';

import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs';
import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { LineChartDataType } from '@/domain/enums/LineChartDataType';
import { formatToMillion } from '@/utils/formatting';

export class FcsAccordionOperations {
  static getFcsChartData(countryData?: CountryData): LineChartData | null {
    if (!countryData?.fcsGraph) {
      return null;
    }
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: [
        {
          name: 'People with insufficient food consumption',
          showRange: true,
          dataPoints: countryData.fcsGraph.map((fcsChartData) => ({
            x: new Date(fcsChartData.x).getTime(),
            y: formatToMillion(fcsChartData.fcs),
            yRangeMin: formatToMillion(fcsChartData.fcsLow),
            yRangeMax: formatToMillion(fcsChartData.fcsHigh),
          })),
        },
      ],
    };
  }

  static getRcsiChartData(countryData?: CountryData): LineChartData | null {
    if (!countryData?.rcsiGraph) {
      return null;
    }
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: [
        {
          name: 'People using crisis or above crisis food-based coping',
          showRange: true,
          dataPoints: countryData.rcsiGraph.map((rcsiChartData) => ({
            x: new Date(rcsiChartData.x).getTime(),
            y: formatToMillion(rcsiChartData.rcsi),
            yRangeMin: formatToMillion(rcsiChartData.rcsiLow),
            yRangeMax: formatToMillion(rcsiChartData.rcsiHigh),
          })),
        },
      ],
    };
  }

  static getBalanceOfTradeChartData(countryIso3Data?: CountryIso3Data): BalanceOfTradeGraph | null {
    if (!countryIso3Data?.balanceOfTradeGraph?.data) {
      return null;
    }
    return {
      type: LineChartDataType.BALANCE_OF_TRADE_CHART,
      data: countryIso3Data.balanceOfTradeGraph.data,
    };
  }

  static getHeadlineAndFoodInflationChartData(countryIso3Data?: CountryIso3Data): InflationGraphs | null {
    if (!countryIso3Data?.inflationGraphs) {
      return null;
    }
    const headlineData = countryIso3Data.inflationGraphs.headline?.data;
    const foodData = countryIso3Data.inflationGraphs.food?.data;
    if (!headlineData || !foodData) {
      return null;
    }

    return {
      type: LineChartDataType.INFLATION_CHARTS,
      headline: {
        data: headlineData,
      },
      food: {
        data: foodData,
      },
    };
  }

  static getCurrencyExchangeChartData(countryIso3Data?: CountryIso3Data): CurrencyExchangeGraph | null {
    if (!countryIso3Data?.currencyExchangeGraph) {
      return null;
    }
    const { name, source, updated, data } = countryIso3Data.currencyExchangeGraph;
    if (!name || !source || !updated || !data) {
      return null;
    }
    return {
      type: LineChartDataType.CURRENCY_EXCHANGE_CHART,
      name,
      source,
      updated,
      data,
    };
  }

  static getFoodSecutriyPopoverInfo(): ReactNode {
    return (
      <div>
        <h1>Population</h1>
        <p>
          Total population counts all residents, regardless of legal status or citizenship (the values shown are
          mid-year estimates)
          <br />
          {/* TODO: Add data source and updated date */}
          <b>Data source:</b> N/A
          <br />
          <b>Updated:</b> N/A
        </p>
        <h1>Food Consumption Score (FCS)</h1>
        <p>
          is a proxy of household&apos;s food access and a core WFP indicator used to classify households into different
          groups based on the adequacy of the foods consumed in the week prior to being surveyed. FCS is the most
          commonly used food security indicator by WFP and partners. This indicator is a composite score based on
          household&apos;s dietary diversity, food frequency, and relative nutritional importance of different food
          groups. The FCS is calculated using the frequency of consumption of eight food groups by a household during
          the 7 days before the survey using standardized weights for each of the food groups reflecting its respective
          nutrient density, and then classifies households as having `poor`, `borderline` or `acceptable` food
          consumption.
          <br />
          <b>Poor food consumption:</b> Typically refers to households that are not consuming staples and vegetables
          every day and never or very seldom consume protein-rich food such as meat and dairy (FCS of less than 28).
          <br />
          <b>Borderline food consumption:</b> Typically refers to households that are consuming staples and vegetables
          every day, accompanied by oil and pulses a few times a week (FCS of less than 42).
          <br />
          <b>Acceptable food consumption:</b> Typically refers to households that are consuming staples and vegetables
          every day, frequently accompanied by oil and pulses, and occasionally meat, fish and dairy (FCS greater than
          42).
        </p>
        <p>People with insufficient food consumption refers to those with poor or borderline food consumption.</p>
        <p>
          <b>Data source:</b> World Food Programme - (i) representative face-to-face household surveys, for example
          Comprehensive Food Security and Vulnerability Analysis (CFSVA), Emergency Food Security Assessment (EFSA); and
          (ii) mobile Vulnerability Analysis and Mapping (mVAM) surveys
          <br />
          <b>Updated:</b> mVAM surveys: daily or monthly; face-to-face surveys: biannually, annually or when available
          (varies from country to country)
        </p>
      </div>
    );
  }

  static getFoodSecutriyTrendsPopoverInfo(): ReactNode {
    return (
      <div>
        <h1>Food Consumption Score (FCS)</h1>
        <p>
          is a proxy of household&apos;s food access and a core WFP indicator used to classify households into different
          groups based on the adequacy of the foods consumed in the week prior to being surveyed. FCS is the most
          commonly used food security indicator by WFP and partners. This indicator is a composite score based on
          household&apos;s dietary diversity, food frequency, and relative nutritional importance of different food
          groups.. The FCS is calculated using the frequency of consumption of eight food groups by a household during
          the 7 days before the survey using standardized weights for each of the food groups reflecting its respective
          nutrient density, and then classifies households as having `poor`, `borderline` or `acceptable` food
          consumption.
        </p>
        <p>
          <b>Poor food consumption:</b> Typically refers to households that are not consuming staples and vegetables
          every day and never or very seldom consume protein-rich food such as meat and dairy (FCS of less than 28).
        </p>
        <p>
          <b>Borderline food consumption:</b> Typically refers to households that are consuming staples and vegetables
          every day, accompanied by oil and pulses a few times a week (FCS of less than 42).
        </p>
        <p>
          <b>Acceptable food consumption:</b> Typically refers to households that are consuming staples and vegetables
          every day, frequently accompanied by oil and pulses, and occasionally meat, fish and dairy (FCS greater than
          42).
        </p>
        <p>People with insufficient food consumption refers to those with poor or borderline food consumption.</p>
        <p>
          <b>Data source:</b> World Food Programme - (i) representative face-to-face household surveys, for example
          Comprehensive Food Security and Vulnerability Analysis (CFSVA), Emergency Food Security Assessment (EFSA); and
          (ii) mobile Vulnerability Analysis and Mapping (mVAM) surveys
        </p>
        <p>
          <b>Updated:</b> mVAM surveys: daily or monthly; face-to-face surveys: biannually, annually or when available
          (varies from country to country)
        </p>
        <h1>Reduced Coping Strategies Index (rCSI)</h1>
        <p>
          The rCSI measures the frequency and severity of the behaviours households engage in when faced with shortages
          of food or financial resources to buy food. It assesses whether there has been a change in the consumption
          patterns of a given household. The rCSI is calculated using standard food consumption-based strategies and
          severity weighting. A higher score indicates that households are employing more frequent and/or extreme
          negative coping strategies.
        </p>
        <p>
          <b>Data source:</b> World Food Programme - (i) representative face-to-face household surveys, for example
          Comprehensive Food Security and Vulnerability Analysis (CFSVA), Emergency Food Security Assessment (EFSA); and
          (ii) mobile Vulnerability Analysis and Mapping (mVAM) surveys
        </p>
        <p>
          <b>Updated:</b> mVAM surveys: daily or monthly; face-to-face surveys: biannually, annually or when available
          (varies from country to country)
        </p>
        <h1>Estimated number of people</h1>
        <p>
          The number of people are estimated by multiplying the percentages calculated from the mVAM data by the
          population of the country.
        </p>
        <p>
          <b>Data source:</b> World Food Programme - (i) representative face-to-face household surveys, for example
          Comprehensive Food Security and Vulnerability Analysis (CFSVA), Emergency Food Security Assessment (EFSA); and
          (ii) mobile Vulnerability Analysis and Mapping (mVAM) surveys
        </p>
        <p>
          <b>Updated:</b> mVAM surveys: daily or monthly; face-to-face surveys: biannually, annually or when available
          (varies from country to country)
        </p>
      </div>
    );
  }

  static getMacroEconomicPopoverInfo(): ReactNode {
    return (
      <div>
        <h1>Import dependency</h1>
        <p>
          Percentage of a country&apos;s imported food for domestic supply versus its own food production for domestic
          supply; it is calculated as follows: IDR = Imports/(local production + imports - exports)*100%.
        </p>
        <p>
          <b>Data source:</b> WFP&apos;s calculation based on USDA data
        </p>
        <p>
          <b>Updated:</b> Yearly
        </p>
      </div>
    );
  }

  static getCurrencyExchangePopoverInfo(): ReactNode {
    return (
      <div>
        <h1>Currency exchange</h1>
        <p>Price of a unit of domestic currency in terms of USD.</p>
        <p>
          {/* TODO: Add data source and updated date */}
          <b>Data source:</b> N/A
        </p>
        <p>
          <b>Updated:</b> N/A
        </p>
      </div>
    );
  }

  static getBalanceOfTradePopoverInfo(): ReactNode {
    return (
      <div>
        <h1>Balance of trade</h1>
        <p>
          The balance of trade is the value of exports of goods and services less imports of goods and services. It is
          usually the largest component of the current account.
        </p>
        <p>
          <b>Data source:</b> Trading Economics
        </p>
        <p>
          <b>Updated:</b> Monthly, Quarterly or Yearly (varies from country to country)
        </p>
      </div>
    );
  }

  static getHeadlineAndFoodInflationPopoverInfo(): ReactNode {
    return (
      <div>
        <h1>Headline inflation</h1>
        <p>
          Year on year percentage change in the price of a standard basket of goods and services as calculated from the
          national Consumer Price Index.
        </p>
        <p>
          <b>Data source:</b> Trading Economics
        </p>
        <p>
          <b>Updated:</b> Monthly
        </p>
        <h1>Food inflation</h1>
        <p>
          Year-on-year percentage change in the price of a standard basket of food as calculated from the national
          Consumer Price Index.
        </p>
        <p>
          <b>Data source:</b> Trading Economics
        </p>
        <p>
          <b>Updated:</b> Monthly
        </p>
      </div>
    );
  }
}
