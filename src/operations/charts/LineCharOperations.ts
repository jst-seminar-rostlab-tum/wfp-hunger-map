import { SeriesOptionsType } from 'highcharts';

import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export default class LineChartOperations {
  public static convertToLineChartData(
    data: LineChartData | BalanceOfTradeGraph | CurrencyExchangeGraph | InflationGraphs
  ): LineChartData {
    switch (data.type) {
      case 'LineChartData':
        return data;

      case 'BalanceOfTradeGraph':
        return {
          type: 'LineChartData',
          xAxisType: 'datetime',
          yAxisLabel: '',
          lines: [
            {
              name: 'Balance of Trade',
              dataPoints: data.data.map((p) => {
                return { x: p.x, y: p.y };
              }),
            },
          ],
        };
      case 'CurrencyExchangeGraph':
        return {
          type: 'LineChartData',
          xAxisType: 'datetime',
          yAxisLabel: '',
          lines: [
            {
              name: data.name,
              dataPoints: data.data.map((p) => {
                return { x: p.x, y: p.y };
              }),
            },
          ],
        };
      case 'InflationGraphs':
        return {
          type: 'LineChartData',
          xAxisType: 'datetime',
          yAxisLabel: '',
          lines: [
            {
              name: 'Headline Inflation',
              dataPoints: data.headline.data.map((p) => {
                return { x: p.x, y: p.y };
              }),
            },
            {
              name: 'Food Inflation',
              dataPoints: data.food.data.map((p) => {
                return { x: p.x, y: p.y };
              }),
            },
          ],
        };
      default:
        return {
          type: 'LineChartData',
          xAxisType: 'linear',
          yAxisLabel: '',
          lines: [],
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
    for (const lineData of data.lines) {
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
