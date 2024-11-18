import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs';
import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { formatToMillion } from '@/utils/formatting';

export class FcsAccordionOperations {
  static getFcsChartData(countryData: CountryData): LineChartData {
    return {
      type: 'LineChartData',
      xAxisType: 'linear',
      yAxisLabel: 'Mill',
      roundLines: false,
      lines: [
        {
          name: 'People with insufficient food consumption',
          dataPoints: countryData.fcsGraph.map((fcsChartData) => ({
            x: fcsChartData.x,
            y: formatToMillion(fcsChartData.fcs),
          })),
        },
      ],
    };
  }

  static getRcsiChartData(countryData: CountryData): LineChartData {
    return {
      type: 'LineChartData',
      xAxisType: 'linear',
      yAxisLabel: 'Mill',
      roundLines: false,
      lines: [
        {
          name: 'People using crisis or above crisis food-based coping',
          dataPoints: countryData.rcsiGraph.map((rcsiChartData) => ({
            x: rcsiChartData.x,
            y: formatToMillion(rcsiChartData.rcsi),
          })),
        },
      ],
    };
  }

  static getBalanceOfTradeChartData(countryIso3Data: CountryIso3Data): BalanceOfTradeGraph {
    return {
      type: 'BalanceOfTradeGraph',
      data: countryIso3Data.balanceOfTradeGraph.data || [],
    };
  }

  static getHeadlineAndFoodInflationChartData(countryIso3Data: CountryIso3Data): InflationGraphs {
    return {
      type: 'InflationGraphs',
      headline: {
        data: countryIso3Data?.inflationGraphs?.headline?.data || [],
      },
      food: {
        data: countryIso3Data?.inflationGraphs?.food?.data || [],
      },
    };
  }

  static getCurrencyExchangeChartData(countryIso3Data: CountryIso3Data): CurrencyExchangeGraph {
    return {
      type: 'CurrencyExchangeGraph',
      name: countryIso3Data?.currencyExchangeGraph?.name || '',
      source: countryIso3Data?.currencyExchangeGraph?.source || '',
      updated: countryIso3Data?.currencyExchangeGraph?.updated || '',
      data: countryIso3Data?.currencyExchangeGraph?.data || [],
    };
  }
}
