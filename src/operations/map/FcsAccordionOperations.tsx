import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType.ts';
import { formatToMillion } from '@/utils/formatting';

export class FcsAccordionOperations {
  static getFcsChartData(countryData?: CountryData): ContinuousChartData | null {
    if (!countryData?.fcsGraph) {
      return null;
    }
    return {
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: [
        {
          name: descriptions.fcs.legendTitle,
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

  static getRcsiChartData(countryData?: CountryData): ContinuousChartData | null {
    if (!countryData?.rcsiGraph) {
      return null;
    }
    return {
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: [
        {
          name: descriptions.rCsi.legendTitle,
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

  static getBalanceOfTradeChartData(countryIso3Data?: CountryIso3Data): ContinuousChartData | null {
    if (!countryIso3Data?.balanceOfTradeGraph?.data) {
      return null;
    }

    // if any value is more than a million -> formatToMillion() is applied to every value
    const applyFormatToMillion = countryIso3Data.balanceOfTradeGraph.data.some((d) => Math.abs(d.y) >= 1000000);

    return {
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: applyFormatToMillion ? 'Mill USD' : 'USD',
      lines: [
        {
          name: descriptions.balanceOfTrade.title,
          dataPoints: countryIso3Data.balanceOfTradeGraph.data.map((d) => ({
            x: new Date(d.x).getTime(),
            y: applyFormatToMillion ? formatToMillion(d.y) : d.y,
          })),
        },
      ],
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
      type: ContinuousChartDataType.INFLATION_CHARTS,
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
      type: ContinuousChartDataType.CURRENCY_EXCHANGE_CHART,
      name,
      source,
      updated,
      data,
    };
  }

  static getNutritionData(countryIso3Data?: CountryIso3Data) {
    if (!countryIso3Data?.nutrition) {
      return null;
    }

    const { wasting, stunting } = countryIso3Data.nutrition;
    return {
      Acute: wasting,
      Chronic: stunting,
    };
  }
}
