import { SeriesOptionsType } from 'highcharts';

import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

export default class LineChartOperations {
  private static COLORS = [
    '#FFB74D',
    '#157DBC',
    '#85E77C',
    '#FF5252',
    // the first four colors are set todo descr
  ];

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
          lines: [],
        };
    }
  }

  // it is assumed that all categories are the same ! todo better descr
  public static getHighChartData(data: LineChartData): Highcharts.Options {

    const series: SeriesOptionsType[] = [];
    let categories: string[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.lines.length; i++) {
      const lineData = data.lines[i];
      // it is assumed that all categories are the same ! todo better descr
      if (i === 0) {
        categories = lineData.dataPoints.map((p) => p.x);
      }

      let lineColor;
      if (lineData.color) {
        lineColor = lineData.color;
      } else if (i < this.COLORS.length) {
        lineColor = this.COLORS[i];
      }

      series.push({
        name: lineData.name,
        type: data.roundLines ? 'line' : 'spline',
        data: lineData.dataPoints.map((p) => p.y),
        zIndex: 1,
        color: lineColor,
        marker: {
          enabled: false,
          radius: 1,
        },
      });
      if (lineData.showRange) {
        series.push({
          name: `${lineData.name} - High`,
          type: 'line',
          data: lineData.dataPoints.map((p) => p.yRangeMax!),
          linkedTo: ':previous',
          color: lineColor,
          opacity: 0.3,
          showInLegend: false,
        });
        series.push({
          name: `${lineData.name} - Low`,
          type: 'line',
          data: lineData.dataPoints.map((p) => p.yRangeMin!),
          linkedTo: ':previous',
          color: lineColor,
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
