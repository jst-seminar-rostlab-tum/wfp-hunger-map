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
  highchartsMore(Highcharts);
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
   * Formatter function for `LineChart.Options.xAxis.labels.formatter` usage only.
   */
  private static chartXAxisFormatter(xAxisType: AxisTypeValue, x: string | number): string {
    if (xAxisType === 'datetime' && typeof x === 'number') {
      return Highcharts.dateFormat('%m.%y', x);
    }
    return String(x);
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
                return { x: new Date(p.x).getTime(), y: p.y };
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
                return { x: new Date(p.x).getTime(), y: p.y };
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
                return { x: new Date(p.x).getTime(), y: p.y };
              }),
            },
            {
              name: 'Food Inflation',
              dataPoints: data.food.data.map((p) => {
                return { x: new Date(p.x).getTime(), y: p.y };
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
   * Given `LineChartData` get list of all distinct x values of all lines' data points.
   */
  public static getDistinctXAxisValues(data: LineChartData): number[] {
    const uniqueXValues = new Set<number>();
    data.lines.forEach((line) => {
      line.dataPoints.forEach((point) => {
        uniqueXValues.add(point.x); // Add x-value to the Set
      });
    });
    return Array.from(uniqueXValues).sort((a, b) => a - b);
  }

  /**
   * With this static function, the LineChart component can build the `HighCharts.Options` object
   * for a line chart or bar chart, out of a given `LineChartData` instance.
   *
   * Setting the 'xAxisSelectedMinIdx' and 'xAxisSelectedMinIdx' the rendered x-axis range
   * can be manipulated; important: if a min is defined a max must be defined as well and vice versa.
   *
   * @param data `LineChartData` object, containing all data to be plotted in the chart
   * @param theme current theme ('light' or 'dark')
   * @param roundLines if true, all plotted lines will be rounded
   * @param barChart if true, bars are plotted instead of lines
   * @param xAxisSelectedMinIdx index of selected x-axis range min value
   * @param xAxisSelectedMaxIdx index of selected x-axis range max value
   */
  public static getHighChartOptions(
    data: LineChartData,
    theme: string | undefined,
    roundLines?: boolean,
    xAxisSelectedMinIdx?: number,
    xAxisSelectedMaxIdx?: number,
    barChart?: boolean
  ): Highcharts.Options {
    // get selected x-axis range min and max values
    const xAxisDistinctValues = LineChartOperations.getDistinctXAxisValues(data);
    const xAxisSelectedMin = xAxisSelectedMinIdx !== undefined ? xAxisDistinctValues[xAxisSelectedMinIdx] : undefined;
    const xAxisSelectedMax = xAxisSelectedMaxIdx !== undefined ? xAxisDistinctValues[xAxisSelectedMaxIdx] : undefined;

    // parsing all given data series
    const series: SeriesOptionsType[] = [];
    for (let i = 0; i < data.lines.length; i += 1) {
      const lineData = data.lines[i];

      // the first four line colors are fixed; however, they can also be overridden by the `color` property;
      // if more than four lines are rendered the default Highcharts colors will be used
      let categoryColor;
      if (lineData.color) {
        categoryColor = lineData.color;
      } else if (i < this.LINE_COLORS.length) {
        categoryColor = this.LINE_COLORS[i];
      }

      // collect series data
      const seriesData: Highcharts.PointOptionsObject[] = [];
      lineData.dataPoints.forEach((p) => {
        // check if datapoint x is in selected x-axis range
        if (xAxisSelectedMin !== undefined && xAxisSelectedMax !== undefined) {
          if (p.x < xAxisSelectedMin || xAxisSelectedMax < p.x) return;
        }
        seriesData.push({
          x: p.x,
          y: p.y,
        });
      });
      // make sure data is sorted (required by highchart)
      seriesData.sort((a, b) => a.x! - b.x!);

      // build series object for highchart
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
          type: roundLines ? 'spline' : 'line',
          name: lineData.name,
          data: seriesData,
          color: categoryColor,
        });
      }

      // checking if area range should be added as well
      if (lineData.showRange) {
        // collect series area range data
        const areaSeriesData: Highcharts.PointOptionsObject[] = [];
        lineData.dataPoints.forEach((p) => {
          // check if datapoint x is in selected x-axis range
          if (xAxisSelectedMin !== undefined && xAxisSelectedMax !== undefined) {
            if (p.x < xAxisSelectedMin || xAxisSelectedMax < p.x) return;
          }
          areaSeriesData.push({
            x: p.x,
            low: p.yRangeMin,
            high: p.yRangeMax,
          });
        });
        // make sure data is sorted (required by highchart)
        areaSeriesData.sort((a, b) => a.x! - b.x!);

        // build series area range object
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
            type: 'arearange',
            data: areaSeriesData,
            color: categoryColor,
            linkedTo: ':previous',
          });
        }
      }
    }

    // constructing the final HighCharts.Options
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
        labels: {
          style: {
            color: '#7a7a7a',
            fontSize: '0.7rem',
          },
          formatter() {
            return LineChartOperations.chartXAxisFormatter(data.xAxisType, this.value);
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
          animation: true,
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
