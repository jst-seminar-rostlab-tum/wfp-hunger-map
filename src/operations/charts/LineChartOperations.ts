'use client';

import Highcharts, { AxisTypeValue, SeriesOptionsType, TooltipFormatterContextObject } from 'highcharts';
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
   * Formatter function for `LineChart.Options.tooltip.formatter` usage only.
   */
  private static chartTooltipFormatter(
    xAxisType: AxisTypeValue,
    x: string | number | undefined,
    points: TooltipFormatterContextObject[] | undefined
  ) {
    let tooltip = '';
    if (xAxisType === 'datetime' && typeof x === 'number') {
      tooltip = `<b>${Highcharts.dateFormat('%d.%m.%y', x)}</b><br/>`;
    } else {
      tooltip = `<b>${x}</b><br/>`;
    }
    points?.forEach((p) => {
      tooltip += `<span style="color:${p.series.color}">\u25CF</span> ${p.series.name}: <b>${p.y}</b><br/>`;
    });
    return tooltip;
  }

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
      case LineChartDataType.LINE_CHART_DATA:
        return data;

      case LineChartDataType.BALANCE_OF_TRADE_CHART:
        return {
          type: LineChartDataType.LINE_CHART_DATA,
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

      case LineChartDataType.CURRENCY_EXCHANGE_GRAPH:
        return {
          type: LineChartDataType.LINE_CHART_DATA,
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

      case LineChartDataType.INFLATION_GRAPHS:
        return {
          type: LineChartDataType.LINE_CHART_DATA,
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
          type: LineChartDataType.LINE_CHART_DATA,
          xAxisType: 'linear',
          lines: [],
        };
    }
  }

  /**
   * With this static function, the LineChart component can build the `HighCharts.Options` object
   * for a line chart or bar chart, out of a given `LineChartData` instance.
   *
   * It is expected that all data series in `LineChartData.lines` have the same `x` values and provide
   * a `y` value for each `x` value. For example, if one line has values for x=1, x=2, and x=3,
   * the second line must also provide `y` values for these exact `x` values and no more or less.
   *
   * Setting the 'xAxisSelectedMinIdx' and 'xAxisSelectedMinIdx' the rendered x-axis range
   * can be manipulated; important: if a min is defined a max must be defined as well and vice versa.
   *
   * @param data `LineChartData` object, containing all data to be plotted in the chart
   * @param theme current theme ('light' or 'dark')
   * @param barChart if true, bars are plotted instead of lines
   * @param xAxisSelectedMinIdx index of the rendered x-axis range min value
   * @param xAxisSelectedMaxIdx index of the rendered x-axis range max value
   */
  public static getHighChartOptions(
    data: LineChartData,
    theme: string | undefined,
    xAxisSelectedMinIdx?: number,
    xAxisSelectedMaxIdx?: number,
    barChart?: boolean
  ): Highcharts.Options {
    // parsing all given line data
    const series: SeriesOptionsType[] = [];
    let categories: string[] | number[] = [];
    for (let i = 0; i < data.lines.length; i += 1) {
      const lineData = data.lines[i];
      // it is assumed that all `x` values are the same and are given for all lines
      // therefore we only have to collect the x Axis categories once
      if (i === 0) {
        categories = lineData.dataPoints.map((p) => p.x);
        // if 'DATETIME' is selected as the xAxisType => convert categories to dates
        if (data.xAxisType === 'datetime') {
          categories = categories.map((x) => new Date(x).getTime());
        }
        // slice to selected x-axis range if requested
        if (xAxisSelectedMinIdx !== undefined && xAxisSelectedMaxIdx !== undefined) {
          categories = categories.slice(xAxisSelectedMinIdx, xAxisSelectedMaxIdx + 1);
        }
      }

      // the first four line colors are fixed; however, they can also be overridden by the `color` property;
      // if more than four lines are rendered the default Highcharts colors will be used
      let categoryColor;
      if (lineData.color) {
        categoryColor = lineData.color;
      } else if (i < this.LINE_COLORS.length) {
        categoryColor = this.LINE_COLORS[i];
      }

      // collect chart series data
      let seriesData = lineData.dataPoints.map((p) => p.y);
      // slice to selected x-axis range if requested
      if (xAxisSelectedMinIdx !== undefined && xAxisSelectedMaxIdx !== undefined) {
        seriesData = seriesData.slice(xAxisSelectedMinIdx, xAxisSelectedMaxIdx + 1);
      }
      if (barChart) {
        // plot series as bars
        series.push({
          name: lineData.name,
          type: 'column',
          data: seriesData,
          color: categoryColor,
          opacity: lineData.showRange ? 0.7 : 1,
        });
      } else {
        // plot series as line
        series.push({
          name: lineData.name,
          type: data.roundLines ? 'spline' : 'line',
          data: seriesData,
          color: categoryColor,
        });
      }

      // checking if area series range should be added as well
      if (lineData.showRange) {
        let areaSeriesData = lineData.dataPoints.map((p) => [p.yRangeMin!, p.yRangeMax!]);
        // slice to selected x-axis range if requested
        if (xAxisSelectedMinIdx !== undefined && xAxisSelectedMaxIdx !== undefined) {
          areaSeriesData = areaSeriesData.slice(xAxisSelectedMinIdx, xAxisSelectedMaxIdx + 1);
        }
        if (barChart) {
          // add error "whiskers" to bars
          series.push({
            name: `${lineData.name} - range`,
            type: 'errorbar',
            data: areaSeriesData,
            linkedTo: ':previous',
            color: categoryColor,
          });
        } else {
          // add area around line
          series.push({
            name: `${lineData.name} - range`,
            type: 'arearange', // Area range type
            data: areaSeriesData,
            color: categoryColor,
            linkedTo: ':previous',
          });
        }
      }
    }

    // building the final HighCharts.Options
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
        itemHoverStyle: {
          color: '#005489',
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
          format: '{value:%m.%y}', // highchart applies this rule if the xAxisType id `datetime`
          step: Math.ceil(categories.length / 4), // maximal 4 labels on the x-axis should be displayed
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
        formatter() {
          return LineChartOperations.chartTooltipFormatter(data.xAxisType, this.x, this.points);
        },
      },
      exporting: {
        enabled: false, // disabling export menu icon
      },
      series,
      plotOptions: {
        line: {
          animation: true,
          marker: {
            enabled: false,
            radius: 1,
            animation: true,
            symbol: 'circle',
          },
        },
        spline: {
          animation: true,
          marker: {
            enabled: false,
            radius: 1,
            animation: true,
            symbol: 'circle',
          },
        },
        arearange: {
          animation: true,
          fillOpacity: 0.2,
          lineWidth: 0,
          marker: {
            enabled: false,
            radius: 1,
            animation: true,
            symbol: 'diamond',
          },
        },
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
   * Trigger download of the given line chart as a png file.
   */
  public static downloadChartPNG(chart: HighchartsReact.RefObject): void {
    chart.chart.exportChartLocal({
      type: 'image/png',
      filename: 'chart-download',
    });
  }

  /**
   * Trigger download of the given line chart as a svg file.
   */
  public static downloadChartDataSVG(chart: HighchartsReact.RefObject): void {
    const svg = chart.chart.getSVG();
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    // create a temporary link element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart.svg'; // Name of the SVG file
    a.click();
    // clean up the URL object
    URL.revokeObjectURL(url);
  }

  /**
   * Trigger download of the given line chart data as a csv file.
   */
  public static downloadChartDataCSV(chart: HighchartsReact.RefObject): void {
    chart.chart.downloadCSV();
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
}
