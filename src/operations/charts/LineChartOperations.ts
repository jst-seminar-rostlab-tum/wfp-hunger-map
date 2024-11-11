import Highcharts, { SeriesOptionsType } from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import { useTheme } from 'next-themes';

import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';

/**
 * Using LineChartOperations, the LineChart component can convert its received data into LineChartData
 * and then generate the chart options for Highcharts.
 */
export default class LineChartOperations {
  /**
   * The first four line colors are fixed; if more than four lines are rendered,
   * the default Highcharts colors will be used.
   */
  private static LINE_COLORS = ['#FFB74D', '#157DBC', '#85E77C', '#FF5252'];

  /**
   * With this static function, the LineChart component can ensure that the received data for the chart
   * is converted to the `LineChartData` type.
   * To support another interface in `LineChartProps.data`, one has to add another switch case here
   * that converts the new interface into `LineChartData`.
   * @param data
   */
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
        // if the given type is not supported yet, an empty `LineChartData` instance is returned
        return {
          type: 'LineChartData',
          xAxisType: 'linear',
          lines: [],
        };
    }
  }

  /**
   * With this static function, the LineChart component can build the HighCharts options,
   * needed for the HighCharts component, out of a given `LineChartData` instance.
   * It is expected that all line data in `LineChartData.lines` have the same `x` values and provide
   * a `y` value for each `x` value. For example, if one line has values for x=1, x=2, and x=3,
   * the second line must also provide `y` values for these exact `x` values and no more or less.
   */
  public static getHighChartData(data: LineChartData): Highcharts.Options {
    const { theme } = useTheme();
    highchartsMore(Highcharts); // enables the usage of HighCharts 'arearange'

    // parsing all given line data
    const series: SeriesOptionsType[] = [];
    let categories: string[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.lines.length; i++) {
      const lineData = data.lines[i];
      // it is assumed that all `x` values are the same and are given for all lines
      // therefore we only have to collect the x Axis categories once
      if (i === 0) {
        categories = lineData.dataPoints.map((p) => p.x);
      }

      // the first four line colors are fixed; however, they can also be overridden by the `color` property;
      // if more than four lines are rendered the default Highcharts colors will be used
      let lineColor;
      if (lineData.color) {
        lineColor = lineData.color;
      } else if (i < this.LINE_COLORS.length) {
        lineColor = this.LINE_COLORS[i];
      }

      series.push({
        name: lineData.name,
        type: data.roundLines ? 'spline' : 'line',
        data: lineData.dataPoints.map((p) => p.y),
        color: lineColor,
      });
      // checking if area range should be added as well
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

    // building the final HighCharts Options
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
            return Highcharts.numberFormat(this.value as number, -1);
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
        spline: {
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
