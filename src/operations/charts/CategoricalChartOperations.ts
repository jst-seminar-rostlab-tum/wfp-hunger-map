'use client';

import Highcharts, { TooltipFormatterContextObject } from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import patternFill from 'highcharts/modules/pattern-fill';

import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData.ts';
import { CategoricalChartSorting } from '@/domain/enums/CategoricalChartSorting.ts';
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
    return [
      getTailwindColor('--nextui-clusterRed'),
      getTailwindColor('--nextui-clusterGreen'),
      getTailwindColor('--nextui-clusterBlue'),
      getTailwindColor('--nextui-clusterOrange'),
    ];
  }

  /**
   * Tooltip formatter function for `Options.tooltip.formatter` usage only.
   */
  private static chartTooltipFormatter(points: TooltipFormatterContextObject[] | undefined) {
    let tooltip = '';
    points?.forEach((p) => {
      if (p.point.options.y !== undefined) {
        tooltip += `<br><span style="color:${p.color}">\u25CF</span> <div>${p.point.options.y}</div>`;
      } else if (p.point.options.high !== undefined && p.point.options.low !== undefined) {
        tooltip += `<div style="color: ${getTailwindColor('--nextui-secondary')}"> (<div>${p.point.options.low} - ${p.point.options.high}</div>)</div>`;
      }
    });
    return tooltip;
  }

  /**
   * Tooltip formatter function for `Options.plotOptions.pie.dataLabels.formatter` usage only.
   */
  private static pieDataLabelsFormatter(point: Highcharts.Point, data: CategoricalChartData) {
    return `<p>${point.name}: </p><p style="color:${point.color}">${point.y} ${data.yAxisLabel}</p>`;
  }

  /**
   * With this static function, the CategoricalChart component can build the `HighCharts.Options` object
   * for a bar chart or pie chart, out of a given `CategoricalChartData` instance.
   * @param data `CategoricalChartData` object, containing all data to be plotted in the chart
   * @param sorting selected sorting of the chart
   * @param pieChart if true, a pie chart instead of a bar chart is created
   * @return 'Highcharts.Options' ready to be passed to the Highcharts component,
   * or 'undefined' if there is no data available to be plotted in the chart (to be interpreted as "no data available")
   */
  public static getHighChartOptions(
    data: CategoricalChartData,
    sorting: CategoricalChartSorting,
    pieChart?: boolean
  ): Highcharts.Options | undefined {
    // sort data
    CategoricalChartOperations.sortData(data, sorting);

    // build highchart options
    const seriesData = [];
    const categories = [];
    const seriesRangeData = [];
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

      // collect category names
      categories.push(categoryData.name);

      // check if range should be displayed
      const showRange =
        !pieChart && categoryData.dataPoint.yRangeMin !== undefined && categoryData.dataPoint.yRangeMax !== undefined;

      // build series object for highchart
      seriesData.push({
        name: categoryData.name,
        y: categoryData.dataPoint.y,
        color: categoryColor,
        opacity: showRange ? 0.6 : 1,
      });

      // check if range should be displayed
      if (showRange) {
        seriesRangeData.push({
          x: i,
          low: categoryData.dataPoint.yRangeMin,
          high: categoryData.dataPoint.yRangeMax,
          color: categoryColor,
        });
      }
    }

    // if there is not a single series -> we return 'undefined' -> 'undefined' is to be interpreted as "no data available"
    if (seriesData.length === 0) return undefined;

    // constructing the final HighCharts.Options
    return {
      title: {
        text: '',
      },
      chart: {
        type: pieChart ? 'Line' : 'column',
        backgroundColor: 'transparent',
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        categories,
        visible: !pieChart,
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
        visible: !pieChart,
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
        enabled: !pieChart,
        shared: true,
        formatter() {
          return CategoricalChartOperations.chartTooltipFormatter(this.points);
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
        {
          name: 'Range',
          type: 'errorbar', // Error bar series
          data: seriesRangeData, // Use the error bar data
          tooltip: {
            pointFormat: '(Range: {point.low} - {point.high})',
          },
        },
      ],
      plotOptions: {
        column: {
          animation: true,
          grouping: true,
          shadow: false,
          borderWidth: 0,
          colorByPoint: true,
        },
        errorbar: {
          stemWidth: 1.5,
          whiskerLength: '30%',
          whiskerWidth: 1.5,
          colorByPoint: true, // use different colors for each bar
        },
        pie: {
          animation: true,
          allowPointSelect: false,
          cursor: 'default',
          innerSize: '60%',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter() {
              return CategoricalChartOperations.pieDataLabelsFormatter(this.point, data);
            },
            style: {
              color: getTailwindColor('--nextui-secondary'),
              fontSize: '12px',
              borderWidth: 0,
              fontWeight: 'light',
            },
          },
          states: {
            hover: {
              halo: {
                size: 4, // shrinking the halo/glow size on hover
              },
            },
          },
        },
      },
    };
  }

  /**
   * Sorting the categories data according to the selected sorting.
   */
  public static sortData(data: CategoricalChartData, sorting: CategoricalChartSorting) {
    switch (sorting) {
      case CategoricalChartSorting.NAMES_ASC:
        data.categories.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case CategoricalChartSorting.NAMES_DESC:
        data.categories.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case CategoricalChartSorting.VALUES_ASC:
        data.categories.sort((a, b) => a.dataPoint.y - b.dataPoint.y);
        break;
      case CategoricalChartSorting.VALUES_DESC:
      default:
        data.categories.sort((a, b) => b.dataPoint.y - a.dataPoint.y);
    }
  }
}
