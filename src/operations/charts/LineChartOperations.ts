'use client';

import Highcharts, { SeriesOptionsType } from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import { LineChartDataType } from '@/domain/enums/LineChartDataType.ts';

if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts); // enables the usage of HighCharts 'arearange'
}

/**
 * Using LineChartOperations, the LineChart component can convert its received data into LineChartData
 * and then generate the chart `Highcharts.Options` object required by the Highcharts component.
 * Two types of options can be created: rendering the LineChart data as a line chart or as a bar chart.
 *
 * In addition, several download functionalities are implemented.
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
      case LineChartDataType.LineChartData:
        return data;

      case LineChartDataType.BalanceOfTradeGraph:
        return {
          type: LineChartDataType.LineChartData,
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

      case LineChartDataType.CurrencyExchangeGraph:
        return {
          type: LineChartDataType.LineChartData,
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

      case LineChartDataType.InflationGraphs:
        return {
          type: LineChartDataType.LineChartData,
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
          type: LineChartDataType.LineChartData,
          xAxisType: 'linear',
          lines: [],
        };
    }
  }

  /**
   * With this static function, the LineChart component can build the HighCharts.Options object
   * for a line chart, out of a given `LineChartData` instance.
   * It is expected that all line data in `LineChartData.lines` have the same `x` values and provide
   * a `y` value for each `x` value. For example, if one line has values for x=1, x=2, and x=3,
   * the second line must also provide `y` values for these exact `x` values and no more or less.
   * // todo params
   * // using the 'xAxisSelectedMinIdx' and 'xAxisSelectedMinIdx' the rendered x-axis range is manipulated
   * if a min is defined a max must be defined as well and vice versa
   */
  public static getHighChartLineData(
    data: LineChartData,
    theme: string | undefined,
    xAxisSelectedMinIdx?: number,
    xAxisSelectedMaxIdx?: number
  ): Highcharts.Options {
    // parsing all given line data
    const series: SeriesOptionsType[] = [];
    let categories: string[] = [];
    for (let i = 0; i < data.lines.length; i += 1) {
      const lineData = data.lines[i];
      // it is assumed that all `x` values are the same and are given for all lines
      // therefore we only have to collect the x Axis categories once
      if (i === 0) {
        categories = lineData.dataPoints.map((p) => p.x);
        // slice to selected x-axis range if requested
        if (xAxisSelectedMinIdx !== undefined && xAxisSelectedMaxIdx !== undefined) {
          categories = categories.slice(xAxisSelectedMinIdx, xAxisSelectedMaxIdx + 1);
        }
      }

      // the first four line colors are fixed; however, they can also be overridden by the `color` property;
      // if more than four lines are rendered the default Highcharts colors will be used
      let lineColor;
      if (lineData.color) {
        lineColor = lineData.color;
      } else if (i < this.LINE_COLORS.length) {
        lineColor = this.LINE_COLORS[i];
      }

      // collect line series data
      let seriesData = lineData.dataPoints.map((p) => p.y);
      // slice to selected x-axis range if requested
      if (xAxisSelectedMinIdx !== undefined && xAxisSelectedMaxIdx !== undefined) {
        seriesData = seriesData.slice(xAxisSelectedMinIdx, xAxisSelectedMaxIdx + 1);
      }
      series.push({
        name: lineData.name,
        type: data.roundLines ? 'spline' : 'line',
        data: seriesData,
        color: lineColor,
        marker: {
          // increase marker size if only a single x-category is shown
          enabled: categories.length === 1,
          radius: categories.length === 1 ? 4 : 1,
        },
      });

      // checking if area series range should be added as well
      if (lineData.showRange) {
        let areaSeriesData = lineData.dataPoints.map((p) => [p.yRangeMin!, p.yRangeMax!]);
        // slice to selected x-axis range if requested
        if (xAxisSelectedMinIdx !== undefined && xAxisSelectedMaxIdx !== undefined) {
          areaSeriesData = areaSeriesData.slice(xAxisSelectedMinIdx, xAxisSelectedMaxIdx + 1);
        }
        series.push({
          name: `${lineData.name} - range`,
          type: 'arearange', // Area range type
          data: areaSeriesData,
          color: lineColor,
          linkedTo: ':previous',
          marker: {
            // render marker if only a single x-category is shown
            enabled: categories.length === 1,
            radius: categories.length === 1 ? 2 : 1,
          },
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
      exporting: {
        enabled: false, // disabling export menu icon
      },
      series,
      plotOptions: {
        line: {
          animation: true,
          marker: {
            animation: true,
            symbol: 'circle',
          },
        },
        spline: {
          animation: true,
          marker: {
            animation: true,
            symbol: 'circle',
          },
        },
        arearange: {
          animation: true,
          fillOpacity: 0.2,
          lineWidth: 0,
          marker: {
            animation: true,
            symbol: 'diamond',
          },
        },
      },
    };
  }

  /**
   * With this static function, the LineChart component can build the HighCharts.Options object
   * for a bar chart, out of a given `LineChartData` instance.
   * It is expected that all line data in `LineChartData.lines` have the same `x` values and provide
   * a `y` value for each `x` value. For example, if one line has values for x=1, x=2, and x=3,
   * the second line must also provide `y` values for these exact `x` values and no more or less.
   */
  public static getHighChartBarData(
    data: LineChartData,
    theme: string | undefined,
    xAxisSelectedMinIdx?: number,
    xAxisSelectedMaxIdx?: number
  ): Highcharts.Options {
    // parsing all given line data
    const series: SeriesOptionsType[] = [];
    let categories: string[] = [];
    for (let i = 0; i < data.lines.length; i += 1) {
      const lineData = data.lines[i];
      // it is assumed that all `x` values are the same and are given for all lines
      // therefore we only have to collect the x Axis categories once
      if (i === 0) {
        categories = lineData.dataPoints.map((p) => p.x);
        // slice to selected x-axis range if requested
        if (xAxisSelectedMinIdx !== undefined && xAxisSelectedMaxIdx !== undefined) {
          categories = categories.slice(xAxisSelectedMinIdx, xAxisSelectedMaxIdx + 1);
        }
      }

      // the first category colors are fixed; however, they can also be overridden by the `color` property;
      // if more than four lines are rendered the default Highcharts colors will be used
      let barColor;
      if (lineData.color) {
        barColor = lineData.color;
      } else if (i < this.LINE_COLORS.length) {
        barColor = this.LINE_COLORS[i];
      }

      let seriesData = lineData.dataPoints.map((p) => p.y);
      // slice to selected x-axis range if requested
      if (xAxisSelectedMinIdx !== undefined && xAxisSelectedMaxIdx !== undefined) {
        seriesData = seriesData.slice(xAxisSelectedMinIdx, xAxisSelectedMaxIdx + 1);
      }
      series.push({
        name: lineData.name,
        type: 'column',
        data: seriesData,
        color: barColor,
        opacity: lineData.showRange ? 0.7 : 1,
      });
      // checking if area range should be added as well
      if (lineData.showRange) {
        let areaSeriesData = lineData.dataPoints.map((p) => [p.yRangeMin!, p.yRangeMax!]);
        // slice to selected x-axis range if requested
        if (xAxisSelectedMinIdx !== undefined && xAxisSelectedMaxIdx !== undefined) {
          areaSeriesData = areaSeriesData.slice(xAxisSelectedMinIdx, xAxisSelectedMaxIdx + 1);
        }
        series.push({
          name: `${lineData.name} - range`,
          type: 'errorbar',
          data: areaSeriesData,
          linkedTo: ':previous',
          color: barColor,
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
      exporting: {
        enabled: false, // disabling export menu icon
      },
      series,
      plotOptions: {
        column: {
          animation: true,
          grouping: true,
          shadow: false,
          borderWidth: 0,
        },
        errorbar: {
          whiskerLength: '50%',
          lineWidth: 1.5,
          color: 'black',
        },
      },
    };
  }

  /**
   * Trigger download of the given line chart `data` as a json file.
   */
  public static downloadDataJSON(data: LineChartData): void {
    // convert data json object to string and encode as URI
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    // create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'hunger_map_chart_data.json';
    link.click();
  }

  /**
   * Trigger download of the given line chart `data` as a png file.
   */
  public static downloadChartPNG(chart: HighchartsReact.RefObject): void {
    chart.chart.exportChartLocal({
      type: 'image/png',
      filename: 'chart-download',
    });
  }
}
