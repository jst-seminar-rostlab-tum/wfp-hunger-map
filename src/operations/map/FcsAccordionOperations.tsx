import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph';
import { FcsChartData } from '@/domain/entities/charts/FcsChartData';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs';
import { RcsiChartData } from '@/domain/entities/charts/RcsiChartData';
import { CountryData } from '@/domain/entities/country/CountryData';
import { CountryForecastData } from '@/domain/entities/country/CountryForecastData';
import { CountryIso3Data } from '@/domain/entities/country/CountryIso3Data';
import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType.ts';
import { formatToMillion } from '@/utils/formatting';

export class FcsAccordionOperations {
  static getFcsChartData(countryData?: CountryData, forecastData?: CountryForecastData): ContinuousChartData | null {
    if (!countryData?.fcsGraph) {
      return null;
    }
    const fcsData: ContinuousChartData = {
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      predictionVerticalLineX: forecastData ? Date.now() : undefined,
      lines: [
        {
          name: descriptions.fcs.legendTitle,
          showRange: true,
          dataPoints: countryData.fcsGraph.map(this.fcsChartMapper),
        },
      ],
    };

    if (forecastData && process.env.NEXT_PUBLIC_FORECASTS_ENABLED === 'true') {
      fcsData.lines.push({
        name: descriptions.fcs.forecastLegendTitle,
        showRange: true,
        prediction: true,
        dataPoints: forecastData.forecastedFcsGraph.map(this.fcsChartMapper),
      });
    }
    return fcsData;
  }

  private static fcsChartMapper(data: FcsChartData) {
    return {
      x: new Date(data.x).getTime(),
      y: formatToMillion(data.fcs),
      yRangeMin: formatToMillion(data.fcsLow),
      yRangeMax: formatToMillion(data.fcsHigh),
    };
  }

  static getRcsiChartData(
    countryData?: CountryData,
    rcsiForcastData?: CountryForecastData
  ): ContinuousChartData | null {
    if (!countryData?.rcsiGraph) {
      return null;
    }
    const rcsData: ContinuousChartData = {
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      predictionVerticalLineX: rcsiForcastData ? Date.now() : undefined,
      lines: [
        {
          name: descriptions.rCsi.legendTitle,
          showRange: true,
          dataPoints: countryData.rcsiGraph.map(this.rcsiChartMapper),
        },
      ],
    };

    if (rcsiForcastData && process.env.NEXT_PUBLIC_FORECASTS_ENABLED === 'true') {
      rcsData.lines.push({
        name: descriptions.rCsi.forecastLegendTitle,
        showRange: true,
        prediction: true,
        dataPoints: rcsiForcastData.forecastedRcsiGraph.map(this.rcsiChartMapper),
      });
    }

    return rcsData;
  }

  private static rcsiChartMapper(data: RcsiChartData) {
    return {
      x: new Date(data.x).getTime(),
      y: formatToMillion(data.rcsi),
      yRangeMin: formatToMillion(data.rcsiLow),
      yRangeMax: formatToMillion(data.rcsiHigh),
    };
  }

  static getBalanceOfTradeChartData(countryIso3Data?: CountryIso3Data): BalanceOfTradeGraph | null {
    if (!countryIso3Data?.balanceOfTradeGraph?.data) {
      return null;
    }
    return {
      type: ContinuousChartDataType.BALANCE_OF_TRADE_CHART,
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
