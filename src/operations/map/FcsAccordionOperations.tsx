import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
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
}
