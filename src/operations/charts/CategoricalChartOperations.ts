'use client';

import Highcharts, { AxisTypeValue, TooltipFormatterContextObject } from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import ExportData from 'highcharts/modules/export-data';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';
import patternFill from 'highcharts/modules/pattern-fill';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { getTailwindColor } from '@/utils/tailwind-util.ts';

// initialize the exporting module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  patternFill(Highcharts);
  Exporting(Highcharts);
  ExportData(Highcharts);
  OfflineExporting(Highcharts);
}
/**
 * Using LineChartOperations, the LineChart component can convert its received data into LineChartData
 * and then generate the chart `Highcharts.Options` object required by the Highcharts component.
 * Two types of options can be created: rendering the LineChart data as a line chart or as a bar chart.
 * // todo descr
 * In addition, several download functionalities are implemented.
 */
export default class CategoricalChartOperations {
  /**
   * The first four line colors are fixed; if more than four lines are rendered,
   * the default Highcharts colors will be used. // todo descr
   */
  private static getCategoriesColorList() {
    return ['#FF5252', '#85E77C', '#157DBC', '#FFB74D'];
  }

  /**
   * Formatter function for `Options.tooltip.formatter` usage only.
   */
  private static chartTooltipFormatter(
    xAxisType: AxisTypeValue,
    x: string | number | undefined,
    points: TooltipFormatterContextObject[] | undefined,
    isDark: boolean
  ) {
    // todo check
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
        const colorSecondary = isDark ? '#B0B0B0' : '#666666';
        tooltip += `<div style="color: ${colorSecondary}"> (<div>${p.point.options.low} - ${p.point.options.high}</div>)</div>`;
      }
    });
    return tooltip;
  }

  /**
   * With this static function, the LineChart component can build the `HighCharts.Options` object
   * for a line chart or bar chart, out of a given `LineChartData` instance.
   * // todo descr
   * Setting the 'xAxisSelectedMinIdx' and 'xAxisSelectedMinIdx' the rendered x-axis range
   * can be manipulated; important: if a min is defined a max must be defined as well and vice versa.
   *
   * @param data `LineChartData` object, containing all data to be plotted in the chart
   * @param isDark - `true` if dark mode is selected
   * @param barChart if true, bars are plotted instead of lines
   * @param xAxisSelectedMinIdx index of selected x-axis range min value
   * @param xAxisSelectedMaxIdx index of selected x-axis range max value
   */
  public static getHighChartOptions(data: CategoricalChartData, pieChart?: boolean): Highcharts.Options {
    // parsing all given data series
    const seriesData = [];
    const defaultCategoriesColors = CategoricalChartOperations.getCategoriesColorList();
    for (let i = 0; i < data.categories.length; i += 1) {
      const categoryData = data.categories[i];

      // the first four category colors are fixed; however, they can also be overridden by the `color` property;
      // if more than four lines are rendered the default Highcharts colors will be used (`categoryColor` stays undefined)
      let categoryColor;
      if (categoryData.color) {
        categoryColor = categoryData.color;
      } else {
        categoryColor = defaultCategoriesColors.pop();
      }

      // build series object for highchart
      if (pieChart) {
        // todo check if necessary to add if
        // plot series as bars
        seriesData.push({
          name: categoryData.name,
          y: categoryData.dataPoint.y,
          color: categoryColor,
        });
      } else {
        seriesData.push({
          name: categoryData.name,
          y: categoryData.dataPoint.y,
          color: categoryColor,
        });
      }
    }

    // constructing the final HighCharts.Options
    return {
      title: {
        text: '',
      },
      chart: {
        type: pieChart ? 'pie' : 'column',
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
        labels: {
          style: {
            color: getTailwindColor('--nextui-secondary'),
            fontSize: '0.7rem',
          },
        },
        lineColor: '#757575', // todo color
        tickColor: '#757575', // todo color
        tickLength: 4,
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
        gridLineColor: '#E6E6E6', // todo color
      },
      tooltip: {
        shared: true,
        // formatter() {}, // todo
        backgroundColor: '#F5F5F5', // todo color
        style: {
          color: getTailwindColor('--nextui-foreground'),
          fontSize: '0.7rem',
        },
      },
      exporting: {
        enabled: false, // disabling export menu icon
      },
      series: [
        {
          name: 'Data', // Legend label todo
          data: seriesData,
          type: pieChart ? 'pie' : 'column',
        },
      ],
      plotOptions: {
        column: {
          animation: true,
          grouping: true,
          shadow: false,
          borderWidth: 1,
        },
        pie: {
          allowPointSelect: true,
          cursor: 'pointer', // todo check
        },
      },
    };
  }
}
