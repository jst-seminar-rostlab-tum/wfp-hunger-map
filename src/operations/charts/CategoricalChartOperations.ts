'use client';

import Highcharts, { TooltipFormatterContextObject } from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import patternFill from 'highcharts/modules/pattern-fill';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { getTailwindColor } from '@/utils/tailwind-util.ts';

// initialize the exporting module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  patternFill(Highcharts);
}
/**
 * Using CategoricalChartOperations, the CategoricalChart component can generate
 * the chart `Highcharts.Options` object required by the Highcharts component.
 */
export default class CategoricalChartOperations {
  /**
   * The first four bar colors are fixed; if more than four vars are rendered,
   * the default Highcharts colors will be used.
   */
  private static getCategoriesColorList() {
    return ['#FF5252', '#85E77C', '#157DBC', '#FFB74D'];
  }

  /**
   * Tooltip formatter function for `Options.tooltip.formatter` usage only.
   */
  private static chartTooltipFormatter(
    x: string | number | undefined,
    points: TooltipFormatterContextObject[] | undefined
  ) {
    let tooltip = '';
    points?.forEach((p) => {
      if (p.point.options.y) tooltip += `<br><div>${p.point.options.y}</div>`;
    });
    return tooltip;
  }

  /**
   * With this static function, the CategoricalChart component can build the `HighCharts.Options` object
   * for a bar chart or pie chart, out of a given `CategoricalChartData` instance.
   *
   * @param data `CategoricalChartData` object, containing all data to be plotted in the chart
   * @param pieChart if true, a pie chart instead of a bar chart is created
   */
  public static getHighChartOptions(data: CategoricalChartData, pieChart?: boolean): Highcharts.Options {
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
      seriesData.push({
        name: categoryData.name,
        y: categoryData.dataPoint.y,
        color: categoryColor,
      });
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
        enabled: false,
      },
      xAxis: {
        labels: {
          style: {
            color: getTailwindColor('--nextui-secondary'),
            fontSize: '0.7rem',
          },
        },
        lineColor: getTailwindColor('--nextui-chartsXAxisLine'),
        tickColor: getTailwindColor('--nextui-chartsXAxisLine'),
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
        gridLineColor: getTailwindColor('--nextui-chartsGridLine'),
      },
      tooltip: {
        shared: true,
        formatter() {
          return CategoricalChartOperations.chartTooltipFormatter(this.x, this.points);
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
      series: [
        {
          name: '',
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
          cursor: 'pointer',
        },
      },
    };
  }
}
