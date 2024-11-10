import Highcharts, { SeriesOptionsType } from 'highcharts';

import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import { useTheme } from 'next-themes';
import highchartsMore from 'highcharts/highcharts-more';

highchartsMore(Highcharts);

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
    const { theme } = useTheme();
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
        type: data.roundLines ? 'spline' : 'line',
        data: lineData.dataPoints.map((p) => p.y),
        color: lineColor,
      });
      if (lineData.showRange) {
        series.push({
          name: `${lineData.name} - area range`,
          type: 'arearange', // Area range type
          data: lineData.dataPoints.map((p) => [p.yRangeMin!, p.yRangeMax!]),
          color: lineColor,
          linkedTo: ':previous',
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
      legend: {
        itemStyle: {
          fontSize: '0.7rem',
          color: theme === 'light' ? '#4f4f4f' : '#b6b6b6',
        },
      },
      xAxis: {
        type: data.xAxisType,
        categories,
        labels: {
          style: {
            color: '#7a7a7a',
            fontSize: '0.7rem',
          },
        },
        lineColor: '#7a7a7a',
      },
      yAxis: {
        title: {
          text: data.yAxisLabel,
          style: {
            color: '#7a7a7a',
          },
        },
        labels: {
          style: {
            color: '#7a7a7a',
            fontSize: '0.7rem',
          },
          formatter() {
            return Highcharts.numberFormat(this.value, -1);
          },
        },
        lineColor: 'transparent',
        gridLineColor: theme === 'light' ? '#e1e1e1' : '#2a2a2a',
      },
      tooltip: {
        shared: true,
      },
      series,
      plotOptions: {
        line: {
          animation: true,
          marker: {
            enabled: false,
            radius: 1,
            animation: true,
          },
        },
        arearange: {
          animation: true,
          fillOpacity: 0.2,
          lineWidth: 0,
          marker: {
            enabled: false,
            radius: 0,
            animation: true,
          },
        },
      },
    };
  }
}
