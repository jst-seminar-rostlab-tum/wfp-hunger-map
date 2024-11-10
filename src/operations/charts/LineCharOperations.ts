import { SeriesOptionsType } from 'highcharts';

import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { FcsChartData } from '@/domain/entities/charts/FcsChartData.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import { RcsiChartData } from '@/domain/entities/charts/RcsiChartData.ts';
import { RegionFcsChartData } from '@/domain/entities/charts/RegionFcsChartData.ts';

export default class LineChartOperations {
  public static convertToLineChartData(
    data:
      | LineChartData
      | BalanceOfTradeGraph
      | CurrencyExchangeGraph
      | InflationGraphs
      | FcsChartData
      | RcsiChartData
      | RegionFcsChartData
  ): LineChartData {
    switch (data.type) {
      case 'LineChartData':
        return data;
      default:
        return {
          type: 'LineChartData',
          xAxisType: 'linear',
          yAxisLabel: '',
          line: [],
        };
    }
  }

  public static getHighChartData(data: LineChartData): Highcharts.Options {
    let categories: string[] = [];
    const series: SeriesOptionsType[] = [];

    // todo right assumption ? -> all line data should have a value for all categories
    // if yes -> implement check
    // todo check eslint shit
    // eslint-disable-next-line no-restricted-syntax
    for (const lineData of data.line) {
      categories = lineData.dataPoints.map((p) => p.x); // todo
      series.push({
        name: lineData.name,
        type: 'line',
        data: lineData.dataPoints.map((p) => p.y),
        zIndex: 1,
        marker: {
          fillColor: 'white',
          lineWidth: 2,
          lineColor: 'orange',
        },
      });
      if (lineData.showRange) {
        series.push({
          name: `${lineData.name} - High`,
          type: 'line',
          data: lineData.dataPoints.map((p) => p.yRangeMax!),
          linkedTo: ':previous',
          color: 'orange',
          opacity: 0.3,
          showInLegend: false,
        });
        series.push({
          name: `${lineData.name} - Low`,
          type: 'line',
          data: lineData.dataPoints.map((p) => p.yRangeMin!),
          linkedTo: ':previous',
          color: 'orange',
          opacity: 0.3,
          showInLegend: false,
        });
      }
    }

    return {
      title: {
        text: '',
      },
      chart: {
        backgroundColor: 'transparent',
      },
      xAxis: {
        type: data.xAxisType,
        categories,
      },
      yAxis: {
        title: {
          text: data.yAxisLabel,
        },
      },
      series,
      plotOptions: {
        line: {
          animation: true,
          marker: {
            enabled: true,
          },
        },
        arearange: {
          animation: true,
          fillOpacity: 0.1,
          lineWidth: 0,
          marker: {
            enabled: false,
          },
        },
      },
    };
  }
}
