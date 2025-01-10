'use client';

import Highcharts, {
  AxisTypeValue,
  DashStyleValue,
  SeriesOptionsType,
  TooltipFormatterContextObject,
} from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import patternFill from 'highcharts/modules/pattern-fill';

import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import { LineChartDataType } from '@/domain/enums/LineChartDataType.ts';
import { formatToMillion } from '@/utils/formatting.ts';
import { getTailwindColor } from '@/utils/tailwind-util.ts';

// initialize the exporting module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  patternFill(Highcharts);
}
/**
 * Using LineChartOperations, the LineChart component can convert its received data into LineChartData
 * and then generate the chart `Highcharts.Options` object required by the Highcharts component.
 * Two types of options can be created: rendering the LineChart data as a line chart or as a bar chart.
 */
export default class LineChartOperations {
  /**
   * List of different dash styles for visualizing prediction data.
   * All lines that are marked as `prediction` are colored with the same predictions color,
   * to distinguish multiple predictions data series we use different dash styling.
   */
  private static getPredictionsDashStyles(): DashStyleValue[] {
    return ['ShortDashDotDot', 'ShortDash', 'LongDashDotDot', 'LongDash', 'DashDot', 'Dot', 'Dash'];
  }

  /**
   * The first four line colors are fixed; if more than four lines are rendered,
   * the default Highcharts colors will be used.
   */
  private static getLineColorList() {
    return [
      getTailwindColor('--nextui-clusterRed'),
      getTailwindColor('--nextui-clusterGreen'),
      getTailwindColor('--nextui-clusterBlue'),
      getTailwindColor('--nextui-clusterOrange'),
    ];
  }

  /**
   * Formatter function for `Options.tooltip.formatter` usage only.
   */
  private static chartTooltipFormatter(
    xAxisType: AxisTypeValue,
    x: string | number | undefined,
    points: TooltipFormatterContextObject[] | undefined
  ) {
    let tooltip = '';
    if (xAxisType === 'datetime' && typeof x === 'number') {
      tooltip = `<b>${Highcharts.dateFormat('%d.%m.%y', x)}</b>`;
    } else {
      tooltip = `<b>${x}</b>`;
    }
    points?.forEach((p) => {
      if (p.point.options.y) {
        tooltip += `<br><span style="color:${p.series.color}">\u25CF</span> <div>${p.point.options.y}</div>`;
      } else if (p.point.options.high !== undefined && p.point.options.low !== undefined) {
        tooltip += `<div style="color: ${getTailwindColor('--nextui-secondary')}"> (<div>${p.point.options.low} - ${p.point.options.high}</div>)</div>`;
      }
    });
    return tooltip;
  }

  /**
   * Tooltip formatter function for `LineChart.Options.xAxis.labels.formatter` usage only.
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
          yAxisLabel: 'Mill USD',
          lines: [
            {
              name: descriptions.balanceOfTrade.title,
              dataPoints: data.data.map((p) => {
                return { x: new Date(p.x).getTime(), y: formatToMillion(p.y) };
              }),
            },
          ],
        };

      case LineChartDataType.CURRENCY_EXCHANGE_CHART:
        return {
          type: LineChartDataType.LINE_CHART_DATA,
          xAxisType: 'datetime',
          yAxisLabel: 'Exchange rate',
          lines: [
            {
              name: data.name,
              dataPoints: data.data.map((p) => {
                return { x: new Date(p.x).getTime(), y: p.y };
              }),
            },
          ],
        };

      case LineChartDataType.INFLATION_CHARTS:
        return {
          type: LineChartDataType.LINE_CHART_DATA,
          xAxisType: 'datetime',
          yAxisLabel: 'Rate in %',
          lines: [
            {
              name: descriptions.headlineInflation.title,
              dataPoints:
                data.headline.data?.map((p) => {
                  return { x: new Date(p.x).getTime(), y: p.y };
                }) ?? [],
            },
            {
              name: descriptions.foodInflation.title,
              dataPoints:
                data.food.data?.map((p) => {
                  return { x: new Date(p.x).getTime(), y: p.y };
                }) ?? [],
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
      line.dataPoints?.forEach((point) => {
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
   * @param barChart if true, bars are plotted instead of lines
   * @param xAxisSelectedMinIdx index of selected x-axis range min value
   * @param xAxisSelectedMaxIdx index of selected x-axis range max value
   * @return 'Highcharts.Options' ready to be passed to the Highcharts component,
   * or 'undefined' if there is no data available to be plotted in the chart (to be interpreted as "no data available")
   */
  public static getHighChartOptions(
    data: LineChartData,
    xAxisSelectedMinIdx?: number,
    xAxisSelectedMaxIdx?: number,
    barChart?: boolean
  ): Highcharts.Options | undefined {
    // get selected x-axis range min and max values
    const xAxisDistinctValues = LineChartOperations.getDistinctXAxisValues(data);
    const xAxisSelectedMin = xAxisSelectedMinIdx !== undefined ? xAxisDistinctValues[xAxisSelectedMinIdx] : undefined;
    const xAxisSelectedMax = xAxisSelectedMaxIdx !== undefined ? xAxisDistinctValues[xAxisSelectedMaxIdx] : undefined;

    // parsing all given data series
    const series: SeriesOptionsType[] = [];
    const defaultLineColors = LineChartOperations.getLineColorList();
    const defaultPredictionsDashStyles = LineChartOperations.getPredictionsDashStyles();
    let atLeastOneSeriesAvailable = false;
    for (let i = 0; i < data.lines.length; i += 1) {
      const lineData = data.lines[i];

      // the first four line colors are fixed; however, they can also be overridden by the `color` property;
      // if `prediction` is set, the standard predictions color is used
      // if more than four lines are rendered the default Highcharts colors will be used (`categoryColor` stays undefined)
      let categoryColor;
      if (lineData.color) {
        categoryColor = lineData.color;
      } else if (lineData.prediction) {
        categoryColor = getTailwindColor('--nextui-chartForecast');
      } else {
        categoryColor = defaultLineColors.pop();
      }

      // select dash style
      let categoryDashStyle: DashStyleValue = 'Solid';
      if (lineData.dashStyle) {
        categoryDashStyle = lineData.dashStyle;
      } else if (lineData.prediction) {
        categoryDashStyle = defaultPredictionsDashStyles.pop() || 'Solid';
      }

      // collect series data
      const seriesData: Highcharts.PointOptionsObject[] = [];
      lineData.dataPoints?.forEach((p) => {
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

      if (seriesData.length > 0) atLeastOneSeriesAvailable = true;

      // build series object for highchart
      if (barChart) {
        // plot series as bars
        series.push({
          name: lineData.name,
          type: 'column',
          data: seriesData,
          color:
            // if the dashStyle is not solid we fill the bars with diagonal lines
            categoryDashStyle !== 'Solid'
              ? {
                  pattern: {
                    path: {
                      d: 'M 0 0 L 8 8 M -8 8 L 8 -8',
                      stroke: categoryColor,
                      strokeWidth: 1,
                    },
                    width: 8,
                    height: 8,
                  },
                }
              : categoryColor,
          opacity: lineData.showRange ? 0.75 : 1,
          borderColor: categoryColor,
          dashStyle: 'Solid',
        });
      } else {
        // plot series as line
        series.push({
          type: 'line',
          name: lineData.name,
          data: seriesData,
          color: categoryColor,
          dashStyle: categoryDashStyle,
        });
      }

      // checking if area range should be added as well
      if (lineData.showRange) {
        // collect series area range data
        const areaSeriesData: Highcharts.PointOptionsObject[] = [];
        lineData.dataPoints?.forEach((p) => {
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
            dashStyle: 'Solid',
          });
        } else {
          // add area around line
          series.push({
            name: `${lineData.name} - range`,
            type: 'arearange',
            data: areaSeriesData,
            color: categoryColor,
            linkedTo: ':previous',
            dashStyle: lineData.dashStyle,
          });
        }
      }
    }

    // not a single non-empty series -> we return 'undefined' ('undefined' is to be interpreted as "no data available")
    if (!atLeastOneSeriesAvailable) return undefined;

    // build all vertical lines and plot bands
    const verticalBands = data.verticalBands ? [...data.verticalBands] : [];
    const verticalLines = data.verticalLines ? [...data.verticalLines] : [];
    if (data.predictionVerticalLineX) {
      // get max x value
      const xMax = Math.max(...data.lines.flatMap((l) => l.dataPoints.map((p) => p.x)));
      verticalBands.push({
        xStart: data.predictionVerticalLineX,
        xEnd: xMax,
        label: 'Future',
      });
    }
    if (data.predictionVerticalLineX) {
      verticalLines.push({
        x: data.predictionVerticalLineX,
      });
    }
    const plotBands = verticalBands.map((b) => ({
      from: b.xStart,
      to: b.xEnd,
      color: b.color || 'rgba(140,140,140,0.07)',
      zIndex: 1,
      label: {
        text: b.label || '',
        style: {
          color: getTailwindColor('--nextui-secondary'),
          fontSize: '0.7rem',
        },
      },
    }));
    const plotLines = verticalLines.map((l) => ({
      value: l.x,
      color: l.color || getTailwindColor('--nextui-chartsGridLine'),
      dashStyle: l.dashStyle,
      zIndex: 2,
    }));

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
          color: getTailwindColor('--nextui-secondary'),
        },
        itemHoverStyle: {
          color: getTailwindColor('--nextui-hover'),
        },
      },
      xAxis: {
        type: data.xAxisType,
        labels: {
          style: {
            color: getTailwindColor('--nextui-secondary'),
            fontSize: '0.7rem',
          },
          formatter() {
            return LineChartOperations.chartXAxisFormatter(data.xAxisType, this.value);
          },
        },
        lineColor: getTailwindColor('--nextui-chartsXAxisLine'),
        tickColor: getTailwindColor('--nextui-chartsXAxisLine'),
        tickLength: 4,
        plotBands,
        plotLines,
      },
      yAxis: {
        title: {
          text: data.yAxisLabel,
          style: {
            color: getTailwindColor('--nextui-secondary'),
          },
        },
        labels: {
          style: {
            color: getTailwindColor('--nextui-secondary'),
            fontSize: '0.7rem',
          },
          formatter() {
            return Highcharts.numberFormat(this.value as number, -1);
          },
        },
        lineColor: 'transparent',
        gridLineColor: getTailwindColor('--nextui-chartsGridLine'),
      },
      tooltip: {
        shared: true,
        formatter() {
          return LineChartOperations.chartTooltipFormatter(data.xAxisType, this.x, this.points);
        },
        backgroundColor: getTailwindColor('--nextui-chartsLegendBackground'),
        style: {
          color: getTailwindColor('--nextui-foreground'),
          fontSize: '0.7rem',
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
          borderWidth: 1,
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
}
